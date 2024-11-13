import React from "react"
import Navbar from "./_components/Navbar";


interface ProtectedLayoutProps{
    children:React.ReactNode;
}

const ProtectedLayout=({children}:ProtectedLayoutProps)=>{

    return(
        <div className="h-screen w-full flex flex-col items-center justify-center gap-y-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
             <Navbar/>
            {children}
        </div>
    )

}

export default ProtectedLayout