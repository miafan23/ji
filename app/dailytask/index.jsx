const React = require('react');
const Calendar = require('./monthcalendar');
import AddTask from './addTask'

var Dailytask = React.createClass({

  render() {
    return(
      <div>
        <h1>daily task</h1>
        <Calendar></Calendar>
        <AddTask></AddTask>
      </div>
    )
  }
});

module.exports = Dailytask;
// export default Dailytask;