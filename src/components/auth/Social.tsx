'use client'

import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { Button } from '../ui/button'
import {signIn } from 'next-auth/react'
import { DEFAULT_LOGIN_REDIRECT } from '@/route'


export const Social=()=>{

    const onClick=(provider:"google"|"github")=>{
        signIn(provider,{
            callbackUrl:DEFAULT_LOGIN_REDIRECT
        })

    }

    return(
        <div className="flex items-center justify-center w-full gap-x-2">
           <Button 
            size='lg' 
            className='w-full'
            variant={'outline'} 
            onClick={()=>onClick("google")}
            >
            <FcGoogle/>
           </Button>
           <Button size='lg' 
            variant={'outline'}  
            className='w-full'
            onClick={()=>onClick("github")}
            >
                   
            <FaGithub/>
           </Button>
        </div>
    )
}