import React from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Instagram, HelpCircle, Mail, Shield, FileText } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-[#232323] text-white font-mono">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <h2 className="text-2xl font-bold">DST</h2>
                        </Link>
                        <p className="text-gray-300 mb-4 max-w-md">
                            Your premier destination for event ticket management.
                            Discover, purchase, and manage your event tickets with ease.
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                <span className="sr-only">Facebook</span>
                                <Facebook className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                                <span className="sr-only">Instagram</span>
                                <Instagram className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                                    Events
                                </Link>
                            </li>
                            <li>
                                <Link href="/tickets" className="text-gray-300 hover:text-white transition-colors">
                                    My Tickets
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                                    <HelpCircle className="h-4 w-4" />
                                    <span>Help Center</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                                    <Mail className="h-4 w-4" />
                                    <span>Contact Us</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/privacy" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                                    <Shield className="h-4 w-4" />
                                    <span>Privacy Policy</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
                                    <FileText className="h-4 w-4" />
                                    <span>Terms of Service</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-600 mt-8 pt-8 text-center">
                    <p className="text-gray-300">
                        © {new Date().getFullYear()} DST Event Ticket Management. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer