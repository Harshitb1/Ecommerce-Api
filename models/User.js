const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone:{
    type: String,
    required:true
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

  pincode:{
    type:Number
  },
  age:{
    type: Number,
    required: true
  },
  
  address:{
    type: String
  },

  orders:[{
   
      type: Schema.Types.ObjectId,
      ref: 'orders'
    
  }],
  // subscriptions:[{
  //     subscription:{
  //       type: Schema.Types.ObjectId,
  //       ref: 'subscriptions'
  //     }
  // }],
  subscriptions:[{
    name:{
      type: String
    },
    price:{
      type:Number
    },
    validity:{
      type:Date
    },
    date:{
      type: Date,
      default: Date.now
    }
  }],
  messages:[
    {
      msg:{
        type: String,
        required:true
      },
      date: {
        type: Date,
        default: Date.now        
      }
    }
  ],

  notification:[
    {
      msg:{
        type: String,
        required:true
      },
      date: {
        type: Date,
        default: Date.now        
      }
    }
  ],
  referred_friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
      },
      referral_payment_status:{
        type: String,
        default:"pending"
      },
      referral_amount:{
        type: Number
      },
      date: {
        type: Date,
        default: Date.now        
      }
    }
  ],
  joining_date: {
    type: Date,
    default: Date.now
  },
  cashback_earning:[{
    amount:{
      type:Number
    },
    order_id:{
      type: Schema.Types.ObjectId,
      ref: 'orders'
    },
    date: {
      type: Date,
      default: Date.now
    },
  }],
  last_active_timestamp:{
    type: Date,
    default: Date.now
  },
  refer_code:{
    type:String
  },
  referred_code:{
    type: String
  },

  
});

// UserSchema.plugin(require('mongoose-autopopulate'));
module.exports = User = mongoose.model('users', UserSchema);
