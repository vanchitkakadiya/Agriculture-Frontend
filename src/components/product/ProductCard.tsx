// src/components/product/ProductCard.tsx

import {
    Link,
} from "@tanstack/react-router";

import {
    ShoppingCart,
    Star,
} from "lucide-react";

import type {
    Product,
} from "../../types/product";

import {
    useCart,
} from "../../context/CartContext.tsx";

import {
    getText,
} from "../../utils/language.ts";
import {useTranslation} from "react-i18next";

type Props = {
    product: Product;
};

const ProductCard = ({
                         product,
                     }: Props) => {
    const {t} = useTranslation();

    const {addItem} =
        useCart();

    // IMAGE
    const image =
        product.primary_image ||
        "/placeholder-product.jpg";

    // STOCK
    const outOfStock =
        !product.is_in_stock ||
        product.stock_quantity <= 0;

    const inactive =
        !product.is_active;

    return (
        <Link
            to="/products/$id"
            params={{
                id: String(
                    product.id
                ),
            }}
            className="
                group
                bg-white
                rounded-3xl
                overflow-hidden
                border
                border-[#e7e4db]
                hover:shadow-2xl
                transition-all
                duration-300
                flex
                flex-col
            "
        >

            {/* IMAGE */}
            <div
                className="
                    relative
                    aspect-square
                    overflow-hidden
                    bg-[#f5f3ed]
                "
            >

                <img
                    src={image}
                    alt={getText(
                        product,
                        "title"
                    )}
                    className="
                        w-full
                        h-full
                        object-cover
                        group-hover:scale-105
                        transition-transform
                        duration-500
                    "
                />

                {/* FEATURED */}
                {product.is_featured && (
                    <div
                        className="
                            absolute
                            top-4
                            left-4
                            bg-yellow-400
                            text-black
                            text-xs
                            font-bold
                            px-3
                            py-1.5
                            rounded-full
                            flex
                            items-center
                            gap-1
                            shadow-md
                        "
                    >

                        <Star
                            size={12}
                            fill="currentColor"
                        />

                        {t(
                            "products_page.featured"
                        )}

                    </div>
                )}

                {/* OUT OF STOCK */}
                {(outOfStock ||
                    inactive) && (
                    <div
                        className="
                            absolute
                            inset-0
                            bg-black/50
                            backdrop-blur-[1px]
                            flex
                            items-center
                            justify-center
                        "
                    >

                        <span
                            className="
                                bg-white
                                text-red-600
                                font-bold
                                text-sm
                                px-5
                                py-2
                                rounded-full
                                shadow-lg
                            "
                        >
                            {inactive
                                ? t(
                                    "products_page.unavailable"
                                )
                                : t(
                                    "products_page.out_of_stock"
                                )}
                        </span>

                    </div>
                )}

            </div>

            {/* CONTENT */}
            <div
                className="
                    p-5
                    flex
                    flex-col
                    flex-1
                "
            >

                {/* CATEGORY */}
                <p
                    className="
                        text-xs
                        uppercase
                        tracking-wide
                        text-gray-500
                        mb-2
                    "
                >
                    {getText(
                        product,
                        "category"
                    )}
                </p>

                {/* TITLE */}
                <h3
                    className="
                        font-bold
                        text-lg
                        line-clamp-2
                        min-h-[56px]
                        mb-3
                        text-gray-900
                        group-hover:text-green-700
                        transition
                    "
                >
                    {getText(
                        product,
                        "title"
                    )}
                </h3>

                {/* DESCRIPTION */}
                <p
                    className="
                        text-sm
                        text-gray-600
                        line-clamp-2
                        min-h-[42px]
                        mb-6
                        leading-6
                    "
                >
                    {getText(
                        product,
                        "description"
                    )}
                </p>

                {/* FOOTER */}
                <div
                    className="
                        mt-auto
                        flex
                        items-end
                        justify-between
                        gap-4
                    "
                >

                    {/* PRICE */}
                    <div>

                        <p
                            className="
                                text-xs
                                text-gray-500
                                mb-1
                            "
                        >
                            {t(
                                "products_page.price"
                            )}
                        </p>

                        <span
                            className="
                                text-2xl
                                font-bold
                                text-green-700
                            "
                        >
                            ₹
                            {product.price}
                        </span>

                    </div>

                    {/* RIGHT SIDE */}
                    <div
                        className="
                            text-right
                        "
                    >

                        {/* STOCK */}
                        <p
                            className={`
                                text-sm
                                font-semibold
                                mb-2
                                ${
                                outOfStock
                                    ? "text-red-500"
                                    : "text-green-600"
                            }
                            `}
                        >
                            {outOfStock
                                ? t(
                                    "products_page.out_of_stock"
                                )
                                : `${product.stock_quantity} ${t(
                                    "products_page.left"
                                )}`}
                        </p>

                        {/* ADD BUTTON */}
                        <button
                            type="button"
                            disabled={
                                outOfStock ||
                                inactive
                            }
                            onClick={(
                                e
                            ) => {

                                e.preventDefault();

                                addItem(
                                    product.id,
                                    1
                                );
                            }}
                            className={`
                                inline-flex
                                items-center
                                justify-center
                                gap-2
                                px-4
                                h-11
                                rounded-xl
                                text-sm
                                font-semibold
                                transition-all
                                duration-200
                                ${
                                outOfStock ||
                                inactive
                                    ? `
                                            bg-gray-200
                                            text-gray-500
                                            cursor-not-allowed
                                          `
                                    : `
                                            bg-green-700
                                            text-white
                                            hover:bg-green-800
                                            shadow-md
                                            hover:shadow-lg
                                          `
                            }
                            `}
                        >

                            <ShoppingCart
                                size={16}
                            />

                            {t(
                                "products_page.add"
                            )}

                        </button>

                    </div>

                </div>

            </div>

        </Link>
    );
};

export default ProductCard;