import {
    Eye,
    MessageCircle,
} from "lucide-react";


import {
    useTranslation,
} from "react-i18next";
import type {ForumPreview} from "../../types/home.ts";

type Props = {
    forum: ForumPreview;
};

const ForumPreviewCard = ({
                              forum,
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
        p-5
        hover:shadow-md
        transition
      "
        >
            {/* TOP */}
            <div
                className="
          flex
          items-center
          justify-between
          mb-4
        "
            >
                <div>
                    <h3 className="font-bold">
                        {forum.author_name}
                    </h3>

                    <p
                        className="
              text-sm
              text-gray-500
            "
                    >
                        {forum.category_name}
                    </p>
                </div>

                <span
                    className="
            text-sm
            text-gray-400
          "
                >
          {forum.created_at}
        </span>
            </div>

            {/* QUESTION */}
            <p
                className="
          text-sm
    md:text-base
    font-semibold
    text-[#1d1d1d]
    leading-relaxed
        "
            >
                {isHindi
                    ? forum.title_en
                    : forum.title_hi}
            </p>

            {/* FOOTER */}
            <div
                className="
    mt-4
    flex
    items-center
    gap-4
    text-xs
    text-gray-500
  "
            >
                <div className="flex items-center gap-1">
                    <MessageCircle size={14}/>

                    {forum.answer_count} answers
                </div>

                <div className="flex items-center gap-1">
                    <Eye size={14}/>

                    {forum.view_count}
                </div>

                <span>{forum.created_at}</span>
            </div>
        </div>
    );
};

export default ForumPreviewCard;