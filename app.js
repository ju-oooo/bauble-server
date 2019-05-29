const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRouter = require('./router/user');
const imageRouter = require('./router/image');
const bookRouter = require('./router/book');
const commodityRouter = require('./router/commodity');

const server = express();

server.listen(3333);
//解决跨域请求
server.use(cors({
    origin:'*'
}))
// server.all("*", (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', "*");
//     next();
// });

// server.all('*', function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By", ' 3.2.1');
//     if (req.method == "OPTIONS") res.send(200);/*让options请求快速返回*/
//     else next();
// });
// console.log('http://localhost:3333/user/login.html');

server.use(bodyParser.urlencoded({extended: false}));

// server.use(express.static(__dirname + '../../static/html'));
// server.use(express.static(__dirname + '../../static/'));

server.use('/user', userRouter);
server.use('/image', imageRouter);
server.use('/book', bookRouter);
server.use('/commodity', commodityRouter);



