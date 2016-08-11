const EventEmitter = require('events').EventEmitter;
// const assign = require('object-assign');

var TasksStore = Object.assign({}, EventEmitter.prototype, {
  tasks: [{
    task: 'aini',
    process: new Array(31)
  }],

  getAllTasks() {
    return this.tasks;
  },

  addNewTaskHandler(task) {
    this.tasks.push({
      task: task,
      process: new Array(31)
    });
    console.log(this.tasks);
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

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback)
  }
});

export default TasksStore;
