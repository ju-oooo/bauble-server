const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const imageRouter = require('./router/image');
const imageToolsRouter = require('./router/image_tools');
const userRouter = require('./router/user');
const bookRouter = require('./router/book');
const commodityRouter = require('./router/commodity');

const server = express();

server.listen(3333);
server.use(cors({
    // origin: ['http://127.0.0.1:3666', 'http://localhost:3666'],
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200
}));
// server.all("*", (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', "*");
//     next();
// });
// server.use(session({
//     secret: 'oooo',//加密的字符串，里面内容可以随便写
//     resave: false,//强制保存session,即使它没变化
//     saveUninitialized: true //强制将未初始化的session存储，默认为true
// }))


server.use(bodyParser.urlencoded({extended: false}));

server.use('/user', userRouter);
server.use('/image', imageRouter);
server.use('/book', bookRouter);
server.use('/commodity', commodityRouter);

//显示原图片
server.use(imageToolsRouter)
setInterval(() => {
    console.log(new Date().getTime())
    let tempPath = path.resolve(__dirname + '/../imageStorage/temporarySpace/');
    if (!fs.existsSync(tempPath)) {
        fs.mkdirSync(tempPath)
    } else {
        let readdir_list = fs.readdirSync(tempPath)//获取文件列表
        for (let temp in readdir_list) {//遍历删除所有文件
            let filePath = tempPath + '/' + readdir_list[temp];
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath)
            }
        }
    }
}, 1000 * 60 * 10)//1天1000*60*60*24
//原图
console.log('http://127.0.0.1:3333/original/image/image-517022.jpg')
//裁剪图
console.log('http://127.0.0.1:3333/compress/image/image-517022.jpg')



