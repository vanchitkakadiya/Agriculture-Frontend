// src/pages/blog/BlogListPage.tsx

import {
    useEffect,
    useState,
} from "react";

import {
    Search,
} from "lucide-react";

import {
    getBlogs,
    getBlogCategories,
} from "../../api/blogApi";

import BlogCard
    from "../../components/blog/BlogCard";

import BlogCategoryFilter
    from "../../components/blog/BlogCategoryFilter";

import type {
    BlogCategory,
    BlogPost,
} from "../../types/blog";

import {
    tr,
} from "../../utils/language";
import {useTranslation} from "react-i18next";

const BlogListPage = () => {

    useTranslation()

    const [blogs, setBlogs] =
        useState<BlogPost[]>([]);

    const [
        categories,
        setCategories,
    ] = useState<
        BlogCategory[]
    >([]);

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    // =========================
    // FETCH BLOGS
    // =========================
    const fetchBlogs =
        async () => {

            try {

                setLoading(true);

                const data =
                    await getBlogs(
                        1,
                        search,
                        category
                    );

                setBlogs(
                    data.results || []
                );

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

    // =========================
    // FETCH CATEGORIES
    // =========================
    const fetchCategories =
        async () => {

            try {

                const data =
                    await getBlogCategories();

                setCategories(
                    data || []
                );

            } catch (
                error
            ) {

                console.error(
                    error
                );
            }
        };

    // =========================
    // BLOGS
    // =========================
    useEffect(() => {

        fetchBlogs();

    }, [search, category]);

    // =========================
    // CATEGORY
    // =========================
    useEffect(() => {

        fetchCategories();

    }, []);

    return (
        <div
            className="
            min-h-screen
            bg-[#f7f5ed]
            px-4
            sm:px-6
            py-8
            md:py-10
        "
        >

            <div
                className="
                max-w-7xl
                mx-auto
            "
            >

                {/* HEADER */}
                <div
                    className="
                    flex
                    flex-col
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                    gap-6
                    mb-10
                "
                >

                    {/* LEFT */}
                    <div>

                        <h1
                            className="
                            text-3xl
                            sm:text-4xl
                            lg:text-5xl
                            font-bold
                            mb-3
                            text-gray-900
                        "
                        >
                            {tr(
                                "blog_page.title"
                            )}
                        </h1>

                        <p
                            className="
                            text-gray-600
                            text-sm
                            sm:text-base
                            max-w-2xl
                        "
                        >
                            {tr(
                                "blog_page.subtitle"
                            )}
                        </p>

                    </div>

                    {/* SEARCH */}
                    <div
                        className="
                        relative
                        w-full
                        lg:w-[360px]
                    "
                    >

                        <Search
                            className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        "
                            size={18}
                        />

                        <input
                            type="text"
                            placeholder={tr(
                                "blog_page.search_placeholder"
                            )}
                            value={
                                search
                            }
                            onChange={(
                                e
                            ) =>
                                setSearch(
                                    e.target
                                        .value
                                )
                            }
                            className="
                            w-full
                            h-12
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            pl-12
                            pr-4
                            text-sm
                            outline-none
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                            transition
                        "
                        />

                    </div>

                </div>

                {/* CATEGORY FILTER */}
                <BlogCategoryFilter
                    categories={
                        categories
                    }
                    selected={
                        category
                    }
                    onChange={
                        setCategory
                    }
                />

                {/* BLOG LIST */}
                {loading ? (

                    <div
                        className="
                        py-20
                        text-center
                        text-gray-500
                    "
                    >
                        {tr(
                            "common.loading"
                        )}
                    </div>

                ) : (

                    <div
                        className="
                        grid
                        sm:grid-cols-2
                        xl:grid-cols-3
                        gap-6
                        lg:gap-8
                        mt-10
                    "
                    >

                        {blogs.map(
                            (
                                blog
                            ) => (
                                <BlogCard
                                    key={
                                        blog.id
                                    }
                                    blog={
                                        blog
                                    }
                                />
                            )
                        )}

                    </div>

                )}

                {/* EMPTY */}
                {!loading &&
                    blogs.length ===
                        0 && (

                        <div
                            className="
                            text-center
                            py-20
                            text-gray-500
                        "
                        >
                            {tr(
                                "blog_page.no_blogs"
                            )}
                        </div>

                    )}

            </div>

        </div>
    );
};

export default BlogListPage;