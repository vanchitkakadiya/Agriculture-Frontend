//src/types/forum.ts
export type ForumCategory = {
    id: number;
    name_en: string;
    name_hi: string;
    slug: string;
    description_en?: string;
    description_hi?: string;
};

export type ForumTag = {
    id: number;
    name_en: string;
    name_hi: string;
    slug: string;
};

export type ForumComment = {
    id: number;
    author: number;
    author_name: string;
    body: string;
    created_at: string;
};

export type ForumAnswer = {
    id: number;
    author: number;
    author_name: string;
    body: string;
    is_helpful: boolean;
    comments: ForumComment[];
    created_at: string;
};

export type ForumQuestion = {
    id: number;
    title_en: string;
    title_hi: string;

    description_en: string;
    description_hi: string;

    category: ForumCategory;
    category_en:string;
    category_hi: string;
    author_name: string;
    status: string;
    view_count: number;
    answer_count:number;
    answers: ForumAnswer[];
    tags: ForumTag[];
    is_pinned: boolean;
    is_closed: boolean;
    created_at: string;
    updated_at: string;
};