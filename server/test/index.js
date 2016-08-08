'use strict';

var app = require('koa')();
var cache = require('koa-router-cache');
var MemoryCache = cache.MemoryCache;

var count = 0;

app.use(cache(app, {
  'GET /': {
    key: 'cache:index',
    expire: 5 * 1000,
    get: MemoryCache.get,
    set: MemoryCache.set,
    passthrough: MemoryCache.passthrough,
    evtName: 'clearIndexCache',
    destroy: MemoryCache.destroy
  }
}));

app.use(function* () {
  this.body = count++;
  console.log(this.body);
  if (count === 5) {
    count = 0;
    this.app.emit('clearIndexCache');
  }
});

app.listen(3000, function () {
  console.log('listening on 3000.');
});
