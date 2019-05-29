function getType(param) {
  if (/^\d{10}$/.test(param)) {
    return 'username';
  } else if (/^1[34578]\d{9}$/.test(param)) {
    return 'phone';
  } else if (/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(param)) {
    return 'card';
  } else if (/^(?:[a-zA-Z0-9]+[_\-\+\.]?)*[a-zA-Z0-9]+@(?:([a-zA-Z0-9]+[_\-]?)*[a-zA-Z0-9]+\.)+([a-zA-Z]{2,})+$/.test(param)) {
    return 'email';
  } else {
    return 'error';
  }
}

//登录格式验证
function validateLogin(data) {
  let msg;
  let username;
  let password;
  let type;
  if (data) {
    username = data.username;
    type = getType(username);
    password = data.password;
    if (type !== 'error') {
      if (password) {
        msg = 'success';
      } else {
        msg = '密码格式不正确';
      }
    } else {
      msg = '用户名格式不正确';
    }
    return {'msg': msg, 'type': type, 'username': username, 'password': password};
  } else {
    msg = '数据为空';
  }
  return {'msg': msg};
}

//注册格式验证
function validateRegister(data) {
  let msg;
  let username;
  let password;
  let type;
  let typeValue;
  if (data) {
    username = getUsername();
    typeValue = data.username;
    type = getType(typeValue);
    password = data.password;
    if (type !== 'error') {
      if (password && password.length >=8) {
        msg = 'success';
      } else {
        msg = '密码格式不正确';
      }
    } else {
      msg = '用户名格式不正确';
    }
    return {'msg': msg, 'type': type, 'typeValue': typeValue, 'username': username, 'password': password};
  } else {
    msg = '数据为空';
  }
  return {'msg': msg};
}

function getUsername() {
  let username = Math.floor(Math.random() * 9 + 1).toString();
  do {
    username += Math.floor(Math.random() * 10);
  } while (username.length < 10);
  return username;
}

module.exports = {
  'validateLogin': validateLogin,
  'validateRegister': validateRegister,
  'getType':getType
};