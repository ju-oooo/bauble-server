const express = require('express');
const userTool = require('../tool/userTool')
const pool = require('../pool')

let router = express.Router();
//登录
router.post('/login', (req, res) => {
    //参数 username password
    let data = req.body;
    //验证数据是否正确
    data = userTool.validateLogin(data);
    if (data.msg === 'success') {
        let sql = `select * from user where ${data.type}=? and password=?`;
        pool.query(sql, [data.username, data.password], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.send({code: 200,msg: '登陆成功'})
            } else {
                res.send({code: 500,msg: '账号或密码错误'})
            }
        })
    } else {
        res.send({code: 500,msg: data.msg})
    }
});
//注册
router.post('/register', (req, res) => {
    //参数 username password
    let data = req.body;
    //验证数据是否正确
    data = userTool.validateRegister(data);
    if (data.msg === 'success') {
        let sql = `insert into user (username,password,${data.type})value(?,?,?)`;
        pool.query(sql, [data.username, data.password, data.typeValue], (err, result) => {
            try {
                if (result.affectedRows > 0) {
                    res.send({code: 200, msg: '注册成功'})
                } else {
                    res.send({code: 201, msg: '注册失败'})
                }
            } catch (err) {
                res.send({code: 500, msg: '服务器内部错误'})
            }
        })
    } else {
        res.send({code: 500, msg: '服务器内部错误'})
    }


});
//验证用户名是否存在
router.post('/findUsername', (req, res) => {
    let data = req.body;
    let username = data.username;
    let type = userTool.getType(username);
    if (type !== 'error') {
        let sql = `select * from user where ${type}=?`;
        pool.query(sql, [username], (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.send({code: 200});
            } else {
                res.send({code: 500});
            }
        });
    } else {
        res.send({code: 500});
    }
});


module.exports = router;