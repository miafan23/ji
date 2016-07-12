const React = require('react');
const Calendar = require('./monthcalendar');


var Dailytask = React.createClass({
  render() {
    return(
      <div>
        <h1>daily task</h1>
        <Calendar></Calendar>
      </div>
    )
  }
});

module.exports = Dailytask;
// export default Dailytask;