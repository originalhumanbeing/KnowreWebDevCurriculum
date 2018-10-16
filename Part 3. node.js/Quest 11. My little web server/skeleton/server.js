const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    let query = url.parse(req.url, true).query;
    let bar = JSON.stringify(query['bar']);
    let pathname = url.parse(req.url, true).pathname;

    if(req.method == 'GET' && pathname == '/foo') {
       res.writeHead(200, {
            'Content-Type' : 'text/html'});
       res.end('<h1>Hello '+bar+' (GET Method)</h1>');
    } else if(req.method == 'POST' && pathname == '/foo') {
        req.on('data', (data)=> {
            res.writeHead(200, {
                'Content-Type' : 'text/html'});
            res.end('<h1>Hello, '+ data + ' ' + bar+' (POST Method)</h1>');
        });
    } else {
        res.writeHead(200, {
            'Content-Type' : 'text/html'});
        res.end('<h1>Hello, this is main page</h1>');
    }
}).listen(8080, 'localhost');
