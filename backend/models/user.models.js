import mongoose from 'mongoose'

const userSchema =  new mongoose.Schema({
    name:{
        type : String,
        // required : true,
    },
    email:{
        type : String,
        // required : true,
    },
    password:{
        type : String,
        // required : true,
    },
    language:{
        type : String,
        // required : true,
    },
    avatar:{
        type : String,
        // required : true,
    },
    token:{
        type : String,
        // required : true, 
    }
})

export const User = mongoose.model("User", userSchema)
