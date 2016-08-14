const React = require('react');
import TaskActions from '../action/TaskActions';
import WebAPIUtils from '../utils/webAPIUtils';

const AddTask = React.createClass({
  getInitialState() {
    return {
      showInput: false,
    };
  },
  changeShowInput() {
    let self = this;
    this.setState({
      showInput: !self.state.showInput
    })
  },

  render() {
    return(
      <div>
        <button onClick={this.changeShowInput}>add</button>
        {this.state.showInput ? <InputTask /> : null }
      </div>
    )
  }
});

const InputTask = React.createClass({
  getInitialState() {
    return {
      task: ''
    };
  },

  addNewTask() {
    let name = this.state.task;
    if (!this.checkName(name)) return;
    // TaskActions.addNewTask(name);
    WebAPIUtils.addNewTask(name);
    this.setState({
      task: ''
    })
  },

  checkName(name) {
    return true;
  },

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      this.addNewTask();
    }
  },

  handleTaskInput(e){
    this.setState({task: e.target.value});
  },

  render() {
    return (
      <div>
        <input type="text" onKeyUp={this.handleKeyUp} onChange={this.handleTaskInput} value={this.state.task}/>
        <button onClick={this.addNewTask}>save</button>
      </div>
    )
  }
})

export default AddTask;
