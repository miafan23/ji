'use strict'
const UserModel = require('../models').User;
const TaskModel = require('../models').Task;
const moment = require('moment');

exports.getUserTasks = function(req, res) {
  let user = req.session.user;
  let monthId = req.params.monthId;
  // console.log(req.param, req)
  console.log(monthId)
  TaskModel.find({user: user, monthId: monthId, status: false})
    .exec((err, tasks) => {
      if (!err) {
        res.send(tasks);
      }
    })
}

//新加任务
exports.addNewTask = function(req, res) {
  let username = req.session.user;
  let taskname = req.body.task;

  let _8YearsTasks = create8YearsTasks(username, taskname)
  TaskModel.create(_8YearsTasks, function(err) {
    if (err) {return res.send('error') }
    res.send({message: 'SAVED'});
  });
}

exports.updateStatus = function(req, res) {
  let user = req.session.user;
  let id = req.params.id;
  let index = req.body.index;
  let status = req.body.status;

  TaskModel.findOne({user: user, _id: id}, (err, task) => {
    if(!task) return res.status(403).send({message: 'NO_TASK'});
    //根据现在的status更新状态
    switch (status) {
      case 'check':
        task.process.set(index, 'uncheck')
        break;
      case 'uncheck':
        task.process.set(index, null)
        break;
      default:
        task.process.set(index, 'check')
    }
    task.save()
    res.send({message: 'SAVED'});
  })
}

exports.manageGetPendingTasks = function(req, res) {
  let user = req.session.user;
  let pendingTasks;
  //找到正在进行的任务名
  UserModel.findOne({username: user}, function(err, user) {
    if (!user) { return false }
    let tasks = user.tasks;
    for (let i=0; i<tasks.length; i++){
      if (tasks[i].status == false) {
        pendingTasks.push(tasks[i]);
      }
    }
    res.send(pendingTasks);
  });
}


function create8YearsTasks(user, task) {
  let taskList = [];

  let year = moment().year();
  let month = moment().month();

  for(let i=year-2; i<=year+6; i++){
    for(let j=0; j<12; j++){
      taskList.push({
        task: task,
        user: user,
        monthId: ''+i+j
      })
    }
  }

  return taskList;
}
