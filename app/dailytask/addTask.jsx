const React = require('react');
import TaskActions from '../action/TaskActions';
import WebAPIUtils from '../utils/webAPIUtils';
import classNames from 'classnames';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

require('./addtask.css');

const AddTask = React.createClass({
  getInitialState() {
    return {
      showInput: false,
      task: ''
    };
  },
  changeShowInput() {
    let self = this;
    this.setState({
      showInput: !self.state.showInput
    })
  },

  showInput() {
    this.setState({
      showInput: true
    })
  },

  hideInput() {
    this.setState({
      showInput: false
    })
  },

  addNewTask() {
    let name = this.state.task;
    if (!this.checkName(name)) return;
    // TaskActions.addNewTask(name);
    WebAPIUtils.addNewTask(name);
    this.setState({
      task: ''
    });
    this.hideInput()
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
    const actions = [
      <FlatButton
        label="取消"
        onClick={this.hideInput}
      />,

      <FlatButton
        label="提交"
        primary={true}
        onClick={this.addNewTask}
      />
    ];
    let self = this;
    let buttonClass = classNames({
      'add-button': true,
      'active': self.state.showInput
    });
    let inputClass = classNames({
      'task-input': true,
      'active': self.props.showInput
    })
    return(
      <div className="addtask">
        <FloatingActionButton onTouchTap={this.showInput} className={buttonClass}>
          <ContentAdd />
        </FloatingActionButton>
        <Dialog
          open={this.state.showInput}
          actions={actions}
        >
        <div className={inputClass}>
          <TextField
            floatingLabelText="任务名称"
            onKeyUp={this.handleKeyUp}
            onChange={this.handleTaskInput}
            value={this.state.task}
          />
        </div>
        </Dialog>
      </div>
    )
  }
});

export default AddTask;
