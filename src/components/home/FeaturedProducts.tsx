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
import {ArrowRight, ShoppingCart, Star} from "lucide-react";
import {useCart} from "../../context/CartContext.tsx";

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
    const {addItem} = useCart();

    return (
        <section
            className="
              py-24
            "
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                    <div>
                        <h2 className="mt-2 text-4xl font-serif font-bold text-gray-900">{title}</h2>
                    </div>
                    <Link
                        to="/products"
                        className="flex items-center gap-1.5 text-green-700 font-semibold text-sm hover:text-green-600 transition-colors group"
                    >
                        {tr(
                            "featured_products.view_all"
                        )}
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"/>
                    </Link>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, i) => {
                            // STOCK
                            const outOfStock =
                                !product.is_in_stock || product.stock_quantity <= 0;

                            // INACTIVE
                            const inactive = !product.is_active;

                            return (
                                <Link
                                    // to={`/products/${product.id}`}
                                    to="/products/$id"
                                    params={{
                                        id: String(product.id),
                                    }}
                                    key={product.id}
                                    className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:-translate-y-1 block"
                                    style={{animationDelay: `${i * 0.05}s`}}
                                >
                                    {/* Image */}
                                    <div className="relative h-52 overflow-hidden">
                                        <img
                                            src={product.primary_image}
                                            alt={getText(product, "title")}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"/>
                                        {/*              {product.badge && (*/}
                                        {/*                  <span*/}
                                        {/*                      className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full ${*/}
                                        {/*                          BADGE_COLORS[product.badge] ?? 'bg-gray-100 text-gray-700'*/}
                                        {/*                      }`}*/}
                                        {/*                  >*/}
                                        {/*  {product.badge}*/}
                                        {/*</span>*/}
                                        {/*              )}*/}

                                        {/* OUT OF STOCK */}
                                        {(outOfStock ||
                                            inactive) && (
                                            <div className="absolute inset-0 bg-black/50 flex  items-center justify-center">
                                                <span
                                                    className="bg-white text-red-600 font-semibold px-4 py-2 rounded-full text-sm">
                                                    {inactive
                                                        ? tr(
                                                            "products.unavailable"
                                                        )
                                                        : tr(
                                                            "products.out_of_stock"
                                                        )}
                                                </span>

                                            </div>
                                        )}

                                        <button
                                            type="button"
                                            disabled={
                                                outOfStock ||
                                                inactive
                                            }
                                            onClick={(e) => {

                                                e.preventDefault();

                                                addItem(
                                                    product.id,
                                                    1
                                                );
                                            }}
                                            className={`
                                                absolute
                                                top-3
                                                right-3
                                                w-9
                                                h-9
                                                rounded-full
                                                flex
                                                items-center
                                                justify-center
                                                shadow-sm
                                                transition-all
                                                ${
                                                outOfStock ||
                                                inactive
                                                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                                                    : "bg-white/90 hover:bg-white opacity-0 group-hover:opacity-100"
                                            }
                                            `}>

                                            <ShoppingCart className="w-4 h-4 "/>
                                        </button>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5">
                                            <span
                                                className="text-xs text-green-700 font-medium uppercase tracking-wide">
                                                {getText(product, "category_name")}
                                            </span>
                                        <h3 className="mt-1 font-semibold text-gray-900 leading-snug mb-3">
                                            {getText(product, "title")}
                                        </h3>

                                        {/* Rating placeholder */}
                                        <div className="flex items-center gap-1 mb-4">
                                            {Array.from({length: 5}).map((_, j) => (
                                                <Star
                                                    key={j}
                                                    className={`w-3.5 h-3.5 ${j < 4 ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`}
                                                />
                                            ))}
                                            <span className="text-xs text-gray-500 ml-1">(4.2)</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                    <span className="text-xl font-bold text-gray-900">
                      ${product.price}
                    </span>
                                                {/*<span className="text-xs text-gray-500 ml-1">/ {product.unit}</span>*/}
                                            </div>
                                            <button type="button"
                                                    disabled={
                                                        outOfStock ||
                                                        inactive
                                                    }
                                                    onClick={(e) => {

                                                        e.preventDefault();

                                                        addItem(
                                                            product.id,
                                                            1
                                                        );
                                                    }}
                                                    className={`
                                                    px-4
                                                    py-2
                                                    text-sm
                                                    font-semibold
                                                    rounded-lg
                                                    transition-colors
                                                    ${
                                                        outOfStock ||
                                                        inactive
                                                            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                                                            : "bg-green-600 hover:bg-green-700 text-white"
                                                    }
                                                `}>

                                                {outOfStock
                                                    ? tr(
                                                        "products_page.out_of_stock"
                                                    )
                                                    : tr(
                                                        "products_page.add_to_cart"
                                                    )}
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    )}
                </div>
            </div>

        </section>
    );
};

export default FeaturedProducts;