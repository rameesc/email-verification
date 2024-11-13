"use server"


import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"
import { User } from "@/models/Userschema";
import { VerificationToken } from "@/models/verificationTokenSchema";


export const newVerification=async(token:string)=>{

    const existingToken=await getVerificationTokenByToken(token);

    if(!existingToken){
        return {error:'Token does not exist'}
    }

    const hasExpired=new Date(existingToken.expire) < new Date();

    if(hasExpired){

        return {error:'Token has Expired!'}
    }

    const existingUser=await getUserByEmail(existingToken.email);

    if(!existingUser){
        return {error:'Email does not exist!'}
    }

    await User.findByIdAndUpdate(existingUser._id,{
        emailVerified:new Date(),
        email:existingUser.email
    })


    await VerificationToken.findByIdAndDelete(existingToken._id)


    return {success:"Email verified!"};

}