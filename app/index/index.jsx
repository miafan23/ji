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
        {this.state.isLogin ?  <Dailytask /> : <Signup />}
      </div>
    )
  }
});

module.exports = Index;
