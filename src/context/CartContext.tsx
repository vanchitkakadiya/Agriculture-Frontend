import {
    createContext, type ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    getCart,
    addCartItem,
    updateCartItem,
    removeCartItem,
} from "../api/cartApi";
import {useAuth} from "../hooks/useAuth.ts";

export type CartItem = {
    id: number;
    product: number;
    product_title_en: string;
    product_title_hi: string;
    product_image: string;
    product_price: string;
    quantity: number;
    subtotal: string;
    product_stock_quantity: number;
};

type CartContextType = {
    items: CartItem[];
    total: string;
    totalItems: number;
    loading: boolean;

    fetchCart: () => Promise<void>;

    addItem: (
        productId: number,
        quantity?: number
    ) => Promise<void>;

    updateItemQuantity: (
        itemId: number,
        quantity: number
    ) => Promise<void>;

    removeItem: (
        itemId: number
    ) => Promise<void>;
};

const CartContext =
    createContext<CartContextType | null>(
        null
    );

export const CartProvider = ({
                                 children,
                             }: {
    children: ReactNode;
}) => {

    const [items, setItems] =
        useState<CartItem[]>([]);

    const [total, setTotal] =
        useState("0");

    const [totalItems, setTotalItems] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const {isAuthenticated} =
        useAuth();

    // =========================
    // FETCH CART
    // =========================
    const fetchCart = async () => {

        try {

            const cart =
                await getCart();

            setItems(
                cart.items || []
            );

            setTotal(
                cart.total || "0"
            );

            setTotalItems(
                cart.total_items || 0
            );

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);
        }
    };

    useEffect(() => {

        if (isAuthenticated) {

            fetchCart();

        } else {

            // CLEAR CART AFTER LOGOUT
            setItems([]);

            setTotal("0");

            setTotalItems(0);
        }

    }, [isAuthenticated]);

    // =========================
    // ADD ITEM
    // =========================
    const addItem =
        async (
            productId: number,
            quantity = 1
        ) => {

            try {

                await addCartItem(
                    productId,
                    quantity,
                );

                await fetchCart();

            } catch (error: any) {

                console.error(
                    error
                );

                // BACKEND ERROR MESSAGE
                const backendMessage =
                    error?.response?.data?.errors
                        ?.non_field_errors?.[0] ||
                    error?.message ||
                    "Failed to add item to cart";

                alert(backendMessage);
            }
        };

    // =========================
// UPDATE ITEM
// =========================
// =========================
// UPDATE ITEM
// =========================
    const updateItemQuantity =
        async (
            itemId: number,
            quantity: number
        ) => {

            // backup
            const previousItems =
                [...items];

            // ======================
            // OPTIMISTIC UPDATE
            // ======================
            const optimisticItems =
                items.map((item) =>
                    item.id === itemId
                        ? {
                            ...item,
                            quantity,
                            subtotal: (
                                Number(
                                    item.product_price
                                ) * quantity
                            ).toFixed(2),
                        }
                        : item
                );

            setItems(
                optimisticItems
            );

            // UPDATE BADGE
            setTotalItems(
                optimisticItems.reduce(
                    (sum, item) =>
                        sum +
                        (item?.quantity || 0),
                    0
                )
            );

            // UPDATE TOTAL
            setTotal(
                optimisticItems
                    .reduce(
                        (sum, item) =>
                            sum +
                            Number(
                                item?.subtotal || 0
                            ),
                        0
                    )
                    .toFixed(2)
            );

            try {


                // SAFE ACCESS
                const updatedItem =
                    await updateCartItem(
                        itemId,
                        quantity
                    );

                if (!updatedItem) {

                    throw new Error(
                        "Invalid cart response"
                    );
                }

                // FINAL ITEMS
                const finalItems =
                    optimisticItems.map(
                        (item) =>
                            item.id === itemId
                                ? updatedItem
                                : item
                    );

                setItems(
                    finalItems
                );

                // UPDATE HEADER
                setTotalItems(
                    finalItems.reduce(
                        (sum, item) =>
                            sum +
                            (item?.quantity || 0),
                        0
                    )
                );

                // UPDATE TOTAL
                setTotal(
                    finalItems
                        .reduce(
                            (sum, item) =>
                                sum +
                                Number(
                                    item?.subtotal || 0
                                ),
                            0
                        )
                        .toFixed(2)
                );

            } catch (error: any) {

                console.error(
                    error
                );

                // rollback
                setItems(
                    previousItems
                );

                setTotalItems(
                    previousItems.reduce(
                        (sum, item) =>
                            sum +
                            (item?.quantity || 0),
                        0
                    )
                );

                setTotal(
                    previousItems
                        .reduce(
                            (sum, item) =>
                                sum +
                                Number(
                                    item?.subtotal || 0
                                ),
                            0
                        )
                        .toFixed(2)
                );

                alert(
                    error.message ||
                    "Failed to update cart"
                );
            }
        };

    // =========================
// REMOVE ITEM
// =========================
    const removeItem =
        async (
            itemId: number
        ) => {

            // backup
            const previousItems =
                items;


            // OPTIMISTIC UPDATE
            const updatedItems =
                items.filter(
                    (item) =>
                        item.id !== itemId
                );

            setItems(updatedItems);

            // UPDATE HEADER COUNT
            setTotalItems(
                updatedItems.reduce(
                    (sum, item) =>
                        sum + item.quantity,
                    0
                )
            );

            // UPDATE TOTAL PRICE
            setTotal(
                updatedItems
                    .reduce(
                        (sum, item) =>
                            sum +
                            Number(
                                item.subtotal
                            ),
                        0
                    )
                    .toFixed(2)
            );

            try {

                await removeCartItem(
                    itemId
                );

            } catch (error) {

                console.error(
                    error
                );

                // rollback
                setItems(previousItems);

                setTotalItems(
                    previousItems.reduce(
                        (sum, item) =>
                            sum + item.quantity,
                        0
                    )
                );

                setTotal(
                    previousItems
                        .reduce(
                            (sum, item) =>
                                sum +
                                Number(
                                    item.subtotal
                                ),
                            0
                        )
                        .toFixed(2)
                );
            }
        };

    return (
        <CartContext.Provider
            value={{
                items,
                total,
                totalItems,
                loading,
                fetchCart,
                addItem,
                updateItemQuantity,
                removeItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {

    const context =
        useContext(CartContext);

    if (!context) {

        throw new Error(
            "useCart must be used within CartProvider"
        );
    }

    return context;
};