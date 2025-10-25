'use client'

import React from 'react'
import { Edit, Trash2, Calendar, User, Clock } from 'lucide-react'
import { Ticket } from '@/lib/schemas/ticket'

interface TicketCardProps {
    ticket: Ticket
    onEdit: (ticket: Ticket) => void
    onDelete: (ticket: Ticket) => void
}

const TicketCard = ({ ticket, onEdit, onDelete }: TicketCardProps) => {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-red-500'
            case 'in_progress': return 'bg-yellow-500'
            case 'closed': return 'bg-green-500'
            default: return 'bg-gray-500'
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'low': return 'bg-blue-500'
            case 'medium': return 'bg-yellow-500'
            case 'high': return 'bg-orange-500'
            case 'urgent': return 'bg-red-500'
            default: return 'bg-gray-500'
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    return (
        <div className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                    <h3 className="text-white font-mono font-semibold text-sm mb-1">
                        #{ticket.id} - {ticket.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-mono text-white ${getStatusColor(ticket.status)}`}>
                            {ticket.status.replace('_', ' ').toUpperCase()}
                        </span>
                        {ticket.priority && (
                            <span className={`px-2 py-1 rounded-full text-xs font-mono text-white ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority.toUpperCase()}
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2">
                    <button
                        onClick={() => onEdit(ticket)}
                        className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                        title="Edit ticket"
                    >
                        <Edit className="h-4 w-4" />
                    </button>
                    <button
                        onClick={() => onDelete(ticket)}
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                        title="Delete ticket"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>

            {/* Description */}
            {ticket.description && (
                <p className="text-gray-300 font-mono text-xs mb-3 line-clamp-2">
                    {ticket.description}
                </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-400 font-mono">
                <div className="flex items-center space-x-4">
                    {ticket.assignee && (
                        <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{ticket.assignee}</span>
                        </div>
                    )}
                    <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{formatDate(ticket.createdAt || '')}</span>
                    </div>
                </div>

                {ticket.updatedAt && ticket.updatedAt !== ticket.createdAt && (
                    <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Updated {formatDate(ticket.updatedAt)}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export default TicketCard
