// src/components/home/HeroSection.tsx

import {
    useEffect,
    useState,
} from "react";

import {
    ArrowRight,
} from "lucide-react";

import {
    Link,
} from "@tanstack/react-router";

import type {
    Banner,
    HomeContent,
} from "../../types/home";

import {
    getText,
    tr,
} from "../../utils/language";
import {useTranslation} from "react-i18next";

type Props = {
    content: HomeContent;
    banners: Banner[];
};

const HeroSection = ({
    content,
    banners,
}: Props) => {

    // AUTO RE-RENDER ON LANGUAGE CHANGE
    useTranslation();

    const [
        current,
        setCurrent,
    ] = useState(0);

    // AUTO SLIDE
    useEffect(() => {

        if (
            banners.length <= 1
        ) {
            return;
        }

        const interval =
            setInterval(() => {

                setCurrent(
                    (prev) =>
                        prev ===
                        banners.length - 1
                            ? 0
                            : prev + 1
                );

            }, 5000);

        return () =>
            clearInterval(
                interval
            );

    }, [banners.length]);

    const activeBanner =
        banners[current];

    return (
        <section
            className="
                py-6
                md:py-10
            "
        >

            <div
                className="
                    relative
                    overflow-hidden
                    rounded-[32px]
                    min-h-[520px]
                    md:min-h-[650px]
                "
            >

                {/* IMAGE */}
                <img
                    src={
                        activeBanner?.image
                    }
                    alt={
                        getText(
                            activeBanner,
                            "title"
                        ) ||
                        getText(
                            content,
                            "headline"
                        )
                    }
                    className="
                        absolute
                        inset-0
                        w-full
                        h-full
                        object-cover
                    "
                />

                {/* OVERLAY */}
                <div
                    className="
                        absolute
                        inset-0
                        bg-black/50
                    "
                />

                {/* CONTENT */}
                <div
                    className="
                        relative
                        z-10
                        flex
                        items-center
                        min-h-[520px]
                        md:min-h-[650px]
                        px-6
                        sm:px-10
                        lg:px-20
                    "
                >

                    <div
                        className="
                            max-w-3xl
                            text-white
                        "
                    >

                        {/* BADGE */}
                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                bg-white/15
                                backdrop-blur-md
                                border
                                border-white/20
                                px-5
                                py-2
                                rounded-full
                                text-sm
                                font-semibold
                                mb-6
                            "
                        >
                            🌱
                            {" "}
                            {tr(
                                "hero.trusted_farmers"
                            )}
                        </div>

                        {/* TITLE */}
                        <h1
                            className="
                                text-4xl
                                sm:text-5xl
                                lg:text-7xl
                                font-black
                                leading-tight
                                mb-6
                            "
                        >
                            {getText(
                                activeBanner,
                                "title"
                            ) ||
                                getText(
                                    content,
                                    "headline"
                                )}
                        </h1>

                        {/* SUBTITLE */}
                        <p
                            className="
                                text-lg
                                md:text-2xl
                                text-white/90
                                leading-8
                                max-w-2xl
                                mb-10
                            "
                        >
                            {getText(
                                activeBanner,
                                "subtitle"
                            ) ||
                                getText(
                                    content,
                                    "subheadline"
                                )}
                        </p>

                        {/* BUTTONS */}
                        <div
                            className="
                                flex
                                flex-col
                                sm:flex-row
                                gap-4
                            "
                        >

                            {/* SHOP PRODUCTS */}
                            <Link
                                to="/products"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    bg-green-700
                                    hover:bg-green-800
                                    text-white
                                    px-8
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    text-lg
                                    transition
                                "
                            >
                                {tr(
                                    "hero.shop_products"
                                )}

                                <ArrowRight
                                    size={20}
                                />
                            </Link>

                            {/* COMMUNITY */}
                            <Link
                                to="/forum"
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    bg-white/15
                                    backdrop-blur-md
                                    border
                                    border-white/20
                                    hover:bg-white/20
                                    text-white
                                    px-8
                                    py-4
                                    rounded-2xl
                                    font-bold
                                    text-lg
                                    transition
                                "
                            >
                                {tr(
                                    "hero.farmer_community"
                                )}
                            </Link>

                        </div>

                    </div>

                </div>

                {/* DOTS */}
                {banners.length > 1 && (
                    <div
                        className="
                            absolute
                            bottom-8
                            left-1/2
                            -translate-x-1/2
                            flex
                            items-center
                            gap-3
                            z-20
                        "
                    >

                        {banners.map(
                            (
                                _,
                                index
                            ) => (
                                <button
                                    key={
                                        index
                                    }
                                    onClick={() =>
                                        setCurrent(
                                            index
                                        )
                                    }
                                    className={`
                                        h-3
                                        rounded-full
                                        transition-all
                                        ${
                                            current ===
                                            index
                                                ? "w-10 bg-white"
                                                : "w-3 bg-white/40"
                                        }
                                    `}
                                />
                            )
                        )}

                    </div>
                )}

            </div>

        </section>
    );
};

export default HeroSection;