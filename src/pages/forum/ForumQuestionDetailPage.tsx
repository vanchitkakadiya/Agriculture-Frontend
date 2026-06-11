// src/pages/forum/ForumQuestionDetailPage.tsx

import {
    useEffect,
    useState,
} from "react";

import {
    Link,
    useParams,
} from "@tanstack/react-router";

import {
    ArrowLeft,
    Bookmark,
    Eye,
    Flag,
    MessageCircle,
    MessageSquare,
    Pin,
    Send,
} from "lucide-react";

import {
    getForumQuestionDetail,
    postForumAnswer,
    postForumComment,
    reportForumPost,
    toggleSaveForumPost,
} from "../../api/forumApi";

import type {
    ForumAnswer,
    ForumComment,
    ForumQuestion,
} from "../../types/forum";

import {
    getText,
    tr,
} from "../../utils/language";
import {useTranslation} from "react-i18next";

const ForumQuestionDetailPage =
    () => {
        useTranslation();

        const {id} =
            useParams({
                from:
                    "/forum/$id",
            });

        const [
            question,
            setQuestion,
        ] = useState<ForumQuestion | null>(
            null
        );

        const [
            loading,
            setLoading,
        ] = useState(true);

        const [
            answerBody,
            setAnswerBody,
        ] = useState("");

        const [
            answerLoading,
            setAnswerLoading,
        ] = useState(false);

        const [
            commentInputs,
            setCommentInputs,
        ] = useState<
            Record<number, string>
        >({});

        const [
            commentLoadingId,
            setCommentLoadingId,
        ] = useState<
            number | null
        >(null);

        const [
            reportReason,
            setReportReason,
        ] = useState("");

        const [
            showReportBox,
            setShowReportBox,
        ] = useState(false);

        const [
            reportLoading,
            setReportLoading,
        ] = useState(false);

        const [
            saved,
            setSaved,
        ] = useState(false);

        // =====================
        // FETCH QUESTION
        // =====================
        const fetchQuestion =
            async () => {

                try {

                    setLoading(true);

                    const data =
                        await getForumQuestionDetail(
                            id
                        );

                    setQuestion(
                        data
                    );

                } catch (
                    error
                    ) {

                    console.error(
                        "Forum Detail Error:",
                        error
                    );

                } finally {

                    setLoading(
                        false
                    );
                }
            };

        useEffect(() => {

            fetchQuestion();

        }, [id]);

        // =====================
        // POST ANSWER
        // =====================
        const handlePostAnswer =
            async () => {

                if (
                    !answerBody.trim()
                ) {
                    return;
                }

                try {

                    setAnswerLoading(
                        true
                    );

                    const response =
                        await postForumAnswer(
                            Number(id),
                            {
                                body:
                                answerBody,
                            }
                        );

                    const newAnswer =
                        response?.data;

                    if (
                        newAnswer &&
                        question
                    ) {

                        setQuestion({
                            ...question,
                            answers: [
                                newAnswer,
                                ...question.answers,
                            ],
                        });

                        setAnswerBody(
                            ""
                        );
                    }

                } catch (
                    error
                    ) {

                    console.error(
                        "Post Answer Error:",
                        error
                    );

                } finally {

                    setAnswerLoading(
                        false
                    );
                }
            };

        // =====================
        // POST COMMENT
        // =====================
        const handlePostComment =
            async (
                answerId: number
            ) => {

                const body =
                    commentInputs[
                        answerId
                        ];

                if (
                    !body?.trim()
                ) {
                    return;
                }

                try {

                    setCommentLoadingId(
                        answerId
                    );

                    const response =
                        await postForumComment(
                            answerId,
                            {
                                body,
                            }
                        );

                    const newComment =
                        response?.data;

                    if (
                        newComment &&
                        question
                    ) {

                        const updatedAnswers =
                            question.answers.map(
                                (
                                    answer
                                ) => {

                                    if (
                                        answer.id ===
                                        answerId
                                    ) {

                                        return {
                                            ...answer,
                                            comments: [
                                                ...answer.comments,
                                                newComment,
                                            ],
                                        };
                                    }

                                    return answer;
                                }
                            );

                        setQuestion({
                            ...question,
                            answers:
                            updatedAnswers,
                        });

                        setCommentInputs(
                            (
                                prev
                            ) => ({
                                ...prev,
                                [answerId]:
                                    "",
                            })
                        );
                    }

                } catch (
                    error
                    ) {

                    console.error(
                        "Post Comment Error:",
                        error
                    );

                } finally {

                    setCommentLoadingId(
                        null
                    );
                }
            };

        // =====================
        // SAVE POST
        // =====================
        const handleSave =
            async () => {

                if (!question) {
                    return;
                }

                try {

                    const response =
                        await toggleSaveForumPost(
                            question.id
                        );

                    setSaved(
                        response.data.saved
                    );

                } catch (
                    error
                    ) {

                    console.error(
                        error
                    );
                }
            };

        // =====================
        // REPORT POST
        // =====================
        const handleReport =
            async () => {

                if (
                    !reportReason.trim()
                ) {
                    return;
                }

                try {

                    setReportLoading(
                        true
                    );

                    if (!question) {
                        return;
                    }

                    await reportForumPost(
                        question.id,
                        reportReason
                    );

                    alert(
                        tr(
                            "forum_detail.report_success"
                        )
                    );

                    setReportReason(
                        ""
                    );

                    setShowReportBox(
                        false
                    );

                } catch (
                    error
                    ) {

                    console.error(
                        error
                    );

                } finally {

                    setReportLoading(
                        false
                    );
                }
            };

        if (loading) {

            return (
                <div
                    className="
                    min-h-screen
                    flex
                    items-center
                    justify-center
                "
                >
                    {tr(
                        "common.loading"
                    )}
                </div>
            );
        }

        if (!question) {

            return (
                <div className="p-10">
                    {tr(
                        "forum_detail.not_found"
                    )}
                </div>
            );
        }

        return (
            <div
                className="
                min-h-screen
                py-10
                px-4
            "
            >

                <div
                    className="
                    max-w-5xl
                    mx-auto
                    pt-20
                "
                >

                    {/* BACK */}
                    <Link
                        to="/forum"
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
                            "forum_detail.back"
                        )}

                    </Link>

                    {/* QUESTION */}
                    <div
                        className="
                        bg-white
                        border
                        rounded-3xl
                        p-6
                        md:p-8
                        mb-8
                    "
                    >

                        {/* TOP */}
                        <div
                            className="
                            flex
                            flex-wrap
                            justify-between
                            gap-4
                            mb-6
                        "
                        >

                            <div
                                className="
                                flex
                                flex-wrap
                                gap-3
                            "
                            >

                                {question.is_pinned && (
                                    <div
                                        className="
                                        bg-yellow-100
                                        text-yellow-700
                                        px-4
                                        py-2
                                        rounded-full
                                        text-sm
                                        font-semibold
                                        flex
                                        items-center
                                        gap-2
                                    "
                                    >

                                        <Pin
                                            size={
                                                15
                                            }
                                        />

                                        {tr(
                                            "forum_detail.pinned"
                                        )}

                                    </div>
                                )}

                                <div
                                    className="
                                    bg-green-100
                                    text-green-700
                                    px-4
                                    py-2
                                    rounded-full
                                    text-sm
                                    font-semibold
                                "
                                >
                                    {getText(
                                        question.category,
                                        "name"
                                    )}
                                </div>

                            </div>

                            {/* ACTIONS */}
                            <div
                                className="
                                flex
                                items-center
                                gap-3
                            "
                            >

                                <button
                                    onClick={
                                        handleSave
                                    }
                                    className="
                                    flex
                                    items-center
                                    gap-2
                                    border
                                    rounded-xl
                                    px-4
                                    py-2
                                    hover:bg-gray-50
                                "
                                >

                                    <Bookmark
                                        size={
                                            18
                                        }
                                    />

                                    {saved
                                        ? tr(
                                            "forum_detail.saved"
                                        )
                                        : tr(
                                            "forum_detail.save"
                                        )}

                                </button>

                                <button
                                    onClick={() =>
                                        setShowReportBox(
                                            (
                                                prev
                                            ) =>
                                                !prev
                                        )
                                    }
                                    className="
                                    flex
                                    items-center
                                    gap-2
                                    border
                                    rounded-xl
                                    px-4
                                    py-2
                                    hover:bg-gray-50
                                "
                                >

                                    <Flag
                                        size={
                                            18
                                        }
                                    />

                                    {tr(
                                        "forum_detail.report"
                                    )}

                                </button>

                            </div>

                        </div>

                        {/* TITLE */}
                        <h1
                            className="
                            text-3xl
                            md:text-4xl
                            font-bold
                            leading-tight
                            mb-6
                        "
                        >
                            {getText(
                                question,
                                "title"
                            )}
                        </h1>

                        {/* DESCRIPTION */}
                        <p
                            className="
                            text-gray-700
                            leading-8
                            whitespace-pre-line
                            break-words
                        "
                        >
                            {getText(
                                question,
                                "description"
                            )}
                        </p>

                        {/* TAGS */}
                       {/* {question.tags
                                ?.length >
                            0 && (
                                <div
                                    className="
                                flex
                                flex-wrap
                                gap-3
                                mt-8
                            "
                                >

                                    {question.tags.map(
                                        (
                                            tag
                                        ) => (
                                            <span
                                                key={
                                                    tag.id
                                                }
                                                className="
                                            bg-[#eef3dc]
                                            text-green-700
                                            px-4
                                            py-2
                                            rounded-full
                                            text-sm
                                            font-medium
                                        "
                                            >
                                            #
                                                {getText(
                                                    tag,
                                                    "name"
                                                )}
                                        </span>
                                        )
                                    )}

                                </div>
                            )}*/}

                        {/* FOOTER */}
                        <div
                            className="
                            flex
                            flex-wrap
                            gap-6
                            text-sm
                            text-gray-500
                            mt-8
                        "
                        >

                            <span>
                                {tr(
                                    "forum_detail.by"
                                )}{" "}
                                <strong>
                                    {
                                        question.author_name
                                    }
                                </strong>
                            </span>

                            <div
                                className="
                                flex
                                items-center
                                gap-2
                            "
                            >

                                <Eye
                                    size={16}
                                />

                                {
                                    question.view_count
                                }{" "}
                                {tr(
                                    "forum_detail.views"
                                )}

                            </div>

                            <div
                                className="
                                flex
                                items-center
                                gap-2
                            "
                            >

                                <MessageSquare
                                    size={16}
                                />

                                {
                                    question.answers
                                        ?.length
                                }{" "}
                                {tr(
                                    "forum_detail.answers"
                                )}

                            </div>

                        </div>

                        {/* REPORT BOX */}
                        {showReportBox && (
                            <div
                                className="
                                mt-8
                                border-t
                                pt-6
                            "
                            >

                                <textarea
                                    value={
                                        reportReason
                                    }
                                    onChange={(
                                        e
                                    ) =>
                                        setReportReason(
                                            e
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder={tr(
                                        "forum_detail.report_placeholder"
                                    )}
                                    rows={
                                        4
                                    }
                                    className="
                                    w-full
                                    border
                                    rounded-2xl
                                    p-4
                                    outline-none
                                "
                                />

                                <button
                                    onClick={
                                        handleReport
                                    }
                                    disabled={
                                        reportLoading
                                    }
                                    className="
                                    mt-4
                                    bg-red-600
                                    text-white
                                    px-6
                                    py-3
                                    rounded-2xl
                                    font-semibold
                                "
                                >
                                    {reportLoading
                                        ? tr(
                                            "forum_detail.submitting"
                                        )
                                        : tr(
                                            "forum_detail.submit_report"
                                        )}
                                </button>

                            </div>
                        )}

                    </div>

                    {/* ANSWER FORM */}
                    {!question.is_closed && (
                        <div
                            className="
                            bg-white
                            border
                            rounded-3xl
                            p-6
                            mb-8
                        "
                        >

                            <h2
                                className="
                                text-2xl
                                font-bold
                                mb-4
                            "
                            >
                                {tr(
                                    "forum_detail.write_answer"
                                )}
                            </h2>

                            <textarea
                                value={
                                    answerBody
                                }
                                onChange={(
                                    e
                                ) =>
                                    setAnswerBody(
                                        e.target
                                            .value
                                    )
                                }
                                placeholder={tr(
                                    "forum_detail.answer_placeholder"
                                )}
                                rows={5}
                                className="
                                w-full
                                rounded-2xl
                                border
                                p-4
                                outline-none
                                resize-none
                            "
                            />

                            <div className="mt-4">

                                <button
                                    onClick={
                                        handlePostAnswer
                                    }
                                    disabled={
                                        answerLoading ||
                                        !answerBody.trim()
                                    }
                                    className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    bg-green-700
                                    hover:bg-green-800
                                    disabled:bg-gray-400
                                    text-white
                                    px-6
                                    py-3
                                    rounded-2xl
                                    font-semibold
                                "
                                >

                                    <Send
                                        size={18}
                                    />

                                    {answerLoading
                                        ? tr(
                                            "forum_detail.posting"
                                        )
                                        : tr(
                                            "forum_detail.post_answer"
                                        )}

                                </button>

                            </div>

                        </div>
                    )}

                    {/* ANSWERS */}
                    <div>

                        <h2
                            className="
                            text-3xl
                            font-bold
                            mb-6
                        "
                        >
                            {tr(
                                "forum_detail.answers"
                            )}
                        </h2>

                        <div
                            className="
                            space-y-6
                        "
                        >

                            {question.answers
                                ?.length >
                            0 ? (
                                question.answers.map(
                                    (
                                        answer: ForumAnswer
                                    ) => (
                                        <div
                                            key={
                                                answer.id
                                            }
                                            className="
                                            bg-white
                                            border
                                            rounded-3xl
                                            p-6
                                        "
                                        >

                                            {/* ANSWER */}
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

                                                    <div
                                                        className="
                                                        flex
                                                        items-center
                                                        gap-3
                                                        mb-2
                                                    "
                                                    >

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

                                                        {answer.is_helpful && (
                                                            <span
                                                                className="
                                                                bg-green-100
                                                                text-green-700
                                                                text-xs
                                                                px-2
                                                                py-1
                                                                rounded-full
                                                                font-semibold
                                                            "
                                                            >
                                                                {tr(
                                                                    "forum_detail.helpful"
                                                                )}
                                                            </span>
                                                        )}

                                                    </div>

                                                    <p
                                                        className="
                                                        text-sm
                                                        text-gray-500
                                                    "
                                                    >
                                                        {new Date(
                                                            answer.created_at
                                                        ).toLocaleString()}
                                                    </p>

                                                </div>

                                            </div>

                                            <p
                                                className="
                                                text-gray-700
                                                leading-8
                                                whitespace-pre-line
                                                break-words
                                            "
                                            >
                                                {
                                                    answer.body
                                                }
                                            </p>

                                            {/* COMMENTS */}
                                            <div
                                                className="
                                                mt-6
                                                border-t
                                                pt-5
                                            "
                                            >

                                                <div
                                                    className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    mb-4
                                                "
                                                >

                                                    <MessageCircle
                                                        size={
                                                            18
                                                        }
                                                    />

                                                    <h4
                                                        className="
                                                        font-semibold
                                                    "
                                                    >
                                                        {tr(
                                                            "forum_detail.comments"
                                                        )}
                                                    </h4>

                                                </div>

                                                {/* COMMENT LIST */}
                                                <div
                                                    className="
                                                    space-y-4
                                                    mb-5
                                                "
                                                >

                                                    {answer.comments
                                                        ?.length >
                                                    0 ? (
                                                        answer.comments.map(
                                                            (
                                                                comment: ForumComment
                                                            ) => (
                                                                <div
                                                                    key={
                                                                        comment.id
                                                                    }
                                                                    className="
                                                                    bg-gray-50
                                                                    rounded-2xl
                                                                    p-4
                                                                "
                                                                >

                                                                    <div
                                                                        className="
                                                                        flex
                                                                        items-center
                                                                        justify-between
                                                                        gap-4
                                                                        mb-2
                                                                    "
                                                                    >

                                                                        <strong>
                                                                            {
                                                                                comment.author_name
                                                                            }
                                                                        </strong>

                                                                        <span
                                                                            className="
                                                                            text-xs
                                                                            text-gray-500
                                                                        "
                                                                        >
                                                                            {new Date(
                                                                                comment.created_at
                                                                            ).toLocaleString()}
                                                                        </span>

                                                                    </div>

                                                                    <p
                                                                        className="
                                                                        text-gray-700
                                                                        break-words
                                                                    "
                                                                    >
                                                                        {
                                                                            comment.body
                                                                        }
                                                                    </p>

                                                                </div>
                                                            )
                                                        )
                                                    ) : (
                                                        <div
                                                            className="
                                                            text-sm
                                                            text-gray-500
                                                        "
                                                        >
                                                            {tr(
                                                                "forum_detail.no_comments"
                                                            )}
                                                        </div>
                                                    )}

                                                </div>

                                                {/* COMMENT FORM */}
                                                <div
                                                    className="
                                                    flex
                                                    flex-col
                                                    sm:flex-row
                                                    gap-3
                                                "
                                                >

                                                    <input
                                                        value={
                                                            commentInputs[
                                                                answer.id
                                                                ] ||
                                                            ""
                                                        }
                                                        onChange={(
                                                            e
                                                        ) =>
                                                            setCommentInputs(
                                                                (
                                                                    prev
                                                                ) => ({
                                                                    ...prev,
                                                                    [answer.id]:
                                                                    e
                                                                        .target
                                                                        .value,
                                                                })
                                                            )
                                                        }
                                                        placeholder={tr(
                                                            "forum_detail.comment_placeholder"
                                                        )}
                                                        className="
                                                        flex-1
                                                        border
                                                        rounded-2xl
                                                        px-4
                                                        py-3
                                                        outline-none
                                                    "
                                                    />

                                                    <button
                                                        onClick={() =>
                                                            handlePostComment(
                                                                answer.id
                                                            )
                                                        }
                                                        disabled={
                                                            commentLoadingId ===
                                                            answer.id ||
                                                            !commentInputs[
                                                                answer.id
                                                                ]?.trim()
                                                        }
                                                        className="
                                                        bg-green-700
                                                        hover:bg-green-800
                                                        disabled:bg-gray-400
                                                        text-white
                                                        px-5
                                                        py-3
                                                        rounded-2xl
                                                        font-semibold
                                                    "
                                                    >
                                                        {commentLoadingId ===
                                                        answer.id
                                                            ? tr(
                                                                "forum_detail.posting"
                                                            )
                                                            : tr(
                                                                "forum_detail.comment"
                                                            )}
                                                    </button>

                                                </div>

                                            </div>

                                        </div>
                                    )
                                )
                            ) : (
                                <div
                                    className="
                                    bg-white
                                    border
                                    rounded-3xl
                                    p-10
                                    text-center
                                    text-gray-500
                                "
                                >
                                    {tr(
                                        "forum_detail.no_answers"
                                    )}
                                </div>
                            )}

                        </div>

                    </div>

                </div>

            </div>
        );
    };

export default ForumQuestionDetailPage;