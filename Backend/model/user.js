const mongoose = require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob:{
        type: String,
        required: true,
    },
    selectedProducts: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product' 
        }
    ],
})

const User = mongoose.model('User', userSchema);

module.exports = User;