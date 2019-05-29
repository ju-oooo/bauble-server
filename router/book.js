const express = require('express');
const pool = require('../pool');
const {getBaiduToken} = require('./baidu');
const router = express.Router();

/**
 * 获取书籍排行列表  目前仅随机抽取数据
 * count 获取条数
 * 测试url http://localhost:3333/book/rankBook
 */
router.post('/rankBook', (req, res) => {
    let data = req.body;
    let count = parseInt(data.count);
    if (isNaN(count) || count < 5) {
        count = 100;
    }
    let sql = 'select b.id,b.bookName,b.author,b.numberWord,t.name type from book b  join book_type t where t.id = b.typeId order by rand() limit 0,?';
    pool.query(sql, [count], (err, result) => {
        if (err) throw  err;
        if (result.length > 0) {
            res.send({code: 200, bookList: result})
        } else {
            res.send({code: 500, msg: '服务器内部错误'})
        }
    });
});

/**
 * 获取书籍列表  目前仅随机抽取数据
 * count 获取条数
 * 测试url http://localhost:3333/book/hotBook
 */
router.post('/hotBook', (req, res) => {
    let data = req.body;
    let count = parseInt(data.count);
    if (isNaN(count) || count < 5) {
        count = 20;
    }
    let sql = 'select * from book order by rand() limit 0,?';
    pool.query(sql, [count], (err, result) => {
        if (err) throw  err;
        if (result.length > 0) {
            res.send({code: 200, bookList: result})
        } else {
            // res.redirect()//进行重定向
            res.send({code: 500, msg: '服务器内部错误'})
        }
    });
});
/**
 * 获取书籍类型列表
 * 测试url http://localhost:3333/book/type
 */
router.post('/type', (req, res) => {
    let sql = 'select * from book_type';
    pool.query(sql, (err, result) => {
        if (err) throw  err;
        if (result.length > 0) {
            res.send({code: 200, typeList: result})
        } else {
            // res.redirect()//进行重定向
            res.send({code: 500, msg: '服务器内部错误'})
        }
    });
});

/**
 * 获取书籍列表  目前仅随机抽取数据
 * type 类型
 * pageNum 页数
 * count 一页显示总数
 * 测试url http://localhost:3333/book/list
 */
router.post('/list', (req, res) => {
    let data = req.body;
    let pageNum = parseInt(data.pageNum);
    let count = parseInt(data.count);
    let type = parseInt(data.type);
    if (isNaN(type) | isNaN(count) | count < 3 | isNaN(pageNum) | pageNum < 0) {
        count = 20;
        pageNum = 0;
        type = 11;
    }
    let sql = 'select * from book where typeId=? order by rand() limit ?,?';
    pool.query(sql, [type, pageNum, count], (err, result) => {
        // console.log(result)
        if (err) throw  err;
        if (result.length > 0) {
            res.send({code: 200, bookList: result})
        } else if (result.length === 0) {
            res.send({code: 201, msg: "暂无此类书籍"})
        } else {
            // res.redirect()//进行重定向
            res.send({code: 500, msg: '服务器内部错误'})
        }
    });
});

/**
 * 获取书籍详细信息
 * bookId 书籍编号
 * 测试url http://localhost:3333/book/detail
 */
router.post('/detail', (req, res) => {
    let data = req.body;
    let bookId = data.bookId;
    let sql = 'select * from book where id=?';
    pool.query(sql, [bookId], (err, result) => {
        // console.log(result)
        if (err) throw err;
        if (result.length > 0) {
            res.send({code: 200, book: result[0]})
        } else {
            // res.redirect()//进行重定向
            res.send({code: 500, msg: '服务器内部错误'})
        }
    });
});

/**
 * 获取章节目录
 * bookId 书籍编号
 * 测试url http://localhost:3333/book/chapterList
 */
router.post('/chapterList', (req, res) => {
    let data = req.body;
    let bookId = data.bookId;
    let sql = 'select bc.id,bc.bookId,b.bookName,bc.chapterNum,bc.chapterName from book b  join book_content bc on bc.bookId = b.id where bc.bookId =?';
    pool.query(sql, [bookId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({code: 200, chapterList: result})
        } else {
            // res.redirect()//进行重定向
            res.send({code: 500, msg: '服务器内部错误'})
        }
    });
});
/**
 * 获取章节内容
 * chapterId 根据章节
 * 测试url http://localhost:3333/book/chapter
 */
router.post('/chapter', (req, res) => {
    let data = req.body;
    let chapterId = data.chapterId;
    let sql = 'select id,chapterName,content from book_content where id=?';
    pool.query(sql, [chapterId], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            getBaiduToken().then(function (data) {
                res.send({code: 200, bookChapter: result[0],audioTok:data.access_token});
            });
        } else {
            // res.redirect()//进行重定向
            res.send({code: 500, msg: '服务器内部错误'})
        }
    })
});


module.exports = router;