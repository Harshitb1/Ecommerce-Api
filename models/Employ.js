const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const EmploySchema = new Schema({
 
  name: {
    type: String,
    required: true
  },
 
  email: {
    type: String,
    required: true
  },
  
  password:{
    type: String
    // required: true
  },
  
  joining_date: {
    type: Date,
    default: Date.now
  },
  
  salary:{
    type: Number,
    default: 0
  },

  state:{
    type: String,
    required: true
  },

  city:{
    type: String,
    required: true
  },

  gender:{
    type: String,
    enum:["male","female"],
    required: true
  },

  phone:{
    type: Number,
    minlength:10,
    maxlength:10
  },

  isSuper:{
      type:Boolean,
      default: false
  },
  date:{
    type:Date,
    dafault: Date.now
  }

});

module.exports = Employ = mongoose.model('employs', EmploySchema);
