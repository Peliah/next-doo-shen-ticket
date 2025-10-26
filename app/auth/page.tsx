'use client'

import React, { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'

type AuthMode = 'login' | 'register'

const AuthContent = () => {
    const searchParams = useSearchParams()

    const getInitialMode = (): AuthMode => {
        const authMode = searchParams.get('mode') as AuthMode
        return authMode === 'register' || authMode === 'login' ? authMode : 'login'
    }

    const [mode, setMode] = useState<AuthMode>(getInitialMode)

    const switchToLogin = () => setMode('login')
    const switchToRegister = () => setMode('register')

    return (
        <>
            {mode === 'login' ? (
                <LoginForm onSwitchToRegister={switchToRegister} />
            ) : (
                <RegisterForm onSwitchToLogin={switchToLogin} />
            )}
        </>
    )
}

const AuthPage = () => {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-screen">Loading...</div>}>
            <AuthContent />
        </Suspense>
    )
}

export default AuthPage