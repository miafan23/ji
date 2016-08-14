const React = require('react');
const $ = require('jquery');
const Register = React.createClass({
  getInitialState() {
    return {
      username:'',
      password: ''
    };
  },

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  },

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  },

  handleSubmit(e) {
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
        console.log(data)
      })
    console.log('submit')
  },

  render() {
    return(
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="">username</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleUsernameChange} />

            <label htmlFor="">password</label>
            <input type="password"
              name="password"
              value={this.state.password}
              onChange={this.handlePasswordChange}/>
            <input type="submit" />
        </form>
      </div>
    )
  }
});

module.exports = Register;
