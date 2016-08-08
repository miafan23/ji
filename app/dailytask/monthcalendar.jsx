import './calendar.css';
const React = require('react');
const Pikaday = require('pikaday');
const moment = require('moment');
// import Calendar from 'rc-calendar';
var CalendarPlugin = require('rc-calendar');
import Task from './task';

var Calendar = React.createClass({
  getInitialState() {
    let now = moment();
    //这个月有多少天
    let dayNum = now.endOf('month').date();
    let currentMonth = now.month()+1;
    // let currentWeek = now.week();
    let days = [];

    for (let i = 1; i <= dayNum; i++) {
      let thisDay = moment().date(i);
      let isCurrentWeek = thisDay.week() === moment().week() && thisDay.year() === moment().year();
      days.push({
        date: i,
        week: thisDay.day(),
        //判断是不是和今天同一周
        className: isCurrentWeek ? '' : 'mobile-hide'
      });
    }

    return {
      now,
      days,
      currentMonth,
      tasks: [{name: '1'},{name: '2'}]
    }
  },

  componentDidMount() {
    let picker = new Pikaday({});
    this.setState({
      tasks: [{name: '1'},{name: '2'}]
    })
  },

  render() {
    return(
      <table className="calendar">
        <tbody>
        <tr>
          <th>{this.state.currentMonth}月</th>
          {this.state.days.map((day) => {
            return <th key={day.date} className={day.className}>{day.date}</th>
          })}
        </tr>
        {this.state.tasks.map((task, index) => {
          let days = this.state.days;
          let props={
            task,
            days
          }
          return <Task key={index} { ...props }/>
        })}
        </tbody>
      </table>
    )
  }
});

module.exports = Calendar;
// {this.state.days.map((day) => {
//   return <div key={day.date} className={day.className}>{day.week}</div>
// })}
//
//        <Tasks {...this.state.days}/>

