'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { CurrentUser, User } from '@/lib/schemas/auth'

// Custom hook for authentication state management
export const useAuth = () => {
    const [user, setUser] = useState<CurrentUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = () => {
            try {
                const currentUser = localStorage.getItem('dst_current_user')
                if (currentUser) {
                    const userData = JSON.parse(currentUser)
                    setUser(userData)
                }
            } catch (error) {
                console.error('Error parsing user data:', error)
                localStorage.removeItem('dst_current_user')
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()
    }, [])

    const login = (userData: CurrentUser) => {
        localStorage.setItem('dst_current_user', JSON.stringify(userData))
        setUser(userData)
    }

    const logout = () => {
        localStorage.removeItem('dst_current_user')
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

// Custom hook for login functionality
export const useLogin = () => {
    const router = useRouter()
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true)

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Get stored users from localStorage
            const storedUsers = localStorage.getItem('dst_users')
            const users: User[] = storedUsers ? JSON.parse(storedUsers) : []

            // Find user
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
        } catch (error) {
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

// Custom hook for register functionality
export const useRegister = () => {
    const router = useRouter()
    const { login } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const handleRegister = async (name: string, email: string, password: string) => {
        setIsLoading(true)

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Get stored users from localStorage
            const storedUsers = localStorage.getItem('dst_users')
            const users: User[] = storedUsers ? JSON.parse(storedUsers) : []

            // Check if user already exists
            const existingUser = users.find((u) => u.email === email)
            if (existingUser) {
                toast.error('An account with this email already exists')
                return { success: false, error: 'An account with this email already exists' }
            }

            // Create new user
            const newUser: User = {
                id: Date.now().toString(),
                name: name.trim(),
                email,
                password,
                createdAt: new Date().toISOString(),
            }

            // Store user
            users.push(newUser)
            localStorage.setItem('dst_users', JSON.stringify(users))

            // Create current user session
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
        } catch (error) {
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
