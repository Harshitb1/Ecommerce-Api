const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ReviewSchema = new Schema({
    user_name:{
        type: String
    },
    user:{
        id:{
            type: Schema.Types.ObjectId,
            ref: 'users'
          }
    },
    date:{
        type: Date,
        default: Date.now
    },
    rating:{
        type: Number
    },
    desc:{
        type: String
    }
});

module.exports = Review = mongoose.model('reviews',ReviewSchema);
