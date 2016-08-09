const router = require('koa-router')();
const Models = require('./lib/core');
const $User = Models.$User;
const send = require('koa-send');

router
  .post('/api/signup', function* (next) {
    console.log(this.request.body);
    this.response.body = 'yes';
    console.log($User);
    $User.addUser(this.request.body)
  })
  // .get('*', function* () {
  //   console.log(23)
  //   // console.log(__dirname)
  //   // this.body = send(this, __dirname + '/../index.html')
  //   this.body = this.render('index');
  // })

module.exports = router;
