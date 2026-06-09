//src/types/support.ts
export interface SocialLinks {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    whatsapp?: string;
    linkedin?: string;
}

export interface SupportContactPayload {
    name: string;
    email: string;
    mobile_number: string;
    subject: string;
    message: string;
    attachment?: File | null;
}

export interface SupportTicket {
    id: number;
    subject: string;
    message: string;
    status: "open" | "closed" | "pending";
    created_at: string;
}