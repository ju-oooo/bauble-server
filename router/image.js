const express = require('express');
const pool = require('../pool');
const router = express.Router();

//获取图片列表
router.post('/list', (req, res) => {
    let data = req.body;
    let pageNum = parseInt(data.pageNum);
    let count = parseInt(data.count);
    if (!isNaN(count) && count < 5 && !isNaN(pageNum) && pageNum < 0) {
        count = 5;
        pageNum = 0;
    }
    let start = (pageNum * count)+ 40000;//临时修改
    let sql = 'select * from image order by id limit ?,?';
    pool.query(sql, [start, count], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({imageList: result})
        }
    })
})

//获取单个图片
router.get('/detail', (req, res) => {
    let data = req.query;
    if (!data.uid) {
        res.redirect('../error/404.html')
        return;
    } else {
        console.log(33)
    }
})
module.exports = router;
