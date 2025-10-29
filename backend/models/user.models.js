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
        default : "https://avatar.iran.liara.run/public/28"
    },
    token:{
        type : String,
        // required : true, 
    }
})

export const User = mongoose.model("User", userSchema)
