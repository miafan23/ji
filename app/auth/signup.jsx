const React = require('react');
const $ = require('jquery');
import { Link } from 'react-router'

const Signup = React.createClass({
  getInitialState() {
    return {
      username: 'admin',
      email: 'admin@e.com',
      password: 'fdsa',
      re_password: 'fdsa'
    };
  },
  componentDidMount() {

  },

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  },

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  },

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  },

  handleRe_passwordChange(e) {
    this.setState({re_password: e.target.value});
  },

  handleSubmit(e) {
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
        windows.location.href = '/';
      })
      .fail(function(data) {
        console.log(data)
      })
    console.log('submit')
  },

  render() {
    return(
      <div>
        <h1>Sign Up</h1>
        <Link to="/login">login</Link>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleUsernameChange} />

          <label htmlFor="">email</label>
          <input type="text"
            name="email"
            value={this.state.email}
            onChange={this.handleEmailChange}/>

          <label htmlFor="">password</label>
          <input type="text"
            name="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}/>

          <label htmlFor="">password again</label>
          <input type="text"
            name="re_password"
            value={this.state.re_password}
            onChange={this.handleRe_passwordChange}
            />
          <input type="submit" />
        </form>
      </div>
    )
  }
});

module.exports = Signup;
