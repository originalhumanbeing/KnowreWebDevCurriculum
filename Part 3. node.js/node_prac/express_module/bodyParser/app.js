var fs = require('fs');
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function (req, res) {
    if(req.cookies.auth) {
        res.send('<h1>Login Success</h1>');
    } else {
        res.redirect('/login');
    }
});

app.get('/login', function(req, res) {
    fs.readFile('login.html', function (error, data) {
        res.send(data.toString());
    })
});

app.post('/login', function(req, res) {
    var login = req.body.login;
    var password = req.body.password;

    console.log('id & pw', login, password);
    console.log('요청 바디', req.body);

    if(login == 'rint' && password == '1234') {
        res.cookie('auth', 'true');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
});

app.listen(52273, function() {
    console.log('Server running at htpp://127.0.0.1:52273')
});