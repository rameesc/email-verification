'use client'

import React from 'react'
import Link from "next/link"
import {usePathname} from "next/navigation"
import { Button } from '@/components/ui/button'
import { UserButtom } from '@/components/auth/user-button'

const Navbar = () => {
    const pathname=usePathname();

  return (
    <nav className='bg-secondary flex justify-between items-center p-4 rounded-xl w-[100%] md:w-[600px] lg:w-[600px] shadow-md'>
      <div className='flex gap-x-2'>
        <Button
        variant={pathname=='/server'?"default":"outline"}
        >
            <Link href="/server">server</Link>
        </Button>
        <Button
        variant={pathname=='/client'?"default":"outline"}
        >
            <Link href="/client">Client</Link>
        </Button>
        <Button
        variant={pathname=='/admin'?"default":"outline"}
        >
            <Link href="/admin">Admin</Link>
        </Button>
        <Button
        variant={pathname=='/settings'?"default":"outline"}
        >
            <Link href="/settings">Settings</Link>
        </Button>
      </div>
     <UserButtom/>
    </nav>
  )
}

export default Navbar