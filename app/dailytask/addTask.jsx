const React = require('react');
import TaskActions from '../action/TaskActions';

const AddTask = React.createClass({
  showInput() {
    //showinput
  },

  hideInput() {
    console.log('fef')
  },

  addNewTask(name) {
    console.log(name);
    if (!this.checkName(name)) return;
    TaskActions.addNewTask(name);
    this.hideInput();
  },

  checkName(name) {
    return true;
  },

  handleKeyUp(event) {
    if (event.keyCode === 13) {
      let taskName = event.target.value;
      this.addNewTask(taskName);
    }
  },
  
  render() {
    return(
      <div>
        <button onClick={this.showInput}>add</button>
        <input type="text" onKeyUp={this.handleKeyUp}/>
      </div>
    )
  }
});

export default AddTask;