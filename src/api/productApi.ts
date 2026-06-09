//src/api/productApi.ts

import api from "../lib/axios.ts";

export const getProducts = async (
    page = 1,
    search = "",
    category = ""
) => {

    const response =
        await api.get(
            "/products/",
            {
                params: {
                    page,
                    search,
                    category,
                },
            }
        );

    return (
        response.data?.data || {
            count: 0,
            next: null,
            previous: null,
            results: [],
        }
    );
};

export const getProductDetail =
    async (id: string) => {

        const response =
            await api.get(
                `/products/${id}/`
            );

        return response.data;
    };

export const getCategories =
    async () => {

        const response =
            await api.get(
                "/product-categories/"
            );

        return (
            response.data?.data
                ?.results || []
        );
    };