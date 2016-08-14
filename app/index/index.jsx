const React = require('react');
const Signup = require('../auth/signup');
const Login = require('../auth/login');
const Dailytask = require('../dailytask/index');
import TasksStore from '../stores/tasks';
import DaysStore from '../stores/days';
import webAPIUtils from '../utils/webAPIUtils';

var Index = React.createClass({
  getInitialState() {
    return {
      isLogin: false,
      tasks: TasksStore.getAllTasks(),
      days: DaysStore.getDays(),
      monthId: DaysStore.getMonthId()
    }
  },

  componentDidMount() {
    TasksStore.addChangeListener(this._onChange);
    DaysStore.addChangeListener(this._onChangeDays);
    webAPIUtils.getUserTasks();
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

  render() {
    return(
      <div>
        <h1>ji</h1>
        <Dailytask tasks={this.state.tasks} days={this.state.days} monthId={this.state.monthId}/>
      </div>
    )
  }
});

module.exports = Index;
