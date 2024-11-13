"use server"

import { auth } from "@/auth"
import { currentUserRole } from "@/lib/auth"


export const admin=async()=>{

    try{
        const role=await currentUserRole()

        if(role=="ADMIN"){
            return {error:"forbidden"}
        }

        return {success:"Allowed!"}


        


    }catch(error){
        return {error:'error'}
    }
}