// src/api/cartApi.ts


// GET CART
import api from "../lib/axios.ts";

export const getCart = async () => {

    const response =
        await api.get(
            "/cart/"
        );

    return response.data.data;
};


// ADD ITEM
export const addCartItem =
    async (
        product_id: number,
        quantity: number
    ) => {

        const response =
            await api.post(
                "/cart/items/",
                {
                    product_id,
                    quantity,
                }
            );

        return response.data.data;
    };


// UPDATE ITEM
export const updateCartItem = async (
    itemId: number,
    quantity: number
) => {
    try {
        const response = await api.put(
            `/cart/items/${itemId}/`,
            {
                quantity,
            }
        );

        return response.data.data;

    } catch (error: any) {

        // BACKEND VALIDATION MESSAGE
        const backendMessage =
            error?.response?.data?.errors
                ?.non_field_errors?.[0];

        throw new Error(
            backendMessage ||
            "Failed to update cart"
        );
    }
};


// REMOVE ITEM
export const removeCartItem =
    async (
        itemId: number
    ) => {

        const response =
            await api.delete(
                `/cart/items/${itemId}/`
            );

        return response.data;
    };