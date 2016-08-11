// const router = require('koa-router')();

const path = require('path');
const passport = require('passport');
const AuthController = require('./controller/auth');
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
module.exports = function(app) {

  app.post('/api/signup', AuthController.signup);

  app.post('/api/login', AuthController.login);
  app.post('/api/checkLogin', AuthController.checkLogin);

  app.get('*', function (request, response){
    response.sendFile(path.resolve(__dirname, '../dist/','index.html'))
  })
}
