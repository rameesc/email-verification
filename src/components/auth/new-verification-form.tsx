'use client'

import { Cartwrapper } from "./Cart-wrapper"
import {BeatLoader} from 'react-spinners'
import {useSearchParams} from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/new-verification"

import { FormError } from "../form-error"
import { FormSuccess } from "../form-success"


export const NewVerificationForm=()=>{

    const [error,setError]=useState<string | undefined>('')

    const [success,setSuccess]=useState<string | undefined>('')

    const searchParams=useSearchParams();
    const token=searchParams.get("token")
   

   const onSumbit=useCallback(()=>{

    if(!token){
        setError("missing token");
        return
    }

    newVerification(token)
    .then((res)=>{

        setError(res.error)
        setSuccess(res.success)

    })
    .catch((error)=>{
        setError("something went wrong")
    })

   },[token])

   useEffect(()=>{
    onSumbit()

   },[onSumbit])

    return(
        <Cartwrapper
         headerLabel="Confirming your verification"
         backButtonLabel="back to login"
         backButtonHref="/auth/login"
        >
           <div className="flex items-center flex-col gap-2 w-full justify-center">
            {!success && !error &&(
                <BeatLoader/>
            )}
            
            <FormSuccess message={success}/>
            <FormError message={error}/>

           </div>
        </Cartwrapper>
    )

}