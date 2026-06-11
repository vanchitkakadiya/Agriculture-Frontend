//pages/support/SupportPage.tsx
import ContactForm from "../../components/support/ContactForm";

import SupportSidebar from "../../components/support/SupportSidebar";
import {tr} from "../../utils/language.ts";
import {useTranslation} from "react-i18next";

const SupportPage = () => {
useTranslation()
    return (
       /* <div
            className="
            min-h-screen
            px-6
            py-5
        "
        >

            <div
                className="
                max-w-7xl
                mx-auto
                pt-20
            "
            >

                {/!* TITLE *!/}
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

                {/!* CONTENT *!/}
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

        </div>*/

         <div
            className="
                min-h-screen
                bg-[#faf8f3]
                pt-24
                pb-16
            "
        >

            {/* TOP HERO */}
            <section
                className="
                    relative
                    overflow-hidden
                "
            >

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-green-50
                        via-[#faf8f3]
                        to-emerald-50
                    "
                />

                <div
                    className="
                        relative
                        max-w-7xl
                        mx-auto
                        px-4
                        sm:px-6
                        lg:px-8
                    "
                >

                    <div
                        className=" text-center ">
                        {/* TITLE */}
                        <h1
                            className="mt-2 text-4xl sm:text-5xl font-serif font-bold text-gray-900"
                        >
                            {tr(
                                "support_page.support_contact"
                            )}
                        </h1>

                        {/* DESCRIPTION */}
                        <p
                            className="
                                max-w-3xl
                                mx-auto
                                text-lg
                                sm:text-xl
                                text-gray-600
                                leading-9
                            "
                        >
                            {tr(
                                "support_page.support_description"
                            )}
                        </p>

                    </div>

                </div>

            </section>

            {/* MAIN CONTENT */}
            <section
                className="
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-8
                    mt-4
                "
            >

                <div
                    className="
                        grid
                        lg:grid-cols-[1fr_380px]
                        gap-8
                        items-start
                    "
                >

                    {/* LEFT */}
                    <div
                        className="
                            bg-white
                            border
                            border-[#ece6d7]
                            rounded-[32px]
                            shadow-[0_10px_40px_rgba(0,0,0,0.04)]
                            overflow-hidden
                        "
                    >

                        {/* FORM HEADER */}
                        <div
                            className="
                                px-6
                                sm:px-8
                                pt-8
                                pb-6
                                border-b
                                border-[#f1ede3]
                            "
                        >

                            <h2
                                className="
                                    text-3xl
                                    font-black
                                    text-[#1f1f1f]
                                    mb-3
                                "
                            >
                                Send Us a Message
                            </h2>

                            <p
                                className="
                                    text-gray-600
                                    leading-7
                                "
                            >
                                Fill out the form below and our support team
                                will get back to you as soon as possible.
                            </p>

                        </div>

                        {/* FORM */}
                        <div
                            className="
                                p-6
                                sm:p-8
                            "
                        >

                            <ContactForm />

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div
                        className="
                            sticky
                            top-28
                        "
                    >

                        <SupportSidebar />

                    </div>

                </div>

            </section>

        </div>
    );
};

export default SupportPage;