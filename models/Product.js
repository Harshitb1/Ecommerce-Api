const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProductSchema = new Schema({
    name:{
      type: String
    },
    description:{
        type: String
    },
    image:{
        type: String
    },
    price:{
        type: Number
    },
    reviews:[{
        name:{
            type: String
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
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Product = mongoose.model('products', ProductSchema);
