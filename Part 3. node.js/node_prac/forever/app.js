require('http').createServer(function (req, res) {
   if(req.url === '/') {
       res.write('<!DOCTYPE html>');
       res.write('<html>');
       res.write('<head>');
       res.write('  <title>Forerver</title>');
       res.write('</head>');
       res.write('<body>');
       res.write('  <h1>Forever</h1>');
       res.write('</body>');
       res.write('</html>');
       res.end();
   } else {
       error.error.error();
   }
}).listen(52273, function () {
    console.log('Server Running at http://127.0.0.1:52273');
});