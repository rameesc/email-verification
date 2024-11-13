'use server';
import * as z from 'zod'
import { RegisterSchema } from "@/schemas";
import {User} from '@/models/Userschema'
import bcrypt from 'bcryptjs'
import { dbConnection } from '@/lib/dbConnection';
import { getUserByEmail } from '@/data/user';
import { redirect } from 'next/navigation';
import { generateVerificationToken } from '@/lib/token';
import {sendVerificationEmail} from "@/lib/mail"

export const register=async(values:z.infer<typeof RegisterSchema>)=>{
    
    const validateField=RegisterSchema.safeParse(values)

    if(!validateField.success){
        return {error:"Inavalid field "}
    }

    const {name,password,email}=validateField.data

    //hash password
    const hashPassword=await bcrypt.hash(password,10)

    //is user alreadt exist or not
    await dbConnection()

    const existingUser=await getUserByEmail(email)
    

    if(existingUser){
        return {error:"Email already in use "}
    }

    //create new user

  const usercreated=  await User.create({
    name:name,
    password:hashPassword,
    email:email
  })

  const verifivationToken=await generateVerificationToken(email)

  await sendVerificationEmail(
    verifivationToken.email,
    verifivationToken.token,
  )


    //send verification token email
    

    return {success:"Confirmation email sent!"}
}