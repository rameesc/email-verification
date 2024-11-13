import { dbConnection } from "@/lib/dbConnection"
import { User } from "@/models/Userschema"



export const getUserByEmail=async(email:string)=>{

    try{
        await dbConnection()
        const user=await User.findOne({email:email})


        return user


    }catch(error){
        return null
    }

}

export const getUserById=async(id:string)=>{

    try{
        await dbConnection()
        const user=await User.findOne({_id:id})


        return user


    }catch(error){
        return null
    }

}