const express = require('express'),
    path = require('path'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static('client'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */

// 전체 메모 리스트 가져오기
app.get('/memos', function (req, res) {
    fs.readdir('./memos', function (err, files) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(files));
    });
});

// 메모 읽기
app.get('/memo/:title', function (req, res) {
    let id = req.params.title;
    let title = `./memos/${id}.txt`;
    fs.readFile(title, 'utf8', function (error, data) {
        if (error) return res.sendStatus(404);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(JSON.stringify(data));
    })
});

// 새 메모 저장
app.post('/memo', function (req, res) {
    let data = req.body;
    if (!data) return res.sendStatus(400);

    fs.readdir('./memos', function (err, files) {
        let totalFiles = files.length;
        let title = totalFiles + 1;
        let fileLocation = `./memos/${title}.txt`;

        fs.writeFile(fileLocation, data, function(error) {
            if(error) throw error;
        });

        fs.readFile(fileLocation, 'utf8', function(error, data) {
            if(error) throw error;
            res.writeHead(200, { 'Content-Type' : 'text/html' });
            res.end(JSON.stringify( { body: data, title: fileLocation }));
        });
    });
});

// 메모 수정
app.put('/memo/:title', function (req, res) {
    let id = req.params.title;
    let title = `./memos/${id}.txt`;
    let data = req.body.body;
    fs.writeFile(title, data, function (error) {
        if(error) {
            console.log(error);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            fs.readFile(title, 'utf8', function (error, data) {
                res.end(data);
            });
        }
    })
});

// 메모 삭제
app.delete('/memo/:title', function (req, res) {
    let id = req.params.title;
    let title = `./memos/${id}.txt`;
    fs.unlink(title, function () {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(`${title}이 삭제 완료되었습니다`);
    })
});

const server = app.listen(8080, () => {
    console.log('Server started!');
});
