//pages/product/ProductDetailPage.tsx

import {
    useParams,
} from "@tanstack/react-router";

import {
    useEffect,
    useState,
} from "react";

import {
    Minus,
    Plus,
    ShoppingCart,
    Star,
} from "lucide-react";

import {
    useTranslation,
} from "react-i18next";

import {
    getProductDetail,
} from "../../api/productApi";

import type {
    Product,
} from "../../types/product";
import {useCart} from "../../context/CartContext.tsx";
import {getText} from "../../utils/language.ts";

const ProductDetailPage =
    () => {

        const {t} = useTranslation();

        const {addItem} =
            useCart();

        const {id} =
            useParams({
                from:
                    "/products/$id",
            });

        const [
            product,
            setProduct,
        ] = useState<Product | null>(
            null
        );

        const [
            selectedImage,
            setSelectedImage,
        ] = useState("");

        const [
            quantity,
            setQuantity,
        ] = useState(1);

        const [loading, setLoading] =
            useState(true);

        // FETCH PRODUCT
        useEffect(() => {

            const fetchProduct =
                async () => {

                    try {

                        setLoading(
                            true
                        );

                        const data =
                            await getProductDetail(
                                id
                            );

                        console.log(
                            "Product Detail:",
                            data
                        );

                        setProduct(
                            data
                        );

                        // DEFAULT IMAGE
                        if (
                            data.images
                                ?.length >
                            0
                        ) {

                            setSelectedImage(
                                data
                                    .images[0]
                                    .image
                            );

                        }

                    } catch (
                        error
                        ) {

                        console.error(
                            error
                        );

                    } finally {

                        setLoading(
                            false
                        );
                    }
                };

            fetchProduct();

        }, [id]);

        const increaseQuantity =
            () => {

                if (
                    quantity <
                    maxQuantity
                ) {

                    setQuantity(
                        (prev) =>
                            prev + 1
                    );
                }
            };

        const decreaseQuantity =
            () => {

                setQuantity(
                    (prev) =>
                        Math.max(
                            1,
                            prev - 1
                        )
                );
            };

        if (loading) {

            return (
                <div
                    className="
                min-h-screen
                flex
                items-center
                justify-center
                text-lg
                font-semibold
            "
                >
                    {t(
                        "common.loading"
                    )}
                </div>
            );
        }

        // =========================
        // PRODUCT NOT FOUND
        // =========================
        if (!product) {

            return (
                <div
                    className="
                min-h-screen
                flex
                items-center
                justify-center
                text-lg
                font-semibold
            "
                >
                    {t(
                        "products_page.product_not_found"
                    )}
                </div>
            );
        }

        // =========================
        // PRODUCT DATA
        // =========================
        const title =
            getText(
                product,
                "title"
            );

        const description =
            getText(
                product,
                "description"
            );

        const categoryName =
            typeof product.category ===
            "object"
                ? getText(
                    product.category,
                    "name"
                )
                : "";

        const unitLabel =
            product?.unit
                ? `${product.unit_value || 1} ${product.unit}`
                : "";

        const maxQuantity =
            product?.stock_quantity ||
            0;

        const outOfStock =
            !product.is_in_stock ||
            product.stock_quantity <=
            0;

        return (
            <div
                className="
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                py-10
            "
            >

                <div
                    className="
                    grid
                    lg:grid-cols-2
                    gap-12
                "
                >

                    {/* LEFT */}
                    <div>

                        {/* MAIN IMAGE */}
                        <div
                            className="
                            bg-[#f5f3ed]
                            rounded-3xl
                            overflow-hidden
                            aspect-square
                            mb-5
                        "
                        >

                            <img
                                src={
                                    selectedImage ||
                                    "/placeholder-product.jpg"
                                }
                                alt={
                                    title
                                }
                                className="
                                w-full
                                h-full
                                object-cover
                            "
                            />

                        </div>

                        {/* GALLERY */}
                        <div
                            className="
                            flex
                            gap-4
                            overflow-x-auto
                        "
                        >

                            {product.images?.map(
                                (
                                    image
                                ) => (
                                    <button
                                        key={
                                            image.id
                                        }
                                        onClick={() =>
                                            setSelectedImage(
                                                image.image
                                            )
                                        }
                                        className={`
                                        w-24
                                        h-24
                                        rounded-2xl
                                        overflow-hidden
                                        border-2
                                        flex-shrink-0
                                        ${
                                            selectedImage ===
                                            image.image
                                                ? "border-green-700"
                                                : "border-transparent"
                                        }
                                    `}
                                    >

                                        <img
                                            src={
                                                image.image
                                            }
                                            alt=""
                                            className="
                                            w-full
                                            h-full
                                            object-cover
                                        "
                                        />

                                    </button>
                                )
                            )}

                        </div>

                    </div>

                    {/* RIGHT */}
                    <div>

                        {/* CATEGORY */}
                        <div
                            className="
                            flex
                            items-center
                            gap-3
                            mb-4
                        "
                        >

                            <span
                                className="
                                bg-[#eef3dc]
                                text-green-700
                                text-sm
                                font-semibold
                                px-4
                                py-2
                                rounded-full
                            "
                            >
                                {
                                    categoryName
                                }
                            </span>

                            {product.is_featured && (
                                <span
                                    className="
                                    bg-yellow-400
                                    text-black
                                    text-sm
                                    font-semibold
                                    px-4
                                    py-2
                                    rounded-full
                                    flex
                                    items-center
                                    gap-2
                                "
                                >

                                    <Star
                                        size={
                                            16
                                        }
                                        fill="currentColor"
                                    />

                                    {t(
                                        "products_page.featured"
                                    )}

                                </span>
                            )}

                        </div>

                        {/* TITLE */}
                        <h1
                            className="
                            text-4xl
                            md:text-5xl
                            font-bold
                            mb-5
                        "
                        >
                            {title}
                        </h1>

                        {/* DESCRIPTION */}
                        <p
                            className="
                            text-gray-600
                            leading-8
                            mb-8
                        "
                        >
                            {
                                description
                            }
                        </p>

                        {/* PRICE */}
                        <div
                            className="
                            text-5xl
                            font-bold
                            text-green-700
                            mb-6
                        "
                        >
                            ₹
                            {
                                product.price
                            }
                        </div>

                        {/* STOCK */}
                        <div
                            className="
    flex
    flex-wrap
    items-center
    gap-4
    mb-8
"
                        >

                            {/* STOCK */}
                            <div
                                className={`
        inline-flex
        items-center
        px-4
        py-2
        rounded-full
        text-sm
        font-semibold
        ${
                                    outOfStock
                                        ? "bg-red-100 text-red-600"
                                        : "bg-green-100 text-green-700"
                                }
    `}
                            >
                                {outOfStock
                                    ? t(
                                        "products_page.out_of_stock"
                                    )
                                    : `${product.stock_quantity} ${t(
                                        "products_page.available"
                                    )}`}
                            </div>

                            {/* UNIT */}
                            {/* UNIT */}
                            {unitLabel && (
                                <div
                                    className="
        inline-flex
        items-center
        px-4
        py-2
        rounded-full
        bg-[#eef3dc]
        text-green-700
        text-sm
        font-semibold
    "
                                >
                                    {t(
                                        "products_page.pack_size"
                                    )}
                                    {" "}
                                    {unitLabel}
                                </div>
                            )}

                        </div>

                        {/* QUANTITY */}
                        <div
                            className="
    mb-10
"
                        >

                            <div
                                className="
        flex
        items-center
        justify-between
        mb-3
    "
                            >

        <span
            className="
            font-semibold
            text-lg
        "
        >
               {t(
                                    "products_page.quantity"
                                )}
        </span>

                                <span
                                    className="
            text-sm
            text-gray-500
        "
                                >
              {t(
                                    "products_page.max"
                                )}:
                                    {" "}
                                    {maxQuantity}
        </span>

                            </div>

                            <div
                                className="
        flex
        items-center
        border
        rounded-2xl
        overflow-hidden
        w-fit
    "
                            >

                                {/* MINUS */}
                                <button
                                    onClick={
                                        decreaseQuantity
                                    }
                                    disabled={
                                        quantity <= 1
                                    }
                                    className="
            w-14
            h-14
            flex
            items-center
            justify-center
            disabled:opacity-40
        "
                                >

                                    <Minus
                                        size={20}
                                    />

                                </button>

                                {/* VALUE */}
                                <div
                                    className="
            min-w-[120px]
            px-5
            text-center
            font-bold
            text-lg
        "
                                >
                                    {quantity}

                                    {unitLabel &&
                                        ` × ${unitLabel}`
                                    }
                                </div>

                                {/* PLUS */}
                                <button
                                    onClick={
                                        increaseQuantity
                                    }
                                    disabled={
                                        quantity >=
                                        maxQuantity
                                    }
                                    className="
            w-14
            h-14
            flex
            items-center
            justify-center
            disabled:opacity-40
        "
                                >

                                    <Plus
                                        size={20}
                                    />

                                </button>

                            </div>

                            {/* TOTAL */}
                            <div
                                className="
        mt-4
        text-lg
        font-semibold
    "
                            >
                                {t(
                                "products_page.total"
                            )}:
                                {" "}
                                <span
                                    className="
            text-green-700
        "
                                >
            ₹
                                    {(
                                        Number(
                                            product.price
                                        ) * quantity
                                    ).toFixed(2)}
        </span>
                            </div>

                        </div>

                        {/* BUTTON */}
                        <button
                            disabled={
                                outOfStock ||
                                !product.is_active
                            }
                            onClick={() =>
                                addItem(
                                    product.id,
                                    quantity
                                )
                            }
                            className={`
                            w-full
                            md:w-auto
                            inline-flex
                            items-center
                            justify-center
                            gap-3
                            px-10
                            py-5
                            rounded-2xl
                            font-semibold
                            text-lg
                            transition
                            ${
                                outOfStock ||
                                !product.is_active
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-green-700 hover:bg-green-800 text-white"
                            }
                        `}
                        >

                            <ShoppingCart
                                size={22}
                            />

                            {outOfStock
                            ? t(
                                  "products_page.out_of_stock"
                              )
                            : t(
                                  "products_page.add_to_cart"
                              )}

                        </button>

                    </div>

                </div>

            </div>
        );
    };

export default ProductDetailPage;