import api from "../lib/axios";

export type CheckoutPayload = {
    address_id?: number;

    new_address?: {
        full_name: string;
        mobile_number: string;
        address_line_1: string;
        address_line_2?: string;
        city: string;
        state: string;
        pincode: string;
    };

    notes?: string;

    payment_provider: "stripe";
};

export const checkoutApi = async (
    data: CheckoutPayload
) => {

    const response = await api.post(
        "/orders/checkout/",
        data
    );

    return response.data.data;
};