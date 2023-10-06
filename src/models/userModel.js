const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  lastname: {
    type: String,
    require: false
  },
  age: {
    type: Number,
    require: true
  }, 
  profession: {
    type: String,
    requiere: true
  } 
});

module.exports = mongoose.model('User', userSchema);