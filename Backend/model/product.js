const mongoose = require('mongoose');

const productSchema=new mongoose.Schema({
    imgUrl:{
        type:String,
        required:true
    },
    name:{
        type: String,
        required: true,
        unique: true
    },
    price:{
        type:Number,
        required: true
    }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
