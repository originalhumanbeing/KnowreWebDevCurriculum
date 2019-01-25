var express = require('express');
var router = express.Router();

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mysql = require('mysql');
var fs = require('fs');
var jade = require('jade');

var client = mysql.createConnection({
    user: 'root',
    password: 'rhforhfo89!',
    database: 'Company'
});

/* GET home page. */
router.get('/', function(req, res, next) {
    fs.readFile('./views/index.jade', 'utf8', function(error, data) {
        var fn = jade.compile(data);

        client.query('SELECT * FROM products', function (error, result) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end(fn( {result: result} ));
        })
    });
});

module.exports = router;


