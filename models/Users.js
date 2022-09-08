const mongoose = require('mongoose');
const addressSchema = new mongoose.Schema({
    street:String, 
    city:String
})
const userSchema = new mongoose.Schema({
    name:String,
    age:{
        type:Number,
        min:18,
        max:100,
        validate: {
            validator: v => v % 2 === 0, 
            message: props => `${props.value}is not an even number`
        }
    },
    email:{
        type:String,
        minLength:10,
        required:true,
        lowercase:true,
    },
    createdAt: {
        type:Date,
        immutable:true,
        default: ()=> Date.now(),
        
    },
    UpdatedAt:{
        type:Date,
        default: ()=> Date.now(),
    },
    hobbies:[String],
    address: addressSchema,
})
userSchema.methods.sayHi= function() {
    console.log(`Hi my name is ${this.name}`)
}
userSchema.statics.findByName= function(name) {
    return this.find({name: new RegExp(name,"i")})
}
userSchema.query.byName = function(name ) {
    return this.where({name: new RegExp(name,"i")})
}
userSchema.pre('save', function(next) {
    this.updatedAt = Date.now()
    next()
})
userSchema.post('save', function(doc,next) {
    doc.sayHi()
    next()
})
module.exports= mongoose.model('User', userSchema);