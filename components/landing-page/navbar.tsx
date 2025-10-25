import React from 'react'
import Link from 'next/link'
import { LogIn, UserPlus } from 'lucide-react'

const Navbar = () => {
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
                            <Link href="/events" className="hover:text-gray-300 transition-colors">
                                Events
                            </Link>
                        </li>
                        <li>
                            <Link href="/tickets" className="hover:text-gray-300 transition-colors">
                                My Tickets
                            </Link>
                        </li>
                        <li>
                            <Link href="/contact" className="hover:text-gray-300 transition-colors">
                                Contact
                            </Link>
                        </li>
                    </ul>

                    <div className="flex items-center space-x-4">
                        <Link href="/login" className="flex items-center space-x-2 px-4 py-2 border border-white rounded-md hover:bg-white hover:text-[#232323] transition-colors">
                            <LogIn className="h-4 w-4" />
                            <span>Sign In</span>
                        </Link>
                        <Link href="/register" className="flex items-center space-x-2 px-4 py-2 bg-white text-[#232323] rounded-md hover:bg-gray-200 transition-colors">
                            <UserPlus className="h-4 w-4" />
                            <span>Sign Up</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar