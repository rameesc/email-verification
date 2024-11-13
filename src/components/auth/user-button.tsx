'use client'
import { FaUser } from "react-icons/fa"

import {
     DropdownMenu ,
     DropdownMenuContent,
     DropdownMenuItem,
     DropdownMenuTrigger

    } from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarImage,
    AvatarFallback

} from "@/components/ui/avatar"
import { useCurrentUser } from "@/hooks/use-current-user"
import LogOutButton from "./LogOutButton"
import { FiLogOut } from "react-icons/fi";


export const UserButtom=async()=>{

    const user=useCurrentUser();
    return(
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarImage src={user?.image||''}/>
                    <AvatarFallback className="bg-sky-500">
                        <FaUser className="text-white"/>

                    </AvatarFallback>
                </Avatar>

            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40" align="end">
                <LogOutButton>
                    <DropdownMenuItem>
                        <FiLogOut className="h-4 w-4 mr-2"/>
                        LogOut
                    </DropdownMenuItem>

                </LogOutButton>

            </DropdownMenuContent>

        </DropdownMenu>
    )

}