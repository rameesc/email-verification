
import { dbConnection } from "@/lib/dbConnection"
import {PasswordReset} from "@/models/resetpasswordSchema"

export const getPasswordResetTokenByToken=async(token:string)=>{

    try{
        await dbConnection()
        const passwordToken=await PasswordReset.findOne({
            token
        })
     
        return passwordToken

    }catch{
        return null
    }

}

export const getPasswordResetTokenByEmail=async(email:string)=>{

    try{
        await dbConnection()
        const passwordToken=await PasswordReset.findOne({
            email
        })
     
        return passwordToken

    }catch{
        return null
    }

}