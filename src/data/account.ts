
import { dbConnection } from "@/lib/dbConnection"
import {Account} from "@/models/accounSchema"
export const getAccountByUserId=async(userId:string)=>{

    try{
        await dbConnection()

        const account=await Account.findById(userId)

        return account


    }catch{
        return null
    }

}