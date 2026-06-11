// src/pages/cart/CartPage.tsx

import {
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
    ArrowRight,
} from "lucide-react";

import {
    useCart,
} from "../../context/CartContext";

import {
    Link,
} from "@tanstack/react-router";

import {
    getText,
    tr,
} from "../../utils/language";
import {useTranslation} from "react-i18next";

const CartPage = () => {
    useTranslation()
    const {
        items,
        total,
        totalItems,
        updateItemQuantity,
        removeItem,
    } = useCart();

    // EMPTY CART
    if (
        !items ||
        items.length === 0
    ) {

        return (
            <div
                className="
                    min-h-[40vh]
                    flex
                    items-center
                    justify-center
                    px-4
                "
            >

                <div
                    className="
                        text-center
                        max-w-md pt-30
                    "
                >

                    <div
                        className="
                            w-28
                            h-28
                            mx-auto
                            rounded-full
                            bg-[#eef3dc]
                            flex
                            items-center
                            justify-center
                            mb-6
                        "
                    >

                        <ShoppingBag
                            className="
                                w-10 h-10 text-gray-400
                            "
                        />

                    </div>

                    <h2
                        className="text-2xl font-serif font-bold text-gray-900 mb-2">
                        {tr(
                            "cart.empty_title"
                        )}
                    </h2>

                    <p
                        className="
                            text-gray-600
                            leading-7
                            mb-8
                        "
                    >
                        {tr(
                            "cart.empty_description"
                        )}
                    </p>

                    <Link
                        to="/products"
                        className="
                            inline-block
                            bg-green-700
                            hover:bg-green-800
                            text-white
                            px-8
                            py-4
                            rounded-2xl
                            font-semibold
                            transition
                        "
                    >
                        {tr(
                            "cart.continue_shopping"
                        )}
                    </Link>

                </div>

            </div>
        );
    }

    return (
        <div
            className="
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
                py-8
                lg:py-12
            "
        >

            {/* HEADER */}
            <div
                className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                    mb-10 pt-20
                "
            >

                <div>

                    <h1
                        className="
                            text-3xl
                            md:text-5xl
                            font-bold
                        "
                    >
                        {tr(
                            "cart.title"
                        )}
                    </h1>

                    <p
                        className="
                            text-gray-600
                            mt-2
                        "
                    >
                        {totalItems}{" "}
                        {tr(
                            "cart.items_in_cart"
                        )}
                    </p>

                </div>

            </div>

            <div
                className="
                    grid
                    grid-cols-1
                    xl:grid-cols-3
                    gap-8
                    xl:gap-10
                "
            >

                {/* CART ITEMS */}
                <div
                    className="
                        xl:col-span-2
                        space-y-5
                    "
                >

                    {items.map((item) => (

                        <div
                            key={item.id}
                            className="
                                bg-white
                                border
                                border-gray-100
                                rounded-3xl
                                p-4
                                sm:p-5
                                shadow-sm
                                hover:shadow-lg
                                transition
                            "
                        >

                            <div
                                className="
                                    flex
                                    flex-col
                                    sm:flex-row
                                    gap-5
                                "
                            >

                                {/* IMAGE */}
                                <div
                                    className="
                                        w-full
                                        sm:w-36
                                        h-56
                                        sm:h-36
                                        rounded-2xl
                                        overflow-hidden
                                        bg-[#f5f3ed]
                                        flex-shrink-0
                                    "
                                >

                                    <img
                                        src={
                                            item.product_image
                                        }
                                        alt={
                                            getText(
                                                item,
                                                "product_title"
                                            )
                                        }
                                        className="
                                            w-full
                                            h-full
                                            object-cover
                                        "
                                    />

                                </div>

                                {/* CONTENT */}
                                <div
                                    className="
                                        flex-1
                                        flex
                                        flex-col
                                        justify-between
                                    "
                                >

                                    {/* TOP */}
                                    <div>

                                        <div
                                            className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-4
                                            "
                                        >

                                            <h2
                                                className="
                                                    text-xl
                                                    md:text-2xl
                                                    font-bold
                                                    leading-snug
                                                "
                                            >
                                                {
                                                    getText(
                                                        item,
                                                        "product_title"
                                                    )
                                                }
                                            </h2>

                                            <button
                                                onClick={() =>
                                                    removeItem(
                                                        item.id
                                                    )
                                                }
                                                className="
                                                    text-red-500
                                                    hover:bg-red-50
                                                    w-10
                                                    h-10
                                                    rounded-xl
                                                    flex
                                                    items-center
                                                    justify-center
                                                    transition
                                                    flex-shrink-0
                                                "
                                            >

                                                <Trash2
                                                    size={18}
                                                />

                                            </button>

                                        </div>

                                        <div
                                            className="
                                                mt-3
                                                text-3xl
                                                font-bold
                                                text-green-700
                                            "
                                        >
                                            ₹
                                            {
                                                item.product_price
                                            }
                                        </div>

                                    </div>

                                    {/* BOTTOM */}
                                    <div
                                        className="
                                            mt-6
                                            flex
                                            flex-col
                                            sm:flex-row
                                            sm:items-center
                                            sm:justify-between
                                            gap-5
                                        "
                                    >

                                        {/* QUANTITY */}
                                        <div
                                            className="
                                                flex
                                                items-center
                                                border
                                                border-gray-200
                                                rounded-2xl
                                                overflow-hidden
                                                w-fit
                                            "
                                        >

                                            <button
                                                onClick={() =>
                                                    updateItemQuantity(
                                                        item.id,
                                                        Math.max(
                                                            1,
                                                            item.quantity - 1
                                                        )
                                                    )
                                                }
                                                className="
                                                    w-12
                                                    h-12
                                                    flex
                                                    items-center
                                                    justify-center
                                                    hover:bg-gray-50
                                                    transition
                                                "
                                            >

                                                <Minus
                                                    size={18}
                                                />

                                            </button>

                                            <div
                                                className="
                                                    min-w-[60px]
                                                    text-center
                                                    font-bold
                                                    text-lg
                                                "
                                            >
                                                {
                                                    item.quantity
                                                }
                                            </div>

                                            <button
                                                onClick={() =>
                                                    updateItemQuantity(
                                                        item.id,
                                                        item.quantity + 1
                                                    )
                                                }
                                                className="
                                                    w-12
                                                    h-12
                                                    flex
                                                    items-center
                                                    justify-center
                                                    hover:bg-gray-50
                                                    transition
                                                "
                                            >

                                                <Plus
                                                    size={18}
                                                />

                                            </button>

                                        </div>

                                        {/* SUBTOTAL */}
                                        <div
                                            className="
                                                text-right
                                            "
                                        >

                                            <div
                                                className="
                                                    text-sm
                                                    text-gray-500
                                                    mb-1
                                                "
                                            >
                                                {tr(
                                                    "cart.subtotal"
                                                )}
                                            </div>

                                            <div
                                                className="
                                                    text-2xl
                                                    font-bold
                                                "
                                            >
                                                ₹
                                                {
                                                    item.subtotal
                                                }
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>
                    ))}

                </div>

                {/* ORDER SUMMARY */}
                <div>

                    <div
                        className="
                            bg-white
                            border
                            border-gray-100
                            rounded-3xl
                            p-6
                            lg:p-8
                            shadow-sm
                            xl:sticky
                            xl:top-24
                        "
                    >

                        <h2
                            className="
                                text-2xl
                                font-bold
                                mb-8
                            "
                        >
                            {tr(
                                "cart.order_summary"
                            )}
                        </h2>

                        {/* ROW */}
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                mb-4
                                text-gray-600
                            "
                        >

                            <span>
                                {tr(
                                    "cart.items"
                                )}
                            </span>

                            <span>
                                {totalItems}
                            </span>

                        </div>

                        {/* ROW */}
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                mb-4
                                text-gray-600
                            "
                        >

                            <span>
                                {tr(
                                    "cart.delivery"
                                )}
                            </span>

                            <span
                                className="
                                    text-green-700
                                    font-semibold
                                "
                            >
                                {tr(
                                    "cart.free"
                                )}
                            </span>

                        </div>

                        <div
                            className="
                                border-t
                                my-6
                            "
                        />

                        {/* TOTAL */}
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                mb-8
                            "
                        >

                            <span
                                className="
                                    text-xl
                                    font-semibold
                                "
                            >
                                {tr(
                                    "cart.total"
                                )}
                            </span>

                            <span
                                className="
                                    text-4xl
                                    font-bold
                                    text-green-700
                                "
                            >
                                ₹{total}
                            </span>

                        </div>

                        {/* CHECKOUT */}
                        <Link
                            to="/checkout"
                            className="
                                w-full
                                bg-green-700
                                hover:bg-green-800
                                text-white
                                py-4
                                rounded-2xl
                                font-semibold
                                text-lg
                                flex
                                items-center
                                justify-center
                                gap-3
                                transition
                            "
                        >

                            {tr(
                                "cart.checkout"
                            )}

                            <ArrowRight
                                size={20}
                            />

                        </Link>

                        {/* SECURITY */}
                        <p
                            className="
                                text-center
                                text-sm
                                text-gray-500
                                mt-5
                                leading-6
                            "
                        >
                            {tr(
                                "cart.security_text"
                            )}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default CartPage;