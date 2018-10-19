const express = require('express'),
	path = require('path'),
	app = express();

app.use(express.static('client'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */
// path가 파일명이 되서 그거대로 라우팅하나...?

const server = app.listen(8080, () => {
	console.log('Server started!');
});
