import React from 'react'
import {cn} from '@/lib/utils'
import {Poppins} from 'next/font/google'
import { Button } from '@/components/ui/button'
import Loginbutton from '@/components/auth/Loginbutton'

const font=Poppins({
  subsets:['latin'],
  weight:['600']
})
const Home = () => {
  return (
    <main className='flex justify-center items-center w-full h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
      <div className='space-y-6 text-center'>
        <h1 className={ cn('text-6xl font-semibold text-white drop-shadow-md',font.className)}>Auth</h1>
        <p className='text-white text-lg'>A simple authentication serevice</p>
        <div>
          <Loginbutton mode="redirect">
           <Button variant={'secondary'} size={'lg'} >Sign in</Button>
          </Loginbutton>
        </div>
      </div>
    </main>
  )
}

export default Home
