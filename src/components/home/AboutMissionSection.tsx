// src/components/home/AboutMissionSection.tsx

import {
    Target,
     Eye,
} from "lucide-react";

import type {
    HomeContent,
    MissionVision,
} from "../../types/home";

import {
    getText,
} from "../../utils/language";
import {useTranslation} from "react-i18next";

type Props = {
    content: HomeContent;
    missionVision: MissionVision;
};

const AboutMissionSection = ({
                                 content,
                                 missionVision,
                             }: Props) => {

    // AUTO RE-RENDER ON LANGUAGE CHANGE
    useTranslation();

    return (
        /*<section
            className="
                py-20
                relative
                overflow-hidden
            "
        >

            {/!* BACKGROUND DECOR *!/}
            <div
                className="
                    absolute
                    top-0
                    right-0
                    w-72
                    h-72
                    bg-green-200/20
                    rounded-full
                    blur-3xl
                "
            />

            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    w-72
                    h-72
                    bg-orange-200/20
                    rounded-full
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    z-10
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                "
            >

                {/!* SECTION HEADER *!/}
                <div
                    className="
                        text-center
                        mb-14
                    "
                >

                    <span
                        className="
                            inline-flex
                            items-center
                            gap-2
                            bg-green-100
                            text-green-700
                            px-5
                            py-2
                            rounded-full
                            font-semibold
                            text-sm
                            mb-5
                        "
                    >
                        🌱
                        {" "}
                        {tr(
                            "about.section_badge"
                        )}
                    </span>

                    <h2
                        className="
                            text-4xl
                            md:text-5xl
                            font-black
                            text-[#1d1d1d]
                            mb-5
                        "
                    >
                        {tr(
                            "about.section_title"
                        )}
                    </h2>

                    <p
                        className="
                            max-w-3xl
                            mx-auto
                            text-gray-600
                            text-lg
                            leading-8
                        "
                    >
                        {tr(
                            "about.section_description"
                        )}
                    </p>

                </div>

                {/!* GRID *!/}
                <div
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-3
                        gap-8
                    "
                >

                    {/!* ABOUT CARD *!/}
                    <div
                        className="
                            group
                            relative
                            overflow-hidden
                            rounded-[32px]
                            bg-white
                            border
                            border-gray-100
                            p-8
                            hover:shadow-2xl
                            transition-all
                            duration-300
                        "
                    >

                        {/!* ICON *!/}
                        <div
                            className="
                                w-16
                                h-16
                                rounded-2xl
                                bg-[#eef8e8]
                                flex
                                items-center
                                justify-center
                                mb-6
                            "
                        >

                            <Leaf
                                size={30}
                                className="
                                    text-green-700
                                "
                            />

                        </div>

                        {/!* TITLE *!/}
                        <h3
                            className="
                                text-3xl
                                font-bold
                                mb-5
                                text-[#1d1d1d]
                            "
                        >
                            {getText(
                                content,
                                "about_title"
                            )}
                        </h3>

                        {/!* DESCRIPTION *!/}
                        <p
                            className="
                                text-gray-600
                                leading-8
                                text-[16px]
                            "
                        >
                            {getText(
                                content,
                                "about"
                            )}
                        </p>

                        {/!* DECOR *!/}
                        <div
                            className="
                                absolute
                                -bottom-10
                                -right-10
                                w-36
                                h-36
                                bg-green-100/40
                                rounded-full
                            "
                        />

                    </div>

                    {/!* MISSION CARD *!/}
                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-[32px]
                            bg-gradient-to-br
                            from-[#e8f7df]
                            to-[#f4ffe9]
                            p-8
                            hover:shadow-2xl
                            transition-all
                            duration-300
                        "
                    >

                        {/!* ICON *!/}
                        <div
                            className="
                                w-16
                                h-16
                                rounded-2xl
                                bg-white
                                flex
                                items-center
                                justify-center
                                shadow-md
                                mb-6
                            "
                        >

                            <Target
                                size={30}
                                className="
                                    text-green-700
                                "
                            />

                        </div>

                        {/!* TITLE *!/}
                        <h3
                            className="
                                text-3xl
                                font-bold
                                mb-5
                                text-green-900
                            "
                        >
                            {getText(
                                missionVision,
                                "mission_title"
                            )}
                        </h3>

                        {/!* DESCRIPTION *!/}
                        <p
                            className="
                                text-gray-700
                                leading-8
                                text-[16px]
                            "
                        >
                            {getText(
                                missionVision,
                                "mission"
                            )}
                        </p>

                        {/!* DECOR *!/}
                        <div
                            className="
                                absolute
                                top-0
                                right-0
                                w-40
                                h-40
                                bg-green-200/30
                                rounded-full
                                blur-2xl
                            "
                        />

                    </div>

                    {/!* VISION CARD *!/}
                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-[32px]
                            bg-gradient-to-br
                            from-[#fff3dd]
                            to-[#fff9ef]
                            p-8
                            hover:shadow-2xl
                            transition-all
                            duration-300
                        "
                    >

                        {/!* ICON *!/}
                        <div
                            className="
                                w-16
                                h-16
                                rounded-2xl
                                bg-white
                                flex
                                items-center
                                justify-center
                                shadow-md
                                mb-6
                            "
                        >

                            <Sprout
                                size={30}
                                className="
                                    text-orange-500
                                "
                            />

                        </div>

                        {/!* TITLE *!/}
                        <h3
                            className="
                                text-3xl
                                font-bold
                                mb-5
                                text-orange-900
                            "
                        >
                            {getText(
                                missionVision,
                                "vision_title"
                            )}
                        </h3>

                        {/!* DESCRIPTION *!/}
                        <p
                            className="
                                text-gray-700
                                leading-8
                                text-[16px]
                            "
                        >
                            {getText(
                                missionVision,
                                "vision"
                            )}
                        </p>

                        {/!* DECOR *!/}
                        <div
                            className="
                                absolute
                                bottom-0
                                left-0
                                w-40
                                h-40
                                bg-orange-200/30
                                rounded-full
                                blur-2xl
                            "
                        />

                    </div>

                </div>

            </div>

        </section>*/

        <section className="py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image collage */}
                    <div className="relative h-[480px]">
                        <img
                            src="https://images.pexels.com/photos/1084543/pexels-photo-1084543.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Farmers at work"
                            className="absolute top-0 left-0 w-3/5 h-3/5 object-cover rounded-2xl shadow-xl"
                        />
                        <img
                            src="https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=600"
                            alt="Fertile farmland"
                            className="absolute bottom-0 right-0 w-3/5 h-3/5 object-cover rounded-2xl shadow-xl"
                        />
                        <div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-green-600 rounded-2xl flex items-center justify-center shadow-xl z-10">
              <span
                  className="text-white text-center text-xs font-semibold leading-tight px-2 text-balance text-center">
                Est.<br/>2019
              </span>
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-earth-100 rounded-full -z-10"/>
                    </div>

                    {/* Text content */}
                    <div>
                        <span className="text-green-700 text-sm font-semibold uppercase tracking-widest">
                          {getText(content, "about_title")}
                        </span>
                        <h2 className="mt-3 text-4xl lg:text-5xl font-serif font-bold text-gray-900 leading-tight mb-6">
                            Built by Farmers,<br/>
                            <span className="text-green-700">For Farmers</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-10">
                            {getText(content, "about")}
                        </p>

                        {/* Mission & Vision cards */}
                        <div className="space-y-4">
                            <div className="flex gap-4 p-5 bg-green-50 rounded-xl border border-green-100">
                                <div
                                    className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Target className="w-5 h-5 text-white"/>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        {getText(missionVision, "mission_title")}
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {getText(missionVision, "mission")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 p-5 bg-[#FAF8F3] rounded-xl border border-[#F2EDE0]">
                                <div
                                    className="w-10 h-10 bg-[#8B6B3E] rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Eye className="w-5 h-5 text-white"/>
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-1">
                                        {getText(missionVision, "vision_title")}
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {getText(missionVision, "vision")}
                                    </p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMissionSection;