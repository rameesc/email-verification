
import {Header} from '@/components/auth/Header'
import { BackButton } from './BackButton'
import { 
    Card,
    CardContent,
    CardFooter,
    CardHeader } from "@/components/ui/card"
import { Cartwrapper } from './Cart-wrapper'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

export const ErrorCard=()=>{

    return(
        <Cartwrapper
          headerLabel='Oops! Something went wrong!'
          backButtonHref="/auth/login"
          backButtonLabel="Back to login"
         

         >
             <div className='bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive'>
            <ExclamationTriangleIcon className='h-4 w-4'/>
            <p>hhh hh</p>
          </div>

         </Cartwrapper>
    )
}