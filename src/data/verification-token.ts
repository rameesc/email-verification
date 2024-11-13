import { dbConnection } from "@/lib/dbConnection"
import {VerificationToken} from "@/models/verificationTokenSchema"

export const getVerificationTokenByEmail=async(email:string)=>{

    try{
        await dbConnection()
        
        const verificationToken=await  VerificationToken.findOne({email})
        return verificationToken

    }catch(error){
        return null
    }

}

export const getVerificationTokenByToken=async(token:string)=>{

    try{
        await dbConnection()
        const verificationToken=await  VerificationToken.findOne({token})
        return verificationToken

    }catch(error){
        return null
    }

}