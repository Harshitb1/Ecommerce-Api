const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CouponSchema = new Schema({
    percentage:{
        type: Number,
        required:true
    },
    max_amount:{
        type:Number
    },
    date:{
        type: Date,
        default: Date.now
    },
    category:[{
        type: String
    }]
});

module.exports = Review = mongoose.model('reviews',ReviewSchema);
