const React = require('react');
import classNames from 'classnames';
import TaskActions from '../action/TaskActions';
import TasksStore from '../stores/tasks';
import WebAPIUtils from '../utils/webAPIUtils';

var task = React.createClass({
  handleClick(taskIndex, index, status, event) {
    let self = this;
    // TaskActions.changeTaskStatus(taskIndex, index, status);
    WebAPIUtils.changeTaskStatus(index, status, self.props.task._id, self.props.monthId);
  },

  render() {
    return(
      <tr>
        {this.props.days.map((day, index) => {
          let process = this.props.task.process;
          let tdClass = classNames({
            'mobile-hide': !day.isCurrentWeek,
            'process': true,
            'process-check': process[index] === 'check',
            'process-uncheck': process[index] === 'uncheck'
          });
          return <td key={''+this.props.task._id+index} className={tdClass} onTouchTap={() => this.handleClick(this.props.taskIndex, index, process[index])}></td>
        })}
      </tr>
    )
  }
});

export default task;
// <td>{ this.props.task.task }</td>
