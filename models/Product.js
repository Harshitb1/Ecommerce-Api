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
        id:{
            type: Schema.Types.ObjectId,
            ref: 'reviews'
          }
    }],
    sales_count:{
        type: Number,
        default:0
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Product = mongoose.model('products', ProductSchema);
