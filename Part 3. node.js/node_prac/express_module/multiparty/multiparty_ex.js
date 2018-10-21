var fs = require('fs');
var express = require('express');
var multipart = require('connect-multiparty');

var app = express();

app.use(multipart({ uploadDir: __dirname + '/files'}));

app.get('/', function (req, res) {
    fs.readFile('HTMLPage.html', function (error, data) {
        res.send(data.toString());
    })
});

app.post('/', function(req, res) {
    var comment = req.body.comment;
    var imageFile = req.files.image;

    if(imageFile) {
        var name = imageFile.name;
        var path = imageFile.path;
        var type = imageFile.type;

        if(type.indexOf('image') != -1) {
            var outputPath = __dirname + '/files/' + Date.now() + '_' + name;
            fs.rename(path, outputPath, function (error) {
                res.redirect('/');
            })
        } else {
            fs.unlink(path, function(error) {
                res.sendStatus(400);
            });
        }
    } else {
        res.sendStatus(404);
  s  }
});

app.listen(52273, function() {
    console.log('Server is up and running');
});