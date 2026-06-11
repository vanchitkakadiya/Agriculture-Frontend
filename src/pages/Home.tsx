import HeroSection
    from "../components/home/HeroSection";

import AboutMissionSection
    from "../components/home/AboutMissionSection";

import FeaturedProducts
    from "../components/home/FeaturedProducts";

import FarmingTipsSection
    from "../components/home/FarmingTipsSection";

import CommunitySection
    from "../components/home/CommunitySection";

import CTASection
    from "../components/home/CTASection";

import HomeSkeleton
    from "../components/home/HomeSkeleton";

import {
    useHomeCms,
} from "../hooks/useHomeCms";
import {useTranslation} from "react-i18next";
import {getText, tr} from "../utils/language.ts";

const Home = () => {

    useTranslation()
    const {
        data,
        loading,
        error,
    } = useHomeCms();

    if (loading) {

        return (
            <div className="px-6 py-10">
                <HomeSkeleton/>
            </div>
        );
    }

    if (error || !data) {

        return (
            <div
                className="
                min-h-screen
                flex
                items-center
                justify-center
            "
            >
                {
                    tr("home.failed_load")
                }
            </div>
        );
    }

    return (
        <div
            className="min-h-screen ">

            <HeroSection
                content={data.content}
                banners={data.banners}
            />

            <AboutMissionSection
                content={data.content}
                missionVision={
                    data.mission_vision
                }
            />

            <FeaturedProducts
                // title={
                //     data.content
                //         .featured_products_title_en
                // }
                title={
                    getText(data.content, "featured_products_title")
                }
                products={
                    data.featured_products
                }
            />

            <div
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 px-4 md:px-8 lg:px-16 py-20 max-w-7xl mx-auto">
                {/*Blog section*/}
                <FarmingTipsSection
                    title={
                        getText(data.content, "farming_tips_title")
                    }
                    blogs={
                        data.farming_tips
                    }
                />

                <CommunitySection

                    title={
                        getText(data.content, "community_title")
                    }
                    subtitle={
                        getText(data.content, "community_subtitle")
                    }
                    forums={
                        data.forum_preview
                    }
                />

            </div>

            <CTASection
                content={data.content}
            />

        </div>
    );
};

export default Home;