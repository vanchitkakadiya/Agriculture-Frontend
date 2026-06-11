// src/components/support/SupportSidebar.tsx

import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
    Clock3,
    ShieldCheck,
} from "lucide-react";

import SocialLinks
    from "./SocialLinks.tsx";

import {
    tr,
} from "../../utils/language";

import {
    useTranslation,
} from "react-i18next";

const SupportSidebar = () => {

    useTranslation();

    const whatsappNumber =
        "919999999999";

    return (
        <div
            className="
                space-y-6
            "
        >

            {/* WHATSAPP CARD */}
            <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="
                    relative
                    overflow-hidden
                    block
                    rounded-[30px]
                    bg-gradient-to-br
                    from-[#12c95b]
                    to-[#0ea548]
                    p-7
                    text-white
                    shadow-xl
                    hover:-translate-y-1
                    transition-all
                    duration-300
                "
            >

                <div
                    className="
                        absolute
                        top-0
                        right-0
                        w-40
                        h-40
                        bg-white/10
                        rounded-full
                        blur-3xl
                    "
                />

                <div
                    className="
                        relative
                        z-10
                    "
                >

                    <div
                        className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-white/20
                            flex
                            items-center
                            justify-center
                            mb-6
                        "
                    >

                        <MessageCircle
                            size={30}
                        />

                    </div>

                    <h3
                        className="
                            text-2xl
                            font-black
                            leading-tight
                            mb-3
                        "
                    >
                        WhatsApp Support
                    </h3>

                    <p
                        className="
                            text-white/90
                            leading-7
                            mb-6
                        "
                    >
                        Chat instantly with our support team
                        for quick help and farming guidance.
                    </p>

                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            bg-white
                            text-[#12b14f]
                            font-bold
                            px-5
                            py-3
                            rounded-2xl
                        "
                    >
                        {tr(
                            "support_page.whatsapp"
                        )}
                    </div>

                </div>

            </a>

            {/* CONTACT CARD */}
            <div
                className="
                    bg-white
                    border
                    border-[#ece6d7]
                    rounded-[30px]
                    p-7
                    shadow-[0_10px_30px_rgba(0,0,0,0.03)]
                "
            >

                <h3
                    className="
                        text-2xl
                        font-black
                        text-[#1f1f1f]
                        mb-7
                    "
                >
                    Contact Information
                </h3>

                <div
                    className="
                        space-y-6
                    "
                >

                    {/* EMAIL */}
                    <div
                        className="
                            flex
                            gap-4
                        "
                    >

                        <div
                            className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-[#f5f9ef]
                                flex
                                items-center
                                justify-center
                                flex-shrink-0
                            "
                        >

                            <Mail
                                size={22}
                                className="
                                    text-green-700
                                "
                            />

                        </div>

                        <div>

                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                    mb-1
                                "
                            >
                                Email Address
                            </p>

                            <p
                                className="
                                    font-semibold
                                    text-[#1f1f1f]
                                    break-all
                                "
                            >
                                support@kisanmitra.com
                            </p>

                        </div>

                    </div>

                    {/* PHONE */}
                    <div
                        className="
                            flex
                            gap-4
                        "
                    >

                        <div
                            className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-[#f5f9ef]
                                flex
                                items-center
                                justify-center
                                flex-shrink-0
                            "
                        >

                            <Phone
                                size={22}
                                className="
                                    text-green-700
                                "
                            />

                        </div>

                        <div>

                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                    mb-1
                                "
                            >
                                Phone Number
                            </p>

                            <p
                                className="
                                    font-semibold
                                    text-[#1f1f1f]
                                "
                            >
                                +91 99999 99999
                            </p>

                        </div>

                    </div>

                    {/* ADDRESS */}
                    <div
                        className="
                            flex
                            gap-4
                        "
                    >

                        <div
                            className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-[#f5f9ef]
                                flex
                                items-center
                                justify-center
                                flex-shrink-0
                            "
                        >

                            <MapPin
                                size={22}
                                className="
                                    text-green-700
                                "
                            />

                        </div>

                        <div>

                            <p
                                className="
                                    text-sm
                                    text-gray-500
                                    mb-1
                                "
                            >
                                Office Address
                            </p>

                            <p
                                className="
                                    font-semibold
                                    text-[#1f1f1f]
                                    leading-7
                                "
                            >
                                {tr(
                                    "support_page.address"
                                )}
                            </p>

                        </div>

                    </div>

                </div>

                {/* EXTRA INFO */}
                <div
                    className="
                        mt-8
                        pt-8
                        border-t
                        border-[#f1ede3]
                        space-y-4
                    "
                >

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            text-sm
                            text-gray-600
                        "
                    >

                        <Clock3
                            size={18}
                            className="
                                text-green-700
                            "
                        />

                        Support Available 24/7

                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            text-sm
                            text-gray-600
                        "
                    >

                        <ShieldCheck
                            size={18}
                            className="
                                text-green-700
                            "
                        />

                        Secure & Trusted Communication

                    </div>

                </div>

            </div>

            {/* SOCIALS */}
            <div
                className="
                    bg-white
                    border
                    border-[#ece6d7]
                    rounded-[30px]
                    p-7
                    shadow-[0_10px_30px_rgba(0,0,0,0.03)]
                "
            >

                <h3
                    className="
                        text-xl
                        font-black
                        text-[#1f1f1f]
                        mb-5
                    "
                >
                    Follow Us
                </h3>

                <SocialLinks />

            </div>

        </div>
    );
};

export default SupportSidebar;