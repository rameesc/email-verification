import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    emailVerified:{
        type: Date
    },
    image:{
        type:String
    },
    password:{
        type:String
    },
    role:{
        type:String,
        enum: ['USER', 'ADMIN'],
        default:'USER'
    },
    isTwoFactoreEnabled:{
        type:Boolean,
        default:false
    },
    twoFactoreConfirmation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TwoFactoteToken"

    },
    accounts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Account"
        }
    ]


},{
    timestamps:true
})

export const User=mongoose.models?.User || mongoose.model("User",userSchema)