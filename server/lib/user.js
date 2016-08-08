const User = require('../models').User;

exports.addUser = function(data) {
  return User.create(data);
}
