import { ExtendedUser } from "@/next-auth"
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";


interface UserInfoProps{
    user:any,
    label:string
}

export const UserInfo=({
    user,
    label
}:UserInfoProps)=>{
   

    return (
        <Card className="lg:w-[600px] w-[100%] shadow-md">
            <CardHeader>
             <p className="text-2xl text-black font-semibold text-center">
                {label}
               
             </p>
            </CardHeader>
            <CardContent className="space-y-4">

                <div className="flex gap-3 bg-red-300 flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">ID</p>
                    <p className="text-[12px]">{user?.id}</p>
                </div>
                <div className="flex gap-3 bg-red-300 flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Name</p>
                    <p className="text-[12px]">{user?.name}</p>
                </div>
                <div className="flex gap-3 bg-red-300 flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-[12px]">{user?.email}</p>
                </div>
                <div className="flex gap-3 bg-red-300 flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Role</p>
                    <p className="text-[12px]">{user?.role}</p>
                </div>
                <div className="flex gap-3  flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <p className="text-sm font-medium">Two Factor Authentication</p>
                    <Badge variant={user?.isTwoFactorEnabled?"success":"destructive"} className="text-[12px] text-black">{user?.isTwoFactorEnabled?"ON":"OFF"}</Badge>
                </div>

            </CardContent>
        </Card>
    )

}