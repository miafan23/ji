import AppDispatcher from '../dispatcher/AppDispatcher';

const DaysActions = {
  preWeek() {
    AppDispatcher.dispatch({
      actionType: 'PRE_WEEK'
    })
  },

  afterWeek() {
    AppDispatcher.dispatch({
      actionType: 'AFTER_WEEK'
    })
  },

  preMonth() {
    AppDispatcher.dispatch({
      actionType: 'PRE_MONTH'
    })
  },

  afterMonth() {
    AppDispatcher.dispatch({
      actionType: 'AFTER_MONTH'
    })
  },

  goToday() {
    AppDispatcher.dispatch({
      actionType: 'GO_TODAY'
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

export default DaysActions;
