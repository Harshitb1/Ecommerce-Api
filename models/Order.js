const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const OrderSchema = new Schema({
  product_id:{
    type: Schema.Types.ObjectId,
    ref: 'products',
    required: true    
  },
  address:{
      type: String,
      required: true
  },
  amount:{
      type: Number,
      required: true
  },
  coupon:{
      type: String
  },
  cashback:{
      type: Number
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true  
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Order = mongoose.model('orders', OrderSchema);
