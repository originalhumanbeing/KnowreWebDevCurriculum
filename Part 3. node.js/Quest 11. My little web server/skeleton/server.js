const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
    let query = url.parse(req.url, true).query;
    let pathname = url.parse(req.url, true).pathname;
    let body = '';

    if (req.method === 'GET' && pathname === '/foo') {
        let bar = JSON.stringify(query['bar']);
        bar = bar.substr(1,3);
        body = 'Hello ' + bar;
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        res.end(body);
    } else if (req.method === 'POST' && pathname === '/foo') {
        req.on('data', (data) => {
            body += data.toString();
        }).on('end', () => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });
            res.end(body);
        });
    } else {
        fs.readFile('index.html', function (error, data) {
            if (data) {
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                res.end(data);
            } else {
                console.log(error);
            }
        })
    }
}).listen(8080, 'localhost');