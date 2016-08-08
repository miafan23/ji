const Models = require('../lib/core');
const $User = Models.$User;

exports.post = function* () {
  const data = this.request.body;

  yield $User.addUser(data);

  this.session.user = {
    name: data.name
  }
}
