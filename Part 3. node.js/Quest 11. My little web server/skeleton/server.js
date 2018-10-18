const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    let query = url.parse(req.url, true).query;
    let bar = JSON.stringify(query['bar']);
    let pathname = url.parse(req.url, true).pathname;

    if (req.method == 'GET' && pathname == '/foo') {
        console.log(url.parse(req.url));
        console.log('query', query);
        console.log('bar', bar);
        console.log('pathname', pathname);
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Hello ' + bar + ' (GET Method)</h1>');
    } else if (req.method == 'POST' && pathname == '/foo') {
        console.log('POST 받았다');
        let body = 'POST 통신 성공';
        req.on('data', (data) => {
            body = data.toString()
        }).on('end', () => {
            res.end(body);
        });
    }
    else {
        fs.readFile('index.html', function (error, data) {
            if (data) {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            } else {
                console.log('에러다');
            }
        })
    }
}).listen(8080, 'localhost');