// src/components/layout/Footer.tsx

import {
    Clock3,
    Mail,
    MapPin,
    Phone,
} from "lucide-react";


type SocialLink = {
    platform: string;
    url: string;
};

type ContactInfo = {
    phone: string;
    whatsapp_number: string;
    email: string;
    address: string;
    map_url: string;
    working_hours: string;
};

type Props = {
    contactInfo?: ContactInfo;
    socialLinks?: SocialLink[];
};

const Footer = ({
                    contactInfo,
                    socialLinks,
                }: Props) => {

    return (
        <footer
            className="
            bg-[#163300]
            text-white
            mt-20
        "
        >

            <div
                className="
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-10
                py-16
            "
            >

                <div
                    className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-4
                    gap-10
                "
                >

                    {/* BRAND */}
                    <div>

                        <h2
                            className="
                            text-3xl
                            font-bold
                            mb-4
                        "
                        >
                            AgriPlatform
                        </h2>

                        <p
                            className="
                            text-white/70
                            leading-7
                        "
                        >
                            Empowering farmers
                            with modern
                            agriculture tools,
                            quality products,
                            and community
                            knowledge.
                        </p>

                    </div>

                    {/* CONTACT */}
                    <div>

                        <h3
                            className="
                            text-xl
                            font-semibold
                            mb-5
                        "
                        >
                            Contact
                        </h3>

                        <div
                            className="
                            space-y-4
                        "
                        >

                            <div
                                className="
                                flex
                                gap-3
                            "
                            >

                                <Phone
                                    size={18}
                                />

                                <span>
                                    {
                                        contactInfo?.phone
                                    }
                                </span>

                            </div>

                            <div
                                className="
                                flex
                                gap-3
                            "
                            >

                                <Mail
                                    size={18}
                                />

                                <span>
                                    {
                                        contactInfo?.email
                                    }
                                </span>

                            </div>

                            <div
                                className="
                                flex
                                gap-3
                            "
                            >

                                <MapPin
                                    size={18}
                                />

                                <span>
                                    {
                                        contactInfo?.address
                                    }
                                </span>

                            </div>

                            <div
                                className="
                                flex
                                gap-3
                            "
                            >

                                <Clock3
                                    size={18}
                                />

                                <span>
                                    {
                                        contactInfo?.working_hours
                                    }
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* QUICK LINKS */}
                    <div>

                        <h3
                            className="
                            text-xl
                            font-semibold
                            mb-5
                        "
                        >
                            Quick Links
                        </h3>

                        <div
                            className="
                            flex
                            flex-col
                            gap-3
                            text-white/70
                        "
                        >

                            <a href="/">
                                Home
                            </a>

                            <a href="/products">
                                Products
                            </a>

                            <a href="/forum">
                                Community Forum
                            </a>

                            <a href="/blogs">
                                Farming Tips
                            </a>

                        </div>

                    </div>

                    {/* SOCIAL */}
                    <div>

                        <h3
                            className="
                            text-xl
                            font-semibold
                            mb-5
                        "
                        >
                            Follow Us
                        </h3>

                        <div
                            className="
                            flex
                            flex-wrap
                            gap-3
                        "
                        >

                            {socialLinks?.map(
                                (
                                    item,
                                    index
                                ) => (
                                    <a
                                        key={
                                            index
                                        }
                                        href={
                                            item.url
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                        px-4
                                        py-2
                                        rounded-xl
                                        bg-white/10
                                        hover:bg-white/20
                                        transition
                                        capitalize
                                    "
                                    >
                                        {
                                            item.platform
                                        }
                                    </a>
                                )
                            )}

                        </div>

                    </div>

                </div>

                {/* BOTTOM */}
                <div
                    className="
                    border-t
                    border-white/10
                    mt-12
                    pt-6
                    text-center
                    text-white/60
                    text-sm
                "
                >
                    © 2026 AgriPlatform.
                    All rights reserved.
                </div>

            </div>

        </footer>
    );
};

export default Footer;