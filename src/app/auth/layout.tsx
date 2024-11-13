import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800'>
        {children}
    </div>
  )
}

export default AuthLayout