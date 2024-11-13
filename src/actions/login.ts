'use server';
import * as z from 'zod'
import { LoginSchema } from "@/schemas";
import {signIn} from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/route'
import {AuthError} from 'next-auth'
import { getUserByEmail } from '@/data/user';
import { generateVerificationToken, generateTwoFactorToken } from '@/lib/token';
import { sendVerificationEmail,sendTwoFactorEmail } from '@/lib/mail';
import { getTwoFactorTokenByEmail } from '@/data/two-factor-token';
import { TwoFactoreToken, TwoFactoreTokenConfirmation } from '@/models/twoFactoreTokenSchema';
import { getTwoFactorConfirmationByUserId } from '@/data/two-factor-confirmation';


export const login=async(values:z.infer<typeof LoginSchema>)=>{
    
    const validateField=LoginSchema.safeParse(values)

    if(!validateField.success){
        return {error:"Inavalid field "}
    }
   
    const {email,password,code}=validateField.data;

    const existingUser=await getUserByEmail(email)

    if(!existingUser||!existingUser.email||!existingUser.password){
        return {error:"Email does not exist!"}
    }

    if(!existingUser.emailVerified){

        const verificatioToken=await generateVerificationToken(existingUser.email)

        await sendVerificationEmail(
            verificatioToken.email,
            verificatioToken.token
        )

        return {success:"comfirmation Email sent!"}

    }
    //two factor 

    if(existingUser.isTwoFactoreEnabled && existingUser.email){
        if(code){

            const twoFactoreToken=await getTwoFactorTokenByEmail(
                existingUser.email
            )

            if(!twoFactoreToken){
                return {error:"Invalid code!"}
            }

            if(twoFactoreToken.token!==code){
                return {error:"Invalid code!"}

            }

            const hasExpire=await new Date(twoFactoreToken.expire)< new Date();

            if(hasExpire){
                return {error:"code Expired!"}

            }

            await TwoFactoreToken.findByIdAndDelete(
                twoFactoreToken._id
            )
            
            const existingComfirmation=await getTwoFactorConfirmationByUserId(
                existingUser._id
            )

            if(existingComfirmation){
                await TwoFactoreTokenConfirmation.findByIdAndDelete(
                    existingComfirmation._id
                )
            }

            await TwoFactoreTokenConfirmation.create({
                user:existingUser._id
            })

        }else{

         const twoFactorToken=await generateTwoFactorToken(existingUser.email)

         await sendTwoFactorEmail(
            twoFactorToken.email,
            twoFactorToken.token
         )

         return {twoFactor:true};
        }
    }

    try{
        await signIn("credentials",{
            email,
            password,
            redirectTo:DEFAULT_LOGIN_REDIRECT
        })
       

    }catch(error){
       if(error instanceof AuthError){
        switch(error.type){
            case "CredentialsSignin":
                return {error:'Invalid credentials!'}
            default:
              return     {error:'something went wrong'}


        }
       }
       throw error;
    }
}