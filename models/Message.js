const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    text:String,
    user:String,
    createdAt:{
        type:Date,
        default:()=> Date.now(),
    }
})
module.exports = mongoose.model('message', messageSchema);