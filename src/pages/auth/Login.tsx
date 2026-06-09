//src/pages/auth/Login.tsx
import {useState} from "react";

import {
    Link,
    useNavigate,
} from "@tanstack/react-router";

import {useTranslation} from "react-i18next";

import {useAuth} from "../../hooks/useAuth";

import AuthInput from "../../components/auth/AuthInput";

const Login = () => {
    const {t} = useTranslation();

    const {login} = useAuth();

    const navigate = useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [error, setError] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    /* const handleSubmit = async (
         e: React.FormEvent
     ) => {
         e.preventDefault();

         try {
             setError("");

             await login(email, password);

             navigate({
                 to: "/",
             });
         } catch (err: any) {

             console.log(
                 "LOGIN ERROR:",
                 err
             );

             // API MESSAGE
             const apiMessage =
                 err?.response?.data?.detail ||
                 err?.response?.data?.message;

             setError(apiMessage ||
                 t("auth.invalidCredentials")
             );
         }
     };*/

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        try {
            setLoading(true);

            setError("");

            await login(
                email,
                password
            );

            console.log("Login successfull", email, " - ", password);

            await navigate({
                to: "/",
                replace: true,
            });

        } catch (err: any) {
            // API MESSAGE
            const apiMessage =
                err?.response?.data?.detail ||
                err?.response?.data?.message;

            setError(apiMessage ||
                t("auth.invalidCredentials")
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
                noValidate
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
                <h1
                    className="
            text-3xl
            font-bold
            mb-8
          "
                >
                    {t("auth.login")}
                </h1>

                {/* INPUTS */}
                <div className="space-y-5">
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
                    />

                    {/* PASSWORD */}
                    <AuthInput
                        label={t("auth.password")}
                        type="password"
                        value={password}
                        onChange={(e) =>
                            setPassword(
                                e.target.value
                            )
                        }
                    />

                    {/* FORGOT PASSWORD */}
                    <div className="mt-4 text-right">
                        <Link
                            to="/forgot-password"
                            className="
    text-sm
    text-green-700
    hover:underline
    font-medium
  "
                        >
                            {t("auth.forgotPassword")}
                        </Link>
                    </div>
                </div>

                {/* ERROR */}
                {error && (
                    <p
                        className="
              text-red-500
              mt-4
            "
                    >
                        {error}
                    </p>
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
    text-white
    py-3
    rounded-xl
    mt-6
  "
                >
                    {loading
                        ? t("auth.logging..")
                        : t("auth.login")}
                </button>

                {/* SIGNUP */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        {t("auth.noAccount")}{" "}

                        <Link
                            to="/signup"
                            className="
                text-green-700
                font-semibold
                hover:underline
              "
                        >
                            {t("auth.signup")}
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;