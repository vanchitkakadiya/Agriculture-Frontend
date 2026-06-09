export interface Category {
    id: number;
    name_en: string;
    name_hi: string;
}

export interface ProductImage {
    id: number;
    product: number;
    image: string;
    sort_order: number;
}

export interface Product {
    id: number;

    title_en: string;
    title_hi: string;

    description_en: string;
    description_hi: string;

    price: string;

    stock_quantity: number;

    is_in_stock: boolean;

    is_active: boolean;

    is_featured: boolean;

    category:
        | number
        | Category;

    category_name?: string;

    primary_image?: string | null;

    images?: ProductImage[];

    unit?: string;

    unit_value?: number;

    created_at: string;

    updated_at: string;
}