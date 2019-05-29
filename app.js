const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const imgCompress = require('./router/img_compress');
const userRouter = require('./router/user');
const imageRouter = require('./router/image');
const bookRouter = require('./router/book');
const commodityRouter = require('./router/commodity');

const server = express();

server.listen(3333);
//解决跨域请求
server.use(cors({
    origin: '*'
}))
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
server.use('/original', express.static('../static/image'));
server.use('/compress', imgCompress);
//定时清理图片文件夹缓存
setInterval(() => {
    console.log(new Date().getTime())
    let tempPath = path.resolve(__dirname + '/../static/image/temporarySpace/');
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
}, 1000 * 60 * 60)//1天1000*60*60*24

// 返回原图
console.log('返回原图', 'http://127.0.0.1:8989/original/img/image-517022.jpg')
//返回自定义尺寸图片
console.log('返回自定义尺寸图片', 'http://127.0.0.1:8989/compress/img/image-517022.jpg')



