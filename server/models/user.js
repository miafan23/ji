const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  created_at: {type: Date, default: Date.now},
  tasks: {type: Array, default: []}
})

UserSchema.index({name: 1});

module.exports = mongoose.model('User', UserSchema);
