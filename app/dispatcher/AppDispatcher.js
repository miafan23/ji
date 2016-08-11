const Dispatcher = require('flux').Dispatcher;
import TaskStore from '../stores/tasks';

let AppDispatcher = new Dispatcher();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'ADD_NEW_TASK':
      console.log(action);
      TaskStore.addNewTaskHandler(action.task);
      TaskStore.emitChange();
      break;
    case 'CHANGE_TASK_STATUS':
      TaskStore.changeTaskStatusHandler(action);
      TaskStore.emitChange();
      break;
    default:
      //
  }
});
export default AppDispatcher;
