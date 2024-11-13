

export const publicRoutes=[
    "/",
    "/auth/new-verification",
   
]

export const authRoutes=[
    "/auth/login",
    "/auth/register",
    "/auth/reset",
    "/auth/new-password",
    "auth/error"
]

export const apiAuthPrefix="/api/auth"

/**
 * this default redirect path after logging in 
 */

export const DEFAULT_LOGIN_REDIRECT='/settings'