'use strict'
const koa = require('koa');
const app = koa();
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');
const errorhandler = require('koa-errorhandler');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo')
// const router = require('koa-router')();
const routerCache = require('koa-router-cache');
const config = require('config-lite');
const scheme = require('koa-scheme');
const send = require('koa-send');
const serve = require('koa-static');
const router = require('./router.js');
const path = require('path');
const merge = require('merge-descriptors');
const core = require('./lib/core');
// const renderConf = require(config.renderConf);
// merge(renderConf.locals || {}, core, false);

app.use(errorhandler());
app.use(bodyparser());
app.use(staticCache(config.staticCacheConf));
app.use(logger());
app.use(session({
  store: new MongoStore(config.mongodb)
}));
app.use(scheme(config.schemeConf));
app.use(routerCache(app, config.routerCacheConf));
// app.use(render(app, renderConf));
const engine = require('consolidate')
//
// const views = require('koa-render');
// app.use(views('../app'))

app
  .use(router.routes())
  .use(router.allowedMethods());

// app.use(serve('.'));
// const fs = require('fs');
// const path = require('path');
app.use(serve(__dirname + '/..'));

// var readFileThunk = function(src) {
//   return new Promise(function (resolve, reject) {
//     fs.readFile(src, {'encoding': 'utf8'}, function (err, data) {
//       if(err) return reject(err);
//       resolve(data);
//     });
//   });
// }

// app.use(function* () {
//   console.log(this.path)
//   yield send(this, this.path, {root: path.join(__dirname, '/../app')});
// })
//
// app.use(function *(){
//   yield send(this, path.join(__dirname, '/../app/','index.html' ));
// })


// app.use(function* index(){
  // console.log(readFileThunk(__dirname+'/../app/index.html'))
  // this.body = yield readFileThunk(path.join(__dirname, '/../', 'index.html'));
  // this.body = yield fs.readFile(__dirname + '/../index.html');
  // console.log(send);
  // this.body = send;
  // yield send(this, __dirname + '/../index.html');
// });

app.listen(config.port, function () {
  console.log('Server listening on: ', config.port);
});
