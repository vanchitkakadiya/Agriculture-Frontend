//components/blog/BlogDetailContent.tsx
import {
    useTranslation,
} from "react-i18next";

type Props = {
    blog: any;
};

const BlogDetailContent = ({
    blog,
}: Props) => {

    const { i18n } =
        useTranslation();

    const isHindi =
        i18n.language === "hi";

    const content =
        isHindi
            ? blog.content_hi ||
              blog.content_en
            : blog.content_en;

    return (
        <div
            className="
            prose
            prose-lg
            max-w-none
        "
        >
            <p
                className="
                leading-9
                text-gray-700
                whitespace-pre-line
            "
            >
                {content}
            </p>
        </div>
    );
};

export default BlogDetailContent;