'use client'
import React from 'react'
import { useRouter } from 'next/navigation';


interface LoginButtonPropd{
  children:React.ReactNode;
  mode?:'modal'|"redirect",
  asChild?:boolean
}




const Loginbutton = ({
  children,
  mode='redirect',
  asChild
}:LoginButtonPropd) => {
  const route=useRouter()

  const onClick=()=>{
   route.push('/auth/login')
  }

  if(mode=='modal'){
    return <span>
      Todo:implement modal
    </span>
  }


  return (
   <span onClick={onClick} className=' cursor-pointer'>
    {children}
   </span>
  )
}

export default Loginbutton