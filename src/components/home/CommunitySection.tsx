// src/components/home/CommunitySection.tsx

import {
    MessageSquare,
    Eye,
    ArrowRight, Tag,
} from "lucide-react";

import {
    Link,
} from "@tanstack/react-router";

import type {
    ForumPreview,
} from "../../types/home";

import {
    tr,
    getText,
} from "../../utils/language";
import {useTranslation} from "react-i18next";

type Props = {
    title: string;
    subtitle: string;
    forums: ForumPreview[];
};

const CommunitySection =
    ({
         title,
         subtitle,
         forums,
     }: Props) => {

        useTranslation()
        /*   return (
               <section
                   className="
             py-16
             md:py-24
           "
               >

                   {/!* HEADER *!/}
                   <div
                       className="
               flex
               flex-col
               lg:flex-row
               lg:items-end
               lg:justify-between
               gap-6
               mb-14
             "
                   >

                       <div
                           className="
                 max-w-3xl
               "
                       >


                           <h2
                               className="
                   text-4xl
                   md:text-5xl
                   font-black
                   leading-tight
                   text-gray-900
                   mb-5
                 "
                           >
                               {title}
                           </h2>

                           <p
                               className="
                   text-lg
                   text-gray-600
                   leading-8
                 "
                           >
                               {subtitle}
                           </p>

                       </div>

                       <Link
                           to="/forum"
                           className="
                 inline-flex
                 items-center
                 justify-center
                 gap-2
                 bg-green-700
                 hover:bg-green-800
                 text-white
                 px-7
                 py-4
                 rounded-2xl
                 font-semibold
                 transition-all
                 hover:gap-3
                 shadow-lg
               "
                       >
                           {tr(
                               "forum.explore_community"
                           )}

                           <ArrowRight
                               size={18}
                           />

                       </Link>

                   </div>

                   {/!* FORUM GRID *!/}
                   <div
                       className="
               grid
               grid-cols-1
               xl:grid-cols-2
               gap-8
             "
                   >

                       {forums.map(
                           (
                               forum
                           ) => (
                               <Link
                                   key={
                                       forum.id
                                   }
                                   to="/forum/$id"
                                   params={{
                                       id: String(
                                           forum.id
                                       ),
                                   }}
                                   className="
                     group
                     bg-white
                     rounded-[32px]
                     border
                     border-[#ece7dc]
                     p-7
                     hover:shadow-2xl
                     hover:-translate-y-2
                     transition-all
                     duration-500
                   "
                               >

                                   {/!* TOP *!/}
                                   <div
                                       className="
                       flex
                       flex-wrap
                       items-center
                       gap-3
                       mb-5
                     "
                                   >

                                       {forum.is_pinned && (
                                           <div
                                               className="
                           inline-flex
                           items-center
                           gap-2
                           bg-yellow-100
                           text-yellow-700
                           px-4
                           py-2
                           rounded-full
                           text-xs
                           font-bold
                         "
                                           >

                                               <Pin
                                                   size={14}
                                               />

                                               {tr(
                                                   "forum.pinned"
                                               )}

                                           </div>
                                       )}

                                       <div
                                           className="
                         inline-flex
                         items-center
                         bg-green-50
                         text-green-700
                         px-4
                         py-2
                         rounded-full
                         text-xs
                         font-bold
                       "
                                       >
                                           {getText(
                                               forum,
                                               "category"
                                           )}
                                       </div>

                                   </div>

                                   {/!* TITLE *!/}
                                   <h3
                                       className="
                       text-2xl
                       font-black
                       leading-snug
                       text-gray-900
                       mb-4
                       line-clamp-2
                       group-hover:text-green-700
                       transition-colors
                     "
                                   >
                                       {getText(
                                           forum,
                                           "title"
                                       )}
                                   </h3>

                                   {/!* STATS *!/}
                                   <div
                                       className="
                       flex
                       flex-wrap
                       items-center
                       gap-5
                       mb-8
                     "
                                   >

                                       <div
                                           className="
                         flex
                         items-center
                         gap-2
                         text-gray-500
                         text-sm
                       "
                                       >

                                           <Eye
                                               size={18}
                                           />

                                           <span>
                         {
                             forum.view_count
                         }
                       </span>

                                       </div>

                                       <div
                                           className="
                         flex
                         items-center
                         gap-2
                         text-gray-500
                         text-sm
                       "
                                       >

                                           <MessageSquare
                                               size={18}
                                           />

                                           <span>
                         {
                             forum.answer_count
                         }

                       </span>

                                       </div>

                                   </div>

                                   {/!* FOOTER *!/}
                                   <div
                                       className="
                       flex
                       items-center
                       justify-between
                       pt-5
                       border-t
                     "
                                   >

                                       <div className="flex gap-1">

                                           <p
                                               className="
                           text-gray-400
                         "
                                           >
                                               {tr(
                                                   "forum.by"
                                               )}
                                           </p>

                                           <p
                                               className="
                           font-semibold
                           text-gray-900
                         "
                                           >
                                               {
                                                   forum.author_name
                                               }
                                           </p>

                                       </div>

                                       <div
                                           className="
                         inline-flex
                         items-center
                         gap-2
                         text-green-700
                         font-bold
                         group-hover:gap-3
                         transition-all
                       "
                                       >
                                           {tr(
                                               "forum.join_discussion"
                                           )}

                                           <ArrowRight
                                               size={18}
                                           />

                                       </div>

                                   </div>

                               </Link>
                           )
                       )}

                   </div>

               </section>
           );*/

        return (
            <div>
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <h2 className="mt-1.5 text-3xl font-serif font-bold text-gray-900">{title}</h2>
                    </div>
                    <Link
                        to="/forum"
                        className="hidden sm:flex items-center gap-1 text-green-700 font-semibold text-sm hover:text-green-600 transition-colors group"
                    >
                        {tr(
                            "forum.explore_community"
                        )}

                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
                    </Link>
                </div>

                {/*<p className="text-gray-500 text-sm mb-6">{subtitle}</p>*/}


                {/* Forum threads */}
                <div className="space-y-3">
                    {forums.map((forum) => (
                        <Link
                            key={forum.id}
                            to="/forum/$id"
                            params={{
                                id: String(
                                    forum.id
                                ),
                            }}
                            className="bg-white border border-gray-100 rounded-xl p-4 hover:border-green-200 hover:shadow-sm transition-all cursor-pointer group block"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2">
                  <span
                      className="px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600"
                  >
                    <span className="flex items-center gap-1">
                      <Tag className="w-2.5 h-2.5"/>
                         {getText(
                                               forum,
                                               "category"
                                           )}
                    </span>
                  </span>
                                        {/*<span className="text-xs text-gray-400">{forum.time_ago}</span>*/}
                                    </div>
                                    <h4 className="text-sm font-semibold text-gray-800 leading-snug group-hover:text-green-700 transition-colors line-clamp-2">
                                        {forum.title_en}
                                    </h4>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-3">
                                <span className="text-xs text-gray-500">by {forum.author_name}</span>
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3"/>
                    {forum.answer_count}
                </span>
                                    <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3"/>
                                        {forum.view_count.toLocaleString()}
                </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        );

    };

export default CommunitySection;