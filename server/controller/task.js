'use strict'
const UserModel = require('../models').User;
const TaskModel = require('../models').Task;
const moment = require('moment');

exports.getUserTasks = function(req, res) {
  let user = req.session.user;
  let monthId = req.params.monthId;
  // console.log(req.param, req)
  // console.log(monthId)
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
  console.log(username)
  //找到对应用户
  UserModel.findOne({username: username})
  .exec((err, user) => {
    console.log(user)
    if (!user) return false;
    //获取用户目前有多少task了，把len作为task的id
    let len = user.tasks.length;

    let _8YearsTasks = create8YearsTasks(username, taskname, len)
    // 新建taskModel
    TaskModel.create(_8YearsTasks, function(err) {
      if (err) {return res.send('error') }
      // 更新user.tasks
      user.tasks.push(''+username+len);
      console.log(user.tasks)
      user.save()
      res.send({message: 'SAVED'});
    });

  })
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

exports.editTask = function(req, res) {
  let user = req.session.user;
  let oldtask = req.body.oldtask;
  let newtask = req.body.newtask;

  TaskModel.update(
    {user: user, task: oldtask},
    {task: newtask}, 
    {multi: true}, 
    function(err, task) {
      if (err) {return console.log(err)}
      res.send('SAVED');

      // UserModel.update(
      //   {user: user, tasks: oldtask},
      //   {$set: {'tasks.$': newtask}},
      //   function () {
      //   }
      // )
  })
}

exports.deleteTask = function(req, res) {
  let user = req.session.user;
  let taskId = req.body.id;

  TaskModel.remove({id: taskId})
  .exec((err) => {
    // console.log(err)
    UserModel.update(
      {username: user},
      {$pull: {'tasks.id': taskId}},
      function(err) {
        res.send('SAVED');
      }
    )
  })
}

exports.finishTask = function(req, res) {
  let user = req.session.user;
  let taskId = req.body.id;
  TaskModel.update(
    {id: taskId},
    {$set: {status: 1, ended_at: new Date()}},
    {multi: true},
    function(err) {
      res.send('SAVED');
    }
  )
}

exports.getFinishedTasks = function(req, res) {
  let user = req.session.user;
  let o = {};
  o.map = function() {
    emit(this.id, {task: this.task, ended_at: this.ended_at, created_at:this.create_at})
  }
  o.reduce = function(key, value) {
    return {
      task: value[0].task,
      ended_at: value[0].ended_at,
      create_at: value[0].create_at
    }
  }
  o.query = {
    user: user,
    status: 1
  }
  TaskModel.mapReduce(o, function(err, result) {
    console.log(result);
    res.send(result);
  })
  // TaskModel.distinct('id', {user: user, status: 1})

  // .count((err, id) => {
    // if (err) { return console.log(err)};
    // TaskModel.find({id: id})
    // .exec((err, tasks) => {
    //   if (err) { return console.log(err)};
    //   res.send(tasks);
    // })
    // Promise.all()
    // console.log(id)
  // })
}

function create8YearsTasks(user, task, len) {
  let taskList = [];

  let year = moment().year();
  let month = moment().month();

  for(let i=year-2; i<=year+6; i++){
    for(let j=0; j<12; j++){
      taskList.push({
        id: ''+user+len,
        task: task,
        user: user,
        monthId: ''+i+j
      })
    }
  }

  return taskList;
}
