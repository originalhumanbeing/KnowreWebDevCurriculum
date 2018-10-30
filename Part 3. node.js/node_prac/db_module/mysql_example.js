var mysql = require('mysql');

var client = mysql.createConnection({
    user: 'root',
    password: ''
});

client.query('USE Company');
client.query('SELECT * FROM products', function(error, result, fields) {
    if(error) {
        console.log(error);
        console.log('쿼리 문장에 오류가 있습니다');
    } else {
        console.log(result);
    }
});