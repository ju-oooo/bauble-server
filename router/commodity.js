// 商品
const express = require('express');
const pool = require('../pool');
const router = express.Router();

//获取商品总类型
router.post('/type', (req, res) => {
    let sql = 'select `id`, `name` from commodity_catalogue';
    let data = {};
    pool.query(sql, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            //获取商品更多类型
            let sql = 'select `id`, `name`,`catalogueId` from commodity_type';
            pool.query(sql, (err, result) => {
                data.catalogue = result;
                if (err) throw err;
                if (result.length > 0) {
                    data.type = result;
                    res.send({'code': 1, result: data});
                } else {
                    res.send({'code': 0, result: result});
                }
            });
        } else {
            res.send({'code': 0, result: result});
        }
    });
});

//根据类型获取商品列表
router.post('/list', (req, res) => {
    let data = req.body;
    console.log(req.body)
    let typeId = parseInt(data.typeId);
    //页码
    let pageCount = parseInt(data.pageCount);
    //一页显示条数
    let count = parseInt(data.count);
    if (!pageCount) {
        pageCount = 1
    }
    if (!count) {
        count = 20
    }
    let sql = 'select `id`, `typeId`,`title`, `price`, `image` from commodity where typeId=? limit ?,?';
    pool.query(sql, [typeId, (pageCount - 1) * count, pageCount * count], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({'code': 1, result: result});
        } else {
            res.send({'code': 0, result: result});
        }
    });
});

//根据商品ID 获取商品详情
router.post('/details', (req, res) => {
    let commodityId = parseInt(req.body.commodityId);
    let sql = 'select `id`, `typeId`,`title`, `price`, `image`,`details`,`realLink` from commodity where id=?';
    pool.query(sql, [commodityId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({'code': 1, result: result});
        } else {
            res.send({'code': 0, result: result});
        }
    });
});

module.exports = router;
