import {useState} from "react";

import {
    Link,
    useNavigate, useSearch,
} from "@tanstack/react-router";

import {useTranslation} from "react-i18next";

import AuthInput from "../../components/auth/AuthInput";
import {ArrowLeft} from "lucide-react";
import {resetPasswordApi} from "../../api/authApi.ts";

const ResetPassword = () => {
    const {t} = useTranslation();

    const navigate = useNavigate();

    const [password, setPassword] =
        useState("");

    const [
        confirmPassword,
        setConfirmPassword,
    ] = useState("");

    const [error, setError] =
        useState("");

    const [message, setMessage] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const search = useSearch({
        from: "/reset-password",
    });

    const token = search.token as string;

   const handleSubmit = async (
    e: React.FormEvent
) => {

    e.preventDefault();

    setError("");
    setMessage("");

    // =========================
    // VALIDATION
    // =========================
    if (!token) {

        return setError(
            "Invalid reset token."
        );
    }

    if (!password) {

        return setError(
            "Password is required."
        );
    }

    if (password.length < 6) {

        return setError(
            "Password must be at least 6 characters."
        );
    }

    if (
        password !==
        confirmPassword
    ) {

        return setError(
            t(
                "auth.passwordNotMatch"
            )
        );
    }

    try {

        setLoading(true);

        const response =
            await resetPasswordApi(
                token,
                password,
                confirmPassword
            );

        setMessage(
            response?.message ||
            "Password reset successfully."
        );

        setTimeout(() => {

            navigate({
                to: "/login",
            });

        }, 2000);

    } catch (err: any) {

        console.error(err);

        setError(
            err?.response?.data?.message ||
            err?.response?.data?.detail ||
            "Failed to reset password."
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
                            "auth.resetPassword"
                        )}
                    </h1>
                </div>

                {/* PASSWORD */}
                <div className="space-y-5">
                    <AuthInput
                        label={t(
                            "auth.newPassword"
                        )}
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                        required
                    />

                    <AuthInput
                        label={t(
                            "auth.confirmPassword"
                        )}
                        type="password"
                        value={
                            confirmPassword
                        }
                        onChange={(e) =>
                            setConfirmPassword(
                                e.target.value
                            )
                        }
                        required
                    />
                </div>

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
                            "auth.resetting"
                        )
                        : t(
                            "auth.resetPassword"
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

export default ResetPassword;