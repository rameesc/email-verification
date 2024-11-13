import mongoose from "mongoose"


const verificationSchema=new mongoose.Schema({
    email:{
        type:String
    },
    token:{
        type:String,
        unique:true
    },
    expire:{
        type: Date
    }
})


export const VerificationToken=mongoose.models.VerificationToken || mongoose.model("VerificationToken",verificationSchema)