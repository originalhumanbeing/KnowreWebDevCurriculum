const http = require('http');

http.createServer((req, res) => {
	// TODO: 이 곳을 채워넣으세요..!
    res.writeHead(200, {'Content-Type' : 'text/html'});
    res.end('Hello World!');
}).listen(8080, 'localhost');
