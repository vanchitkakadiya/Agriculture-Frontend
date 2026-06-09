// src/types/cart.ts

export type CartItem = {
    id: number;
    product: number;

    product_title: string;
    product_title_hi: string;

    product_price: string;

    product_image: string;

    product_is_in_stock: boolean;

    product_stock_quantity: number;

    quantity: number;

    unit_price_snapshot: string;

    subtotal: string;
};

export type Cart = {
    id: number;

    status: string;

    items: CartItem[];

    total: string;

    total_items: number;

    updated_at: string;
};