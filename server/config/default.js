const path = require('path');
const cache = require('koa-router-cache');
const MemoryCache = cache.MemoryCache;

module.exports =  {
  port: process.env.PORT || 3000,
  mongodb: {
    url: 'mongodb://127.0.0.1:27017/ji'
  },
  schemeConf: path.join(__dirname, './default.scheme'),
  // staticCacheConf: path.join(__dirname, )
  routerConf: 'routes',
  routerCacheConf: {
    '/': {
      key: 'cache:index',
      expire: 10 * 1000,
      get: MemoryCache.get,
      set: MemoryCache.set,
      passthrough: MemoryCache.passthrough,
      // evtName: 'clearIndexCache',
      // destroy: MemoryCache.destroy
      condition: function() {
        return !this.session || !this.session.user;
      }
    }
  }
}
