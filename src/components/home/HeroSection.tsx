// src/components/home/HeroSection.tsx

import {
    useEffect,
    useState,
} from "react";

import {
    ArrowRight, ChevronLeft, ChevronRight, ShoppingBag, TrendingUp, Users,
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

const STATS = [
    {icon: Users, value: '50,000+', label: 'Active Farmers'},
    {icon: ShoppingBag, value: '1,200+', label: 'Products Listed'},
    {icon: TrendingUp, value: '35%', label: 'Avg. Yield Increase'},
];

const HeroSection = ({
                         content,
                         banners,
                     }: Props) => {

    // AUTO RE-RENDER ON LANGUAGE CHANGE
    useTranslation();

    /*  const [
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
          banners[current];*/

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    const prev = () => setCurrent((c) => (c - 1 + banners.length) % banners.length);
    const next = () => setCurrent((c) => (c + 1) % banners.length);
    const activeBanner =
        banners[current];
    return (
        /* <section
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

                 {/!* IMAGE *!/}
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

                 {/!* OVERLAY *!/}
                 <div
                     className="
                         absolute
                         inset-0
                         bg-black/50
                     "
                 />

                 {/!* CONTENT *!/}
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

                         {/!* BADGE *!/}
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

                         {/!* TITLE *!/}
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

                         {/!* SUBTITLE *!/}
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

                         {/!* BUTTONS *!/}
                         <div
                             className="
                                 flex
                                 flex-col
                                 sm:flex-row
                                 gap-4
                             "
                         >

                             {/!* SHOP PRODUCTS *!/}
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

                             {/!* COMMUNITY *!/}
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

                 {/!* DOTS *!/}
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

         </section>*/

        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background images */}
            {banners.map((banner, i) => (
                <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${
                        i === current ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <img
                        src={banner.image}
                        alt={getText(
                                activeBanner,
                                "title"
                            ) ||
                            getText(
                                content,
                                "headline"
                            )}
                        className="w-full h-full object-cover"
                    />
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-green-950/85 via-green-950/50 to-transparent"/>
                </div>
            ))}

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="max-w-2xl">
          <span
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-green-300 text-xs font-medium mb-6 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>
            Trusted by 50,000+ Farmers Worldwide
          </span>

                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-6 animate-fade-up">
                         {getText(
                                 activeBanner,
                                 "title"
                             ) ||
                                 getText(
                                     content,
                                     "headline"
                                 )}
                    </h1>

                    <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl animate-fade-up"
                       style={{animationDelay: '0.1s'}}>
                        {getText(
                                 activeBanner,
                                 "subtitle"
                             ) ||
                                 getText(
                                     content,
                                     "subheadline"
                                 )}
                    </p>

                    <div className="flex flex-wrap gap-4 animate-fade-up" style={{animationDelay: '0.2s'}}>
                        <Link
                            to="/products"
                            className="flex items-center gap-2 px-7 py-3.5 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-xl transition-all shadow-lg shadow-green-900/30 hover:shadow-green-900/50 hover:-translate-y-0.5"
                        >
                             {tr(
                                     "hero.shop_products"
                                 )}
                            <ArrowRight className="w-4 h-4"/>
                        </Link>
                        <Link
                            to="/forum"
                            className="flex items-center gap-2 px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-sm border border-white/20 transition-all hover:-translate-y-0.5"
                        >
                             {tr(
                                     "hero.farmer_community"
                                 )}
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className="flex flex-wrap gap-8 mt-14 pt-10 border-t border-white/15 animate-fade-up"
                         style={{animationDelay: '0.3s'}}>
                        {STATS.map(({icon: Icon, value, label}) => (
                            <div key={label} className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-lg bg-green-600/30 flex items-center justify-center border border-green-500/20">
                                    <Icon className="w-5 h-5 text-green-300"/>
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-white">{value}</div>
                                    <div className="text-xs text-white/60">{label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Slider controls */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4">
                <button
                    onClick={prev}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                >
                    <ChevronLeft className="w-4 h-4"/>
                </button>
                <div className="flex gap-2">
                    {banners.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrent(i)}
                            className={`transition-all rounded-full ${
                                i === current ? 'w-6 h-2 bg-green-400' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
                            }`}
                        />
                    ))}
                </div>
                <button
                    onClick={next}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-sm"
                >
                    <ChevronRight className="w-4 h-4"/>
                </button>
            </div>
        </section>
    );
};

export default HeroSection;