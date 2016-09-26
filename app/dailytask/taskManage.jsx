import React from 'react';
import WebAPIUtils from '../utils/webAPIUtils';
import TextField from 'material-ui/TextField';
require('./TaskManage.css');

export default class TaskManage extends React.Component {
  constructor(prop) {
    super(prop)
  }
  componentWillUnmount(){
    // console.log('unmount')
  }
  render() {
    return (
      <div>
      {this.props.tasks.map((task, index) => {
        return (
          <Task task={task} key={task._id}/>
        )
      })}
      </div>
    )
  }
}

class Task extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      oldtask: this.props.task.task,
      task: this.props.task.task,
      id: this.props.task.id
    }
    this.saveTask = this.saveTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.finishTask = this.finishTask.bind(this);
  }

  handleChange(e) {
    this.setState({
      task: e.target.value
    })
  }

  saveTask() {
    let oldtask = this.state.oldtask;
    let newtask = this.state.task;
    WebAPIUtils.saveTask(oldtask, newtask);
  }

  deleteTask() {
    let id = this.props.task.id;
    WebAPIUtils.deleteTask(id);
  }

  finishTask() {
    let id = this.props.task.id;
    WebAPIUtils.finishTask(id);
  }

  render() {
    return (
      <div className="TaskManage-wrapper">
        <TextField
          type="text" 
          onChange={this.handleChange}
          value={this.state.task}
          name="taskname"
        />
        <button onClick={this.saveTask}>保存</button>
        <button onClick={this.finishTask}>完成</button>
        <button onClick={this.deleteTask}>删除</button>
      </div>
    )
  }
}
