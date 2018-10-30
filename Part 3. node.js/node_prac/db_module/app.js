var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var client = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'Company'
});

var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));

app.listen(52273, function () {
    console.log('Server Running at http://127.0.0.1:52273');
});

app.get('/', function (req, res) {
    fs.readFile('list.html', 'utf8', function (error, data) {
        client.query('SELECT * FROM products', function (error, results) {
            res.send(ejs.render(data, {
                data: results
            }));
        });
    });
});

app.get('/delete/:id', function (req, res) {
    client.query('DELETE FROM products WHERE id=?', [req.params.id], function () {
        res.redirect('/');
    });
});

app.get('/insert', function (req, res) {
    fs.readFile('insert.html', 'utf8', function (error, data) {
        res.send(data);
    })
});

app.post('/insert', function (req, res) {
    var body = req.body;

    client.query('INSERT INTO products (name, modelnumber, series) VALUES (?, ?, ?)', [
        body.name, body.modelnumber, body.series
    ], function () {
        res.redirect('/');
    });
});

app.get('/edit/:id', function (req, res) {
    fs.readFile('edit.html', 'utf8', function (error, data) {
       client.query('SELECT * FROM products WHERE id=?', [
           req.params.id
       ], function (error, result) {
           console.log(result);
           res.send(ejs.render(data, {
               data: result[0]
           }));
       });
    });
});

app.post('/edit/:id', function (req, res) {
    var body = req.body;

    client.query('UPDATE products SET name=?, modelnumber=?, series=? WHERE id=?', [
        body.name, body.modelnumber, body.series, req.params.id
    ], function () {
        res.redirect('/');
    });
});