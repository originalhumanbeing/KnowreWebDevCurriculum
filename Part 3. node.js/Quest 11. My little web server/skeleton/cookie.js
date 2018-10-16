const http = require('http');

let server = http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Set-Cookie': ['breakfast = toast', 'dinner = pasta']
    });
    res.end('<h1>'+req.headers.cookie+'</h1>');
});

server.listen(8000, 'localhost');

