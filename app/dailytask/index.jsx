const React = require('react');
const Calendar = require('./monthcalendar');
import AddTask from './addTask'
import ChangeTime from './changeTime';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Paper from 'material-ui/Paper';
import TaskManage from './taskManage';
import ContentEdit from 'material-ui/svg-icons/editor/mode-edit';

var Dailytask = React.createClass({
  getInitialState() {
    return {
      showEdit: false
    }
  },

  changeShowEdit() {
    this.setState({
      showEdit: !this.state.showEdit
    })
  },

  render() {
    return(
    <Paper className="calendar-paper">
      <div>
        <ChangeTime />
        <ContentEdit onClick={this.changeShowEdit}/>
        {this.state.showEdit ? <TaskManage tasks={this.props.tasks} /> : null}
        {this.state.showEdit ? null : 
          <Calendar 
            tasks={this.props.tasks} 
            days={this.props.days} 
            monthId={this.props.monthId}>
          </Calendar>
        }
        <AddTask></AddTask>
      </div>
     </Paper>
    )
  }
});

module.exports = Dailytask;