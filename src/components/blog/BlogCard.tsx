//components/blog/BlogCard.tsx
import {
    Link,
} from "@tanstack/react-router";

import {
    Calendar,
} from "lucide-react";


import { useTranslation } from "react-i18next";
import type {BlogPost} from "../../types/blog.ts";

type Props = {
    blog: BlogPost;
};

const BlogCard = ({
    blog,
}: Props) => {

    const { i18n } =
        useTranslation();

    const isHindi =
        i18n.language === "hi";

    const title =
        isHindi
            ? blog.title_hi ||
              blog.title_en
            : blog.title_en;

    const summary =
        isHindi
            ? blog.summary_hi ||
              blog.summary_en
            : blog.summary_en;

    return (
        <div
            className="
            bg-white
            rounded-3xl
            overflow-hidden
            border
            hover:shadow-xl
            transition
        "
        >

            <Link
                to="/blogs/$id"
                params={{
                    id: String(
                        blog.id
                    ),
                }}
            >

                <img
                    src={
                        blog.featured_image ||
                        "/placeholder-blog.jpg"
                    }
                    alt={title}
                    className="
                    w-full
                    h-[240px]
                    object-cover
                "
                />

            </Link>

            <div className="p-5">

                <div
                    className="
                    flex
                    items-center
                    justify-between
                    mb-4
                "
                >

                    <span
                        className="
                        bg-[#eef3dc]
                        text-green-700
                        text-xs
                        font-semibold
                        px-3
                        py-1
                        rounded-full
                    "
                    >
                        {
                            blog.category_name
                        }
                    </span>

                </div>

                <Link
                    to="/blogs/$id"
                    params={{
                        id: String(
                            blog.id
                        ),
                    }}
                >

                    <h2
                        className="
                        text-2xl
                        font-bold
                        mb-3
                        hover:text-green-700
                        transition
                    "
                    >
                        {title}
                    </h2>

                </Link>

                <p
                    className="
                    text-gray-600
                    line-clamp-3
                "
                >
                    {summary}
                </p>

                <div
                    className="
                    flex
                    items-center
                    gap-2
                    mt-5
                    text-sm
                    text-gray-500
                "
                >

                    <Calendar
                        size={16}
                    />

                    {new Date(
                        blog.published_at
                    ).toLocaleDateString()}

                </div>

            </div>

        </div>
    );
};

export default BlogCard;