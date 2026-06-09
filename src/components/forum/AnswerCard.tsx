//src/components/forum/AnswerCard.tsx
import {
    CheckCircle2,
} from "lucide-react";

import type {
    ForumAnswer,
} from "../../types/forum";

import CommentList from "./CommentList";

type Props = {
    answer: ForumAnswer;
};

const AnswerCard = ({
    answer,
}: Props) => {

    return (
        <div
            className="
            bg-white
            border
            rounded-3xl
            p-6
        "
        >

            <div
                className="
                flex
                items-start
                justify-between
                gap-4
                mb-4
            "
            >

                <div>

                    <h3
                        className="
                        font-bold
                        text-lg
                    "
                    >
                        {
                            answer.author_name
                        }
                    </h3>

                    <p
                        className="
                        text-sm
                        text-gray-500
                        mt-1
                    "
                    >
                        {new Date(
                            answer.created_at
                        ).toLocaleDateString()}
                    </p>

                </div>

                {answer.is_helpful && (
                    <div
                        className="
                        flex
                        items-center
                        gap-2
                        bg-green-100
                        text-green-700
                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-semibold
                    "
                    >
                        <CheckCircle2
                            size={16}
                        />

                        Helpful
                    </div>
                )}

            </div>

            <p
                className="
                text-gray-700
                leading-8
                whitespace-pre-line
                break-words
            "
            >
                {answer.body}
            </p>

            <CommentList
                comments={
                    answer.comments
                }
            />

        </div>
    );
};

export default AnswerCard;