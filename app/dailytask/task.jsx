const React = require('react');
import classNames from 'classnames';
import TaskActions from '../action/TaskActions';
import TasksStore from '../stores/tasks';

var task = React.createClass({
  handleClick(taskIndex, index, status, event) {
    TaskActions.changeTaskStatus(taskIndex, index, status);
  },

  render() {
    return(
      <tr>
        <td>{ this.props.task.task }</td>
        {this.props.days.map((day, index) => {
          let process = this.props.task.process;
          let tdClass = classNames({
            'mobile-hide': !day.isCurrentWeek,
            'process': true,
            'process-check': process[index] === 'check',
            'process-uncheck': process[index] === 'uncheck'
          });
          return <td key={index} className={tdClass} onClick={() => this.handleClick(this.props.taskIndex, index, process[index])}></td>
        })}
      </tr>
    )
  }
});

export default task;
