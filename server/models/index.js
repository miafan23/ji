var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var config = require('config-lite').mongodb;

mongoose.connect(config.url, function (err) {
  if (err) {
    console.error('connect to %s error: ', config.url, err.message);
    process.exit(1);
  }
});

exports.User = require('./user');
exports.Task = require('./task');
