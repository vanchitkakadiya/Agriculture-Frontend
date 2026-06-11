import {
    ArrowRight,
} from "lucide-react";

import {
    Link,
} from "@tanstack/react-router";

import type {
    HomeContent,
} from "../../types/home";

type Props = {
    content: HomeContent;
};

const CTASection =
    ({
         content,
     }: Props) => {

        return (
            <section
                className=" max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" >

                <div
                    className="
                    relative
                    overflow-hidden
                    rounded-[32px]
                    bg-gradient-to-r
                    from-[#f4a71d]
                    to-[#ea8c3d]
                    px-6
                    py-16
                    md:px-16
                    text-center
                "
                >

                    <div
                        className="
                        absolute
                        -top-16
                        -right-16
                        w-52
                        h-52
                        bg-white/10
                        rounded-full
                    "
                    />

                    <div
                        className="
                        absolute
                        -bottom-20
                        -left-16
                        w-64
                        h-64
                        bg-white/10
                        rounded-full
                    "
                    />

                    <div className="relative z-10">

                        <h2
                            className="
                            text-3xl
                            md:text-5xl
                            font-bold
                            text-[#1d1d1d]
                        "
                        >
                            {
                                content.cta_title_en
                            }
                        </h2>

                        <p
                            className="
                            mt-5
                            text-lg
                            text-[#3f3f3f]
                            max-w-2xl
                            mx-auto
                            leading-8
                        "
                        >
                            {
                                content.cta_subtitle_en
                            }
                        </p>

                        <div className="mt-10">

                            <Link
                                to="/support"
                                className="
                                inline-flex
                                items-center
                                gap-2
                                bg-[#163300]
                                hover:bg-black
                                text-white
                                px-7
                                py-4
                                rounded-2xl
                                font-semibold
                                transition
                            "
                            >

                                {
                                    content
                                        .cta_button_text_en
                                }

                                <ArrowRight
                                    size={18}
                                />

                            </Link>

                        </div>

                    </div>

                </div>

            </section>
        );
    };

export default CTASection;