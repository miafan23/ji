import { Link } from 'react-router'
const React = require('react');
const $ = require('jquery');
import Paper from 'material-ui/Paper';
import classNames from 'classnames';
import TasksStore from '../stores/tasks';

export default class FinishedTasks extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      finishedTasks: TasksStore.getFinishedTasks()
    }
    this._onChange = this._onChange.bind(this);
  }

  componentDidMount() {
    let self = this;
    TasksStore.addChangeListener(this._onChange);
  }

  _onChange() {
    this.setState({
      finishedTasks: TasksStore.getFinishedTasks()
    })
  }

  render() {
    let self = this;
    return(
      <div className="">
        <h2>你已经完成的任务</h2>
        {this.state.finishedTasks.map((task) => {
          return <div key={task._id}>{task.value.task}</div>
        })}
      </div>
    )
  }
};

// module.exports = Manage;
