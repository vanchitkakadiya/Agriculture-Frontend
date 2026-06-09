//src/api/forumApi.ts

import api from "../lib/axios.ts";

export const getForumQuestions =
    async (
        page = 1,
        search = "",
        category = ""
    ) => {

        const response =
            await api.get(
                "/forum/questions/",
                {
                    params: {
                        page,
                        search,
                        category,
                    },
                }
            );

        return response.data;
    };

export const getForumQuestionDetail =
    async (
        id: string
    ) => {

        const response =
            await api.get(
                `/forum/questions/${id}/`
            );

        return response.data.data;
    };

export const getForumCategories =
    async () => {

        const response =
            await api.get(
                "/forum/categories/"
            );

        return response.data;
    };

export const createForumQuestion =
    async (payload: {
        title_en: string;
        title_hi?: string;
        description_en: string;
        description_hi?: string;
        category: number;
    }) => {

        const response =
            await api.post(
                "/forum/questions/",
                payload
            );

        return response.data;
    };

export const postForumAnswer =
    async (
        questionId: number,
        payload: {
            body: string;
        }
    ) => {

        const response =
            await api.post(
                `/forum/questions/${questionId}/answers/`,
                payload
            );

        return response.data;
    };

export const postForumComment =
    async (
        answerId: number,
        payload: {
            body: string;
        }
    ) => {

        const response =
            await api.post(
                `/forum/answers/${answerId}/comments/`,
                payload
            );

        return response.data;
    };

// =========================
// SAVE / UNSAVE POST
// =========================
export const toggleSaveForumPost =
    async (
        postId: number
    ) => {

        const response =
            await api.post(
                `/forum/posts/${postId}/save/`
            );

        return response.data;
    };

// =========================
// REPORT POST
// =========================
export const reportForumPost =
    async (
        postId: number,
        reason: string
    ) => {

        const response =
            await api.post(
                `/forum/posts/${postId}/report/`,
                {
                    reason,
                }
            );

        return response.data;
    };