import {Resend} from 'resend'
import nodemailer from "nodemailer"

const resend=new Resend(process.env.RESEND_API_KEY)


// export const sendVerificationEmail=async(email:string,token:string)=>{

//     const confirmLink=`http://localhost:3000/auth/new-verification?token=${token}`;

//    const {error,data}= await resend.emails.send({
//         from:"onboarding@resend.dev",
//         to:email,
//         subject:"Confirm Your Email",
//         html:`<p>Click <a href="${confirmLink}"></a>to confirm email</p>`
//     });

//     if (error) {
//         return console.log(error)
//       }


// }


export const sendVerificationEmail=async(email:string,token:string)=>{

    const confirmLink=`http://localhost:3000/auth/new-verification?token=${token}`;

    const transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        service:'gmail',
        port:465,
        auth:{
            user:process.env.PERSON_EMAIL,
            pass:process.env.EMAIL_APP_PASSWORD
            
        }
    })
    const emailOption={
        from:process.env.PERSON_EMAIL,
        to:email,
        subject:"Confirm Your Email",
        html:` <a href="${confirmLink}"><p>Click to confirm email</p></a> `

    };

    try{
        await transporter.sendMail(emailOption);
        return {
            message:'Email sent successfully',
            success:true
        }


    }catch(error){

       console.log(error)
    }



}

export const sendPasswordResetEmail=async(email:string,token:string)=>{

    const restLink=`http://localhost:3000/auth/new-password?token=${token}`;

    const transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        service:'gmail',
        port:465,
        auth:{
            user:process.env.PERSON_EMAIL,
            pass:process.env.EMAIL_APP_PASSWORD
            
        }
    })
    const emailOption={
        from:process.env.PERSON_EMAIL,
        to:email,
        subject:"Reset your password",
        html:` <a href="${restLink}"><p>Click to Reset your password</p></a> `

    };

    try{
        await transporter.sendMail(emailOption);
        return {
            message:'Email sent successfully',
            success:true
        }


    }catch(error){

       console.log(error)
    }



}
export const sendTwoFactorEmail=async(email:string,token:string)=>{

    const restLink=`http://localhost:3000/auth/new-password?token=${token}`;

    const transporter=nodemailer.createTransport({
        host:'smtp.gmail.com',
        service:'gmail',
        port:465,
        auth:{
            user:process.env.PERSON_EMAIL,
            pass:process.env.EMAIL_APP_PASSWORD
            
        }
    })
    const emailOption={
        from:process.env.PERSON_EMAIL,
        to:email,
        subject:"2FA Code",
        html:`<p>Your 2fa code: ${token}</p>`

    };

    try{
        await transporter.sendMail(emailOption);
        return {
            message:'Email sent successfully',
            success:true
        }


    }catch(error){

       console.log(error)
    }



}