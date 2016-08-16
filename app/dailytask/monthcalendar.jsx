import './calendar.css';
const React = require('react');
const Pikaday = require('pikaday');
const moment = require('moment');
// import Calendar from 'rc-calendar';
var CalendarPlugin = require('rc-calendar');
import classNames from 'classnames';
import Task from './task';
import TasksStore from '../stores/tasks';
import DaysStore from '../stores/days';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

var Calendar = React.createClass({
  getInitialState() {
    return{}
  },

  render() {
    return(
      <div className="calendar-wrapper">
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
