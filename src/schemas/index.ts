

import * as z from 'zod';


export const SettingsSchema=z.object({
    name:z.optional(z.string()),
    isTwoFactorEnabled:z.optional(z.boolean()),
    role:z.enum(["ADMIN","USER"]),
    email:z.optional(z.string().email()),
    password:z.optional(z.string().min(6)),
    newPassword:z.optional(z.string().min(6))
})
.refine((data)=>{
    if(data.password && !data.newPassword){
        return false
    }
   

    return true
},{
    message:"New password is required",
    path:["newPassword"]
})

.refine((data)=>{
   
    if(data.newPassword && !data.password){
        return false
    }

    return true
},{
    message:"password is required",
    path:["password"]
})


export const LoginSchema=z.object({
    email:z.string().email({
        message:"email is required"
    }),
    password:z.string().min(6),

    code:z.optional(z.string())
})

export const ResetSchema=z.object({
    email:z.string().email({
        message:"email is required"
    }),
   
})
export const Newpassword=z.object({
    password:z.string().min(6),
   
})



export const RegisterSchema=z.object({
    email:z.string().email({
        message:"email is required"
    }),
    password:z.string().min(6),
    
    name:z.string().min(1,{
        message:'name is required'
    })
})