'use strict'
const UserModel = require('../models').User;
const TaskModel = require('../models').Task;
const moment = require('moment');

exports.getUserTasks = function(req, res) {
  let user = req.session.user;
  let monthId = req.params.monthId;
  // console.log(req.param, req)
  console.log(monthId)
  TaskModel.find({user: user, monthId: monthId})
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

  TaskModel.create({
    task: taskname,
    user: username,
    monthId: '' + moment().year() + moment().month()
  }, function(err, task) {
    if(!err) {   
      UserModel.findOne({username: username}, (err, _user) => {
        //更新user.tasks字段
        _user.tasks.push(taskname);
        _user.save();

        if (err) return res.status(403).send({message: 'ADD_ERROR'});
        res.send({message: 'SAVED'});
      })
    } else {
      return res.status(403).send({message: 'ADD_ERROR'});
    }
  });

}

exports.updateStatus = function(req, res) {
  let user = req.session.user;
  let id = req.params.id;
  let index = req.body.index;
  let status = req.body.status;

  TaskModel.findOne({user: user, _id: id}, (err, task) => {
    console.log(task)
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

exports.addTaskMonthId = function(req, res) {
  let username = req.session.user;
  let monthId = req.body.monthId;
  console.log('addTaskMonthId', monthId, req.body)
  // 新建这个月所有的task
  UserModel.findOne({username: username})
  .exec((err, user) => {
    let tasks = user.tasks;
    //user.taks里所有的task都要新建
    for (let i=0; i<tasks.length; i++) {
      newMonthTask(tasks[i], username, monthId)
    }
  });
}

function newMonthTask(task, user, monthId) {
  TaskModel.create({
    task: task,
    user: user,
    monthId: monthId
  }, function(err, task) {
    if(!err) {
      // res.send({message: 'SAVED'});
    } else {
      throw error('error');
    }
  })
}

