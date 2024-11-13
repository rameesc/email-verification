"use server"

import { getPasswordResetTokenByToken } from "@/data/passwordResetToke";
import { getUserByEmail } from "@/data/user";
import { Newpassword } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs"
import { User } from "@/models/Userschema";
import { PasswordReset } from "@/models/resetpasswordSchema";



export  const newPassword=async(
    value:z.infer<typeof Newpassword>,
    token:string | null

)=>{

    const validateFieds=Newpassword.safeParse(value)

    if(!token) return {error:"missing token"}

    if(!validateFieds.success){

        return {error:"Invalid field"}
    }
    const {password}=validateFieds.data;


    const existingToken=await getPasswordResetTokenByToken(token )

    if(!existingToken){
        return {error:'Invalid token!'}
    }

    const hasExpired= new Date(existingToken.expire) < new Date()

    if(hasExpired){
        return {error:'token Expired!'}

    }

    const existingUser=await getUserByEmail(existingToken.email)

    if(!existingUser){
        return {error:'email does not existing!'}
    }

    //hash password

    const hashpassword=await bcrypt.hash(password,10)

    await User.findByIdAndUpdate(existingUser._id,{
        password:hashpassword
    })

    await PasswordReset.findByIdAndDelete(existingToken._id)


   return {success:"Password updated!"}

}


