// src/components/home/AboutMissionSection.tsx

import {
    Leaf,
    Target,
    Sprout,
} from "lucide-react";

import type {
    HomeContent,
    MissionVision,
} from "../../types/home";

import {
    getText,
    tr,
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
        <section
            className="
                py-20
                relative
                overflow-hidden
            "
        >

            {/* BACKGROUND DECOR */}
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

                {/* SECTION HEADER */}
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

                {/* GRID */}
                <div
                    className="
                        grid
                        grid-cols-1
                        lg:grid-cols-3
                        gap-8
                    "
                >

                    {/* ABOUT CARD */}
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

                        {/* ICON */}
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

                        {/* TITLE */}
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

                        {/* DESCRIPTION */}
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

                        {/* DECOR */}
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

                    {/* MISSION CARD */}
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

                        {/* ICON */}
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

                        {/* TITLE */}
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

                        {/* DESCRIPTION */}
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

                        {/* DECOR */}
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

                    {/* VISION CARD */}
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

                        {/* ICON */}
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

                        {/* TITLE */}
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

                        {/* DESCRIPTION */}
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

                        {/* DECOR */}
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

        </section>
    );
};

export default AboutMissionSection;