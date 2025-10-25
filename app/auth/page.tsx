'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import LoginForm from '@/components/auth/LoginForm'
import RegisterForm from '@/components/auth/RegisterForm'

type AuthMode = 'login' | 'register'

const AuthPage = () => {
    const [mode, setMode] = useState<AuthMode>('login')
    const searchParams = useSearchParams()

    useEffect(() => {
        // Check URL parameters to determine initial mode
        const authMode = searchParams.get('mode') as AuthMode
        if (authMode === 'register' || authMode === 'login') {
            setMode(authMode)
        }
    }, [searchParams])

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

export default AuthPage
