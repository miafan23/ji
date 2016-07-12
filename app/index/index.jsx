const React = require('react');
const Register = require('../auth/register');
const Login = require('../auth/login');
const Dailytask = require('../dailytask/index');

var Index = React.createClass({
  getInitialState() {
    return {
      isLogin: true
    }
  },

  render() {
    return(
      <div>
        {this.state.isLogin ?  <Dailytask /> : <Register />}
      </div>
    )
  }
});

module.exports = Index;