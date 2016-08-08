'use strict'
const koa = require('koa');
const app = koa();
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');
const errorhandler = require('koa-errorhandler');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo')
const router = require('koa-frouter');
const routerCache = require('koa-router-cache');
const config = require('config-lite');
const scheme = require('koa-scheme');
const send = require('koa-send');
const serve = require('koa-static');
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
app.use(router(app, config.routerConf));

app.use(serve('.'));
app.use(serve(__dirname + '/..'));
app.listen(config.port, function () {
  console.log('Server listening on: ', config.port);
});
