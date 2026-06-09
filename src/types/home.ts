// src/types/home.ts

import type {ForumTag} from "./forum.ts";

export interface HomeContent {
    headline_en: string;
    headline_hi: string;

    subheadline_en: string;
    subheadline_hi: string;

    about_title_en: string;
    about_title_hi: string;

    about_en: string;
    about_hi: string;

    featured_products_title_en: string;
    featured_products_title_hi: string;

    farming_tips_title_en: string;
    farming_tips_title_hi: string;

    community_title_en: string;
    community_title_hi: string;

    community_subtitle_en: string;
    community_subtitle_hi: string;

    cta_title_en: string;
    cta_title_hi: string;

    cta_subtitle_en: string;
    cta_subtitle_hi: string;

    cta_button_text_en: string;
    cta_button_text_hi: string;
}

export interface MissionVision {
    mission_title_en: string;
    mission_title_hi: string;

    mission_en: string;
    mission_hi: string;

    vision_title_en: string;
    vision_title_hi: string;

    vision_en: string;
    vision_hi: string;
}

export interface FeaturedProduct {
    id: number;
    title_en: string;
    title_hi: string;

    description_en: string;
    description_hi: string;

    price: string;

    primary_image: string;

    category_name: string;

    is_in_stock: boolean;
}

export interface FarmingTip {
    id: number;

    title_en: string;
    title_hi: string;

    slug: string;

    summary_en: string;
    summary_hi: string;

    featured_image: string;

    category_en: string;
    category_hi: string;

    author_name: string;

    published_at: string;
}

export interface ForumPreview {
    id: number;

    title_en: string;
    title_hi: string;

    description_en: string;
    description_hi: string;

    category_en: string;
    category_hi: string;

    author_name: string;

    answer_count: number;
    view_count: number;

    created_at: string;
    tags: ForumTag[];

    is_pinned: boolean;
}

export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
}

export interface ContactInfo {
    phone: string;
    whatsapp_number: string;
    email: string;
    address: string;
    map_url: string;
    working_hours: string;
}

export interface Banner {
    id: number;
    title_en: string;
    title_hi: string;
    subtitle_en: string;
    subtitle_hi: string;
    image: string;
    link_url: string;
    sort_order: number;
}

export interface HomeCmsResponse {
    content: HomeContent;

    mission_vision: MissionVision;

    featured_products: FeaturedProduct[];

    farming_tips: FarmingTip[];

    forum_preview: ForumPreview[];

    social_links: SocialLink[];

    contact_info: ContactInfo;

    banners: Banner[];
}