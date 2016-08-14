const Dispatcher = require('flux').Dispatcher;
import TasksStore from '../stores/tasks';
import DaysStore from '../stores/days';

let AppDispatcher = new Dispatcher();

AppDispatcher.register((action) => {
  switch (action.actionType) {
    case 'INITIALIZE_TASKS':
      TasksStore.initializeTasks(action.task);
      TasksStore.emitChange();
      break;
    case 'UPDATE_TASKS':
      TasksStore.updateTasks(action.tasks);
      TasksStore.emitChange();
      break;
    case 'ADD_NEW_TASK':
      TasksStore.addNewTaskHandler(action.task);
      TasksStore.emitChange();
      break;
    case 'CHANGE_TASK_STATUS':
      TasksStore.changeTaskStatusHandler(action);
      TasksStore.emitChange();
      break;
    case 'PRE_WEEK':
      DaysStore.preWeek();
      DaysStore.emitChange();
      break;
    case 'AFTER_WEEK':
      DaysStore.afterWeek();
      DaysStore.emitChange(); 
      break;
    case 'PRE_MONTH':
      DaysStore.preMonth();
      DaysStore.emitChange();
      break;
    case 'AFTER_MONTH':
      DaysStore.afterMonth();
      DaysStore.emitChange(); 
      break;    
    case 'TASK_PRE_MONTH':
      TasksStore.preMonth();
      TasksStore.emitChange();
      break;
    case 'TASK_AFTER_MONTH':
      TasksStore.afterMonth();
      TasksStore.emitChange(); 
      break; 
    default:
      //
  }
});
export default AppDispatcher;
