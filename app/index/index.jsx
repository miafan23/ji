const React = require('react');
const Signup = require('../auth/signup');
const Login = require('../auth/login');
const Dailytask = require('../dailytask/index');
import TasksStore from '../stores/tasks';
import DaysStore from '../stores/days';
import webAPIUtils from '../utils/webAPIUtils';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { Link } from 'react-router';
const $ = require('jquery');
// import IconButton from 'material-ui/IconButton';
// import NavigationMenu from 'material-ui/svg-icons/navigation/menu';

require('./index.css')
var Index = React.createClass({
  getInitialState() {
    return {
      isLogin: false,
      tasks: TasksStore.getAllTasks(),
      days: DaysStore.getDays(),
      monthId: DaysStore.getMonthId(),
      openDrawer: false,
      user: ''
    }
  },

  componentDidMount() {
    let self = this;
    TasksStore.addChangeListener(this._onChange);
    DaysStore.addChangeListener(this._onChangeDays);
    webAPIUtils.getUserTasks();
    $.ajax({
      'url': '/getuser',
      'type': 'GET'
    }).done(user => {
      self.setState({
        user: user
      })
    })
  },

  _onChange() {
    this.setState({
      tasks: TasksStore.getAllTasks()
    })
  },

  _onChangeDays(monthId) {
    this.setState({
      days: DaysStore.getDays(),
      monthId: monthId
    });
    webAPIUtils.getUserTasksByMonthId(monthId)
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

          <MenuItem>{this.state.user}</MenuItem>
          <MenuItem onTouchTap={this.logout}>登出</MenuItem>
          <MenuItem><Link to="/manage" className="manage-menu">管理我的任务</Link></MenuItem>
        </Drawer>

        <Dailytask
          tasks={this.state.tasks}
          days={this.state.days}
          monthId={this.state.monthId}
          user={this.state.user}
        />
      </div>
    )
  }
});

module.exports = Index;
