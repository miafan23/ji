const React = require('react');

const Register = React.createClass({
  render() {
    return(
      <div>
        <h1>Register</h1>
        <form onSubmit="">
          <label htmlFor="">username</label>
          <input type="text"/>
          <label htmlFor="">email</label>
          <input type="text"/>
          <label htmlFor="">password</label>
          <input type="text"/>
        </form>
      </div>
    )
  }
});

module.exports = Register;