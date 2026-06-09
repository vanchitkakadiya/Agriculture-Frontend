//src/api/blogApi.ts

import api from "../lib/axios.ts";

export const getBlogCategories =
    async () => {

        const response =
            await api.get(
                "/blog-categories/"
            );

        return (
            response.data.data
                ?.results || []
        );
    };

export const getBlogs =
    async (
        page = 1,
        search = "",
        category = ""
    ) => {

        const response =
            await api.get(
                "/blogs/",
                {
                    params: {
                        page,
                        search,
                        category,
                    },
                }
            );

        return response.data.data;
    };

export const getBlogDetail =
    async (
        id: string
    ) => {

        const response =
            await api.get(
                `/blogs/${id}/`
            );

        return response.data;
    };
