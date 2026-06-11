import {
    useState,
} from "react";

import {
    useNavigate,
} from "@tanstack/react-router";

import {
    useCart,
} from "../../context/CartContext";

import {
    checkoutApi,
} from "../../api/orderApi";

const CheckoutPage = () => {

    const navigate =
        useNavigate();

    const {
        total,
    } = useCart();

    const [loading, setLoading] =
        useState(false);

    const [form, setForm] =
        useState({
            full_name: "",
            mobile_number: "",
            address_line_1: "",
            address_line_2: "",
            city: "",
            state: "",
            pincode: "",
            notes: "",
        });

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement |
            HTMLTextAreaElement
        >
    ) => {

        setForm({
            ...form,
            [e.target.name]:
                e.target.value,
        });
    };

    const handleCheckout =
        async (
            e: React.FormEvent
        ) => {

            e.preventDefault();

            try {

                setLoading(true);

                const response =
                    await checkoutApi({
                        new_address: {
                            full_name:
                                form.full_name,

                            mobile_number:
                                form.mobile_number,

                            address_line_1:
                                form.address_line_1,

                            address_line_2:
                                form.address_line_2,

                            city:
                                form.city,

                            state:
                                form.state,

                            pincode:
                                form.pincode,
                        },

                        notes:
                            form.notes,

                        payment_provider:
                            "stripe",
                    });

                console.log(
                    "CHECKOUT RESPONSE:",
                    response
                );

                navigate({
                    to: "/payment",
                    search: {
                        clientSecret:
                            response.stripe.client_secret,

                        publishableKey:
                            response.stripe.publishable_key,

                        orderId:
                            response.id,
                    },
                });

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);
            }
        };

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 pt-28">

            <div className="grid lg:grid-cols-3 gap-8">

                {/* FORM */}
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl border">

                    <h1 className="text-3xl font-bold mb-8">
                        Checkout
                    </h1>

                    <form
                        onSubmit={handleCheckout}
                        className="space-y-5"
                    >

                        <input
                            type="text"
                            name="full_name"
                            placeholder="Full Name"
                            value={form.full_name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-xl px-4 py-3"
                        />

                        <input
                            type="text"
                            name="mobile_number"
                            placeholder="Mobile Number"
                            value={form.mobile_number}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-xl px-4 py-3"
                        />

                        <input
                            type="text"
                            name="address_line_1"
                            placeholder="Address Line 1"
                            value={form.address_line_1}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-xl px-4 py-3"
                        />

                        <input
                            type="text"
                            name="address_line_2"
                            placeholder="Address Line 2"
                            value={form.address_line_2}
                            onChange={handleChange}
                            className="w-full border rounded-xl px-4 py-3"
                        />

                        <div className="grid md:grid-cols-3 gap-4">

                            <input
                                type="text"
                                name="city"
                                placeholder="City"
                                value={form.city}
                                onChange={handleChange}
                                required
                                className="border rounded-xl px-4 py-3"
                            />

                            <input
                                type="text"
                                name="state"
                                placeholder="State"
                                value={form.state}
                                onChange={handleChange}
                                required
                                className="border rounded-xl px-4 py-3"
                            />

                            <input
                                type="text"
                                name="pincode"
                                placeholder="Pincode"
                                value={form.pincode}
                                onChange={handleChange}
                                required
                                className="border rounded-xl px-4 py-3"
                            />

                        </div>

                        <textarea
                            name="notes"
                            placeholder="Order Notes"
                            value={form.notes}
                            onChange={handleChange}
                            className="w-full border rounded-xl px-4 py-3"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                bg-green-700
                                hover:bg-green-800
                                text-white
                                py-4
                                rounded-2xl
                                font-semibold
                            "
                        >
                            {
                                loading
                                    ? "Processing..."
                                    : "Continue to Payment"
                            }
                        </button>

                    </form>

                </div>

                {/* SUMMARY */}
                <div className="bg-white p-8 rounded-3xl border h-fit">

                    <h2 className="text-2xl font-bold mb-6">
                        Order Summary
                    </h2>

                    <div className="flex justify-between mb-4">
                        <span>Total</span>

                        <span className="font-bold text-2xl">
                            ₹{total}
                        </span>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default CheckoutPage;