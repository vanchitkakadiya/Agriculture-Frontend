import {
    useEffect,
    useState,
} from "react";

import {
    Search,
} from "lucide-react";

import {
    useTranslation,
} from "react-i18next";

import {
    getCategories,
    getProducts,
} from "../../api/productApi";

import ProductCard
    from "../../components/product/ProductCard";

import ProductSkeleton
    from "../../components/product/ProductSkeleton";

import type {
    Category,
    Product,
} from "../../types/product";

import {
    getText,
} from "../../utils/language";

const ProductsPage = () => {

    const { t } = useTranslation();

    const [products, setProducts] =
        useState<Product[]>([]);

    const [
        categories,
        setCategories,
    ] = useState<Category[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [page, setPage] =
        useState(1);

    const [hasMore, setHasMore] =
        useState(false);

    // =========================
    // FETCH PRODUCTS
    // =========================
    const fetchProducts =
        async (
            reset = false,
            customPage = 1
        ) => {

            try {

                setLoading(true);

                const data =
                    await getProducts(
                        customPage,
                        search,
                        category
                    );

                if (reset) {

                    setProducts(
                        data.results
                    );

                } else {

                    setProducts(
                        (prev) => [
                            ...prev,
                            ...data.results,
                        ]
                    );
                }

                setHasMore(
                    !!data.next
                );

            } catch (error) {

                console.error(
                    "Products Error:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

    // =========================
    // FETCH CATEGORIES
    // =========================
    const fetchCategories =
        async () => {

            try {

                const data =
                    await getCategories();

                setCategories(
                    Array.isArray(data)
                        ? data
                        : []
                );

            } catch (error) {

                console.error(
                    "Category Error:",
                    error
                );

                setCategories([]);
            }
        };

    // =========================
    // SEARCH + CATEGORY
    // =========================
    useEffect(() => {

        setPage(1);

        fetchProducts(
            true,
            1
        );

    }, [search, category]);

    // =========================
    // PAGINATION
    // =========================
    useEffect(() => {

        if (page > 1) {

            fetchProducts(
                false,
                page
            );
        }

    }, [page]);

    // =========================
    // INITIAL LOAD
    // =========================
    useEffect(() => {

        fetchCategories();

    }, []);

    return (
        <div
            className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            py-8
            md:py-10
        "
        >

            {/* HEADER */}
            <div
                className="
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-6
                mb-10
            "
            >

                <div>

                    <h1
                        className="
                        text-3xl
                        sm:text-4xl
                        lg:text-5xl
                        font-bold
                        text-gray-900
                        mb-3
                    "
                    >
                        {t(
                            "products_page.title"
                        )}
                    </h1>

                    <p
                        className="
                        text-gray-600
                        text-sm
                        sm:text-base
                        max-w-2xl
                    "
                    >
                        {t(
                            "products_page.subtitle"
                        )}
                    </p>

                </div>

                {/* SEARCH */}
                <div
                    className="
                    relative
                    w-full
                    lg:w-[360px]
                "
                >

                    <Search
                        size={18}
                        className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                    "
                    />

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder={t(
                            "products_page.search_placeholder"
                        )}
                        className="
                        w-full
                        h-12
                        rounded-2xl
                        border
                        border-gray-200
                        bg-white
                        pl-12
                        pr-4
                        text-sm
                        outline-none
                        focus:border-green-600
                        focus:ring-2
                        focus:ring-green-100
                        transition
                    "
                    />

                </div>

            </div>

            {/* CATEGORY FILTERS */}
            <div
                className="
                flex
                flex-wrap
                gap-3
                mb-10
            "
            >

                <button
                    onClick={() =>
                        setCategory("")
                    }
                    className={`
                        px-5
                        py-2.5
                        rounded-full
                        text-sm
                        font-medium
                        transition-all
                        duration-200
                        ${
                        category === ""
                            ? `
                              bg-green-700
                              text-white
                              shadow-lg
                            `
                            : `
                              bg-white
                              border
                              border-gray-200
                              hover:border-green-600
                              hover:text-green-700
                            `
                    }
                    `}
                >
                    {t(
                        "common.all"
                    )}
                </button>

                {categories.map(
                    (cat) => (
                        <button
                            key={cat.id}
                            onClick={() =>
                                setCategory(
                                    String(
                                        cat.id
                                    )
                                )
                            }
                            className={`
                                px-5
                                py-2.5
                                rounded-full
                                text-sm
                                font-medium
                                transition-all
                                duration-200
                                ${
                                category ===
                                String(
                                    cat.id
                                )
                                    ? `
                                      bg-green-700
                                      text-white
                                      shadow-lg
                                    `
                                    : `
                                      bg-white
                                      border
                                      border-gray-200
                                      hover:border-green-600
                                      hover:text-green-700
                                    `
                            }
                            `}
                        >
                            {getText(
                                cat,
                                "name"
                            )}
                        </button>
                    )
                )}

            </div>

            {/* PRODUCTS GRID */}
            <div
                className="
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
                gap-5
                md:gap-6
            "
            >

                {loading &&
                products.length === 0
                    ? Array.from({
                          length: 8,
                      }).map(
                          (_, index) => (
                              <ProductSkeleton
                                  key={index}
                              />
                          )
                      )
                    : products.map(
                          (product) => (
                              <ProductCard
                                  key={
                                      product.id
                                  }
                                  product={
                                      product
                                  }
                              />
                          )
                      )}

            </div>

            {/* EMPTY STATE */}
            {!loading &&
                products.length ===
                    0 && (
                    <div
                        className="
                        py-20
                        text-center
                    "
                    >

                        <h3
                            className="
                            text-xl
                            font-semibold
                            text-gray-700
                            mb-2
                        "
                        >
                            {t(
                                "products_page.no_products"
                            )}
                        </h3>

                    </div>
                )}

            {/* LOAD MORE */}
            {hasMore &&
                !loading && (
                    <div
                        className="
                        mt-12
                        flex
                        justify-center
                    "
                    >

                        <button
                            onClick={() =>
                                setPage(
                                    (
                                        prev
                                    ) =>
                                        prev +
                                        1
                                )
                            }
                            className="
                            bg-green-700
                            hover:bg-green-800
                            text-white
                            px-8
                            h-12
                            rounded-2xl
                            font-medium
                            transition
                            shadow-lg
                            hover:shadow-xl
                        "
                        >
                            {t(
                                "products_page.load_more"
                            )}
                        </button>

                    </div>
                )}

        </div>
    );
};

export default ProductsPage;