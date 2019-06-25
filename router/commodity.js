// 商品
const express = require('express');
const pool = require('../pool');
const pagingTool = require('../tool/pagingTool');
const router = express.Router();


//获取商品总类型
router.post('/type', (req, res) => {
    let sql = 'select `id`, `name` from commodity_catalogue';
    let data = {};
    try {
        pool.query(sql, (err, result) => {
            if (result.length > 0) {
                //获取商品更多类型
                data.catalogue = result;
                let sql = 'select `id`, `name`,`catalogueId` from commodity_type';
                pool.query(sql, (err, result) => {
                    if (result.length > 0) {
                        data.type = result;
                        res.send({'code': 200, result: data});
                    }
                });
            }
        });
    } catch (e) {
        res.send({code: 500, msg: '服务器内部错误'})
    }
});

/**
 * 随机商品列表 or 根据多个类型获取商品列表
 * 参数 count 一页显示的条数 pageNum 页码
 */

router.post('/', (req, res) => {
    let data = req.body;
    let typeId = data.typeId;
    let sql;
    if (!typeId) {
        sql = 'select `id`, `typeId`,`title`, `price`, `image` from commodity ORDER BY RAND() limit ?,?';
    } else {
        sql = 'select `id`, `typeId`,`title`, `price`, `image` from commodity where typeId in (' + typeId + ') ORDER BY RAND() limit ?,?';
    }
    let pageParam = pagingTool(data.count, data.pageNum, 20);
    try {
        pool.query(sql, [pageParam.start, pageParam.end], (err, result) => {
            if (result.length > 0) {
                res.send({'code': 200, result: result});
            } else {
                res.send({'code': 404, msg: "暂无此数据"});
            }
        });
    } catch (e) {
        res.send({code: 500, msg: '服务器内部错误'})
    }
});


//根据商品ID 获取商品详情
router.post('/details', (req, res) => {
    let data = req.body;
    let commodityId = parseInt(data.commodityId);
    let sendData = {};
    let sql = 'select `id`, `typeId`,`title`, `price`, `image`,`details`,`realLink` from commodity where id=?';
    try {
        pool.query(sql, [commodityId], (err, result) => {
            if (result.length > 0) {
                sendData.details = result[0];
                sql = 'select `id`, `typeId`,`title`, `price`, `image` from commodity where typeId in (?) ORDER BY RAND() limit 0,4';
                try {
                    pool.query(sql, [sendData.details.typeId], (err, result) => {
                        if (result.length > 0) {
                            sendData.hotCommodityList = result;
                            res.send({
                                code: 200,
                                details: sendData.details,
                                hotCommodityList: sendData.hotCommodityList
                            });
                        }
                    });
                } catch (e) {
                    res.send({code: 500, msg: '服务器内部错误'});
                }
            }
        });
    } catch (e) {
        res.send({code: 500, msg: '服务器内部错误'});
    }
});

//根据session中的userId获取购物车列表
router.post('/shoppingCart', (req, res) => {
    let data = req.body;
    let commodityId = parseInt(data.commodityId);
    let sendData = {};
    let sql = 'select `id`, `typeId`,`title`, `price`, `image`,`details`,`realLink` from commodity where id=?';
    try {
        pool.query(sql, [commodityId], (err, result) => {
            if (result.length > 0) {
                sendData.details = result[0];
                sql = 'select `id`, `typeId`,`title`, `price`, `image` from commodity where typeId = ? ORDER BY RAND() limit 0,4';
                try {
                    pool.query(sql, [sendData.details.typeId], (err, result) => {
                        if (result.length > 0) {
                            sendData.hotCommodityList = result;
                            res.send({
                                'code': 200,
                                details: sendData.details,
                                hotCommodityList: sendData.hotCommodityList
                            });
                        }
                    });
                } catch (e) {
                    res.send({code: 500, msg: '服务器内部错误'});
                }
            }
        });
    } catch (e) {
        res.send({code: 500, msg: '服务器内部错误'});
    }
})
module.exports = router;
