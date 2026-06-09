//src/api/supportApi.ts

// ======================================
// CONTACT FORM
// ======================================
import type {SupportContactPayload} from "../types/support.ts";
import api from "../lib/axios.ts";

export const sendSupportMessage =
    async (
        payload: SupportContactPayload
    ) => {

        const formData =
            new FormData();

        formData.append(
            "name",
            payload.name
        );

        formData.append(
            "email",
            payload.email
        );

        formData.append(
            "mobile_number",
            payload.mobile_number
        );

        formData.append(
            "subject",
            payload.subject
        );

        formData.append(
            "message",
            payload.message
        );

        if (
            payload.attachment
        ) {

            formData.append(
                "attachment",
                payload.attachment
            );
        }

        const response =
            await api.post(
                "/api/support/contact/",
                formData
            );

        return response.data;
    };

// ======================================
// SOCIAL LINKS
// ======================================
export const getSocialLinks =
    async () => {

        const response =
            await api.get(
                "/api/support/social-links/"
            );

        return response.data;
    };

// ======================================
// SUPPORT TICKETS
// ======================================
export const getSupportTickets =
    async () => {

        const response =
            await api.get(
                "/api/support/tickets/"
            );

        return response.data;
    };