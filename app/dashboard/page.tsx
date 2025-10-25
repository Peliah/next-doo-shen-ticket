'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Ticket, TrendingUp, Settings, BarChart3 } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { useTickets } from '@/hooks/useTickets'

const DashboardPage = () => {
    const router = useRouter()
    const { user, isLoading } = useAuth()
    const { tickets, getTicketStats } = useTickets()

    useEffect(() => {
        if (!isLoading && !user) {
            toast.error('Please log in to access the dashboard')
            router.push('/auth?mode=login')
        }
    }, [user, isLoading, router])


    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#232323] flex items-center justify-center">
                <div className="text-white font-mono text-xl">Loading...</div>
            </div>
        )
    }

    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-[#232323]">
            <main className="max-w-[1440px] mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-white font-mono mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Link href="/dashboard/tickets" className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex items-center space-x-3">
                                <Ticket className="h-6 w-6 text-blue-400" />
                                <div>
                                    <h3 className="text-white font-mono font-semibold">Ticket Management</h3>
                                    <p className="text-gray-400 font-mono text-sm">Create and manage support tickets</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/dashboard/tickets" className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex items-center space-x-3">
                                <Settings className="h-6 w-6 text-green-400" />
                                <div>
                                    <h3 className="text-white font-mono font-semibold">Team Management</h3>
                                    <p className="text-gray-400 font-mono text-sm">Assign tickets to team members</p>
                                </div>
                            </div>
                        </Link>

                        <Link href="/analytics" className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                            <div className="flex items-center space-x-3">
                                <BarChart3 className="h-6 w-6 text-purple-400" />
                                <div>
                                    <h3 className="text-white font-mono font-semibold">Support Analytics</h3>
                                    <p className="text-gray-400 font-mono text-sm">Track performance and trends</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold text-white font-mono mb-4">Ticket Statistics</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 font-mono text-sm">Total Tickets</p>
                                    <p className="text-3xl font-bold text-white font-mono">{getTicketStats().total}</p>
                                    <p className="text-gray-400 font-mono text-xs mt-1">All time</p>
                                </div>
                                <Ticket className="h-8 w-8 text-blue-400" />
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 font-mono text-sm">Open Tickets</p>
                                    <p className="text-3xl font-bold text-white font-mono">{getTicketStats().open}</p>
                                    <p className="text-gray-400 font-mono text-xs mt-1">Pending resolution</p>
                                </div>
                                <Settings className="h-8 w-8 text-orange-400" />
                            </div>
                        </div>

                        <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-400 font-mono text-sm">Resolved Tickets</p>
                                    <p className="text-3xl font-bold text-white font-mono">{getTicketStats().closed}</p>
                                    <p className="text-gray-400 font-mono text-xs mt-1">Successfully closed</p>
                                </div>
                                <TrendingUp className="h-8 w-8 text-green-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Ticket Activity */}
                <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white font-mono mb-4">Recent Ticket Activity</h3>

                    <div className="space-y-3">
                        {tickets
                            .sort((a, b) => new Date(b.updatedAt || b.createdAt || '').getTime() - new Date(a.updatedAt || a.createdAt || '').getTime())
                            .slice(0, 4)
                            .map((ticket) => {
                                const getStatusColor = (status: string) => {
                                    switch (status) {
                                        case 'open': return 'bg-red-400'
                                        case 'in_progress': return 'bg-yellow-400'
                                        case 'closed': return 'bg-green-400'
                                        default: return 'bg-gray-400'
                                    }
                                }

                                const getStatusText = (status: string) => {
                                    switch (status) {
                                        case 'open': return 'New ticket'
                                        case 'in_progress': return 'Ticket updated'
                                        case 'closed': return 'Ticket resolved'
                                        default: return 'Ticket updated'
                                    }
                                }

                                const formatTimeAgo = (dateString: string) => {
                                    const date = new Date(dateString)
                                    const now = new Date()
                                    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

                                    if (diffInMinutes < 60) {
                                        return `${diffInMinutes} minutes ago`
                                    } else if (diffInMinutes < 1440) {
                                        return `${Math.floor(diffInMinutes / 60)} hours ago`
                                    } else {
                                        return `${Math.floor(diffInMinutes / 1440)} days ago`
                                    }
                                }

                                return (
                                    <div key={ticket.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                        <div className="flex items-center space-x-3">
                                            <div className={`w-2 h-2 rounded-full ${getStatusColor(ticket.status)}`}></div>
                                            <span className="text-white font-mono text-sm">
                                                {getStatusText(ticket.status)} #{ticket.id} - &quot;{ticket.title}&quot;
                                            </span>
                                        </div>
                                        <span className="text-gray-400 font-mono text-xs">
                                            {formatTimeAgo(ticket.updatedAt || ticket.createdAt || '')}
                                        </span>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </main>
        </div>
    )
}

export default DashboardPage


