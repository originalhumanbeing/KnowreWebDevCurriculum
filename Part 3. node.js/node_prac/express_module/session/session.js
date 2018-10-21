var express = require('express');
var session = require('express-session');

var app = express();

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60*1000
    }
}));

app.use(function (req, res) {
    req.session.now = (new Date()).toUTCString();
    res.send(req.session);
});

app.listen(52273, function () {
   console.log('server is up and running');
});