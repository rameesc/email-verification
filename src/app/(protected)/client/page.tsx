'use client'

import { auth } from '@/auth'
import { UserInfo } from '@/components/user-info'
import { useCurrentUser } from '@/hooks/use-current-user'
import { currentUser } from '@/lib/auth'
import React from 'react'

const ClientPage = () => {

    const user= useCurrentUser()


  return (
    <div>
       <UserInfo user={user} label='client components'/>
    </div>
  )
}

export default ClientPage