const React = require('react');
const Calendar = require('./monthcalendar');
import AddTask from './addTask'
import ChangeTime from './changeTime';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';

var Dailytask = React.createClass({

  render() {
    return(
    <Paper className="calendar-paper">
      <div>
        <ChangeTime />

        <Calendar tasks={this.props.tasks} days={this.props.days} monthId={this.props.monthId}></Calendar>
        <AddTask></AddTask>
      </div>
     </Paper>
    )
  }
});

module.exports = Dailytask;