// src/components/home/FeaturedProducts.tsx

import {
    Link,
} from "@tanstack/react-router";

import type {
    FeaturedProduct,
} from "../../types/home";

import {
    getText,
    tr,
} from "../../utils/language";
import {useTranslation} from "react-i18next";

type Props = {
    title: string;
    products: FeaturedProduct[];
};

const FeaturedProducts = ({
    title,
    products,
}: Props) => {

    // AUTO RE-RENDER ON LANGUAGE CHANGE
    useTranslation();

    return (
        <section
            className="
                py-20
            "
        >

            {/* HEADER */}
            <div
                className="
                    flex
                    items-center
                    justify-between
                    mb-10
                    gap-4
                    flex-wrap
                "
            >

                <div>

                    <span
                        className="
                            inline-flex
                            items-center
                            gap-2
                            bg-green-100
                            text-green-700
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                            mb-4
                        "
                    >
                        🌱
                        {" "}
                        {tr(
                            "featured_products.badge"
                        )}
                    </span>

                    <h2
                        className="
                            text-4xl
                            font-bold
                        "
                    >
                        {title}
                    </h2>

                </div>

                <Link
                    to="/products"
                    className="
                        text-green-700
                        font-semibold
                        hover:text-green-800
                        transition
                    "
                >
                    {tr(
                        "featured_products.view_all"
                    )}
                </Link>

            </div>

            {/* PRODUCTS */}
            <div
                className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-6
                "
            >

                {products.map(
                    (
                        product
                    ) => (
                        <div
                            key={
                                product.id
                            }
                            className="
                                bg-white
                                rounded-[28px]
                                overflow-hidden
                                border
                                border-[#e8e8e8]
                                hover:shadow-xl
                                transition
                            "
                        >

                            {/* IMAGE */}
                            <img
                                src={
                                    product.primary_image
                                }
                                alt={
                                    getText(
                                        product,
                                        "title"
                                    )
                                }
                                className="
                                    w-full
                                    h-56
                                    object-cover
                                "
                            />

                            {/* CONTENT */}
                            <div className="p-5">

                                {/* CATEGORY */}
                                <div
                                    className="
                                        text-sm
                                        text-green-700
                                        font-semibold
                                        mb-2
                                    "
                                >
                                    {getText(
                                        product,
                                        "category_name"
                                    )}
                                </div>

                                {/* TITLE */}
                                <h3
                                    className="
                                        text-xl
                                        font-bold
                                        mb-3
                                        line-clamp-2
                                        min-h-[56px]
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
                                        text-gray-600
                                        text-sm
                                        leading-7
                                        line-clamp-3
                                        min-h-[84px]
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
                                        mt-5
                                        flex
                                        items-center
                                        justify-between
                                        gap-3
                                    "
                                >

                                    {/* PRICE */}
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

                                    {/* BUTTON */}
                                    <Link
                                        to="/products/$id"
                                        params={{
                                            id: String(
                                                product.id
                                            ),
                                        }}
                                        className="
                                            bg-green-700
                                            hover:bg-green-800
                                            text-white
                                            px-4
                                            py-2
                                            rounded-xl
                                            text-sm
                                            font-semibold
                                            transition
                                        "
                                    >
                                        {tr(
                                            "featured_products.view"
                                        )}
                                    </Link>

                                </div>

                            </div>

                        </div>
                    )
                )}

            </div>

        </section>
    );
};

export default FeaturedProducts;