
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { VerificationToken } from "@/models/verificationTokenSchema";
import {v4 as uuidv4} from "uuid"
import { dbConnection } from "./dbConnection";
import { getPasswordResetTokenByEmail } from "@/data/passwordResetToke";
import { PasswordReset } from "@/models/resetpasswordSchema";
import crypto from "crypto"
import { getTwoFactorTokenByEmail, getTwoFactorTokenByToken } from "@/data/two-factor-token";
import { TwoFactoreToken } from "@/models/twoFactoreTokenSchema";




export const generateTwoFactorToken=async(email:string)=>{

    const token=crypto.randomInt(100_000,1_000_000).toString();

    const expire=new Date(new Date().getTime()+5*60*1000)  // expire an houre

    const existingToken=await getTwoFactorTokenByEmail(email);


    if(existingToken){
        await TwoFactoreToken.findByIdAndDelete(existingToken._id)


    }

    const twoFactorToken=await TwoFactoreToken.create({
        email,
        token,
        expire
    })

    return twoFactorToken


}



export const generatePasswordResetToken=async(email:string)=>{

    const token=uuidv4();
    const expire=new Date(new Date().getTime()+3600*1000);
    await dbConnection()

    const existingToken=await getPasswordResetTokenByEmail(email)

    if(existingToken){
        await PasswordReset.findByIdAndDelete(existingToken._id)
    }

    const passwordResetToken=await PasswordReset.create({
        email,
        token,
        expire
    })

    return passwordResetToken
}


export const generateVerificationToken=async(email:string)=>{

    const token=uuidv4();
    const expire=new Date(new Date().getTime()+3600*1000);
   await dbConnection()
    const existingToken=await getVerificationTokenByEmail(email);

    if(existingToken){
        await VerificationToken.findByIdAndDelete(existingToken._id)
    }

    const verificationToken=await VerificationToken.create({
        email,
        token,
        expire
    })

    return verificationToken

}
