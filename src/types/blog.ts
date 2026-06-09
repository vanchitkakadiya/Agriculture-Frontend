//src/types/blog.ts
export type BlogCategory = {
    id: number;
    name_en: string;
    name_hi: string;
    slug?: string;
};

export type BlogImage = {
    id: number;
    image: string;
};

export type BlogPost = {
    id: number;

    title_en: string;
    title_hi: string;

    slug: string;

    summary_en: string;
    summary_hi: string;

    content_en?: string;
    content_hi?: string;

    featured_image: string | null;

    category:
        | BlogCategory
        | number;

    category_name?: string;

    author_name: string;

    published_at: string;

    created_at?: string;

    status?: string;

    images?: BlogImage[];

    is_saved?: boolean;
};