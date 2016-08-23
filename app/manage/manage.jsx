require('./manage.css')
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
        <Paper className="paper">
          <Link to="/manage">正在进行的任务</Link>
          <Link to="/manage/finished">已完成的任务</Link>
          {this.props.children}
        </Paper>
      </div>
    )
  }
});

module.exports = Manage;
