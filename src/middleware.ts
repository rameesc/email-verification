import {auth} from '@/auth'
import {
 DEFAULT_LOGIN_REDIRECT,
 publicRoutes,
 apiAuthPrefix,
 authRoutes
} from '@/route'
import { NextResponse } from 'next/server'

export default auth((req)=>{
   
    const {nextUrl}=req


    const isLoggedin= !!req.auth

    const isApiAuthRoute=nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute=publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute=authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return null
    }
    
    if(isAuthRoute){

        if(isLoggedin){
            return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))

        }


       return null
    }

    if(!isLoggedin && !isPublicRoute){
        return NextResponse.redirect(new URL('/auth/login',nextUrl))

    }

    return null;


})

export const config={
    matcher:[ '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}