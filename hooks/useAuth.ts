'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CurrentUser, User } from '@/lib/schemas/auth'

export const useAuth = () => {
    const [user, setUser] = useState<CurrentUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = () => {
            try {
                const sessionToken = localStorage.getItem('ticketapp_session')
                if (sessionToken) {
                    const userData = JSON.parse(sessionToken)
                    setUser(userData)
                }
            } catch (error) {
                console.error('Error parsing session data:', error)
                localStorage.removeItem('ticketapp_session')
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = (userData: CurrentUser) => {
        localStorage.setItem('ticketapp_session', JSON.stringify(userData))
        setUser(userData)
        window.dispatchEvent(new Event('authChange'))
    }

    const logout = () => {
        localStorage.removeItem('ticketapp_session')
        setUser(null)
    }

    return {
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
    }
}

export const useLogin = () => {
    const router = useRouter()
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const storedUsers = localStorage.getItem('dst_users')
            const users: User[] = storedUsers ? JSON.parse(storedUsers) : []

            const user = users.find((u) => u.email === email && u.password === password)

            if (user) {
                const currentUser: CurrentUser = {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    loginTime: new Date().toISOString(),
                }

                login(currentUser)
                toast.success('Login successful! Welcome back!')
                router.push('/dashboard')
                return { success: true }
            } else {
                toast.error('Invalid email or password')
                return { success: false, error: 'Invalid email or password' }
            }
        } catch (err) {
            console.error('Login error:', err)
            toast.error('An error occurred. Please try again.')
            return { success: false, error: 'An error occurred. Please try again.' }
        } finally {
            setIsLoading(false)
        }
    }

    return {
        handleLogin,
        isLoading,
    }
}

export const useRegister = () => {
    const router = useRouter()
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (name: string, email: string, password: string) => {
        setIsLoading(true)

        try {
            await new Promise(resolve => setTimeout(resolve, 1000))

            const storedUsers = localStorage.getItem('dst_users')
            const users: User[] = storedUsers ? JSON.parse(storedUsers) : []

            const existingUser = users.find((u) => u.email === email)
            if (existingUser) {
                toast.error('An account with this email already exists')
                return { success: false, error: 'An account with this email already exists' }
            }

            const newUser: User = {
                id: Date.now().toString(),
                name: name.trim(),
                email,
                password,
                createdAt: new Date().toISOString(),
            }

            users.push(newUser)
            localStorage.setItem('dst_users', JSON.stringify(users))

            const currentUser: CurrentUser = {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                loginTime: new Date().toISOString(),
            }

            login(currentUser)
            toast.success('Account created successfully! Welcome to DST!')
            router.push('/dashboard')
            return { success: true }
        } catch (err) {
            console.error('Login error:', err)
            toast.error('An error occurred. Please try again.')
            return { success: false, error: 'An error occurred. Please try again.' }
        } finally {
            setIsLoading(false)
        }
    }

    return {
        handleRegister,
        isLoading,
    }
}
