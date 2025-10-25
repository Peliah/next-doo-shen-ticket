'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, Save } from 'lucide-react'
import { toast } from 'sonner'
import { updateTicketSchema, UpdateTicket, Ticket, TicketStatus, TicketPriority } from '@/lib/schemas/ticket'
import { useTickets } from '@/hooks/useTickets'

interface EditTicketFormProps {
    ticket: Ticket
    onClose: () => void
}

const EditTicketForm = ({ ticket, onClose }: EditTicketFormProps) => {
    const { updateTicket } = useTickets()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdateTicket>({
        resolver: zodResolver(updateTicketSchema),
        defaultValues: {
            id: ticket.id,
            title: ticket.title,
            description: ticket.description,
            status: ticket.status,
            priority: ticket.priority,
            assignee: ticket.assignee
        }
    })

    const onSubmit = async (data: UpdateTicket) => {
        setIsSubmitting(true)
        try {
            if (!ticket.id) {
                toast.error('Invalid ticket ID')
                return
            }
            updateTicket(ticket.id, data)
            onClose()
        } catch (error) {
            toast.error('Failed to update ticket')
        } finally {
            setIsSubmitting(false)
        }
    }

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

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#232323] rounded-lg p-6 w-full max-w-md mx-4">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white font-mono">Edit Ticket #{ticket.id}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block text-white font-mono text-sm mb-2">
                            Title *
                        </label>
                        <input
                            {...register('title')}
                            type="text"
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                            placeholder="Enter ticket title"
                        />
                        {errors.title && (
                            <p className="text-red-400 text-xs mt-1 font-mono">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-white font-mono text-sm mb-2">
                            Description
                        </label>
                        <textarea
                            {...register('description')}
                            rows={3}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 resize-none"
                            placeholder="Enter ticket description"
                        />
                        {errors.description && (
                            <p className="text-red-400 text-xs mt-1 font-mono">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-white font-mono text-sm mb-2">
                            Status *
                        </label>
                        <select
                            {...register('status')}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-blue-400"
                        >
                            {Object.values(TicketStatus).map(status => (
                                <option key={status} value={status} className="bg-[#232323]">
                                    {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
                                </option>
                            ))}
                        </select>
                        {errors.status && (
                            <p className="text-red-400 text-xs mt-1 font-mono">
                                {errors.status.message}
                            </p>
                        )}
                    </div>

                    {/* Priority */}
                    <div>
                        <label className="block text-white font-mono text-sm mb-2">
                            Priority
                        </label>
                        <select
                            {...register('priority')}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:border-blue-400"
                        >
                            <option value="">Select priority</option>
                            {Object.values(TicketPriority).map(priority => (
                                <option key={priority} value={priority} className="bg-[#232323]">
                                    {priority.charAt(0).toUpperCase() + priority.slice(1)}
                                </option>
                            ))}
                        </select>
                        {errors.priority && (
                            <p className="text-red-400 text-xs mt-1 font-mono">
                                {errors.priority.message}
                            </p>
                        )}
                    </div>

                    {/* Assignee */}
                    <div>
                        <label className="block text-white font-mono text-sm mb-2">
                            Assignee
                        </label>
                        <input
                            {...register('assignee')}
                            type="text"
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
                            placeholder="Enter assignee name"
                        />
                        {errors.assignee && (
                            <p className="text-red-400 text-xs mt-1 font-mono">
                                {errors.assignee.message}
                            </p>
                        )}
                    </div>

                    {/* Current Status Display */}
                    <div className="flex items-center space-x-4 pt-2">
                        <div className="flex items-center space-x-2">
                            <span className="text-gray-400 font-mono text-sm">Current Status:</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-mono text-white ${getStatusColor(ticket.status)}`}>
                                {ticket.status.replace('_', ' ').toUpperCase()}
                            </span>
                        </div>
                        {ticket.priority && (
                            <div className="flex items-center space-x-2">
                                <span className="text-gray-400 font-mono text-sm">Priority:</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-mono text-white ${getPriorityColor(ticket.priority)}`}>
                                    {ticket.priority.toUpperCase()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Form Actions */}
                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 border border-white/20 text-white rounded-md hover:bg-white/10 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                        >
                            <Save className="h-4 w-4" />
                            <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTicketForm
