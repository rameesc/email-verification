import { dbConnection } from "@/lib/dbConnection";
import { TwoFactoreTokenConfirmation } from "@/models/twoFactoreTokenSchema"



export const getTwoFactorConfirmationByUserId=async(userId:string)=>{

    try{
        await dbConnection()

        const  twoFactoreConfirmation=await TwoFactoreTokenConfirmation.findOne({
            user:userId
        })
       

        return twoFactoreConfirmation;

    }catch(error){
        return null
    }


}