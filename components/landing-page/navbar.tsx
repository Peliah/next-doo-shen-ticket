'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { LogIn, UserPlus, LogOut, User } from 'lucide-react'
import { CurrentUser } from '@/lib/schemas/auth'

const Navbar = () => {
    const [user, setUser] = useState<CurrentUser | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = () => {
            try {
                const sessionToken = localStorage.getItem('ticketapp_session')
                if (sessionToken) {
                    const userData = JSON.parse(sessionToken)
                    setUser(userData)
                } else {
                    setUser(null)
                }
            } catch (error) {
                console.error('Error parsing session data:', error)
                localStorage.removeItem('ticketapp_session')
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        checkAuth()

        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'ticketapp_session') {
                checkAuth()
            }
        }

        const handleAuthChange = () => {
            checkAuth()
        }

        window.addEventListener('storage', handleStorageChange)
        window.addEventListener('authChange', handleAuthChange)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('authChange', handleAuthChange)
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('ticketapp_session')
        setUser(null)
        window.dispatchEvent(new Event('authChange'))
        window.location.href = '/'
    }

    return (
        <header className="bg-[#232323] text-white font-mono">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <h1 className="text-2xl font-bold">DST</h1>
                    </Link>

                    <ul className="hidden md:flex items-center space-x-8">
                        <li>
                            <Link href="/" className="hover:text-gray-300 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard/tickets" className="hover:text-gray-300 transition-colors">
                                Tickets
                            </Link>
                        </li>
                        <li>
                            <Link href="/dashboard" className="hover:text-gray-300 transition-colors">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-gray-300 transition-colors">
                                Contact
                            </Link>
                        </li>
                    </ul>

                    <div className="flex items-center space-x-4">
                        {isLoading ? (
                            <div className="text-gray-300 font-mono">Loading...</div>
                        ) : user ? (
                            <>
                                <Link href="/dashboard" className="flex items-center space-x-2 px-4 py-2 border border-white rounded-md hover:bg-white hover:text-[#232323] transition-colors">
                                    <User className="h-4 w-4" />
                                    <span>{user.name}</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link href="/auth?mode=login" className="flex items-center space-x-2 px-4 py-2 border border-white rounded-md hover:bg-white hover:text-[#232323] transition-colors">
                                    <LogIn className="h-4 w-4" />
                                    <span>Sign In</span>
                                </Link>
                                <Link href="/auth?mode=register" className="flex items-center space-x-2 px-4 py-2 bg-white text-[#232323] rounded-md hover:bg-gray-200 transition-colors">
                                    <UserPlus className="h-4 w-4" />
                                    <span>Sign Up</span>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar