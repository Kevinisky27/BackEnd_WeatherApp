const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  }, 
});

module.exports = mongoose.model('User', userSchema);