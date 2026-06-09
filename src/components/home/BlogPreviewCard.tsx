import {
    useTranslation,
} from "react-i18next";
import type {BlogPost} from "../../types/blog.ts";
// import type {Blog} from "../../types/home.ts";

type Props = {
    blog: BlogPost;
};

const BlogPreviewCard = ({
                             blog,
                         }: Props) => {
    const {i18n} =
        useTranslation();

    const isHindi =
        i18n.language === "hi";

    return (
        <div
            className="
    bg-white
    rounded-2xl
    border
    border-gray-200
    p-4
    flex
    gap-4
    hover:shadow-lg
    transition
  "
        >
            {/* IMAGE */}
            <img
                src={blog.featured_image ||
                    "/placeholder-blog.jpg"}
                alt={
                    isHindi
                        ? blog.title_hi
                        : blog.title_en
                }
                loading="lazy"
                className="
      w-24
      h-24
      rounded-xl
      object-cover
      flex-shrink-0
    "
            />

            {/* CONTENT */}
            <div className="flex-1">
                 <span
                        className="
                        bg-[#eef3dc]
                        text-green-700
                        text-xs
                        font-semibold
                        px-3
                        py-1
                        rounded-full
                    "
                    >
                        {
                            blog.category_name
                        }
                    </span>

                <h3
                    className="
        text-base
        font-bold
        leading-snug
        text-[#1d1d1d]
      "
                >
                    {isHindi
                        ? blog.title_hi
                        : blog.title_en}
                </h3>

                <p
                    className="
        mt-2
        text-sm
        text-gray-500
        line-clamp-2
      "
                >
                    {isHindi
                        ? blog.summary_hi
                        : blog.summary_en}
                </p>
            </div>
        </div>
    );
};

export default BlogPreviewCard;