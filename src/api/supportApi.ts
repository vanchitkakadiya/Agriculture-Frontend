//src/api/supportApi.ts

// ======================================
// CONTACT FORM
// ======================================
import type {SupportContactPayload} from "../types/support.ts";
import api from "../lib/axios.ts";

export const sendSupportMessage =
    async (
        data: SupportContactPayload,
    ) => {

        const formData =
            new FormData();

        formData.append(
            "name",
            data.name
        );

        formData.append(
            "email",
            data.email
        );

        formData.append(
            "mobile_number",
            data.mobile_number
        );

        formData.append(
            "subject",
            data.subject
        );

        formData.append(
            "message",
            data.message
        );

        // FILE
        if (data.attachment) {

            formData.append(
                "attachment",
                data.attachment
            );
        }

        const response =
            await api.post(
                "/contact/",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
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