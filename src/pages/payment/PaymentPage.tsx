import {
    Elements,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

import {
    loadStripe,
} from "@stripe/stripe-js";

import {
    useSearch,
    useNavigate,
} from "@tanstack/react-router";
import {useState} from "react";
import {useCart} from "../../context/CartContext.tsx";

const CheckoutForm = () => {

    const stripe =
        useStripe();

    const elements =
        useElements();

    const navigate =
        useNavigate();

    const {
        fetchCart,
    } = useCart();

    const [loading, setLoading] =
        useState(false);

    const handleSubmit =
        async (
            e: React.FormEvent
        ) => {

            e.preventDefault();

            if (!stripe || !elements)
                return;

            try {

                setLoading(true);

                const result =
                    await stripe.confirmPayment({
                        elements,
                        confirmParams: {
                            return_url:
                                `${window.location.origin}/payment-success`,
                        },
                        redirect: "if_required",
                    });

                if (result.error) {

                    alert(
                        result.error.message
                    );

                    return;
                }


                /*navigate({
                    to: "/payment-success",
                });*/

                // PAYMENT SUCCESS
                if (
                    result.paymentIntent
                        ?.status === "succeeded"
                ) {

                    // REFRESH CART
                    await fetchCart();

                    // REDIRECT
                    navigate({
                        to: "/payment-success",
                    });
                }

            } finally {

                setLoading(false);
            }
        };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >

            <PaymentElement/>

            <button
                disabled={loading}
                className="
                    w-full
                    bg-green-700
                    text-white
                    py-4
                    rounded-2xl
                "
            >
                {
                    loading
                        ? "Processing..."
                        : "Pay Now"
                }
            </button>

        </form>
    );
};

const PaymentPage = () => {

    const search =
        useSearch({
            from: "/payment",
        });

    const stripePromise =
        loadStripe(
            search.publishableKey
        );

    return (
        <div className="max-w-3xl mx-auto px-4 py-20">

            <div className="bg-white border rounded-3xl p-8">

                <h1 className="text-3xl font-bold mb-8">
                    Stripe Payment
                </h1>

                <Elements
                    stripe={stripePromise}
                    options={{
                        clientSecret:
                        search.clientSecret,
                    }}
                >

                    <CheckoutForm/>

                </Elements>

            </div>

        </div>
    );
};

export default PaymentPage;