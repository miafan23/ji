const EventEmitter = require('events').EventEmitter;
import moment from 'moment';

var TasksStore = Object.assign({}, EventEmitter.prototype, {
  tasks: [{
    id: ''+moment().year()+moment().month(),
    task: 'aini',
    process: new Array(31)
  }],

  finishedTasks: [],

  initializeTasks(tasks) {
    this.tasks = tasks;
  },

  updateTasks(tasks) {
    this.tasks = tasks;
  },

  getAllTasks() {
    return this.tasks;
  },

  getFinishedTasks() {
    return this.finishedTasks;
  },

  updateFinishedTasks(finishedTasks) {
    console.log(finishedTasks, "updateTasks");
    this.finishedTasks = finishedTasks;
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
    this.emit('taskschange');
  },

  addChangeListener(callback) {
    this.on('taskschange', callback)
  },

  removeChangeListener(e, callback) {
    this.removeListener(e, callback);
  }
});

export default TasksStore;
