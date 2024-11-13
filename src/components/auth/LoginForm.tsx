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
import { LoginSchema } from '@/schemas'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../form-error'
import { FormSuccess } from '../form-success'
import { login } from '@/actions/login'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export const LoginForm = () => {

  const searchParams=useSearchParams()
  const urlError=searchParams.get("error")


     const [showTwoFactor,setShowTwoFactor]=useState<Boolean | undefined>(false)
    const [error,setError]=useState<string | undefined>('')
    const [success,setSuccess]=useState<string | undefined>('')

    const [isPending,startTransition]=useTransition();



    const from=useForm<z.infer<typeof LoginSchema>>({
        resolver:zodResolver(LoginSchema),
        defaultValues: {
            email:'',
            password:'',
            code:''
            
            
        },
    })

    const onSubmit= (values:z.infer<typeof LoginSchema>)=>{
        setError('')
        setSuccess('')
        startTransition(()=>{
            login(values)
            .then((res)=>{
              if(res?.error){
                from.reset();
                setError(res?.error)
              }

              if(res?.success){
                from.reset();
                setSuccess(res?.success)

              }
              if(res?.twoFactor){
                setShowTwoFactor(true)
              }
                
                
            })
            .catch(()=>{
              setError("something wrong")
            })
        })
      

    }
  return (
    <div>
        <Cartwrapper
          headerLabel='welcome back'
          backButtonHref="/auth/register"
          backButtonLabel="Dont't have an account?"
          showSocial

         >
           <Form {...from}>
            <form 
             
             onSubmit={from.handleSubmit(onSubmit)}
             className='space-y-6'
              >
                <div className='space-y-4'>
                  {showTwoFactor &&(
                    <FormField
                    control={from.control}
                    name="code"
                    render={({field})=>(
                      <FormItem>
                          <FormLabel>Two factor code</FormLabel>
                          <FormControl>
                              <Input 
                              disabled={isPending}
                                {...field}
                             
                                placeholder='123456'
                                  
                                />
                          </FormControl>
                          <FormMessage/>

                      </FormItem>
                    )}
                  />

                  )}
                  {!showTwoFactor&&(
                    <>
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
                            <Button
                            size="sm"
                            variant="link"
                            className='px-0 text-blue-500 underline'
                            >
                              <Link href="/auth/reset">
                              Forgot password?
                              </Link>
                            </Button>
                            <FormMessage/>

                        </FormItem>
                      )}
                    />
                   </>
                  )
                    }

                </div>
                <FormError message={error}/>
                <FormSuccess message={success}/>
                <Button
                    disabled={isPending}
                 type="submit"
                 className='w-full'
                >
                   {showTwoFactor?"confirm":"login"}
                </Button>

            </form>

           </Form>
        </Cartwrapper>
    </div>
  )
}
