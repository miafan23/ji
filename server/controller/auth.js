// const Models = require('../lib/core');
// const $User = Models.$User;
'use strict'
const validator = require('validator');
const crypto = require('crypto');

const UserModel = require('../models').User;

exports.signup = function(req, res) {
  let body = checkSignupBody(req);
  if(!body){
    return res.throw(400, 'error')
  };
  UserModel.create(req.body);
}

exports.login = function(req, res) {
  let username = req.body.username;
  let password = md5(validator.trim(req.body.password));

  UserModel.findOne({username: username})
    .exec((err, user) => {
      if (err) return console.log(err);
      if (!user) return console.log('no user');
      if(password !== user.password) {
        return console.log('password err')
      }
      req.session.user = username;
      res.redirect('/');
      console.log(req.session, 'eee');
    });
}

exports.checkLogin = function(req, res) {
  console.log(req.session);
  if (req.session.user) {
    res.send('logged');
  } else {
    res.send('unlog');
  }
}

function md5 (str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

function checkSignupBody(req) {
  console.log('sessionnnnnnn')
  var body = req.body;
  var flash;
  if (!body || !body.username) {
    flash = {error: '请填写用户名!'};
  }
  else if (!body.email || !validator.isEmail(body.email)) {
    flash = {error: '请填写正确邮箱地址!'};
  }
  else if (!body.password) {
    flash = {error: '请填写密码!'};
  }
  else if (body.password !== body.re_password) {
    flash = {error: '两次密码不匹配!'};
  }

  if (flash) {
    this.flash = flash;
    return false;
  }
  body.username = validator.trim(body.username);
  body.email = validator.trim(body.email);
  body.password = md5(validator.trim(body.password));
  return body;
}
// exports.getUserByName = ;
