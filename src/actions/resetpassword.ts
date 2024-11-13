"use server"

import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/token";
import { ResetSchema } from "@/schemas"

import * as z from 'zod';


export const reset=async(value:z.infer<typeof ResetSchema>)=>{

    const validateFieds=ResetSchema.safeParse(value);

    if(!validateFieds.success){
        return {error:"Invalid email"}
    }

    const {email}=validateFieds.data;

    const existingUser =await getUserByEmail(email)

    if(!existingUser){
        return {error:"Email not found"}
    }
    

    const passwordResetToke=await generatePasswordResetToken(existingUser.email)

    await sendPasswordResetEmail(
        passwordResetToke.email,
        passwordResetToke.token
    )
    
    return {success:"Reset email sent!"}


}


