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
  app.options('/api/logout', loginRequired, AuthController.logout);
  app.get('/api/getuser', loginRequired, AuthController.getUser);
  
  app.post('/api/addnewtask', loginRequired, TaskController.addNewTask);
  app.get('/api/usertasks/:monthId', loginRequired, TaskController.getUserTasks);
  app.put('/api/taskstatus/:id', loginRequired, TaskController.updateStatus);
  app.get('/api/manageGetPendingTasks', loginRequired, TaskController.manageGetPendingTasks);
  app.post('/api/editTask', loginRequired, TaskController.editTask);
  app.delete('/api/deleteTask', loginRequired, TaskController.deleteTask);
  app.put('/api/finishTask', loginRequired, TaskController.finishTask);
  app.get('/api/getFinishedTasks', loginRequired, TaskController.getFinishedTasks);

  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '../dist/','index.html'))
  })
}


