// src/lib/axios.ts

import axios from "axios";

const api = axios.create({
    baseURL: "http://192.168.1.29:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// ==============================
// REQUEST INTERCEPTOR
// ==============================
api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem(
                "accessToken"
            );

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },

    (error) => Promise.reject(error)
);

// ==============================
// RESPONSE INTERCEPTOR
// ==============================
api.interceptors.response.use(

    (response) => response,

    async (error) => {

        const originalRequest =
            error.config;

        // ACCESS TOKEN EXPIRED
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {

            originalRequest._retry = true;

            try {

                const refreshToken =
                    localStorage.getItem(
                        "refreshToken"
                    );

                // NO REFRESH TOKEN
                if (!refreshToken) {

                    throw new Error(
                        "No refresh token"
                    );
                }

                // REFRESH API CALL
                const refreshResponse =
                    await axios.post(
                        "http://192.168.1.29:8000/api/auth/token/refresh/",
                        {
                            refresh:
                                refreshToken,
                        }
                    );

                console.log(
                    "REFRESH RESPONSE:",
                    refreshResponse.data
                );

                // YOUR BACKEND STRUCTURE
                const newAccessToken =
                    refreshResponse.data
                        ?.data?.access;

                const newRefreshToken =
                    refreshResponse.data
                        ?.data?.refresh;

                if (!newAccessToken) {

                    throw new Error(
                        "Invalid refresh response"
                    );
                }

                // SAVE TOKENS
                localStorage.setItem(
                    "accessToken",
                    newAccessToken
                );

                if (newRefreshToken) {

                    localStorage.setItem(
                        "refreshToken",
                        newRefreshToken
                    );
                }

                // UPDATE HEADER
                originalRequest.headers.Authorization =
                    `Bearer ${newAccessToken}`;

                // RETRY ORIGINAL REQUEST
                return api(
                    originalRequest
                );

            } catch (refreshError) {

                console.error(
                    "REFRESH TOKEN FAILED",
                    refreshError
                );

                // CLEAR STORAGE
                localStorage.removeItem(
                    "accessToken"
                );

                localStorage.removeItem(
                    "refreshToken"
                );

                localStorage.removeItem(
                    "user"
                );

                // REDIRECT LOGIN
                window.location.href =
                    "/login";

                return Promise.reject(
                    refreshError
                );
            }
        }

        return Promise.reject(error);
    }
);

export default api;