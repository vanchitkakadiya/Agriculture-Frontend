//pages/support/SupportPage.tsx
import ContactForm from "../../components/support/ContactForm";

import SupportSidebar from "../../components/support/SupportSidebar";
import {tr} from "../../utils/language.ts";
import {useTranslation} from "react-i18next";

const SupportPage = () => {
useTranslation()
    return (
        <div
            className="
            min-h-screen
            bg-[#f7f5ed]
            px-6
            py-5
        "
        >

            <div
                className="
                max-w-7xl
                mx-auto
            "
            >

                {/* TITLE */}
                <div
                    className="
                    text-center
                    mb-10
                "
                >

                    <h1
                        className="
                        text-5xl
                        font-bold
                        mb-4
                    "
                    >
                        {tr("support_page.support_contact")}
                    </h1>

                    <p
                        className="
                        text-xl
                        text-gray-600
                    "
                    >
                        {tr("support_page.support_description")}
                    </p>

                </div>

                {/* CONTENT */}
                <div
                    className="
                    grid
                    lg:grid-cols-[1fr_420px]
                    gap-8
                "
                >

                    <ContactForm/>

                    <SupportSidebar/>

                </div>

            </div>

        </div>
    );
};

export default SupportPage;