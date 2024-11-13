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
import { LoginSchema, RegisterSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { login } from '@/actions/login'
import { register } from '@/actions/register'


export const RegisterForm = () => {

    const [error,setError]=useState<string | undefined>('')
    const [success,setSuccess]=useState<string | undefined>('')

    const [isPending,startTransition]=useTransition();

    const from=useForm<z.infer<typeof RegisterSchema>>({
        resolver:zodResolver(RegisterSchema),
        defaultValues: {
            email:'',
            password:'',
            name:''
            
            
        },
    })

    const onSubmit= (values:z.infer<typeof RegisterSchema>)=>{
        setError('')
        setSuccess('')
        startTransition(()=>{
          register(values)
            .then((res)=>{
                setError(res?.error)
                setSuccess(res?.success)
            })
        })
      

    }
  return (
    <div>
        <Cartwrapper
          headerLabel='Create an account'
          backButtonHref="/auth/login"
          backButtonLabel="if you already have account?"
          showSocial
         

         >
           <Form {...from}>
            <form 
             
             onSubmit={from.handleSubmit(onSubmit)}
             className='space-y-6'
              >
                <div className='space-y-4'>
                   <FormField
                      control={from.control}
                      name="name"
                      render={({field})=>(
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input 
                                disabled={isPending}
                                  {...field}
                               
                                  placeholder='john don'
                                     type="text"
                                  />
                            </FormControl>
                            <FormMessage/>

                        </FormItem>
                      )}
                    />
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
                    <FormField
                      control={from.control}
                      name="password"
                      render={({field})=>(
                        <FormItem>
                            <FormLabel>password</FormLabel>
                            <FormControl>
                                <Input 
                                  {...field}
                                  disabled={isPending}
                               
                                  placeholder='*** ***'
                                     type="password"
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
                    Register
                </Button>

            </form>

           </Form>
        </Cartwrapper>
    </div>
  )
}
