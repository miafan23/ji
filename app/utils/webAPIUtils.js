import TaskActions from '../action/TaskActions';
import $ from 'jquery';
import moment from 'moment';

const WebAPIUtils = {
  getUserTasks() {
    let monthId = '' + moment().year() + moment().month();
    $.ajax({
      url: '/api/usertasks/'+monthId,
      type: 'GET'
    })
      .done(function(data) {
        TaskActions.updateTasks(data);
      })
  },

  getUserTasksByMonthId(monthId) {
    let self = this;
    $.ajax({
      url: '/api/usertasks/'+monthId,
      type: 'GET'
    })
      .done(function(data) {
        TaskActions.updateTasks(data);
      })
  },

  addNewTask(task) {
    let self = this;
    console.log(task)
    $.ajax({
      url: '/api/addnewtask',
      type: 'POST',
      data: {
        task
      }
    })
    .done(function(data) {
      if (data.message === 'SAVED') {
        self.getUserTasks();
      }
    })
  },

  changeTaskStatus(index, status, id, monthId) {
    let self = this;
    $.ajax({
      url: '/api/taskstatus/'+id,
      type: 'PUT',
      data: {
        index,
        status
      }
    })
    .done(function(data) {
      if (data.message === 'SAVED') {
        self.getUserTasksByMonthId(monthId);
      }
    })
  }
}

export default WebAPIUtils;