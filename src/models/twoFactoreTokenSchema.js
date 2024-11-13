import mongoose from "mongoose"
import { type } from "os"


 const twoFactoreToken=new mongoose.Schema({
     email:{
         type:String,
         unique:true
     },
     token:{
         type:String,
         unique:true

     },
     expire:{
         type: Date
     }
 })

 const twoFactoreConfirmation=new mongoose.Schema({
     
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
 })
 
 
 export const TwoFactoreToken=mongoose.models?.TwoFactoreToken || mongoose.model("TwoFactoreToken",twoFactoreToken)
 export const TwoFactoreTokenConfirmation=mongoose.models?.TwoFactoreTokenConfirmation || mongoose.model("TwoFactoreTokenConfirmation",twoFactoreConfirmation)