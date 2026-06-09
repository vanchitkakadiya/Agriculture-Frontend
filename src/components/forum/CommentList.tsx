//src/components/forum/CommentList.tsx
import type {
    ForumComment,
} from "../../types/forum";

type Props = {
    comments: ForumComment[];
};

const CommentList = ({
    comments,
}: Props) => {

    if (!comments?.length) {
        return null;
    }

    return (
        <div
            className="
            mt-5
            space-y-4
        "
        >
            {comments.map(
                (comment) => (
                    <div
                        key={comment.id}
                        className="
                        bg-[#f5f3ed]
                        rounded-2xl
                        p-4
                    "
                    >
                        <div
                            className="
                            flex
                            items-center
                            justify-between
                            mb-2
                        "
                        >
                            <h4
                                className="
                                font-semibold
                                text-sm
                            "
                            >
                                {
                                    comment.author_name
                                }
                            </h4>

                            <span
                                className="
                                text-xs
                                text-gray-500
                            "
                            >
                                {new Date(
                                    comment.created_at
                                ).toLocaleDateString()}
                            </span>
                        </div>

                        <p
                            className="
                            text-gray-700
                            leading-7
                            break-words
                        "
                        >
                            {comment.body}
                        </p>
                    </div>
                )
            )}
        </div>
    );
};

export default CommentList;