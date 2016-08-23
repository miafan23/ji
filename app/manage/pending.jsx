import { Link } from 'react-router'
const React = require('react');
const $ = require('jquery');
import Paper from 'material-ui/Paper';
import classNames from 'classnames';
import webAPIUtils from '../utils/webAPIUtils';

const Manage = React.createClass({
  getInitialState() {
    console.log('xpending')
    return {
      tasks: []
    };
  },

  componentDidMount() {
    webAPIUtils.manageGetPendingTasks();
  },

  render() {
    let self = this;
    return(
      <div className="">
        <h2>pending</h2>
      </div>
    )
  }
});

module.exports = Manage;
