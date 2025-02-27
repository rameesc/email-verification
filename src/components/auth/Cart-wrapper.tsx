'use client'
import React from 'react'
import { Card,CardContent,CardFooter,CardHeader } from '../ui/card'
import { Header } from './Header'
import { Social } from './Social'
import { BackButton } from './BackButton'

interface CartwrapperProps{
    children:React.ReactNode,
    headerLabel:string,
    backButtonLabel:string,
    backButtonHref:string,
    showSocial?:boolean
}

export const Cartwrapper = ({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}:CartwrapperProps) => {
  return (
   <Card className='w-[400px] shadow-md'>
    <CardHeader>
        <Header label={headerLabel}/>
    </CardHeader>
    <CardContent>
      {children}

    </CardContent>

    {showSocial&&(
        <CardFooter>
            <Social/>
        </CardFooter>

    )}
    <CardFooter>
        <BackButton
         label={backButtonLabel}
          href={backButtonHref}
         />

    </CardFooter>
  

   </Card>
  )
}

