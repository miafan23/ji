import AppDispatcher from '../dispatcher/AppDispatcher';

const TaskActions = {
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
  }
};

export default TaskActions;
