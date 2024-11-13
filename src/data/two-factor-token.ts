

import { dbConnection } from '@/lib/dbConnection';
import {TwoFactoreToken} from '@/models/twoFactoreTokenSchema'

export const getTwoFactorTokenByToken=async(token:string)=>{
        
    try{
        await dbConnection()

        const twoFactoreToken=await TwoFactoreToken.findOne({
            token:token
        })

        return twoFactoreToken


    }catch(error){
        return null;

    }

}


export const getTwoFactorTokenByEmail=async(email:string)=>{
        
    try{
        await dbConnection()

        const twoFactoreToken=await TwoFactoreToken.findOne({
            email:email
        })

        return twoFactoreToken


    }catch(error){
        return null;

    }

}