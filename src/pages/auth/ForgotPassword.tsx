import {useState} from "react";

import {
    Link,
} from "@tanstack/react-router";

import {useTranslation} from "react-i18next";

import AuthInput from "../../components/auth/AuthInput";
import {ArrowLeft} from "lucide-react";
import {forgotPasswordApi} from "../../api/authApi.ts";

const ForgotPassword = () => {
    const {t} = useTranslation();

    const [email, setEmail] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const [error, setError] =
        useState("");

    const handleSubmit = async (
        e: React.FormEvent
    ) => {

        e.preventDefault();

        setError("");
        setMessage("");

        try {

            setLoading(true);

            const response =
                await forgotPasswordApi(
                    email.trim()
                );

            setMessage(
                response?.message ||
                "Reset link sent successfully."
            );

            setEmail("");

        } catch (err: any) {

            console.error(err);

            setError(
                err?.response?.data?.message ||
                err?.response?.data?.detail ||
                "Failed to send reset link."
            );

        } finally {

            setLoading(false);
        }
    };

    return (
        <div
            className="
        min-h-[calc(100vh-70px)]
        flex
        items-center
        justify-center
        bg-[#f5f3ed]
        px-6
        py-10
      "
        >
            <form
                onSubmit={handleSubmit}
                className="
          bg-white
          w-full
          max-w-md
          p-8
          rounded-3xl
          shadow-lg
        "
            >
                {/* TITLE */}
                <div className="mb-8">
                    <h1
                        className="
              text-3xl
              font-bold
              text-[#1d1d1d]
            "
                    >
                        {t(
                            "auth.forgotPassword"
                        )}
                    </h1>

                    <p
                        className="
              text-gray-500
              mt-2
            "
                    >
                        {t(
                            "auth.forgotPasswordDesc"
                        )}
                    </p>
                </div>

                {/* EMAIL */}
                <AuthInput
                    label={t("auth.email")}
                    type="email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    required
                />

                {/* SUCCESS */}
                {message && (
                    <div
                        className="
              mt-5
              bg-green-50
              border
              border-green-200
              text-green-700
              px-4
              py-3
              rounded-xl
              text-sm
            "
                    >
                        {message}
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div
                        className="
              mt-5
              bg-red-50
              border
              border-red-200
              text-red-600
              px-4
              py-3
              rounded-xl
              text-sm
            "
                    >
                        {error}
                    </div>
                )}

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
            w-full
            bg-green-700
            hover:bg-green-800
            disabled:bg-gray-400
            transition
            text-white
            py-3
            rounded-xl
            mt-6
            font-medium
          "
                >
                    {loading
                        ? t(
                            "auth.sending"
                        )
                        : t(
                            "auth.sendResetLink"
                        )}
                </button>

                {/* LOGIN */}
                <div className="mt-8 flex justify-center">
                    <Link
                        to="/login"
                        className="
      inline-flex
      items-center
      justify-center
      gap-2
      text-green-700
      font-semibold
      hover:underline
    "
                    >
                        <ArrowLeft size={20}/>

                        {t("auth.backToLogin")}
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;