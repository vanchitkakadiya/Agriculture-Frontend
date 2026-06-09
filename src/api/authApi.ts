import type {LoginPayload, SignupPayload} from "../types/auth.ts";
import api from "../lib/axios.ts";


export const loginApi = async (
    data: LoginPayload
) => {
    const response =
        await api.post(
            "/auth/login/",
            data
        );

    return response.data;
};

export const signupApi = async (
    data: SignupPayload
) => {
    const response =
        await api.post(
            "/auth/signup/",
            data
        );

    return response.data;
};

// =====================================
// FORGOT PASSWORD
// =====================================
export const forgotPasswordApi = async (
    email: string
) => {

    const formData =
        new FormData();

    formData.append(
        "email",
        email
    );

    const response =
        await api.post(
            "/auth/forgot-password/",
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

    return response.data;
};

// =====================================
// RESET PASSWORD
// =====================================
export const resetPasswordApi = async (
    token: string,
    password: string,
    confirmPassword: string
) => {

    const formData =
        new FormData();

    formData.append(
        "token",
        token
    );

    formData.append(
        "new_password",
        password
    );

    formData.append(
        "new_password_confirm",
        confirmPassword
    );

    const response =
        await api.post(
            "/auth/reset-password/",
            formData,
            {
                headers: {
                    "Content-Type":
                        "multipart/form-data",
                },
            }
        );

    return response.data;
};

/* LOGOUT USING REFRESH TOKEN */
/* LOGOUT */
export const logoutApi =
    async () => {

        const refreshToken =
            localStorage.getItem(
                "refreshToken"
            );

        if (!refreshToken) {
            return;
        }

        const response =
            await api.post(
                "/auth/logout/",
                {
                    refresh:
                        refreshToken,
                }
            );

        return response.data;
    };

/* REFRESH TOKEN */
export const refreshTokenApi =
    async () => {
        const refreshToken =
            localStorage.getItem(
                "refreshToken"
            );

        const response =
            await api.post(
                "/auth/token/refresh/",
                {
                    refresh:
                    refreshToken,
                }
            );

        return response.data;
    };