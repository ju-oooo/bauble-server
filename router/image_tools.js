const express = require('express');
const path = require('path');
const images = require('images');
const fs = require('fs');
const router = express.Router();

const rootPath = '../../imageStorage';
//返回原图
router.get('/original/:path/:type-:param', (req, res) => {
    let data = req.params;
    let fileName = data.type + '-' + data.param;
    let path_resplve = path.resolve(__dirname + '/' + rootPath + '/' + data.path + '/' + fileName);
    console.log(path_resplve)
    //如果有直接返回
    if (fs.existsSync(path_resplve)) {//图片列表查找
        res.sendFile(path_resplve)
    } else {
        //不存在
        res.send(404)
    }
});
//返回相对尺寸的图片
router.get('/compress/:path/:type-:param', (req, res) => {
    let data = req.params;
    let fileName = data.type + '-' + data.param;
    let path_resplve = path.resolve(__dirname + '/' + rootPath + '/' + data.path + '/' + fileName);
    let tempPath = path.resolve(__dirname + '/' + rootPath + '/temporarySpace/' + fileName);
    //如果临时空间有直接返回
    if (fs.existsSync(tempPath)) {
        res.sendFile(tempPath);
    } else if (fs.existsSync(path_resplve)) {//图片列表查找
        images(path_resplve).size(400).save(tempPath, {quality: 100})
        res.sendFile(tempPath)
    } else {
        //不存在
        res.send(404)
    }
});
module.exports = router;
