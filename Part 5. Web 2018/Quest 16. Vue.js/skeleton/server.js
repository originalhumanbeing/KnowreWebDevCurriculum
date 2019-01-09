const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    MySQLStore = require('express-mysql-session')(session),
    models = require('./models'),
    crypto = require('crypto'),
    cors = require('cors'),
    app = express();

const sessionStoreOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'bsoup0404@',
    database: 'knowrememo'
};

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('client'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore(sessionStoreOptions)
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

// login 하기
app.post('/login', async function (req, res) {
    let id = req.body.id;
    let pwd = req.body.pwd;
    let salt = 'let there be salt';

    if (!id || !pwd) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(JSON.stringify({body: '로그인이 필요합니다!'}));
        return;
    }

    let queryResult;
    try {
        queryResult = await models.Member.findOne({where: {email: id}});
    } catch (e) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(JSON.stringify({body: '아이디가 존재하지 않습니다!'}));
        return;
    }
    const encryptedPwd = await pdkdf2Async(pwd, salt);
    if (encryptedPwd !== queryResult.dataValues.pwd) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(JSON.stringify({body: '비밀번호가 일치하지 않습니다!'}));
        return;
    }

    req.session.isLogin = true;
    req.session.nickname = queryResult.dataValues.nickname;

    let lastMemoTitle = req.session.workedOnLast;
    id = id.split('@')[0];

    if (!lastMemoTitle || lastMemoTitle === '') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(JSON.stringify({body: req.session}));
        return;
    }

    const lastMemo = await models.Memo.findOne({where: {owner: id, title: lastMemoTitle}})
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(JSON.stringify({
        session: req.session,
        lastMemoContent: lastMemo.dataValues
    }));
});

// 전체 메모 리스트 가져오기
app.get('/memos/:user', function (req, res) {
    let user = req.params.user;

    models.Memo.findAll({where: {owner: user}})
        .then(results => {
            let data = [];
            for (let result of results) {
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
    req.session.workedOnLast = id;

    models.Memo.findOne({where: {owner: user, title: id}})
        .then(result => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(JSON.stringify({body: result.dataValues}));
        })
        .catch(err => console.log(err));
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
            })
                .then(createdResult => {
                    req.session.workedOnLast = title;
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.end(JSON.stringify({body: createdResult}));
                })
                .catch(err => console.error(err));

            return results;
        })
        .catch(err => {
            console.error(err);
        })
});

// 메모 수정
app.put('/memo/:user/:title', async function (req, res) {
    const user = req.params.user;
    const title = req.params.title;
    const memo = req.body.memo;
    const cursorStart = req.body.cursorStart;
    const cursorEnd = req.body.cursorEnd;

    const updatedResult = await models.Memo.update({
        content: memo,
        cursorStart: cursorStart,
        cursorEnd: cursorEnd
    }, {
        where: {owner: user, title: title}
    });

    if(updatedResult !== 1) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(JSON.stringify({body: '수정에 실패했습니다!'}));
        return;
    }

    req.session.workedOnLast = title;

    const result = await models.Memo.findOne({where: {owner: user, title: title}});
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(JSON.stringify({body: result.dataValues}));
});

// 메모 삭제
app.delete('/memo/:user/:title', function (req, res) {
    let user = req.params.user;
    let title = req.params.title;

    models.Memo.destroy({where: {owner: user, title: title}})
        .then(destroyedResult => {
            if (destroyedResult === 1) {
                req.session.workedOnLast = '';
                let msg = `${title}이 삭제 완료되었습니다`;
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(JSON.stringify({body: msg}));
            }
        })
        .catch(err => console.log(err));
});

const server = app.listen(8080, () => {
    console.log('Server started!');
});
