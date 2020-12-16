const mongoose = require('mongoose')


const User = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    nome :{
        type:String,
        required:true
    },
    followed:{
        type:String,
        required:true
    },
    followers:{
        type:String,
        required:true
    },
    posts:{
        type:String,
        required:true
    },
    likes:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:true
    }


});


module.exports = mongoose.model('User',User)