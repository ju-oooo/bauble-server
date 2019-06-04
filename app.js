const express = require('express');
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
// //解决跨域请求
// server.use('*',function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3666'); //这个表示任意域名都可以访问，这样写不能携带cookie了。
// //res.header('Access-Control-Allow-Origin', 'http://www.baidu.com'); //这样写，只有www.baidu.com 可以访问。
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');//设置方法
//     if (req.method == 'OPTIONS') {
//         res.send(200); // 意思是，在正常的请求之前，会发送一个验证，是否可以请求。
//     }
//     else {
//         next();
//     }
// });
server.use(cors({
    origin: ['http://127.0.0.1:3666', 'http://localhost:3666'],
    credentials: true,
    optionsSuccessStatus: 200
}));
// server.all("*", (req, res, next) => {
//     res.header('Access-Control-Allow-Origin', "*");
//     next();
// });


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
}, 1000 * 60*10)//1天1000*60*60*24

console.log('http://127.0.0.1:3333/original/image/image-517022.jpg')
console.log('http://127.0.0.1:3333/compress/image/image-517022.jpg')



