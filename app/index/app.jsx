const React = require('react');
const Signup = require('../auth/signup');
const Login = require('../auth/login');
const Dailytask = require('../dailytask/index');
import webAPIUtils from '../utils/webAPIUtils';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
const $ = require('jquery');

require('./index.css')
var AppCom = React.createClass({
  getInitialState() {
    return {
      user: ''
    }
  },

  componentDidMount() {
    let self = this;
    webAPIUtils.getUserTasks();
    $.ajax({
      'url': '/api/getuser',
      'type': 'GET'
    }).done((user) => {
        self.setState({
        user: user
      })
    })
  },

  handleTouchTap() {
    this.setState({
      openDrawer: true
    })
  },

  logout() {
    $.ajax({
      url: '/api/logout',
      type: 'OPTIONS'
    })
    .done(data => {
      window.location.href = '/'
    })
  },

  handleClose() {
    this.setState({
      openDrawer: false
    })
  },

  render() {
    return(
      <div className="index-wrapper">
        <AppBar
          title="化道"
          iconClassNameRight="muidocs-icon-navigation-expand-more"
          onLeftIconButtonTouchTap={this.handleTouchTap}
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.openDrawer}
          onRequestChange={(openDrawer) => this.setState({openDrawer})}
         >
          <Link to="/" className="menu">
            <MenuItem onTouchTap={this.handleClose}>
              {this.state.user}
            </MenuItem>
          </Link>
          <MenuItem onTouchTap={this.logout}>登出</MenuItem>
          <Link to="/manage" className="menu">
            <MenuItem onTouchTap={this.handleClose}>管理我的任务</MenuItem>
          </Link>
        </Drawer>

        {this.props.children}
      </div>
    )
  }
});

module.exports = AppCom;
