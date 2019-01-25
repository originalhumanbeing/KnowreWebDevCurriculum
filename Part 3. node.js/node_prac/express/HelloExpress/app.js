var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var fs = require('fs');
var jade = require('jade');

var client = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'Company'
});

var indexRouter = require('./routes/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// read list
app.use('/', indexRouter);

app.get('/delete/:id', function (req, res) {
    client.query('DELETE FROM products WHERE id = ?', [req.params.id], function () {
        res.redirect('/');
    })
});

app.get('/edit/:id', function (req, res) {
    fs.readFile('./views/edit.jade', 'utf8', function (error, data) {
        var fn = jade.compile(data);

        client.query('SELECT * FROM products WHERE id = ?', [req.params.id], function (error, result) {
            console.log(result);
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(fn( {result: result} ));
        });
    })
});

app.post('/edit/:id', function () {

});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
