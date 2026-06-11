/*import {useEffect, useRef, useState} from "react";

import {
    Link,
    useNavigate,
    useRouterState,
} from "@tanstack/react-router";

import {useTranslation} from "react-i18next";

import {
    ShoppingCart,
    Menu,
    X,
    Leaf,
    Globe,
    User,
    LogOut,
} from "lucide-react";

import i18n from "../../lib/i18n";

import {useAuth} from "../../hooks/useAuth";
import {useCart} from "../../context/CartContext.tsx";

const Header = () => {
    const {t} = useTranslation();

    const navigate = useNavigate();

    const {totalItems} =
        useCart();

    const {user, logout} = useAuth();

    const pathname = useRouterState({
        select: (state) => state.location.pathname,
    });

    const [open, setOpen] =
        useState(false);

    const [profileOpen, setProfileOpen] =
        useState(false);

    const profileRef =
        useRef<HTMLDivElement>(null);
    // CLOSE DROPDOWN CLICK OUTSIDE
    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target as Node
                )
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

    const navItems = [
        {
            to: "/",
            label: t("nav.home"),
        },
        {
            to: "/products",
            label: t("nav.products"),
        },
        {
            to: "/forum",
            label: t("nav.community"),
        },
        {
            to: "/blogs",
            label: t("nav.blog"),
        },
        {
            to: "/support",
            label: t("nav.support"),
        },
    ];

    // CLOSE DROPDOWN CLICK OUTSIDE
    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target as Node
                )
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

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

    const handleLogout =
        async () => {
            try {
                await logout();

                setProfileOpen(false);

                navigate({
                    to: "/login",
                });
            } catch (error) {
                console.log(
                    "Logout Error",
                    error
                );
            }
        };

    const firstLetter =
        user?.full_name?.charAt(0) ||
        "U";

    return (
        <header
            className="
        sticky
        top-0
        z-50
        bg-[#f5f3ed]/95
        backdrop-blur-md
        border-b
        border-gray-200
      "
        >
            <div
                className="
          max-w-[1440px]
          mx-auto
          h-16
          lg:h-20
          px-4
          sm:px-5
          lg:px-8
          flex
          items-center
          justify-between
          gap-3
        "
            >
                {/!* LOGO *!/}
                <Link
                    to="/"
                    className="
            flex
            items-center
            gap-2
            min-w-fit
          "
                >
                    <div
                        className="
              w-10
              h-10
              lg:w-11
              lg:h-11
              rounded-full
              bg-green-700
              text-white
              flex
              items-center
              justify-center
              shadow-md
              shrink-0
            "
                    >
                        <Leaf size={20}/>
                    </div>

                    <h1
                        className="
              text-xl
              lg:text-2xl
              font-bold
              text-[#1d1d1d]
              whitespace-nowrap
            "
                    >
                        {t("mainTitle")}
                    </h1>
                </Link>

                {/!* DESKTOP NAV *!/}
                <nav
                    className="
            hidden
            md:flex
            items-center
            justify-center
            flex-1
            gap-1
            lg:gap-3
            mx-4
            overflow-x-auto
            scrollbar-hide
          "
                >
                    {navItems.map((item) => {
                        const isActive =
                            pathname === item.to;

                        return (
                            <Link
                                key={item.to}
                                to={item.to}
                                className={`
                  whitespace-nowrap
                  px-3
                  lg:px-5
                  py-2
                  rounded-xl
                  text-sm
                  lg:text-base
                  font-medium
                  transition-all
                  duration-200
                  ${
                                    isActive
                                        ? "bg-[#dbe9bf] text-black"
                                        : "text-gray-700 hover:bg-[#e8efd8]"
                                }
                `}
                            >
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/!* RIGHT SIDE *!/}
                <div
                    className="
            flex
            items-center
            gap-2
            lg:gap-4
            shrink-0
          "
                >
                    {/!* LANGUAGE *!/}
                    <button
                        onClick={
                            changeLanguage
                        }
                        className="
              hidden
              md:flex
              items-center
              gap-1
              text-gray-700
              hover:text-green-700
              transition
              text-sm
            "
                    >
                        <Globe size={18}/>

                        <span
                            className="
                font-medium
                uppercase
              "
                        >
              {i18n.language ===
              "en"
                  ? "EN"
                  : "हि"}
            </span>
                    </button>

                    {/!* CART *!/}
                    <Link to="/cart">
                        <div className="relative">

                            <ShoppingCart/>

                            {
                                totalItems > 0 && (
                                    <span
                                        className="
                    absolute
                    -top-2
                    -right-2
                    w-5
                    h-5
                    rounded-full
                    bg-red-500
                    text-white
                    text-xs
                    flex
                    items-center
                    justify-center
                "
                                    >
                    {
                        totalItems
                    }
                </span>
                                )}

                        </div>
                    </Link>

                    {/!* USER *!/}
                    {user ? (
                        <div
                            className="relative"
                            ref={profileRef}
                        >
                            <button
                                onClick={() =>
                                    setProfileOpen(
                                        !profileOpen
                                    )
                                }
                                className="
                  w-10
                  h-10
                  rounded-full
                  bg-green-700
                  text-white
                  font-bold
                  text-base
                  flex
                  items-center
                  justify-center
                  shadow-md
                  hover:bg-green-800
                  transition
                "
                            >
                                {firstLetter.toUpperCase()}
                            </button>

                            {/!* DROPDOWN *!/}
                            {profileOpen && (
                                <div
                                    className="
                    absolute
                    right-0
                    mt-3
                    w-64
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border
                    border-gray-100
                    overflow-hidden
                  "
                                >
                                    {/!* USER INFO *!/}
                                    <div
                                        className="
                      px-5
                      py-4
                      border-b
                      border-gray-100
                    "
                                    >
                                        <h3
                                            className="
                        font-semibold
                        text-[#1d1d1d]
                        truncate
                      "
                                        >
                                            {
                                                user.full_name
                                            }
                                        </h3>

                                        <p
                                            className="
                        text-sm
                        text-gray-500
                        mt-1
                        truncate
                      "
                                        >
                                            {
                                                user.email
                                            }
                                        </p>
                                    </div>

                                    {/!* PROFILE *!/}
                                    <Link
                                        to="/profile"
                                        onClick={() =>
                                            setProfileOpen(
                                                false
                                            )
                                        }
                                        className="
                      flex
                      items-center
                      gap-3
                      px-5
                      py-3
                      hover:bg-gray-50
                      transition
                    "
                                    >
                                        <User
                                            size={18}
                                        />

                                        <span>
                      {t(
                          "nav.profile"
                      )}
                    </span>
                                    </Link>

                                    {/!* LOGOUT *!/}
                                    <button
                                        onClick={
                                            handleLogout
                                        }
                                        className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-5
                      py-3
                      text-red-600
                      hover:bg-red-50
                      transition
                    "
                                    >
                                        <LogOut
                                            size={18}
                                        />

                                        <span>
                      {t(
                          "auth.logout"
                      )}
                    </span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="
                hidden
                md:flex
                items-center
                gap-2
                bg-green-700
                hover:bg-green-800
                transition
                text-white
                px-4
                lg:px-5
                py-2.5
                rounded-xl
                shadow-md
                text-sm
              "
                        >
                            <User size={18}/>

                            {t("auth.login")}
                        </Link>
                    )}

                    {/!* MOBILE MENU BUTTON *!/}
                    <button
                        onClick={() =>
                            setOpen(!open)
                        }
                        className="
              md:hidden
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

            {/!* MOBILE MENU *!/}
            {open && (
                <div
                    className="
            md:hidden
            border-t
            border-gray-200
            bg-[#f5f3ed]
            px-4
            py-5
          "
                >
                    {/!* NAV *!/}
                    <nav
                        className="
              flex
              flex-col
              gap-2
            "
                    >
                        {navItems.map((item) => {
                            const isActive =
                                pathname ===
                                item.to;

                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
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
                                        isActive
                                            ? "bg-[#dbe9bf]"
                                            : "hover:bg-[#e8efd8]"
                                    }
                  `}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/!* MOBILE ACTIONS *!/}
                    <div
                        className="
              mt-5
              pt-5
              border-t
              border-gray-200
              flex
              flex-col
              gap-4
            "
                    >
                        {/!* LANGUAGE *!/}
                        <button
                            onClick={
                                changeLanguage
                            }
                            className="
                flex
                items-center
                gap-2
              "
                        >
                            <Globe size={18}/>

                            {i18n.language ===
                            "en"
                                ? "EN"
                                : "हि"}
                        </button>

                        {/!* USER *!/}
                        {user ? (
                            <>
                                <Link
                                    to="/profile"
                                    onClick={() =>
                                        setOpen(false)
                                    }
                                    className="
                    flex
                    items-center
                    gap-3
                    bg-white
                    px-4
                    py-3
                    rounded-xl
                  "
                                >
                                    <div
                                        className="
                      w-10
                      h-10
                      rounded-full
                      bg-green-700
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                    "
                                    >
                                        {firstLetter.toUpperCase()}
                                    </div>

                                    <div className="min-w-0">
                                        <p
                                            className="
                        font-semibold
                        truncate
                      "
                                        >
                                            {
                                                user.full_name
                                            }
                                        </p>

                                        <p
                                            className="
                        text-sm
                        text-gray-500
                        truncate
                      "
                                        >
                                            {
                                                user.email
                                            }
                                        </p>
                                    </div>
                                </Link>

                                <button
                                    onClick={
                                        handleLogout
                                    }
                                    className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    py-3
                    rounded-xl
                    transition
                  "
                                >
                                    <LogOut
                                        size={18}
                                    />

                                    {t(
                                        "auth.logout"
                                    )}
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                onClick={() =>
                                    setOpen(false)
                                }
                                className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-green-700
                  hover:bg-green-800
                  transition
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  shadow-md
                "
                            >
                                <User
                                    size={18}
                                />

                                {t(
                                    "auth.login"
                                )}
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};


export default Header;
*/

