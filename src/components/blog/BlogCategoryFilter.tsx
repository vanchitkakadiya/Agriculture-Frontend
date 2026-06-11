//components/blog/BlogCategoryFilter.tsx

import {
    useTranslation,
} from "react-i18next";
import type {BlogCategory} from "../../types/blog.ts";

type Props = {
    categories: BlogCategory[];
    selected: string;
    onChange: (
        value: string
    ) => void;
};

const BlogCategoryFilter = ({
                                categories,
                                selected,
                                onChange,
                            }: Props) => {

    const {i18n} =
        useTranslation();

    return (
        <div
            className="
            flex
            flex-wrap
            gap-3
        "
        >

            <button
                onClick={() =>
                    onChange("")
                }
                className={`
                    px-5
                    py-2
                    rounded-full
                    font-medium
                    transition
                    ${
                    selected === ""
                        ? `
                              bg-green-700
                              text-white
                              shadow-lg
                            `
                        : `
                              bg-white
                              border
                              border-gray-200
                              hover:border-green-600
                              hover:text-green-700
                            `
                }
                `}
            >
                All
            </button>

            {categories.map(
                (category) => (
                    <button
                        key={
                            category.id
                        }
                        onClick={() =>
                            onChange(
                                String(
                                    category.id
                                )
                            )
                        }
                        className={`
                        px-5
                        py-2
                        rounded-full
                        font-medium
                        transition
                        ${
                            selected ===
                            String(
                                category.id
                            )
                                ? `
                              bg-green-700
                              text-white
                              shadow-lg
                            `
                            : `
                              bg-white
                              border
                              border-gray-200
                              hover:border-green-600
                              hover:text-green-700
                            `
                        }
                    `}
                    >
                        {i18n.language ===
                        "hi"
                            ? category.name_hi
                            : category.name_en}
                    </button>
                )
            )}

        </div>
    );
};

export default BlogCategoryFilter;