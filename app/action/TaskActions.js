import AppDispatcher from '../dispatcher/AppDispatcher';

const TaskActions = {
  initializeTasks(task) {
    AppDispatcher.dispatch({
      actionType: 'INITIALIZE_TASKS',
      task
    })
  },

  updateTasks(tasks) {
    AppDispatcher.dispatch({
      actionType: 'UPDATE_TASKS',
      tasks
    })
  },

  updateFinishedTasks(finishedTasks) {
    AppDispatcher.dispatch({
      actionType: 'UPDATE_FINISHED_TASKS',
      finishedTasks
    })
  },

  addNewTask(task) {
    AppDispatcher.dispatch({
      actionType: 'ADD_NEW_TASK',
      task
    })
  },

  changeTaskStatus(taskIndex, index, status) {
    AppDispatcher.dispatch({
      actionType: 'CHANGE_TASK_STATUS',
      taskIndex,
      index,
      status
    })
  },

  preMonth() {
    AppDispatcher.dispatch({
      actionType: 'TASK_PRE_MONTH',
    })
  },

  afterMonth() {
    AppDispatcher.dispatch({
      actionType: 'TASK_AFTER_MONTH',
    })
  }
};

export default TaskActions;
