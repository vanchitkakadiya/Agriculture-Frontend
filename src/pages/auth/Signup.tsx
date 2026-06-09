import {useState} from "react";

import {
    Link,
    useNavigate,
} from "@tanstack/react-router";

import {useTranslation} from "react-i18next";

import {useAuth} from "../../hooks/useAuth";

import AuthInput from "../../components/auth/AuthInput";

const Signup = () => {
    const {t} = useTranslation();

    const {signup} = useAuth();

    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        language: "en",
    });

    const [error, setError] =
        useState("");

    const [fieldErrors, setFieldErrors] =
        useState<Record<string, string>>(
            {}
        );

    const [loading, setLoading] =
        useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setForm({
            ...form,
            [e.target.name]:
            e.target.value,
        });
    };

    const handleSubmit = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        setFieldErrors({});
        setError("");

        // PASSWORD MATCH
        if (
            form.password !==
            form.confirmPassword
        ) {
            return setError(
                t(
                    "auth.passwordNotMatch"
                )
            );
        }

        // PASSWORD LENGTH
        if (
            form.password.length < 6
        ) {
            return setError(
                t(
                    "auth.passwordMin"
                )
            );
        }

        try {
            setLoading(true);

            console.log("Signup data: ", form);

            await signup({
                full_name: form.fullName,
                email: form.email,
                mobile_number: form.mobile,
                password: form.password,
                password_confirm: form.confirmPassword,
                language: form.language,
            });

            navigate({
                to: "/login",
            });
        } catch (err: any) {
            /* setError(
                 err?.response?.data
                     ?.message ||
                 t("auth.signupFailed")
             );
             console.error("Signup error: ", err);*/

            console.log(
                "SIGNUP ERROR:",
                err?.response?.data
            );

            const apiErrors =
                err?.response?.data?.errors;

            /* FIELD ERRORS */
            if (apiErrors) {

                const formattedErrors:
                    Record<string, string> = {};

                Object.keys(apiErrors).forEach(
                    (key) => {

                        formattedErrors[key] =
                            apiErrors[key][0];
                    }
                );

                setFieldErrors(
                    formattedErrors
                );
            }

            /* GENERAL ERROR */
            setError(
                err?.response?.data?.message ||
                t("auth.signupFailed")
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
        py-4
      "
        >
            <form
                onSubmit={handleSubmit}
                className="
          bg-white
          w-full
          max-w-lg
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
                            "auth.createAccount"
                        )}
                    </h1>
                </div>

                {/* FORM */}
                <div className="space-y-5">
                    {/* FULL NAME */}
                    <AuthInput
                        label={t(
                            "auth.fullName"
                        )}
                        name="fullName"
                        value={form.fullName}
                        onChange={
                            handleChange
                        }
                        error={fieldErrors.full_name}
                        required
                    />

                    {/* EMAIL */}
                    <AuthInput
                        label={t(
                            "auth.email"
                        )}
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={
                            handleChange
                        }
                        required
                        error={fieldErrors.email}
                    />

                    {/* MOBILE */}
                    <AuthInput
                        label={t(
                            "auth.mobile"
                        )}
                        name="mobile"
                        type="tel"
                        value={form.mobile}
                        onChange={
                            handleChange
                        }
                        required
                        error={
                            fieldErrors.mobile_number
                        }
                    />

                    {/* LANGUAGE */}
                    <div>
                        <label
                            className="
                block
                mb-2
                font-medium
              "
                        >
                            {t(
                                "auth.preferredLanguage"
                            )}
                        </label>

                        <select
                            name="language"
                            value={
                                form.language
                            }
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    language:
                                    e.target
                                        .value,
                                })
                            }
                            className="
                w-full
                border
                border-gray-300
                rounded-xl
                px-4
                py-3
                outline-none
                focus:border-green-700
                bg-white
              "
                        >
                            <option value="en">
                                {t(
                                    "language.en"
                                )}
                            </option>

                            <option value="hi">
                                {t(
                                    "language.hi"
                                )}
                            </option>
                        </select>
                    </div>

                    {/* PASSWORD */}
                    <AuthInput
                        label={t(
                            "auth.password"
                        )}
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={
                            handleChange
                        }
                        required
                        error={fieldErrors.password}
                    />

                    {/* CONFIRM PASSWORD */}
                    <AuthInput
                        label={t(
                            "auth.confirmPassword"
                        )}
                        name="confirmPassword"
                        type="password"
                        value={
                            form.confirmPassword
                        }
                        onChange={
                            handleChange
                        }
                        required
                        error={fieldErrors.password_confirm}
                    />
                </div>

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
                            "auth.creatingAccount"
                        )
                        : t(
                            "auth.createAccount"
                        )}
                </button>

                {/* LOGIN LINK */}
                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        {t(
                            "auth.alreadyAccount"
                        )}{" "}

                        <Link
                            to="/login"
                            className="
                text-green-700
                font-semibold
                hover:underline
              "
                        >
                            {t("auth.login")}
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Signup;