'use server'

import * as z from 'zod';


import { SettingsSchema} from "@/schemas"
import { getUserByEmail, getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { User } from '@/models/Userschema';
import { dbConnection } from '@/lib/dbConnection';

export const settings=async(value:z.infer<typeof SettingsSchema>)=>{

    const user=await currentUser()

    console.log(value)

    if(!user){
        return {error:"Unauthorized"}
    }
    await dbConnection()

    const dbUser=await getUserById(user.id as string)

    if(!dbUser){
        return {error:"Unauthorized"}
    }

    if(user.isOAuth){
        value.email=undefined,
        value.password=undefined,
        value.newPassword=undefined,
        value.isTwoFactorEnabled=undefined


    }

    if(value.email && value.email!==user.email){

        const existingUser=await getUserByEmail(value.email)

        if(existingUser && existingUser.id!==user.id){

            return {error:"Email already in user!"}
        }

    }

    await User.findByIdAndUpdate(dbUser._id,{
        ...value

    })

    return {success:"settings updated"}
}