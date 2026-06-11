import {
    Link,
} from "@tanstack/react-router";

const PaymentSuccessPage = () => {

    return (
        <div className="min-h-screen flex items-center justify-center px-4">

            <div className="bg-white border rounded-3xl p-10 text-center max-w-lg">

                <h1 className="text-4xl font-bold text-green-700 mb-4">
                    Payment Successful
                </h1>

                <p className="text-gray-600 mb-8">
                    Your order has been placed successfully.
                </p>

                <Link
                    to="/products"
                    className="
                        inline-block
                        bg-green-700
                        text-white
                        px-8
                        py-4
                        rounded-2xl
                    "
                >
                    Continue Shopping
                </Link>

            </div>

        </div>
    );
};

export default PaymentSuccessPage;