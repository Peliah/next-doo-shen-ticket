'use client'

import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Ticket, CreateTicket, UpdateTicket, TicketStatus, TicketPriority } from '@/lib/schemas/ticket'

export const useTickets = () => {
    const [tickets, setTickets] = useState<Ticket[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const loadTickets = () => {
            try {
                const storedTickets = localStorage.getItem('dst_tickets')
                if (storedTickets) {
                    const parsedTickets = JSON.parse(storedTickets)
                    setTickets(parsedTickets)
                } else {
                    const sampleTickets: Ticket[] = [
                        {
                            id: '1',
                            title: 'Payment processing issue',
                            description: 'Customer unable to complete payment for event tickets',
                            status: 'closed',
                            priority: 'high',
                            assignee: 'John Doe',
                            createdAt: new Date(Date.now() - 86400000).toISOString(),
                            updatedAt: new Date(Date.now() - 3600000).toISOString()
                        },
                        {
                            id: '2',
                            title: 'Event cancellation request',
                            description: 'Customer requesting refund due to event cancellation',
                            status: 'in_progress',
                            priority: 'medium',
                            assignee: 'Jane Smith',
                            createdAt: new Date(Date.now() - 7200000).toISOString(),
                            updatedAt: new Date(Date.now() - 1800000).toISOString()
                        },
                        {
                            id: '3',
                            title: 'Website loading issues',
                            description: 'Users reporting slow loading times on event pages',
                            status: 'open',
                            priority: 'urgent',
                            assignee: 'Mike Johnson',
                            createdAt: new Date(Date.now() - 14400000).toISOString(),
                            updatedAt: new Date(Date.now() - 14400000).toISOString()
                        },
                        {
                            id: '4',
                            title: 'Email notification not working',
                            description: 'Ticket confirmation emails not being sent to customers',
                            status: 'open',
                            priority: 'high',
                            assignee: 'Sarah Wilson',
                            createdAt: new Date(Date.now() - 21600000).toISOString(),
                            updatedAt: new Date(Date.now() - 21600000).toISOString()
                        },
                        {
                            id: '5',
                            title: 'Mobile app login issues',
                            description: 'Users unable to login through mobile application',
                            status: 'closed',
                            priority: 'medium',
                            assignee: 'Tom Brown',
                            createdAt: new Date(Date.now() - 28800000).toISOString(),
                            updatedAt: new Date(Date.now() - 7200000).toISOString()
                        }
                    ]
                    setTickets(sampleTickets)
                    localStorage.setItem('dst_tickets', JSON.stringify(sampleTickets))
                }
            } catch (error) {
                console.error('Error loading tickets:', error)
                toast.error('Failed to load tickets')
            } finally {
                setIsLoading(false)
            }
        }

        loadTickets()
    }, [])

    const saveTickets = (newTickets: Ticket[]) => {
        try {
            localStorage.setItem('dst_tickets', JSON.stringify(newTickets))
            setTickets(newTickets)
        } catch (error) {
            console.error('Error saving tickets:', error)
            toast.error('Failed to save tickets')
        }
    }

    const createTicket = (ticketData: CreateTicket) => {
        const newTicket: Ticket = {
            ...ticketData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const updatedTickets = [...tickets, newTicket]
        saveTickets(updatedTickets)
        toast.success('Ticket created successfully!')
        return newTicket
    }

    const updateTicket = (id: string, ticketData: UpdateTicket) => {
        const updatedTickets = tickets.map(ticket =>
            ticket.id === id
                ? { ...ticket, ...ticketData, updatedAt: new Date().toISOString() }
                : ticket
        )

        saveTickets(updatedTickets)
        toast.success('Ticket updated successfully!')
        return updatedTickets.find(ticket => ticket.id === id)
    }

    const deleteTicket = (id: string) => {
        const updatedTickets = tickets.filter(ticket => ticket.id !== id)
        saveTickets(updatedTickets)
        toast.success('Ticket deleted successfully!')
    }

    const getTicketById = (id: string) => {
        return tickets.find(ticket => ticket.id === id)
    }

    const getTicketsByStatus = (status: string) => {
        return tickets.filter(ticket => ticket.status === status)
    }

    const getTicketStats = () => {
        const total = tickets.length
        const open = tickets.filter(t => t.status === 'open').length
        const inProgress = tickets.filter(t => t.status === 'in_progress').length
        const closed = tickets.filter(t => t.status === 'closed').length

        return { total, open, inProgress, closed }
    }

    return {
        tickets,
        isLoading,
        createTicket,
        updateTicket,
        deleteTicket,
        getTicketById,
        getTicketsByStatus,
        getTicketStats
    }
}
