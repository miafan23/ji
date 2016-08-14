const EventEmitter = require('events').EventEmitter;
// const assign = require('object-assign');
import moment from 'moment';

var TasksStore = Object.assign({}, EventEmitter.prototype, {
  tasks: [{
    id: ''+moment().year()+moment().month(),
    task: 'aini',
    process: new Array(31)
  }],

  initializeTasks(tasks) {
    this.tasks = tasks;
  },

  updateTasks(tasks) {
    this.tasks = tasks;
  },

  getAllTasks() {
    return this.tasks;
  },

  addNewTaskHandler(task) {
    this.tasks.push({
      id: ''+moment().year()+moment().month(),
      task: task,
      process: new Array(31)
    });
  },

  changeTaskStatusHandler(action){
    let {taskIndex, index, status} = action;
    switch (status) {
      case 'check':
        this.tasks[taskIndex].process[index] = 'uncheck';
        break;
      case 'uncheck':
        this.tasks[taskIndex].process[index] = null;
        break;
      default:
        this.tasks[taskIndex].process[index] = 'check';
    }
  },

  preMonth(){

  },

  afterMonth(){

  },

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback)
  }
});

export default TasksStore;
