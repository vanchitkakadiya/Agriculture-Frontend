// src/components/forum/ForumQuestionCard.tsx

import {
    Link,
} from "@tanstack/react-router";

import {
    Eye,
    MessageCircle,
    Pin,
    Tag,
} from "lucide-react";

import {
    getText,
    tr,
} from "../../utils/language";

type Props = {
    question: any;
};

const ForumQuestionCard = ({
                               question,
                           }: Props) => {

    const title =
        getText(
            question,
            "title"
        );

    const description =
        getText(
            question,
            "description"
        );

    const categoryName =
        getText(
            question,
            "category"
        );

    return (
        <Link
            to="/forum/$id"
            params={{
                id: String(
                    question.id
                ),
            }}
            className="
                block
                bg-white
                rounded-3xl
                border
                border-[#e7e4db]
                p-5
                md:p-6
                hover:shadow-lg
                transition
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

                <div className="flex-1">

                    {/* PINNED */}
                    {question.is_pinned && (
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                bg-yellow-100
                                text-yellow-700
                                px-3
                                py-1
                                rounded-full
                                text-xs
                                font-semibold
                                mb-4
                            "
                        >

                            <Pin size={14}/>

                            {tr(
                                "forum.pinned"
                            )}

                        </div>
                    )}

                    {/* TITLE */}
                    <h2
                        className="
                            text-xl
                            md:text-2xl
                            font-bold
                            mb-2
                            hover:text-green-700
                            transition
                            line-clamp-2
                        "
                    >
                        {title}
                    </h2>

                    {/* DESCRIPTION */}
                    <p
                        className="
                            text-sm
                            md:text-base
                            text-gray-600
                            leading-7
                            mb-5
                            line-clamp-3
                        "
                    >
                        {description}
                    </p>

                    {/* CATEGORY */}
                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-3
                            mb-5
                        "
                    >

                        <span
                            className="
                                bg-[#eef3dc]
                                text-green-700
                                px-3
                                py-1
                                rounded-full
                                text-sm
                                font-medium
                            "
                        >
                            {categoryName}
                        </span>

                        {question.is_closed && (
                            <span
                                className="
                                    bg-red-100
                                    text-red-600
                                    px-3
                                    py-1
                                    rounded-full
                                    text-sm
                                    font-medium
                                "
                            >
                                {tr(
                                    "forum.closed"
                                )}
                            </span>
                        )}

                    </div>

                    {/* TAGS */}
                  {/*  {question.tags?.length >
                        0 && (
                            <div
                                className="
                                flex
                                flex-wrap
                                gap-2
                                mb-5
                            "
                            >

                                {question.tags.map(
                                    (
                                        tag: any
                                    ) => (
                                        <div
                                            key={
                                                tag.id
                                            }
                                            className="
                                            flex
                                            items-center
                                            gap-1
                                            bg-gray-100
                                            px-3
                                            py-1
                                            rounded-full
                                            text-xs
                                        "
                                        >

                                            <Tag
                                                size={
                                                    12
                                                }
                                            />

                                            {getText(
                                                tag,
                                                "name"
                                            )}

                                        </div>
                                    )
                                )}

                            </div>
                        )}*/}

                    {/* FOOTER */}
                    <div
                        className="
                            flex
                            flex-wrap
                            items-center
                            gap-4
                            md:gap-5
                            text-sm
                            text-gray-500
                        "
                    >

                        {/* AUTHOR */}
                        <span>
                            {tr(
                                "forum.by"
                            )}{" "}

                            <strong>
                                {
                                    question.author_name
                                }
                            </strong>
                        </span>

                        {/* ANSWERS */}
                        <div
                            className="
                                flex
                                items-center
                                gap-1
                            "
                        >

                            <MessageCircle
                                size={16}
                            />

                            {
                                question.answer_count
                            }{" "}

                            {tr(
                                "forum.answers"
                            )}

                        </div>

                        {/* VIEWS */}
                        <div
                            className="
                                flex
                                items-center
                                gap-1
                            "
                        >

                            <Eye
                                size={16}
                            />

                            {
                                question.view_count
                            }{" "}

                            {tr(
                                "forum.views"
                            )}

                        </div>

                        {/* DATE */}
                        <span>
                            {new Date(
                                question.created_at
                            ).toLocaleDateString()}
                        </span>

                    </div>

                </div>

            </div>

        </Link>
    );
};

export default ForumQuestionCard;