import {useCart} from "../../context/CartContext.tsx";


import {
    useEffect, useRef,
    useState,
} from "react";

import {
    Link,
    useLocation, useNavigate, useRouterState,
} from "@tanstack/react-router";

import {
    Menu,
    X,
    Leaf,
    ShoppingCart,Globe, User, LogOut,
} from "lucide-react";
import {tr} from "../../utils/language.ts";
import i18n from "../../lib/i18n.ts";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../hooks/useAuth.ts";


export default function Header() {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [scrolled, setScrolled] =
        useState(false);

    const [mobileOpen, setMobileOpen] =
        useState(false);

    const {totalItems} =
        useCart();

    const {user, logout} = useAuth();

    // const [
    //     activeDropdown,
    //     setActiveDropdown,
    // ] = useState<string | null>(
    //     null
    // );

    const location =
        useLocation();

    const scrolledOrNotHome =
        scrolled ||
        location.pathname !== "/";

    useEffect(() => {

        const onScroll = () =>
            setScrolled(
                window.scrollY > 20
            );

        window.addEventListener(
            "scroll",
            onScroll,
            {
                passive: true,
            }
        );

        return () =>
            window.removeEventListener(
                "scroll",
                onScroll
            );

    }, []);

    useEffect(() => {

        setMobileOpen(false);

        // setActiveDropdown(null);

    }, [location.pathname]);

    const NAV_LINKS = [
        {
            to: "/products",
            label: tr("nav.products"),
        },
        {
            to: "/forum",
            label: tr("nav.community"),
        },
        {
            to: "/blogs",
            label: tr("nav.blog"),
        },
        {
            to: "/support",
            label: tr("nav.support"),
        },
    ];

    const pathname = useRouterState({
        select: (state) => state.location.pathname,
    });

    // const [open, setOpen] =
    //     useState(false);

    const [profileOpen, setProfileOpen] =
        useState(false);

    const profileRef =
        useRef<HTMLDivElement>(null);
    // CLOSE DROPDOWN CLICK OUTSIDE
    useEffect(() => {
        const handleClickOutside = (
            event: MouseEvent
        ) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(
                    event.target as Node
                )
            ) {
                setProfileOpen(false);
            }
        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {
            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );
        };
    }, []);

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

    const handleLogout =
        async () => {
            try {
                await logout();

                setProfileOpen(false);

                navigate({
                    to: "/login",
                });
            } catch (error) {
                console.log(
                    "Logout Error",
                    error
                );
            }
        };

    const firstLetter =
        user?.full_name?.charAt(0) ||
        "U";


    return (
        <header
            className={`
                fixed
                top-0
                left-0
                right-0
                z-50
                transition-all
                duration-300
                ${
                scrolledOrNotHome
                    ? `
                        bg-white/95
                        backdrop-blur-xl
                        border-b
                        border-[#f2ede0]
                        shadow-sm
                    `
                    : `
                        bg-transparent
                    `
            }
            `}
        >

            <div
                className="
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        h-16
                        lg:h-20
                    "
                >

                    {/* LOGO */}
                    <Link
                        to="/"
                        className="
                            flex
                            items-center
                            gap-3
                            group
                        "
                    >

                        <div
                            className="
                                w-11
                                h-11
                                rounded-2xl
                                bg-green-600
                                flex
                                items-center
                                justify-center
                                shadow-md
                                group-hover:bg-green-700
                                transition-colors
                            "
                        >

                            <Leaf
                                className="
                                    w-5
                                    h-5
                                    text-white
                                "
                                strokeWidth={2.5}
                            />

                        </div>

                        <div>

                            <span
                                className={`
                                    block
                                    text-xl
                                    font-black
                                    tracking-tight
                                    transition-colors
                                    ${
                                    scrolledOrNotHome
                                        ? "text-gray-900"
                                        : "text-white"
                                }
                                `}
                            >
                                Agro
                                <span
                                    className="
                                        text-green-500
                                    "
                                >
                                    Hub
                                </span>
                            </span>

                            <span
                                className={`
                                    block
                                    text-[11px]
                                    uppercase
                                    tracking-[0.18em]
                                    mt-0.5
                                    transition-colors
                                    ${
                                    scrolledOrNotHome
                                        ? "text-gray-500"
                                        : "text-white/70"
                                }
                                `}
                            >
                                Smart Farming
                            </span>

                        </div>

                    </Link>

                    {/* DESKTOP NAV */}
                    <nav
                        className="
                            hidden
                            lg:flex
                            items-center
                            gap-1
                        "
                    >

                        {/*{NAV_LINKS.map(
                            (link) => (
                                <div
                                    key={
                                        link.label
                                    }
                                    className="
                                        relative
                                    "
                                    onMouseEnter={() =>
                                        setActiveDropdown(
                                            link.label
                                        )
                                    }
                                    onMouseLeave={() =>
                                        setActiveDropdown(
                                            null
                                        )
                                    }
                                >

                                    <Link
                                        to={
                                            link.to
                                        }
                                        className={`
                                            flex
                                            items-center
                                            gap-1.5
                                            px-4
                                            py-2.5
                                            rounded-xl
                                            text-sm
                                            font-semibold
                                            transition-all
                                            ${
                                            scrolledOrNotHome
                                                ? `
                                                    text-gray-700
                                                    hover:text-green-700
                                                    hover:bg-[#faf8f3]
                                                `
                                                : `
                                                    text-white/90
                                                    hover:text-white
                                                    hover:bg-white/10
                                                `
                                        }
                                        `}
                                    >

                                        {
                                            link.label
                                        }

                                           {link.children
                                                .length >
                                            0 && (
                                                <ChevronDown
                                                    className={`
                                                    w-4
                                                    h-4
                                                    transition-transform
                                                    ${
                                                        activeDropdown ===
                                                        link.label
                                                            ? "rotate-180"
                                                            : ""
                                                    }
                                                `}
                                                />
                                            )}

                                    </Link>

                                     DROPDOWN
                                    {link.children
                                            .length >
                                        0 &&
                                        activeDropdown ===
                                        link.label && (
                                            <div
                                                className="
                                                    absolute
                                                    top-full
                                                    left-0
                                                    mt-3
                                                    w-56
                                                    bg-white
                                                    rounded-2xl
                                                    border
                                                    border-[#f2ede0]
                                                    shadow-2xl
                                                    overflow-hidden
                                                    p-2
                                                "
                                            >

                                                {link.children.map(
                                                    (
                                                        child
                                                    ) => (
                                                        <Link
                                                            key={
                                                                child.label
                                                            }
                                                            to={
                                                                child.href
                                                            }
                                                            className="
                                                                block
                                                                px-4
                                                                py-3
                                                                rounded-xl
                                                                text-sm
                                                                font-medium
                                                                text-gray-700
                                                                hover:text-green-700
                                                                hover:bg-[#faf8f3]
                                                                transition-colors
                                                            "
                                                        >
                                                            {
                                                                child.label
                                                            }
                                                        </Link>
                                                    )
                                                )}

                                            </div>
                                        )}

                                </div>
                            )
                        )}*/}

                        {NAV_LINKS.map((item) => {
                            const isActive =
                                pathname === item.to;

                            return (
                                <div
                                    key={
                                        item.label
                                    }
                                    className=" relative">
                                    <Link
                                        key={item.to}
                                        to={item.to}
                                        className={`
                  whitespace-nowrap
                  px-3
                  lg:px-5
                  py-2
                  rounded-xl
                  text-sm
                  lg:text-base
                  font-medium
                  transition-all
                  duration-200
                  ${
                                            isActive
                                                ? "bg-[#dbe9bf] text-black"
                                                : "text-gray-700"
                                        }
                                        
                                        transition-all
                                            ${
                                            scrolledOrNotHome
                                                ? `
                                                    text-gray-700
                                                `
                                                : `
                                                    text-white/90
                                                `
                                        }
                `}
                                    >
                                        {item.label}
                                    </Link>
                                </div>
                            );
                        })}

                    </nav>

                    {/* DESKTOP ACTIONS */}
                    <div
                        className="
                            hidden
                            lg:flex
                            items-center
                            gap-2
                        "
                    >

                        {/* Language */}
                        <button
                            onClick={
                                changeLanguage
                            }
                            className={`
                                flex
                items-center
                gap-2
                            ${
                                scrolledOrNotHome
                                    ? `
                                        text-gray-700
                                        hover:bg-[#faf8f3]
                                    `
                                    : `
                                        text-white
                                        hover:bg-white/10
                                    `
                            }
                            `}


                        >
                            <Globe size={18}/>

                            {i18n.language ===
                            "en"
                                ? "EN"
                                : "हि"}
                        </button>

                        {/* CART */}
                        <Link to="/cart">
                            <div className={`relative  ${
                                scrolledOrNotHome
                                    ? `
                                        text-gray-700
                                        hover:bg-[#faf8f3]
                                    `
                                    : `
                                        text-white
                                        hover:bg-white/10
                                    `
                            }`}>

                                <ShoppingCart/>

                                {
                                    totalItems > 0 && (
                                        <span
                                            className="
                    absolute
                    -top-2
                    -right-2
                    w-5
                    h-5
                    rounded-full
                    bg-red-500
                    text-white
                    text-xs
                    flex
                    items-center
                    justify-center
                "
                                        >
                    {
                        totalItems
                    }
                </span>
                                    )}

                            </div>
                        </Link>

                        {/* USER */}
                        {user ? (
                            <div
                                className="relative"
                                ref={profileRef}
                            >
                                <button
                                    onClick={() =>
                                        setProfileOpen(
                                            !profileOpen
                                        )
                                    }
                                    className="
                  w-10
                  h-10
                  rounded-full
                  bg-green-700
                  text-white
                  font-bold
                  text-base
                  flex
                  items-center
                  justify-center
                  shadow-md
                  hover:bg-green-800
                  transition
                "
                                >
                                    {firstLetter.toUpperCase()}
                                </button>

                                {/* DROPDOWN */}
                                {profileOpen && (
                                    <div
                                        className="
                    absolute
                    right-0
                    mt-3
                    w-64
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    border
                    border-gray-100
                    overflow-hidden
                  "
                                    >
                                        {/* USER INFO */}
                                        <div
                                            className="
                      px-5
                      py-4
                      border-b
                      border-gray-100
                    "
                                        >
                                            <h3
                                                className="
                        font-semibold
                        text-[#1d1d1d]
                        truncate
                      "
                                            >
                                                {
                                                    user.full_name
                                                }
                                            </h3>

                                            <p
                                                className="
                        text-sm
                        text-gray-500
                        mt-1
                        truncate
                      "
                                            >
                                                {
                                                    user.email
                                                }
                                            </p>
                                        </div>

                                        {/* PROFILE */}
                                        <Link
                                            to="/profile"
                                            onClick={() =>
                                                setProfileOpen(
                                                    false
                                                )
                                            }
                                            className="
                      flex
                      items-center
                      gap-3
                      px-5
                      py-3
                      hover:bg-gray-50
                      transition
                    "
                                        >
                                            <User
                                                size={18}
                                            />

                                            <span>
                      {t(
                          "nav.profile"
                      )}
                    </span>
                                        </Link>

                                        {/* LOGOUT */}
                                        <button
                                            onClick={
                                                handleLogout
                                            }
                                            className="
                      w-full
                      flex
                      items-center
                      gap-3
                      px-5
                      py-3
                      text-red-600
                      hover:bg-red-50
                      transition
                    "
                                        >
                                            <LogOut
                                                size={18}
                                            />

                                            <span>
                      {t(
                          "auth.logout"
                      )}
                    </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="
                hidden
                md:flex
                items-center
                gap-2
                bg-green-700
                hover:bg-green-800
                transition
                text-white
                px-4
                lg:px-5
                py-2.5
                rounded-xl
                shadow-md
                text-sm
              "
                            >
                                <User size={18}/>

                                {t("auth.login")}
                            </Link>
                        )}

                    </div>

                    {/* MOBILE TOGGLE */}
                    <button
                        onClick={() =>
                            setMobileOpen(
                                !mobileOpen
                            )
                        }
                        className={`
                            lg:hidden
                            w-11
                            h-11
                            rounded-xl
                            flex
                            items-center
                            justify-center
                            transition-all
                            ${
                            scrolledOrNotHome
                                ? `
                                    text-gray-700
                                    hover:bg-[#faf8f3]
                                `
                                : `
                                    text-white
                                    hover:bg-white/10
                                `
                        }
                        `}
                    >

                        {mobileOpen ? (
                            <X
                                className="
                                    w-6
                                    h-6
                                "
                            />
                        ) : (
                            <Menu
                                className="
                                    w-6
                                    h-6
                                "
                            />
                        )}

                    </button>

                </div>

            </div>

            {/* MOBILE MENU */}
            {mobileOpen && (
                <div
                    className="
                        lg:hidden
                        bg-white
                        border-t
                        border-[#f2ede0]
                        shadow-xl
                    "
                >

                    <div
                        className="
                            px-4
                            py-5
                            space-y-2
                        "
                    >

                        {NAV_LINKS.map(
                            (link) => (
                                <div
                                    key={
                                        link.label
                                    }
                                >

                                    <Link
                                        to={
                                            link.to
                                        }
                                        className="
                                            block
                                            px-4
                                            py-3
                                            rounded-xl
                                            text-sm
                                            font-semibold
                                            text-gray-700
                                            hover:text-green-700
                                            hover:bg-[#faf8f3]
                                            transition-colors
                                        "
                                    >
                                        {
                                            link.label
                                        }
                                    </Link>

                                    {/*{link.children
                                            .length >
                                        0 && (
                                            <div
                                                className="
                                                    pl-4
                                                    mt-1
                                                    space-y-1
                                                "
                                            >

                                                {link.children.map(
                                                    (
                                                        child
                                                    ) => (
                                                        <Link
                                                            key={
                                                                child.label
                                                            }
                                                            to={
                                                                child.href
                                                            }
                                                            className="
                                                                block
                                                                px-4
                                                                py-2.5
                                                                rounded-xl
                                                                text-sm
                                                                text-gray-500
                                                                hover:text-green-700
                                                                hover:bg-[#faf8f3]
                                                                transition-colors
                                                            "
                                                        >
                                                            {
                                                                child.label
                                                            }
                                                        </Link>
                                                    )
                                                )}

                                            </div>
                                        )}*/}

                                </div>
                            )
                        )}

                        {/* MOBILE BUTTONS */}
                        <div
                            className="
              mt-5
              pt-5
              border-t
              border-gray-200
              flex
              flex-col
              gap-4
            "
                        >
                            {/* LANGUAGE */}
                            <button
                                onClick={
                                    changeLanguage
                                }
                                className="
                flex
                items-center
                gap-2
              "
                            >
                                <Globe size={18}/>

                                {i18n.language ===
                                "en"
                                    ? "EN"
                                    : "हि"}
                            </button>

                            {/* USER */}
                            {user ? (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={() =>
                                            setProfileOpen(false)
                                        }
                                        className="
                    flex
                    items-center
                    gap-3
                    bg-white
                    px-4
                    py-3
                    rounded-xl
                  "
                                    >
                                        <div
                                            className="
                      w-10
                      h-10
                      rounded-full
                      bg-green-700
                      text-white
                      flex
                      items-center
                      justify-center
                      font-bold
                    "
                                        >
                                            {firstLetter.toUpperCase()}
                                        </div>

                                        <div className="min-w-0">
                                            <p
                                                className="
                        font-semibold
                        truncate
                      "
                                            >
                                                {
                                                    user.full_name
                                                }
                                            </p>

                                            <p
                                                className="
                        text-sm
                        text-gray-500
                        truncate
                      "
                                            >
                                                {
                                                    user.email
                                                }
                                            </p>
                                        </div>
                                    </Link>

                                    <button
                                        onClick={
                                            handleLogout
                                        }
                                        className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    py-3
                    rounded-xl
                    transition
                  "
                                    >
                                        <LogOut
                                            size={18}
                                        />

                                        {t(
                                            "auth.logout"
                                        )}
                                    </button>
                                </>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() =>
                                        setProfileOpen(false)
                                    }
                                    className="
                  flex
                  items-center
                  justify-center
                  gap-2
                  bg-green-700
                  hover:bg-green-800
                  transition
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  shadow-md
                "
                                >
                                    <User
                                        size={18}
                                    />

                                    {t(
                                        "auth.login"
                                    )}
                                </Link>
                            )}
                        </div>

                    </div>

                </div>
            )}

        </header>
    );
}