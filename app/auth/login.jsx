require('./auth.css')
import { Link } from 'react-router'
const React = require('react');
const $ = require('jquery');
import Paper from 'material-ui/Paper';
import classNames from 'classnames';
const Login = React.createClass({
  getInitialState() {
    return {
      username:'',
      password: '',
      showUError: false
    };
  },

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  },

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  },

  handleSubmit(e) {
    let self = this;
    e.preventDefault();
    $.ajax({
      url: '/api/login',
      type: 'POST',
      data: {
        username: this.state.username,
        password: this.state.password
      }
    })
      .done(function(data) {
        console.log('yes')
        window.location.href = '/';
      })
      .fail(function(data) {
        if (data.responseText === 'NO_USER' || data.responseText === 'PADSSWORD_ERR') {
          self.setState({
            showUError: true
          })
        } else {
          self.setState({
            showUError: false
          })
        }
      })
    console.log('submit')
  },

  render() {
    let self = this;
    const uError = classNames({
      'error-info': true,
      'hide': !self.state.showUError
    });
    return(
      <div className="auth">
        <h1>化道</h1>
        <p className="subtitle">每天坚持几件小事</p>
        <Paper className="auth-paper">
        <Link to="/signup" className="auth-link">注册</Link>
        <Link to="/login" className="auth-link active">登录</Link>
        <form onSubmit={this.handleSubmit} className="auth-form">
          <div>
            <label htmlFor="">用户名 <span className={uError} >用户名或密码错误</span></label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleUsernameChange} />
          </div>
          <div>
            <label htmlFor="">密码</label>
            <input type="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}/>
          </div>
          <input type="submit" className="submit-button" value="登录"/>
        </form>
        </Paper>
      </div>
    )
  }
});

module.exports = Login;
