const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');
const moment = require('moment');

const TaskSchema = new Schema({
  task: {type: String, required: true},
  monthId: {type: String, default: ''+moment().year()+moment().month()},
  user: {type: String, required: true},
  process: {type: Array, default: new Array(31)}
});

// TaskSchema.plugin(passportLocalMongoose);


TaskSchema.index({task: 1});

module.exports = mongoose.model('Task', TaskSchema);

