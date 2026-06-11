// src/pages/forum/AskQuestionPage.tsx
import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "@tanstack/react-router";

import {
    createForumQuestion,
    getForumCategories,
} from "../../api/forumApi";

import type {
    ForumCategory,
} from "../../types/forum";

const AskQuestionPage = () => {

    const navigate =
        useNavigate();

    const [
        categories,
        setCategories,
    ] = useState<
        ForumCategory[]
    >([]);

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState({
            title_en: "",
            title_hi: "",
            description_en:
                "",
            description_hi:
                "",
            category: "",
        });

    // FETCH CATEGORIES
    const fetchCategories =
        async () => {

            try {

                const response =
                    await getForumCategories();

                setCategories(
                    response?.data
                        ?.results || []
                );

            } catch (
                error
                ) {

                console.error(
                    "Forum Categories Error:",
                    error
                );
            }
        };

    useEffect(() => {

        fetchCategories()

    }, []);

    const handleSubmit =
        async (
            e: React.FormEvent
        ) => {

            e.preventDefault();

            try {

                setLoading(true);

                const response =
                    await createForumQuestion(
                        {
                            title_en:
                            form.title_en,
                            title_hi:
                            form.title_hi,
                            description_en:
                            form.description_en,
                            description_hi:
                            form.description_hi,
                            category:
                                Number(
                                    form.category
                                ),
                        }
                    );

                navigate({
                    to: "/forum/$id",
                    params: {
                        id: String(
                            response
                                .data
                                .id
                        ),
                    },
                });

            } catch (
                error
                ) {

                console.error(
                    error
                );

                alert(
                    "Failed to post question."
                );

            } finally {

                setLoading(false);
            }
        };

    return (
        <div
            className="
            max-w-4xl
            mx-auto
            px-6
            py-10
        "
        >

            <div className="mb-10 pt-20">

                <h1
                    className="
                    text-5xl
                    font-bold
                    mb-3
                "
                >
                    Ask Question
                </h1>

                <p
                    className="
                    text-gray-600
                "
                >
                    Ask farming
                    related
                    questions to the
                    community.
                </p>

            </div>

            <form
                onSubmit={
                    handleSubmit
                }
                className="
                bg-white
                rounded-3xl
                border
                p-8
                space-y-6
            "
            >

                <div>

                    <label
                        className="
                        block
                        font-semibold
                        mb-2
                    "
                    >
                        Category
                    </label>

                    <select
                        value={
                            form.category
                        }
                        onChange={(
                            e
                        ) =>
                            setForm(
                                (
                                    prev
                                ) => ({
                                    ...prev,
                                    category:
                                    e
                                        .target
                                        .value,
                                })
                            )
                        }
                        required
                        className="
                        w-full
                        border
                        rounded-2xl
                        px-4
                        py-3
                        outline-none
                    "
                    >

                        <option value="">
                            Select
                            Category
                        </option>

                        {categories.map(
                            (
                                category
                            ) => (
                                <option
                                    key={
                                        category.id
                                    }
                                    value={
                                        category.id
                                    }
                                >
                                    {
                                        category.name_en
                                    }
                                </option>
                            )
                        )}

                    </select>

                </div>

                <div>

                    <label
                        className="
                        block
                        font-semibold
                        mb-2
                    "
                    >
                        Title
                    </label>

                    <input
                        type="text"
                        required
                        value={
                            form.title_en
                        }
                        onChange={(
                            e
                        ) =>
                            setForm(
                                (
                                    prev
                                ) => ({
                                    ...prev,
                                    title_en:
                                    e
                                        .target
                                        .value,
                                })
                            )
                        }
                        placeholder="Enter question title"
                        className="
                        w-full
                        border
                        rounded-2xl
                        px-4
                        py-3
                        outline-none
                    "
                    />

                </div>

                <div>

                    <label
                        className="
                        block
                        font-semibold
                        mb-2
                    "
                    >
                        Description
                    </label>

                    <textarea
                        required
                        rows={8}
                        value={
                            form.description_en
                        }
                        onChange={(
                            e
                        ) =>
                            setForm(
                                (
                                    prev
                                ) => ({
                                    ...prev,
                                    description_en:
                                    e
                                        .target
                                        .value,
                                })
                            )
                        }
                        placeholder="Explain your farming issue or question..."
                        className="
                        w-full
                        border
                        rounded-2xl
                        px-4
                        py-3
                        outline-none
                        resize-none
                    "
                    />

                </div>

                <button
                    type="submit"
                    disabled={
                        loading
                    }
                    className="
                    bg-green-700
                    hover:bg-green-800
                    text-white
                    px-8
                    py-4
                    rounded-2xl
                    font-semibold
                    disabled:opacity-50
                "
                >
                    {loading
                        ? "Posting..."
                        : "Post Question"}
                </button>

            </form>

        </div>
    );
};

export default AskQuestionPage;