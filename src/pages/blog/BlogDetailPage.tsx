//pages/blog/BlogDetailPage.tsx
import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "@tanstack/react-router";

import {
    getBlogDetail,
} from "../../api/blogApi";

import BlogDetailContent from "../../components/blog/BlogDetailContent";

import {
    useTranslation,
} from "react-i18next";

const BlogDetailPage = () => {

    const { i18n } =
        useTranslation();

    const isHindi =
        i18n.language === "hi";

    const { id } =
        useParams({
            from: "/blogs/$id",
        });

    const [blog, setBlog] =
        useState<any>(
            null
        );

    const [loading, setLoading] =
        useState(true);

    const fetchBlog =
        async () => {

            try {

                setLoading(true);

                const data =
                    await getBlogDetail(
                        id
                    );

                setBlog(data);

            } catch (
                error
            ) {

                console.error(
                    error
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

    useEffect(() => {

        fetchBlog();

    }, [id]);

    if (loading) {

        return (
            <div className="p-10">
                Loading...
            </div>
        );
    }

    if (
        !blog ||
        blog.status !==
            "published"
    ) {

        return (
            <div className="p-10">
                Blog not found.
            </div>
        );
    }

    return (
        <div
            className="
            min-h-screen
            bg-[#f7f5ed]
            pb-20
        "
        >

            <img
                src={
                    blog.featured_image ||
                    "/placeholder-blog.jpg"
                }
                alt=""
                className="
                w-full
                h-[420px]
                object-cover
            "
            />

            <div
                className="
                max-w-4xl
                mx-auto
                px-6
                mt-10
            "
            >

                <div
                    className="
                    flex
                    items-start
                    justify-between
                    gap-4
                "
                >

                    <div>

                        <span
                            className="
                            inline-block
                            bg-[#e8f1dc]
                            text-green-700
                            px-4
                            py-1
                            rounded-full
                            text-sm
                            font-semibold
                            mb-4
                        "
                        >
                            {
                                isHindi
                                    ? blog
                                          .category
                                          ?.name_hi
                                    : blog
                                          .category
                                          ?.name_en
                            }
                        </span>

                        <h1
                            className="
                            text-5xl
                            font-bold
                            mb-4
                        "
                        >
                            {isHindi
                                ? blog.title_hi ||
                                  blog.title_en
                                : blog.title_en}
                        </h1>

                        <div
                            className="
                            flex
                            gap-4
                            text-gray-500
                        "
                        >

                            <p>
                                {new Date(
                                    blog.published_at
                                ).toLocaleDateString()}
                            </p>

                            <p>
                                By{" "}
                                {
                                    blog.author_name
                                }
                            </p>

                        </div>

                    </div>

                </div>

                <div className="mt-10">

                    <BlogDetailContent
                        blog={blog}
                    />

                </div>

            </div>

        </div>
    );
};

export default BlogDetailPage;