
import NextAuth,{DefaultSession} from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credential  from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserByEmail, getUserById } from "./data/user";
import bcrypt from 'bcryptjs'
import { User } from "./models/Userschema";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { TwoFactoreToken, TwoFactoreTokenConfirmation } from "./models/twoFactoreTokenSchema";
import { getAccountByUserId } from "./data/account";




export const { handlers, signIn, signOut, auth } = NextAuth({
 
  providers: [
    GitHub({
      clientId:process.env.GITHUB_CLIENT_ID,
      clientSecret:process.env.GITHUB_CLIENT_SERCET,
    }),
    Google({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret:process.env.GOOGLE_CLIENT_SERCET,
    }),
    Credential({
      async authorize(credentials){

        const validateField=LoginSchema.safeParse(credentials);

        if(validateField.success){
          const {email,password}=validateField.data

          const user=await getUserByEmail(email)
          if(!user || !user.password) return null

          const passwordsMatch=await bcrypt.compare(
            password,
            user?.password
          );

          if(passwordsMatch){
            return user
          }
        }
        return null;

      }
      
    })
  
    
  ],
  pages:{
    signIn:"/auth/login",
    error:'/auth/error'
  },

  events:{
    async linkAccount({user}){
      await User.findByIdAndUpdate(user.id,{
        emailVerified:new Date()

      })
    }

  },
  
  callbacks:{

    async signIn({user,account}){
     

      if(account?.provider!=="credentials"){
        return true
      }
      const existingUser=await getUserById(user.id as string)
      
      //prevent sign in widthout email verification

      if(!existingUser?.emailVerified) return false

      //Add 2fa check

      if(existingUser.isTwoFactoreEnabled){

        const twoFactorConfirmation=await getTwoFactorConfirmationByUserId(existingUser._id)
          
        console.log(twoFactorConfirmation)
        if(!twoFactorConfirmation) return false

        await TwoFactoreTokenConfirmation.findByIdAndDelete(
          twoFactorConfirmation._id
        )

      }

     return true

    },

    async session({token,session}){
     
      if(session.user && token.sub){
        session.user.id=token.sub
      
        
      }

      if(token.role && session.user){
          session.user.role=token.role as "ADMIN" | "USER"

      }
      if(session.user){
          session.user.isTwoFactorEnabled=token.isTwoFactorEnabled as boolean

          session.user.name=token.name;
          session.user.email=token.email as string;
          session.user.isOAuth=token.isOAuth as boolean

      }
    
      return session

    },
    

    async jwt({token,user,account,profile}){

      if(!token.sub) return token

      const existingUser=await getUserById(token.sub)

      if(!existingUser) return token;
      
      const existingAccount=await getAccountByUserId(existingUser._id)


       token.isOAuth=!!existingAccount
       token.name=existingUser.name
       token.email=existingUser.email
      token.role=existingUser.role
      token.isTwoFactorEnabled=existingUser.isTwoFactoreEnabled
    
      return token;
    }  
    
    
  }
})