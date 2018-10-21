var http = require('http');
var jade = require('jade');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('JadePage.jade', 'utf8', function (error, data) {
        var fn = jade.compile(data);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(fn({
            name: 'RintIanTta',
            description: 'Hello jade With Node.js'
        }));
    });
}).listen(52273, function () {
    console.log('Server is up and running');
});