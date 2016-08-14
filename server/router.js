// const router = require('koa-router')();
'use strict'
const path = require('path');
const passport = require('passport');
const AuthController = require('./controller/auth');
const TaskController = require('./controller/task');

function loginRequired(req, res, next) {
  let user = req.session.user;
  if (!user) {
    return res.status(403).send({message: 'USER_LOGIN_NEEDED'});
  }
  next();
}

module.exports = function(app) {

  app.post('/api/signup', AuthController.signup);

  app.post('/api/login', AuthController.login);
  app.post('/api/checkLogin', AuthController.checkLogin);
  app.post('/api/addnewtask', loginRequired, TaskController.addNewTask);
  app.get('/api/usertasks/:monthId', loginRequired, TaskController.getUserTasks);
  app.put('/api/taskstatus/:id', loginRequired, TaskController.updateStatus);

  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '../dist/','index.html'))
  })
}


