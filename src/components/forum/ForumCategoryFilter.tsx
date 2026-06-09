//src/components/forum/ForumCategoryFilter.tsx

import {getText} from "../../utils/language.ts";
import {useTranslation} from "react-i18next";

type Props = {
    categories: any[];
    selected: string;
    onChange: (
        value: string
    ) => void;
};

const ForumCategoryFilter = ({
    categories,
    selected,
    onChange,
}: Props) => {
    const { t } = useTranslation();

    return (
        <div
            className="
            flex
            flex-wrap
            gap-3
            mb-10
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
                    text-sm
                    font-medium
                    transition
                    ${
                        selected === ""
                            ? "bg-green-700 text-white"
                            : "bg-white border"
                    }
                `}
            >
                {t(
                        "common.all"
                    )}
            </button>

            {categories.map(
                (category) => {

                    const active =
                        selected ===
                        String(
                            category.id
                        );

                    return (
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
                                text-sm
                                font-medium
                                transition
                                ${
                                    active
                                        ? "bg-green-700 text-white"
                                        : "bg-white border"
                                }
                            `}
                        >

                            {
                                getText(category,"name")
                            }
                        </button>
                    );
                }
            )}

        </div>
    );
};

export default ForumCategoryFilter;