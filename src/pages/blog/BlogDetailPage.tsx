//pages/blog/BlogDetailPage.tsx
import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useParams,
} from "@tanstack/react-router";

import {
    getBlogDetail,
} from "../../api/blogApi";

import BlogDetailContent from "../../components/blog/BlogDetailContent";

import {
    useTranslation,
} from "react-i18next";
import {ArrowLeft} from "lucide-react";
import {getText, tr} from "../../utils/language.ts";

const BlogDetailPage = () => {

    useTranslation();

    const {id} =
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
            py-20
        "
        >

            <div className="max-w-3xl mx-auto px-4 sm:px-6">

                {/* BACK */}
                <Link
                    to="/blogs"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        text-green-700
                        font-semibold
                        hover:underline
                        mb-6
                    "
                >

                    <ArrowLeft
                        size={18}
                    />

                    {tr(
                        "blog_page.back"
                    )}

                </Link>

                <div className="relative rounded-2xl overflow-hidden mb-8">
                    <img
                        src={
                            blog.featured_image ||
                            "/placeholder-blog.jpg"
                        }
                        alt=""
                        className="w-full h-64 sm:h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"/>
                </div>

                <div
                    className="
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
                            text-xs
                            font-semibold
                            mb-4
                        "
                        >

                              {getText(
                                  blog,
                                  "category", "name"
                              )}
                        </span>

                            <h1
                                className="
                           text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight mb-4
                        "
                            >
                                {getText(
                                    blog,
                                    "title"
                                )}
                            </h1>

                            <div
                                className="
                            flex
                            gap-4
                            text-gray-500
                            text-sm
                        "
                            >

                                <p>
                                    {new Date(
                                        blog.published_at
                                    ).toLocaleDateString()}
                                </p>

                                <p className="text-sm font-medium text-gray-900">
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
        </div>
    );
};

export default BlogDetailPage;