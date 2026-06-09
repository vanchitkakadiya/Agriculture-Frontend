// src/components/home/FarmingTipsSection.tsx

import type {
    FarmingTip,
} from "../../types/home";

import {
    Link,
} from "@tanstack/react-router";

import {
    ArrowRight,
    Clock3,
    Tag,
} from "lucide-react";

import {
    useTranslation,
} from "react-i18next";
import {getText, tr} from "../../utils/language.ts";

type Props = {
    title: string;
    blogs: FarmingTip[];
};

const FarmingTipsSection =
    ({
         title,
         blogs,
     }: Props) => {

        const {t} = useTranslation();

        const [
            featured,
            ...rest
        ] = blogs;

        /* return (
             <section
                 className="
                 py-6
             "
             >

                 {/!* HEADER *!/}
                 <div
                     className="
                     flex
                     items-end
                     justify-between
                     mb-8
                 "
                 >

                     <div>
                         <h2
                             className="
                             text-3xl
                             sm:text-4xl
                             font-black
                             text-[#111827]
                             tracking-tight
                         "
                         >
                             {title}
                         </h2>

                     </div>

                     <Link
                         to="/blogs"
                         className="
                         hidden
                         sm:flex
                         items-center
                         gap-2
                         text-green-700
                         font-semibold
                         hover:gap-3
                         transition-all
                     "
                     >

                          {t("common.view_all")}

                         <ArrowRight
                             size={18}
                         />
                     </Link>

                 </div>

                 {/!* FEATURED BLOG *!/}
                 {featured && (
                     <Link
                         to="/blogs/$id"
                         params={{
                             id: String(
                                 featured.id
                             ),
                         }}
                         className="
                         block
                         group
                         mb-8
                     "
                     >

                         {/!* IMAGE *!/}
                         <div
                             className="
                             relative
                             overflow-hidden
                             rounded-[28px]
                             h-[220px]
                             sm:h-[320px]
                             mb-5
                         "
                         >

                             <img
                                 src={
                                     featured.featured_image
                                 }
                                 alt=
                                     {getText(
                                         featured,
                                         "title"
                                     )}

                                 className="
                                 w-full
                                 h-full
                                 object-cover
                                 group-hover:scale-105
                                 transition-transform
                                 duration-500
                             "
                             />

                             {/!* CATEGORY *!/}
                             <div
                                 className="
                                 absolute
                                 top-4
                                 left-4
                                 bg-[#f4ead2]
                                 text-[#8a5b18]
                                 px-4
                                 py-2
                                 rounded-full
                                 text-sm
                                 font-semibold
                                 shadow-sm
                             "
                             >
                                 {getText(
                                     featured,
                                     "category"
                                 )}
                             </div>

                         </div>

                         {/!* TITLE *!/}
                         <h3
                             className="
                             text-2xl
                             sm:text-4xl
                             font-black
                             text-[#111827]
                             leading-tight
                             mb-3
                             group-hover:text-green-700
                             transition-colors
                         "
                         >
                             {getText(
                                 featured,
                                 "title"
                             )}
                         </h3>

                         {/!* SUMMARY *!/}
                         <p
                             className="
                             text-gray-500
                             text-lg
                             leading-8
                             mb-4
                             max-w-4xl
                         "
                         >
                             {getText(
                                 featured,
                                 "summary"
                             )}
                         </p>

                         {/!* META *!/}
                         <div
                             className="
                             flex
                             items-center
                             gap-5
                             text-sm
                             text-gray-400
                         "
                         >

                             <div
                                 className="
                                 flex
                                 items-center
                                 gap-1
                             "
                             >

                                 <Clock3
                                     size={15}
                                 />

                                 5 min read

                             </div>

                             <span>
                                 {new Date(
                                     featured.published_at
                                 ).toLocaleDateString()}
                             </span>

                         </div>

                     </Link>
                 )}

                 {/!* SMALL BLOGS *!/}
                 <div
                     className="
                     space-y-6
                 "
                 >

                     {rest.map(
                         (
                             blog
                         ) => (
                             <Link
                                 key={
                                     blog.id
                                 }
                                 to="/blogs/$id"
                                 params={{
                                     id: String(
                                         blog.id
                                     ),
                                 }}
                                 className="
                                 flex
                                 gap-4
                                 group
                             "
                             >

                                 {/!* IMAGE *!/}
                                 <div
                                     className="
                                     w-24
                                     h-24
                                     rounded-2xl
                                     overflow-hidden
                                     flex-shrink-0
                                 "
                                 >

                                     <img
                                         src={
                                             blog.featured_image
                                         }
                                         alt=
                                             {getText(
                                                 blog,
                                                 "title"
                                             )}


                                         className="
                                         w-full
                                         h-full
                                         object-cover
                                         group-hover:scale-110
                                         transition-transform
                                         duration-500
                                     "
                                     />

                                 </div>

                                 {/!* CONTENT *!/}
                                 <div className="flex-1">

                                     {/!* CATEGORY *!/}
                                     <div
                                         className="
                                         flex
                                         items-center
                                         gap-2
                                         mb-2
                                     "
                                     >

                                         <Tag
                                             size={13}
                                             className="
                                             text-green-700
                                         "
                                         />

                                         <span
                                             className="
                                             text-sm
                                             text-green-700
                                             font-medium
                                         "
                                         >

                                                 {getText(
                                                 blog,
                                                 "category"
                                             )}
                                         </span>

                                     </div>

                                     {/!* TITLE *!/}
                                     <h4
                                         className="
                                         text-lg
                                         font-bold
                                         text-[#111827]
                                         leading-snug
                                         mb-2
                                         line-clamp-2
                                         group-hover:text-green-700
                                         transition-colors
                                     "
                                     >
                                             {getText(
                                                 blog,
                                                 "title"
                                             )}
                                     </h4>

                                     {/!* META *!/}
                                     <div
                                         className="
                                         flex
                                         items-center
                                         gap-4
                                         text-sm
                                         text-gray-400
                                     "
                                     >

                                         <div
                                             className="
                                             flex
                                             items-center
                                             gap-1
                                         "
                                         >

                                             <Clock3
                                                 size={14}
                                             />

                                             7 min

                                         </div>

                                         <span>
                                             {new Date(
                                                 blog.published_at
                                             ).toLocaleDateString()}
                                         </span>

                                     </div>

                                 </div>

                             </Link>
                         )
                     )}

                 </div>

                 {/!* MOBILE BUTTON *!/}
                 <div
                     className="
                     mt-8
                     sm:hidden
                 "
                 >

                     <Link
                         to="/blogs"
                         className="
                         flex
                         items-center
                         justify-center
                         gap-2
                         border-2
                         border-green-700
                         text-green-700
                         py-4
                         rounded-2xl
                         font-semibold
                     "
                     >
                         {t("common.view_all")}

                         <ArrowRight
                             size={18}
                         />

                     </Link>

                 </div>

             </section>
         );*/

        return (
            <section>

                {/* HEADER */}
                <div
                    className="
                    flex
                    items-end
                    justify-between
                    mb-8
                "
                >

                    <div>
                        <h2
                            className="mt-1.5 text-3xl font-serif font-bold text-gray-900"
                        >
                            {title}
                        </h2>

                    </div>

                    <Link
                        to="/blogs"
                        className="hidden sm:flex items-center gap-1 text-green-700 font-semibold text-sm hover:text-green-600 transition-colors group"
                    >

                        {tr("common.view_all")}

                        <ArrowRight
                            size={18}
                        />
                    </Link>

                </div>

                {/* FEATURED BLOG */}
                {featured && (
                    <Link
                        to="/blogs/$id"
                        params={{
                            id: String(
                                featured.id
                            ),
                        }}
                        className="
                        block
                        group
                        mb-8
                    "
                    >

                        {/* IMAGE */}
                        <div
                            className="
                            relative
                            overflow-hidden
                            rounded-xl
                            h-[200px]
                            sm:h-[320px]
                            mb-5
                        "
                        >

                            <img
                                src={
                                    featured.featured_image
                                }
                                alt=
                                    {getText(
                                        featured,
                                        "title"
                                    )}

                                className="
                                w-full
                                h-full
                                object-cover
                                group-hover:scale-105
                                transition-transform
                                duration-500
                            "
                            />

                            {/* CATEGORY */}
                            <div
                                className="
                                absolute
                                top-4
                                left-4
                                bg-[#f4ead2]
                                text-[#8a5b18]
                                px-4
                                py-2
                                rounded-full
                                text-sm
                                font-semibold
                                shadow-sm
                            "
                            >
                                {getText(
                                    featured,
                                    "category"
                                )}
                            </div>

                        </div>

                        {/* TITLE */}
                        <h3
                            className="font-serif font-semibold text-gray-900 text-lg leading-snug mb-2 group-hover:text-green-700 transition-colors"
                        >
                            {getText(
                                featured,
                                "title"
                            )}
                        </h3>

                        {/* SUMMARY */}
                        <p
                            className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-3"
                        >
                            {getText(
                                featured,
                                "summary"
                            )}
                        </p>

                        {/* META */}

                    </Link>
                )}

                {/* SMALL BLOGS */}
                <div
                    className="
                    space-y-6
                "
                >

                    {rest.map(
                        (
                            blog
                        ) => (
                            <Link
                                key={
                                    blog.id
                                }
                                to="/blogs/$id"
                                params={{
                                    id: String(
                                        blog.id
                                    ),
                                }}
                                className="
                                flex
                                gap-4
                                group
                            "
                            >

                                {/* IMAGE */}
                                <div
                                    className="
                                    w-20
                                    h-20
                                    rounded-xl
                                    overflow-hidden
                                    flex-shrink-0
                                "
                                >

                                    <img
                                        src={
                                            blog.featured_image
                                        }
                                        alt=
                                            {getText(
                                                blog,
                                                "title"
                                            )}


                                        className="
                                        w-full
                                        h-full
                                        object-cover
                                        group-hover:scale-110
                                        transition-transform
                                        duration-500
                                    "
                                    />

                                </div>

                                {/* CONTENT */}
                                <div className="flex-1">

                                    {/* CATEGORY */}
                                    <div
                                        className="
                                        flex
                                        items-center
                                        gap-2
                                        mb-2
                                    "
                                    >

                                        <Tag
                                            size={13}
                                            className="
                                            text-green-700
                                        "
                                        />

                                        <span
                                            className="
                                            text-sm
                                            text-green-700
                                            font-medium
                                        "
                                        >

                                                {getText(
                                                    blog,
                                                    "category"
                                                )}
                                        </span>

                                    </div>

                                    {/* TITLE */}
                                    <h4
                                        className="
                                        text-sm font-semibold text-gray-900 leading-snug line-clamp-2 group-hover:text-green-700 transition-colors mb-1
                                    "
                                    >
                                        {getText(
                                            blog,
                                            "title"
                                        )}
                                    </h4>

                                    {/* META */}
                                    <div
                                        className="
                                        flex
                                        items-center
                                        gap-3
                                        text-xs
                                        text-gray-400
                                    "
                                    >

                                        <div
                                            className="
                                            flex
                                            items-center
                                            gap-1
                                        "
                                        >

                                            <Clock3
                                                size={14}
                                            />

                                            7 min

                                        </div>

                                        <span>
                                            {new Date(
                                                blog.published_at
                                            ).toLocaleDateString()}
                                        </span>

                                    </div>

                                </div>

                            </Link>
                        )
                    )}

                </div>

                {/* MOBILE BUTTON */}
                <div
                    className="
                    mt-8
                    sm:hidden
                "
                >

                    <Link
                        to="/blogs"
                        className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        border-2
                        border-green-700
                        text-green-700
                        py-4
                        rounded-xl
                        font-semibold
                    "
                    >
                        {t("common.view_all")}

                        <ArrowRight
                            size={18}
                        />

                    </Link>

                </div>

            </section>
        );
    };

export default FarmingTipsSection;