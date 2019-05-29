const images = require('images');
const fs = require('fs')


//实现图片批量压缩
function imagesCompress(id, size) {
    let path = __dirname + '../../../../../image';
    let outPath = __dirname + '../../../image';
    console.log(path)
    console.log(outPath)
    let filePath = '';
    if (fs.existsSync(path + '/image-' + id + '.jpg')) {
        filePath = '/image-' + id + '.jpg';
    } else if (fs.existsSync(path + '/image-' + id + '.png')) {
        filePath = '/image-' + id + '.png';
    } else {
        return;
    }
    let img = images(path + filePath) //加载原图文件
        .size(size)//等比缩放图像宽高
        // .draw()//绘制logo
        .save(outPath + filePath, {quality: 150})//保存图片质量为50
}

imagesCompress('517015', 595)