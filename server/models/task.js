const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');
const moment = require('moment');

const TaskSchema = new Schema({
  id: {type: String, required: true},
  task: {type: String, required: true},
  monthId: {type: String, default: ''+moment().year()+moment().month()},
  user: {type: String, required: true},
  process: {type: Array, default: new Array(31)},
  status: {type: Boolean, default: 0}, //设置任务的状态  默认0代表正在进行  1代表成就达成
  created_at: {type: Date, default: Date.now},
  ended_at: {type: Date}
});

// TaskSchema.plugin(passportLocalMongoose);


TaskSchema.index({task: 1});

module.exports = mongoose.model('Task', TaskSchema);

