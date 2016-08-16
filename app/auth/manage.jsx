require('./auth.css')
import { Link } from 'react-router'
const React = require('react');
const $ = require('jquery');
import Paper from 'material-ui/Paper';
import classNames from 'classnames';
const Manage = React.createClass({
  getInitialState() {
    return {
      
    };
  },

  render() {
    let self = this;
    return(
      <div className="auth">
        <h1>化道</h1>
        <p className="subtitle">每天坚持几件小事</p>
        <Paper className="auth-paper">
        
        </Paper>
      </div>
    )
  }
});

module.exports = Manage;
