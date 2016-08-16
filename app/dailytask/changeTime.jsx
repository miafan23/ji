import React from 'react';
import DaysActions from '../action/DaysActions';
import TaskActions from '../action/TaskActions';
import FlatButton from 'material-ui/FlatButton';
require('./changeTime.css')

var ChangeTime = React.createClass({
  componentDidmount() {

  },

  preWeek() {
    DaysActions.preWeek();
    console.log('??')
  },

  afterWeek() {
    DaysActions.afterWeek();
  },

  preMonth() {
    DaysActions.preMonth();
    TaskActions.preMonth();
  },

  afterMonth() {
    DaysActions.afterMonth();
    TaskActions.afterMonth();
  },

  goToday() {
    DaysActions.goToday();
  },

  render() {
    return(
      <div className="change-time">
        <div className="pc-hide">
          <FlatButton onTouchTap={this.preWeek} label="上周" className="left-week left" />
          <FlatButton onTouchTap={this.goToday} label="今天" className="left-week left" />
          <FlatButton onTouchTap={this.afterWeek} label="下周" className="right-week right" />
        </div>
        <div className="mobile-hide">
          <FlatButton onTouchTap={this.preMonth} label="上个月" className="left-month left" />
          <FlatButton onTouchTap={this.goToday} label="今天" className="left-week left" />
          <FlatButton onTouchTap={this.afterMonth} label="下个月" className="right-month right" />
        </div>
      </div>
    )
  }
})

module.exports = ChangeTime;
