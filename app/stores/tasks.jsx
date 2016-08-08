const EventEmitter = require('events').EventEmitter;
// const assign = require('object-assign');

var TasksStore = Object.assign({}, EventEmitter.prototype, {
  tasks: [],

  getAllTasks() {
    return this.tasks;
  },

  addNewTaskHandler(name) {
    this.tasks.push({task});
    console.log(this.tasks);
  },

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', callback)
  }
});

export default TasksStore;
