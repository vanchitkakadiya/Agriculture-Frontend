//src/pages/forum/ForumListPage.tsx
//community

// src/pages/forum/ForumListPage.tsx

import {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "@tanstack/react-router";

import {
    MessageSquarePlus,
    Search,
} from "lucide-react";

import {
    getForumCategories,
    getForumQuestions,
} from "../../api/forumApi";

import ForumQuestionCard
    from "../../components/forum/ForumQuestionCard";

import ForumCategoryFilter
    from "../../components/forum/ForumCategoryFilter";
import {useTranslation} from "react-i18next";

const ForumListPage = () => {
    const {t} = useTranslation();

    const [
        questions,
        setQuestions,
    ] = useState<any[]>([]);

    const [
        categories,
        setCategories,
    ] = useState<any[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [page, setPage] =
        useState(1);

    const [hasMore, setHasMore] =
        useState(false);

    // =========================
    // FETCH QUESTIONS
    // =========================
    const fetchQuestions =
        async (
            reset = false
        ) => {

            try {

                setLoading(true);

                const response =
                    await getForumQuestions(
                        page,
                        search,
                        category
                    );

                const data =
                    response?.data;

                const results =
                    data?.results || [];

                if (reset) {

                    setQuestions(
                        results
                    );

                } else {

                    setQuestions(
                        (prev) => [
                            ...prev,
                            ...results,
                        ]
                    );
                }

                setHasMore(
                    !!data?.next
                );

            } catch (error) {

                console.error(
                    "Forum Questions Error:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

    // =========================
    // FETCH CATEGORIES
    // =========================
    const fetchCategories =
        async () => {

            try {

                const response =
                    await getForumCategories();

                setCategories(
                    response?.data
                        ?.results || []
                );

            } catch (error) {

                console.error(
                    "Forum Categories Error:",
                    error
                );
            }
        };

    // =========================
    // SEARCH / CATEGORY CHANGE
    // =========================
    useEffect(() => {

        setPage(1);

        fetchQuestions(true);

    }, [search, category]);

    // =========================
    // LOAD MORE
    // =========================
    useEffect(() => {

        if (page > 1) {

            fetchQuestions();

        }

    }, [page]);

    // =========================
    // INITIAL LOAD
    // =========================
    useEffect(() => {

        fetchCategories();

    }, []);

    return (
        <div
            className="
            min-h-screen
            px-4
            md:px-6
            py-10
        "
        >

            <div
                className="
                max-w-7xl
                mx-auto
                pt-20
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
                    gap-5
                    mb-10
                "
                >

                    {/* TITLE */}
                    <div
                        className="
                        flex-1
                    "
                    >

                        <h1
                            className="mt-2 text-4xl sm:text-5xl font-serif font-bold text-gray-900"
                        >
                            {t(
                                "forum_page.title"
                            )}
                        </h1>

                        <p
                            className="
                            text-gray-600
                            max-w-2xl
                            leading-7
                        "
                        >
                            {t(
                                "forum_page.subtitle"
                            )}
                        </p>

                    </div>

                    {/* SEARCH */}
                    <div
                        className="
                        relative
                        w-full
                        lg:w-[350px]
                    "
                    >

                        <Search
                            size={18}
                            className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        "
                        />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder={t(
                                "forum_page.search_placeholder"
                            )}
                            className="
                            w-full
                            h-12
                            rounded-2xl
                            border
                            border-gray-200
                            bg-white
                            pl-12
                            pr-4
                            outline-none
                            text-sm
                            focus:border-green-600
                            focus:ring-2
                            focus:ring-green-100
                            transition
                        "
                        />

                    </div>

                    {/* ASK QUESTION */}
                    <Link
                        to="/forum/ask"
                        className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-green-700
                        hover:bg-green-800
                        text-white
                        px-6
                        h-12
                        rounded-2xl
                        font-semibold
                        whitespace-nowrap
                        transition
                        shadow-md
                        hover:shadow-lg
                    "
                    >

                        <MessageSquarePlus
                            size={20}
                        />

                        {t(
                            "forum_page.ask_question"
                        )}

                    </Link>

                </div>

                {/* CATEGORY FILTER */}
                <ForumCategoryFilter
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

                {/* QUESTION LIST */}
                <div
                    className="
                    space-y-6
                    mt-8
                "
                >

                    {questions.map(
                        (question) => (
                            <ForumQuestionCard
                                key={
                                    question.id
                                }
                                question={
                                    question
                                }
                            />
                        )
                    )}

                </div>

                {/* EMPTY */}
                {!loading &&
                    questions.length === 0 && (
                        <div
                            className="
                        text-center
                        py-20
                    "
                        >

                            <h3
                                className="
                            text-xl
                            font-semibold
                            text-gray-700
                            mb-2
                        "
                            >
                                {t(
                                    "forum_page.no_discussions"
                                )}
                            </h3>

                        </div>
                    )}

                {/* LOADING */}
                {loading && (
                    <div
                        className="
                        text-center
                        py-10
                        text-gray-500
                    "
                    >
                        {t(
                            "common.loading"
                        )}
                    </div>
                )}

                {/* LOAD MORE */}
                {hasMore &&
                    !loading && (
                        <div
                            className="
                        mt-10
                        flex
                        justify-center
                    "
                        >

                            <button
                                onClick={() =>
                                    setPage(
                                        (
                                            prev
                                        ) =>
                                            prev + 1
                                    )
                                }
                                className="
                            bg-green-700
                            hover:bg-green-800
                            text-white
                            px-8
                            h-12
                            rounded-2xl
                            font-semibold
                            transition
                            shadow-md
                            hover:shadow-lg
                        "
                            >
                                {t(
                                    "common.load_more"
                                )}
                            </button>

                        </div>
                    )}

            </div>

        </div>
    );
};

export default ForumListPage;