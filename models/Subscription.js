const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SubsciptionSchema = new Schema({
    name:{
        type: String
      },
      price:{
        type:Number
      },
      validity:{
        type:Date
      },
      user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      date:{
        type: Date,
        default: Date.now
      }
});

module.exports = Subsciption = mongoose.model('subscriptions', SubsciptionSchema);
