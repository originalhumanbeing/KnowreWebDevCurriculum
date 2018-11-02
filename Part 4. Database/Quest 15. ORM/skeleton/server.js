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

let members = [
    {
        id: 'test1@email.com',
        pwd: '1111',
        nickname: 'test1'
    },
    {
        id: 'test2@email.com',
        pwd: '2222',
        nickname: 'test2'
    },
    {
        id: 'test3@email.com',
        pwd: '3333',
        nickname: 'test3'
    }
];

// 회원 암호화해서 db에 넣기
for(let member of members) {
    crypto.randomBytes(32, function(err, buffer) {
       if(err) console.log(err);
       else {
           crypto.pbkdf2(member.pwd, buffer.toString('base64'), 130492, 64, 'sha512', function(err, pwd) {
               if(err) console.log(err);
               models.Member.create({
                   nickname: member.nickname,
                   email: member.id,
                   pwd: pwd.toString('base64')
               }).then(result => res.json(result));
           })
       }
    });
}

// 회원, 파일 테이블 관계를 맺어놓기 1:N
// file belongsTo member (file's primary key would be member id)
// file.hasOne.... 이 맞는듯, 각 파일마다 소유자 번호를 가지고 있게.

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// login 하기
app.post('/login', function (req, res) {
    let id = req.body.id;
    let pwd = req.body.pwd;

    if (id && pwd) {
        for (let member in members) {
            if (members[member].id === id && members[member].pwd === pwd) {
                req.session.isLogin = true;
                req.session.nickname = members[member].nickname;

                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(JSON.stringify({body: req.session}));
                return;
            }
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(JSON.stringify({body: '아이디와 패스워드를 다시 확인해주세요!'}));
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(JSON.stringify({body: '로그인 해주세요!'}));
    }
});

// 전체 메모 리스트 가져오기
app.get('/memos/:user', function (req, res) {
    let user = req.params.user;
    let fileLocation = `./memos/${user}`;
    fs.readdir(fileLocation, function (err, files) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(JSON.stringify({body: files}));
    })
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
    let data = {
        memo: memo,
        cursorStart: cursorStart,
        cursorEnd: cursorEnd
    };

    if (!data || !user) return res.sendStatus(400);

    fs.readdir(`./memos/${user}`, function (err, files) {
        let totalFiles = files.length;
        let title = totalFiles + 1;
        let fileLocation = `./memos/${user}/${title}.txt`;

        files.map(e => {
            e = e.split('.');
            e = e[0];
            if (totalFiles > 0 && title === Number(e)) {
                let lastFile = files[totalFiles - 1];
                lastFile = lastFile.split('.');
                title = Number(lastFile[0]) + 1;
                title = title;
                fileLocation = `./memos/${user}/${title}.txt`;
            }
        });

        fs.writeFile(fileLocation, JSON.stringify(data), function (error) {
            if (error) throw error;
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({
                memo: data.memo,
                cursorStart: data.cursorStart,
                cursorEnd: data.cursorEnd,
                title: title
            }));
        });
    });
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
