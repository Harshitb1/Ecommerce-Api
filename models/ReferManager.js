const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReferManagerSchema = new Schema({

  redeem_amount:{
      type : Number,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ReferManager = mongoose.model('refermanager', ReferManagerSchema);
