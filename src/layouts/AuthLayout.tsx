import {
    Link,
    useRouterState,
} from "@tanstack/react-router";

import {
    Globe,
    Menu,
    X,
} from "lucide-react";

import {useTranslation} from "react-i18next";

import {useState} from "react";

import i18n from "../lib/i18n";

type Props = {
    children: React.ReactNode;
};

const AuthLayout = ({
                        children,
                    }: Props) => {
    const {t} = useTranslation();

    const [open, setOpen] =
        useState(false);

    const pathname = useRouterState({
        select: (state) =>
            state.location.pathname,
    });

    const changeLanguage = () => {
        const newLang =
            i18n.language === "en"
                ? "hi"
                : "en";

        i18n.changeLanguage(newLang);

        localStorage.setItem(
            "lang",
            newLang
        );
    };

    return (
        <div className="min-h-screen bg-[#f5f3ed]">
            {/* HEADER */}
            <header
                className="
          bg-white
          border-b
          border-gray-200
          sticky
          top-0
          z-50
        "
            >
                <div
                    className="
            px-4
            sm:px-6
            h-16
            flex
            items-center
            justify-between
          "
                >
                    {/* LOGO */}
                    <Link
                        to="/"
                        className="
              text-2xl
              font-bold
              text-green-700
            "
                    >
                        {t("mainTitle")}
                    </Link>

                    {/* DESKTOP MENU */}
                    <div
                        className="
              hidden
              md:flex
              items-center
              gap-6
            "
                    >
                        {/* LANGUAGE */}
                        <button
                            onClick={changeLanguage}
                            className="
                flex
                items-center
                gap-2
                text-gray-700
                hover:text-green-700
                transition
                font-medium
              "
                        >
                            <Globe size={18}/>

                            <span className="uppercase">
                 {i18n.language === "en" ? "EN" : "हि"}
              </span>
                        </button>

                        {/* LOGIN */}
                        <Link
                            to="/login"
                            className={`
              
                px-4
                py-2
                rounded-xl
                font-medium
                transition
                ${
                                pathname === "/login"
                                    ? "bg-green-700 text-white"
                                    : " text-green-700 "
                            }
              `}
                        >
                            {t("auth.login")}
                        </Link>

                        {/* SIGNUP */}
                        <Link
                            to="/signup"
                            className={`
                px-4
                py-2
                rounded-xl
                transition
                font-medium
                ${
                                pathname === "/signup"
                                    ? "bg-green-700 text-white"
                                    : "text-green-700 "
                            }
              `}
                        >
                            {t("auth.signup")}
                        </Link>
                    </div>

                    {/* MOBILE RIGHT */}
                    <div
                        className="
              flex
              items-center
              gap-3
              md:hidden
            "
                    >
                        {/* LANGUAGE */}
                        <button
                            onClick={changeLanguage}
                            className="
                flex
                items-center
                gap-1
                text-gray-700
              "
                        >
                            <Globe size={18}/>

                            <span
                                className="
                  text-sm
                  font-medium
                  uppercase
                "
                            >
                {i18n.language}
              </span>
                        </button>

                        {/* MENU BUTTON */}
                        <button
                            onClick={() =>
                                setOpen(!open)
                            }
                            className="
                text-gray-700
              "
                        >
                            {open ? (
                                <X size={28}/>
                            ) : (
                                <Menu size={28}/>
                            )}
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {open && (
                    <div
                        className="
              md:hidden
              border-t
              border-gray-200
              bg-white
              px-4
              py-5
            "
                    >
                        <div className="flex flex-col gap-3">
                            {/* LOGIN */}
                            <Link
                                to="/login"
                                onClick={() =>
                                    setOpen(false)
                                }
                                className={`
                  px-4
                  py-3
                  rounded-xl
                  font-medium
                  transition
                  ${
                                    pathname === "/login"
                                        ? "bg-green-700 text-white"
                                        : "text-green-700"
                                }
                `}
                            >
                                {t("auth.login")}
                            </Link>

                            {/* SIGNUP */}
                            <Link
                                to="/signup"
                                onClick={() =>
                                    setOpen(false)
                                }
                                className={`
                  px-4
                  py-3
                  rounded-xl
                  font-medium
                  transition
                  ${
                                    pathname === "/signup"
                                        ? "bg-green-700 text-white"
                                        : " text-green-700"
                                }
                `}
                            >
                                {t("auth.signup")}
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* PAGE CONTENT */}
            <main>
                {children}
            </main>
        </div>
    );
};

export default AuthLayout;