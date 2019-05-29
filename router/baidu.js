const request = require('request');

// https://openapi.baidu.com/oauth/2.0/token?
// grant_type=client_credentials
// &client_id=Vuw6xwkTUNm0ML1qBHlvRSON
// &client_secret=LhYa9fG3WErtda1IO5Q4AvHmivbYI2BN
// 定义Promise函数
function post(opts) {
    return new Promise((resolve, reject) => {
        request.post(opts, function (err, response, body) {
            if (!err && response.statusCode === 200) {
                if (body !== 'null') {
                    let result = JSON.parse(body);
                    resolve(result);
                }
            }
        });
    });
}

async function getBaiduToken() {
    return await post({
        url: "https://openapi.baidu.com/oauth/2.0/token",
        form: {
            grant_type: 'client_credentials',
            client_id: 'Vuw6xwkTUNm0ML1qBHlvRSON',
            client_secret: 'LhYa9fG3WErtda1IO5Q4AvHmivbYI2BN'
        }
    });
}
module.exports = {getBaiduToken};