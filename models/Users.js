const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new mongoose.Schema({
    first_name:{
        type:String,
        default:null,
    },
    last_name: {
        type:String,
        deafult:null,
        
    },
    username: String,
    email:{
        type:String,
        unique:true,
        required:true,
        
    },
    createdAt: {
        type:Date,
        immutable:true,
        default: ()=> Date.now(),
        
    },
});
//plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose);
module.exports= mongoose.model('User', UserSchema);