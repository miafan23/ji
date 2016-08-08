import AppDispatcher from '../dispatcher/AppDispatcher';

const TaskActions = {
  addNewTask(name) {
    AppDispatcher.dispatch({
      actionType: 'ADD_NEW_TASK',
      name
    })
  }
};

export default TaskActions;