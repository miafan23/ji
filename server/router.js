// const router = require('koa-router')();
'use strict'
const path = require('path');
const passport = require('passport');
const AuthController = require('./controller/auth');
const TaskController = require('./controller/task');
// const send = require('koa-send');
//
// router
//   .post('/api/signup', function* (next) {
//     console.log(this.request.body);
//     this.response.body = 'yes';
//     console.log($User);
//     $User.addUser(this.request.body)
//   })
//   // .get('*', function* () {
//   //   console.log(23)
//   //   // console.log(__dirname)
//   //   // this.body = send(this, __dirname + '/../index.html')
//   //   this.body = this.render('index');
//   // })
//
// module.exports = router;
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
  app.post('/api/addTaskMonthId', loginRequired, TaskController.addTaskMonthId);

  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '../dist/','index.html'))
  })
}


