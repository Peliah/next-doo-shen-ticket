import { z } from 'zod'

// Ticket status enum
export const TicketStatus = {
    OPEN: 'open',
    IN_PROGRESS: 'in_progress',
    CLOSED: 'closed'
} as const

export type TicketStatusType = typeof TicketStatus[keyof typeof TicketStatus]

// Priority enum
export const TicketPriority = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    URGENT: 'urgent'
} as const

export type TicketPriorityType = typeof TicketPriority[keyof typeof TicketPriority]

// Ticket schema for validation
export const ticketSchema = z.object({
    id: z.string().optional(), // Will be generated if not provided
    title: z.string()
        .min(1, 'Title is required')
        .min(3, 'Title must be at least 3 characters')
        .max(100, 'Title must be less than 100 characters'),
    description: z.string()
        .max(500, 'Description must be less than 500 characters')
        .optional(),
    status: z.enum(['open', 'in_progress', 'closed'], {
        message: 'Status must be open, in_progress, or closed'
    }),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    assignee: z.string()
        .max(50, 'Assignee name must be less than 50 characters')
        .optional(),
    createdAt: z.string().optional(), // Will be generated if not provided
    updatedAt: z.string().optional() // Will be generated if not provided
})

export type Ticket = z.infer<typeof ticketSchema>

// Create ticket schema (without id and timestamps)
export const createTicketSchema = ticketSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true
})

export type CreateTicket = z.infer<typeof createTicketSchema>

// Update ticket schema (all fields optional except id)
export const updateTicketSchema = ticketSchema.partial().required({ id: true })

export type UpdateTicket = z.infer<typeof updateTicketSchema>
