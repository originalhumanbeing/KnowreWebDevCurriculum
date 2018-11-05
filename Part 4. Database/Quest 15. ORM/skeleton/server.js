const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    models = require('./models'),
    crypto = require('crypto'),
    app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('client'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

models.sequelize.sync()
    .then(() => {
        console.log('✓ DB connection success.');
    })
    .catch(err => {
        console.error(err);
        console.log('✗ DB connection error. Please make sure DB is running.');
        process.exit();
    });

models.Member.hasMany(models.Memo, {foreignKey: 'owner'});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

function pdkdf2Async(pwd, salt) {
    return new Promise((resolve, reject) => {
        crypto.pbkdf2(pwd, salt.toString('base64'), 130492, 64, 'sha512', function (err, pwd) {
            if (err) return reject(err);
            resolve(pwd.toString('base64'));
        });
    });
}

async function encryptPwd(pwd, salt) {
    let encryptedPwd = await pdkdf2Async(pwd, salt);
    return encryptedPwd;
}

// login 하기
app.post('/login', function (req, res) {
    let id = req.body.id;
    let pwd = req.body.pwd;
    let salt = 'let there be salt';

    if (id && pwd) {

        models.Member.findOne({where: {email: id}})
            .then(queryResult => {
                return encryptPwd(pwd, salt)
                    .then(encryptPwd => ({encryptPwd, queryResult}));
            })
            .then(result => {
                const {encryptPwd, queryResult} = result;
                if (encryptPwd === queryResult.dataValues.pwd) {
                    req.session.isLogin = true;
                    req.session.nickname = queryResult.dataValues.nickname;

                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(JSON.stringify({body: req.session}));
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(JSON.stringify({body: '비밀번호가 일치하지 않습니다!'}));
                }
            })
            .catch(err => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(JSON.stringify({body: '아이디가 존재하지 않습니다!'}));
            })
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(JSON.stringify({body: '로그인이 필요합니다!'}));
    }
});

// 전체 메모 리스트 가져오기
app.get('/memos/:user', function (req, res) {
    let user = req.params.user;

    models.Memo.findAll({where: {owner: user}})
        .then(results => {
            let data = [];
            for(let result of results) {
                data.push(result.dataValues.title);
            }
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(JSON.stringify({body: data}));
        })
        .catch(err => console.log(err));
});

// 메모 읽기
app.get('/memo/:user/:title', function (req, res) {
    let user = req.params.user;
    let id = req.params.title;
    let fileLocation = `./memos/${user}/${id}.txt`;

    fs.readFile(fileLocation, 'utf8', function (error, data) {
        if (error) return res.sendStatus(404);
        // 'utf8' 형식으로는 JSON 파일을 못 읽으니까 읽어온 데이터 덩어리를 json 형식으로 파싱해줄 것!
        data = JSON.parse(data);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            memo: data.memo,
            cursorStart: data.cursorStart,
            cursorEnd: data.cursorEnd
        }));
    })
});

// 새 메모 저장
app.post('/memo/:user', function (req, res) {
    let memo = req.body.memo;
    let user = req.body.user;
    let cursorStart = req.body.cursorStart;
    let cursorEnd = req.body.cursorEnd;

    if (!memo || !user) return res.sendStatus(400);

    models.Memo.findAll({where: {owner: user}})
        .then(results => {
            let totalFiles = results.length;
            let title = totalFiles + 1;

            for (let result of results) {
                if (title === result.dataValues.title) {
                    title = Number(result.dataValues.title) + 1;
                }
            }

            models.Memo.create({
                owner: user,
                title: title,
                content: memo,
                cursorStart: cursorStart,
                cursorEnd: cursorEnd
            }).then(createdResult => {
                return createdResult;
            }).catch(err => {
                console.error(err);
            });

            return results;
        })
        .catch(err => {
            console.error(err);
        })
});

// 메모 수정
app.put('/memo/:user/:title', function (req, res) {
    let user = req.params.user;
    let title = req.params.title;
    let fileLocation = `./memos/${user}/${title}.txt`;
    let memo = req.body.memo;
    let cursorStart = req.body.cursorStart;
    let cursorEnd = req.body.cursorEnd;
    let data = {
        memo: memo,
        cursorStart: cursorStart,
        cursorEnd: cursorEnd
    };

    fs.writeFile(fileLocation, JSON.stringify(data), function (error) {
        if (error) throw error;
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({
            memo: data.memo,
            cursorStart: data.cursorStart,
            cursorEnd: data.cursorEnd,
            title: title
        }));
    })
});

// 메모 삭제
app.delete('/memo/:user/:title', function (req, res) {
    let user = req.params.user;
    let title = req.params.title;
    let fileLocation = `./memos/${user}/${title}.txt`;
    fs.unlink(fileLocation, function () {
        let msg = `${title}.txt이 삭제 완료되었습니다`;
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(JSON.stringify({body: msg}));
    })
});

const server = app.listen(8080, () => {
    console.log('Server started!');
});
