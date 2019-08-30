const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReferCodeSchema = new Schema({
    code: {
      type: String,
      required: true
    },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ReferCode = mongoose.model('refercodes', ReferCodeSchema);
