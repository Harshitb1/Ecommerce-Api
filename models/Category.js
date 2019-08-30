const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CategorySchema = new Schema({
  name:{
      type: String,
      required: true
  },
  views:{
    type: Number,
    default:0
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Category = mongoose.model('categories', CategorySchema);