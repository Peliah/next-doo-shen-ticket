'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Plus, Filter, Search } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/hooks/useAuth'
import { useTickets } from '@/hooks/useTickets'
import { Ticket } from '@/lib/schemas/ticket'
import CreateTicketForm from '@/components/tickets/CreateTicketForm'
import EditTicketForm from '@/components/tickets/EditTicketForm'
import DeleteTicketModal from '@/components/tickets/DeleteTicketModal'
import TicketCard from '@/components/tickets/TicketCard'

const TicketsPage = () => {
    const router = useRouter()
    const { user, isLoading: authLoading } = useAuth()
    const { tickets, isLoading, deleteTicket, getTicketStats } = useTickets()
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [editingTicket, setEditingTicket] = useState<Ticket | null>(null)
    const [deletingTicket, setDeletingTicket] = useState<Ticket | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState('all')

    // Filter and search tickets
    const filteredTickets = tickets.filter(ticket => {
        const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ticket.assignee?.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter

        return matchesSearch && matchesStatus
    })

    const stats = getTicketStats()

    const handleDeleteConfirm = () => {
        if (deletingTicket?.id) {
            deleteTicket(deletingTicket.id)
            setDeletingTicket(null)
        }
    }

    useEffect(() => {
        if (!authLoading && !user) {
            toast.error('Please log in to access ticket management')
            router.push('/auth?mode=login')
        }
    }, [user, authLoading, router])

    if (isLoading || authLoading) {
        return (
            <div className="min-h-screen bg-[#232323] flex items-center justify-center">
                <div className="text-white font-mono text-xl">Loading tickets...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#232323]">
            {/* Header */}
            <div className="bg-[#232323] border-b border-white/10">
                <div className="max-w-[1440px] mx-auto px-4 py-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-white font-mono">Ticket Management</h1>
                            <p className="text-gray-400 font-mono text-sm mt-1">
                                Manage and track all support tickets
                            </p>
                        </div>
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="h-4 w-4" />
                            <span>Create Ticket</span>
                        </button>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-2xl font-bold text-white font-mono">{stats.total}</div>
                            <div className="text-gray-400 font-mono text-sm">Total Tickets</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-2xl font-bold text-red-400 font-mono">{stats.open}</div>
                            <div className="text-gray-400 font-mono text-sm">Open</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-2xl font-bold text-yellow-400 font-mono">{stats.inProgress}</div>
                            <div className="text-gray-400 font-mono text-sm">In Progress</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                            <div className="text-2xl font-bold text-green-400 font-mono">{stats.closed}</div>
                            <div className="text-gray-400 font-mono text-sm">Closed</div>
                        </div>
                    </div>

                    {/* Search and Filter */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search tickets by title, description, or assignee..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 font-mono"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <Filter className="h-4 w-4 text-gray-400" />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-blue-400 font-mono"
                            >
                                <option value="all" className="bg-[#232323]">All Status</option>
                                <option value="open" className="bg-[#232323]">Open</option>
                                <option value="in_progress" className="bg-[#232323]">In Progress</option>
                                <option value="closed" className="bg-[#232323]">Closed</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-[1440px] mx-auto px-4 py-8">
                {/* Tickets Grid */}
                {filteredTickets.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 font-mono text-lg mb-2">
                            {searchTerm || statusFilter !== 'all'
                                ? 'No tickets match your search criteria'
                                : 'No tickets found'
                            }
                        </div>
                        <p className="text-gray-500 font-mono text-sm">
                            {searchTerm || statusFilter !== 'all'
                                ? 'Try adjusting your search or filter'
                                : 'Create your first ticket to get started'
                            }
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredTickets.map(ticket => (
                            <TicketCard
                                key={ticket.id}
                                ticket={ticket}
                                onEdit={setEditingTicket}
                                onDelete={setDeletingTicket}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Modals */}
            {showCreateForm && (
                <CreateTicketForm onClose={() => setShowCreateForm(false)} />
            )}

            {editingTicket && (
                <EditTicketForm
                    ticket={editingTicket}
                    onClose={() => setEditingTicket(null)}
                />
            )}

            {deletingTicket && (
                <DeleteTicketModal
                    ticket={deletingTicket}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => setDeletingTicket(null)}
                />
            )}
        </div>
    )
}

export default TicketsPage