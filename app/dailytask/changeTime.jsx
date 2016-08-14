import React from 'react';
import DaysActions from '../action/DaysActions';
import TaskActions from '../action/TaskActions';

var ChangeTime = React.createClass({
  componentDidmount() {

  },

  preWeek() {
    DaysActions.preWeek();
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

  render() {
    return(
      <div>
        <div className="pc-hide">
          <button onClick={this.preWeek}> left </button>
          <button onClick={this.afterWeek}> right </button>
        </div>
        <div className="mobile-hide">
          <button onClick={this.preMonth}> leftm </button>
          <button onClick={this.afterMonth}> rightm </button>
        </div>
      </div>
    )
  }
})

module.exports = ChangeTime;
