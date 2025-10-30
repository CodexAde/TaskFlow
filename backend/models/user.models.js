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
        // default: "https://img.icons8.com/?size=100&id=EInDLGZwVHf7&format=png&color=000000"
    },
    token:{
        type : String,
        // required : true, 
    }
})

export const User = mongoose.model("User", userSchema)
