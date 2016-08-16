const React = require('react');
const $ = require('jquery');
import { Link } from 'react-router'
require('./auth.css')
import Paper from 'material-ui/Paper';
import classNames from 'classnames';
const validator = require('validator')

const Signup = React.createClass({
  getInitialState() {
    return {
      username: '',
      email: '',
      password: '',
      re_password: '',
      showUError: false,
      showPError: false,
      showEError: false,
      showUFError: false,
      showRPError: false
    };
  },
  componentDidMount() {

  },

  handleUsernameChange(e) {
    let username = e.target.value;
    if (!/^[0-9|a-z|A-Z|\_]+$/.test(username)) {
      this.setState({
        showUFError: true
      }) 
    } else {
      this.setState({
        showUFError: false
      })
    }
    this.setState({username: username});
  },

  handleEmailChange(e) {
    let email = e.target.value;
    if (!validator.isEmail(email)) {
      this.setState({
        showEError: true
      })
    } else {
      this.setState({
        showEError: false
      })
    }

    this.setState({email: email});
  },

  handlePasswordChange(e) {
    let password = e.target.value;
    if (password.length < 6) {
      this.setState({
        showPError: true
      })
    } else {
      this.setState({
        showPError: false
      })
    }
    this.setState({password: password});
  },

  handleRe_passwordChange(e) {
    let re_password = e.target.value;
    if (re_password !== this.state.password) {
      this.setState({
        showRPError: true
      })
    } else {
      this.setState({
        showRPError: false
      })
    }
    this.setState({re_password: re_password});
  },

  handleSubmit(e) {
    let self = this;
    e.preventDefault();
    $.ajax({
      url: '/api/signup',
      type: 'POST',
      data: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        re_password: this.state.re_password
      }
    })
      .done(function(data) {
        window.location.href = '/login';
      })
      .fail(function(data) {
        if (data.responseText === 'USED') {
          self.setState({
            showUError: true
          })
        }
      })
  },

  render() {
    let self = this;
    const uError = classNames({
      'error-info': true,
      'hide': !self.state.showUError
    });
    const ufError = classNames({
      'error-info': true,
      'hide': !self.state.showUFError
    });
    const pError = classNames({
      'error-info': true,
      'hide': !this.state.showPError
    });
    const rpError = classNames({
      'error-info': true,
      'hide': !this.state.showRPError
    })

    const eError = classNames({
      'error-info': true,
      'hide': !this.state.showEError
    })

    // const pError = classNames({
    //   'error-info': true,
    //   'hide': this.state.showPError
    // })

    return(
      <div className="auth">
        <h1>化道</h1>
        <p className="subtitle">每天坚持几件小事</p>
        <Paper className="auth-paper">
        <Link to="/signup" className="auth-link active">注册</Link>
        <Link to="/login" className="auth-link">登录</Link>
        <form onSubmit={this.handleSubmit} className="auth-form">
          <div>
            <label htmlFor="">用户名
              <span className={uError} >该用户名已被注册</span>
              <span className={ufError} >用户名只能由字母和数字和下划线组成</span>
            </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="用户名"
              onChange={this.handleUsernameChange} />
          </div>
          <div>
            <label htmlFor="">邮箱  <span className={eError} >邮箱格式错误</span></label>
            <input type="text"
              name="email"
              value={this.state.email}
              placeholder="邮箱"
              onChange={this.handleEmailChange}/>
          </div>
          <div>
            <label htmlFor="">密码  <span className={pError} >密码至少需要6位</span></label>
            <input type="password"
              name="password"
              value={this.state.password}
              placeholder="密码"
              onChange={this.handlePasswordChange}/>
          </div>
          <div>
            <label htmlFor="">再次输入  <span className={rpError} >两次输入不一致</span></label>
            <input type="password"
              name="re_password"
              value={this.state.re_password}
              placeholder="再次输入"
              onChange={this.handleRe_passwordChange}
              />
          </div>
          <input type="submit" className="submit-button" value="注册"/>
        </form>
        </Paper>
      </div>
    )
  }
});

module.exports = Signup;
