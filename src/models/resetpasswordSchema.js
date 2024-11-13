 
 import mongoose from "mongoose"


 const passwordResetToken=new mongoose.Schema({
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
 
 
 export const PasswordReset=mongoose.models?.PasswordReset || mongoose.model("PasswordReset",passwordResetToken)