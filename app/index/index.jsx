const React = require('react');
const Signup = require('../auth/signup');
const Login = require('../auth/login');
const Dailytask = require('../dailytask/index');

var Index = React.createClass({
  getInitialState() {
    return {
      isLogin: false
    }
  },

  render() {
    return(
      <div>
        <h1>ji</h1>
        <Dailytask />
      </div>
    )
  }
});

module.exports = Index;
