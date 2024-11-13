'use client'
import React,{useState, useTransition} from 'react'
import { Cartwrapper } from './Cart-wrapper'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import {zodResolver} from '@hookform/resolvers/zod'
import{
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage

} from '@/components/ui/form'
import { ResetSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { reset } from '@/actions/resetpassword'


export const ResetForm = () => {

 

    const [error,setError]=useState<string | undefined>('')
    const [success,setSuccess]=useState<string | undefined>('')

    const [isPending,startTransition]=useTransition();



    const from=useForm<z.infer<typeof ResetSchema>>({
        resolver:zodResolver(ResetSchema),
        defaultValues: {
            email:'',
            
            
            
        },
    })

    const onSubmit= (values:z.infer<typeof ResetSchema>)=>{
        setError('')
        setSuccess('')
        console.log(values)
        startTransition(()=>{
          reset(values)
            .then((res)=>{
                setError(res?.error)
                setSuccess(res?.success)
            })
        })
      

    }
  return (
    <div>
        <Cartwrapper
          headerLabel='Forgot your password'
          backButtonHref="/auth/login"
          backButtonLabel="Back to login"
          

         >
           <Form {...from}>
            <form 
             
             onSubmit={from.handleSubmit(onSubmit)}
             className='space-y-6'
              >
                <div className='space-y-4'>
                    <FormField
                      control={from.control}
                      name="email"
                      render={({field})=>(
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input 
                                disabled={isPending}
                                  {...field}
                               
                                  placeholder='email@gmail.com'
                                     type="email"
                                  />
                            </FormControl>
                            <FormMessage/>

                        </FormItem>
                      )}
                    />
                    
                </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>
                <Button
                 disabled={isPending}
                 type="submit"
                 className='w-full'
                >
                    Send reset email
                </Button>

            </form>

           </Form>
        </Cartwrapper>
    </div>
  )
}
