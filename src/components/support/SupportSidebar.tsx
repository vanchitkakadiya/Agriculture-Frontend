// src/components/support/SupportSidebar.tsx

import {
    Mail,
    Phone,
    MapPin,
    MessageCircle,
} from "lucide-react";

import SocialLinks
    from "./SocialLinks.tsx";

import {
    tr,
} from "../../utils/language";
import {useTranslation} from "react-i18next";

const SupportSidebar = () => {
    useTranslation()

    const whatsappNumber =
        "919999999999";

    return (
        <div className="space-y-5">

            {/* WHATSAPP */}
            <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="
                bg-[#10c943]
                hover:bg-[#0db63b]
                text-white
                rounded-3xl
                p-6
                flex
                items-center
                gap-4
                font-bold
                text-lg
                sm:text-xl
                transition
            "
            >

                <MessageCircle />

                {tr(
                    "support_page.whatsapp"
                )}

            </a>

            {/* CONTACT */}
            <div
                className="
                bg-white
                border
                rounded-3xl
                p-6
                space-y-5
            "
            >

                {/* EMAIL */}
                <div
                    className="
                    flex
                    items-center
                    gap-3
                    break-all
                "
                >

                    <Mail
                        size={20}
                        className="
                        text-green-700
                    "
                    />

                    support@kisanmitra.com

                </div>

                {/* PHONE */}
                <div
                    className="
                    flex
                    items-center
                    gap-3
                "
                >

                    <Phone
                        size={20}
                        className="
                        text-green-700
                    "
                    />

                    +91 99999 99999

                </div>

                {/* ADDRESS */}
                <div
                    className="
                    flex
                    items-start
                    gap-3
                "
                >

                    <MapPin
                        size={20}
                        className="
                        text-green-700
                        mt-1
                    "
                    />

                    <span>
                        {tr(
                            "support_page.address"
                        )}
                    </span>

                </div>

            </div>

            <SocialLinks />

        </div>
    );
};

export default SupportSidebar;