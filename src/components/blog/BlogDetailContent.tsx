//components/blog/BlogDetailContent.tsx
import {
    useTranslation,
} from "react-i18next";
import {getText} from "../../utils/language.ts";

type Props = {
    blog: any;
};

const BlogDetailContent = ({
    blog,
}: Props) => {

        useTranslation();


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
                {getText(blog,"content")}
            </p>
        </div>
    );
};

export default BlogDetailContent;