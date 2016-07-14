import './calendar.css';
const React = require('react');
const Pikaday = require('pikaday');
const moment = require('moment');
// import Calendar from 'rc-calendar';
var CalendarPlugin = require('rc-calendar');
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
      console.log(thisDay.week(), moment().week())
      days.push({
        date: i,
        week: thisDay.day(),
        //判断是不是和今天同一周
        className: isCurrentWeek ? '' : 'mobile-hide'
      });
    }
    console.log(days)
    return {
      now,
      days,
      currentMonth
    }
  },

  componentDidMount() {
    let picker = new Pikaday({})
  },

  render() {
    return(
      <div>
        <div>{this.state.currentMonth}月</div>
        <div className="calendar-head">
          {this.state.days.map((day) => {
            return <div key={day.date} className={day.className}>{day.date}</div>
          })}
        </div>
        <div className="calendar-week">
          {this.state.days.map((day) => {
            return <div key={day.date}>{day.week}</div>
          })}
        </div>
        <div className="task">

        </div>
      </div>
    )
  }
});

module.exports = Calendar;