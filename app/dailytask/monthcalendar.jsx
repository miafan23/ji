import './calendar.css';
const React = require('react');
const Pikaday = require('pikaday');
const moment = require('moment');
// import Calendar from 'rc-calendar';
var CalendarPlugin = require('rc-calendar');
import classNames from 'classnames';
import Task from './task';
import TasksStore from '../stores/tasks';
import ChangeTime from './changeTime';
import DaysStore from '../stores/days';
var Calendar = React.createClass({
  getInitialState() {
    return{}
  },

  render() {
    return(
      <div className="calendar-wrapper">
        <ChangeTime />
        <ul className="tasks-name">
          {this.props.tasks.map((task,index) => {
            return <li key={index}>{task.task}</li>
          })}
        </ul>
        <table className="calendar-table">
          <tbody>
          <tr>
            {this.props.days.map((day) => {
              return <th key={day.date} className={classNames({'mobile-hide': !day.isCurrentWeek})}>{day.date}</th>
            })}
          </tr>
          {this.props.tasks.map((task, index) => {
            let days = this.props.days;
            let monthId = this.props.monthId;
            let props={
              task,
              days,
              monthId,
              taskIndex: index
            }
            return <Task key={index} { ...props }/>
          })}
          </tbody>
        </table>
      </div>
    )
  }
});

module.exports = Calendar;
  // <th>{this.state.currentMonth}月</th>
// {this.state.days.map((day) => {
//   return <div key={day.date} className={day.className}>{day.week}</div>
// })}
//
//        <Tasks {...this.state.days}/>
