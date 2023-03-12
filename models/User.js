const mongoose = require('mongoose')
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()
//user allkeygenerator.com to generate 256 bit jwttoken
const UserSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Username is required'],
            maxlength:[20,"Must be less than 20 characters"],
            minlength:[3, "Must be more than 3 characters"],
        },
        email: {
            type: String, 
            required: [true, 'Email is required'],
            unique: true,
            validate:{
                validator: function(v){
                    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    .test(v)
                },
                message: props =>`${props.value} is not a valid email`
            }
        },
        password:{
            type: String,
            required:[true, 'Password is required'],
            minlength: [6, 'Password must be more than six characters'],
            maxlength:[20, 'Password must be not more than 20 characters']
        }

    }
)

//middle ware
UserSchema.pre(
    'save',async function(next){
        const salt = await bcrypt.genSalt(10);
        this.password  = await bcrypt.hash(this.password, salt);
        next();
    }
)
UserSchema.methods.createJwt = function(){
    const token = jwt.sign({id:this._id, name:this.name}, process.env.JWT_TOKEN, {expiresIn: process.env.JWT_LIFETIME});   
    return token;
}
UserSchema.methods.verifyPassword =async function(password){
    return await bcrypt.compare(password, this.password);
}
module.exports = mongoose.model('User', UserSchema)