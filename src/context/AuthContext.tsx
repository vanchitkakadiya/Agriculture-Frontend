import {
    createContext,
    useEffect,
    useState,
} from "react";

import {
    loginApi,
    logoutApi,
    signupApi,
} from "../api/authApi";

import type {
    AuthContextType,
    SignupPayload,
    User,
} from "../types/auth";

import {jwtDecode} from "jwt-decode";

type Props = {
    children: React.ReactNode;
};

export const AuthContext =
    createContext<
        AuthContextType | undefined
    >(undefined);

export const AuthProvider = ({
                                 children,
                             }: Props) => {

    const [user, setUser] =
        useState<User | null>(null);

    let logoutTimer: ReturnType<typeof setTimeout>;

    const [
        isAuthenticated,
        setIsAuthenticated,
    ] = useState(false);

    const [token, setToken] =
        useState<string | null>(
            null
        );

    const [loading, setLoading] =
        useState(true);


    // RESTORE AUTH
    useEffect(() => {

        const initAuth = () => {

            try {

                const accessToken =
                    localStorage.getItem(
                        "accessToken"
                    );

                const refreshToken =
                    localStorage.getItem(
                        "refreshToken"
                    );


                const storedUser =
                    localStorage.getItem(
                        "user"
                    );

                if (
                    accessToken &&
                    storedUser &&
                    storedUser !== "undefined"
                ) {

                    try {

                        const parsedUser =
                            JSON.parse(
                                storedUser
                            );

                        setToken(accessToken);

                        setUser(parsedUser);

                        setIsAuthenticated(
                            true
                        );

                        // START TIMER
                        if (refreshToken) {

                            startAutoLogoutTimer(
                                refreshToken
                            );
                        }

                    } catch {

                        localStorage.clear();
                    }
                }

            } catch (error) {

                console.log(
                    "AUTH RESTORE ERROR:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };

        initAuth();

    }, []);

    // ==============================
// AUTO LOGOUT TIMER
// ==============================
    const startAutoLogoutTimer = (
        refreshToken: string
    ) => {

        try {

            const decoded: any =
                jwtDecode(refreshToken);

            const expiryTime =
                decoded.exp * 1000;

            const currentTime =
                Date.now();

            const timeLeft =
                expiryTime - currentTime;

            console.log(
                "REFRESH TOKEN EXPIRES IN:",
                timeLeft / 1000,
                "seconds"
            );

            // EXPIRED
            if (timeLeft <= 0) {

                logout();

                return;
            }

            clearTimeout(
                logoutTimer
            );

            logoutTimer =
                setTimeout(
                    async () => {

                        console.log(
                            "REFRESH TOKEN EXPIRED"
                        );

                        await logout();

                        window.location.href =
                            "/login";

                    },
                    timeLeft
                );

        } catch (error) {

            console.error(
                "AUTO LOGOUT ERROR:",
                error
            );
        }
    };


    // LOGIN
    const login = async (
        email: string,
        password: string
    ) => {

        const response =
            await loginApi({
                email,
                password,
            });

        console.log(
            "LOGIN RESPONSE:",
            response
        );

        // IMPORTANT
        const access =
            response?.data?.access;

        const refresh =
            response?.data?.refresh;

        if (!access || !refresh) {

            throw new Error(
                "Token not received"
            );
        }

        // SAVE TOKENS
        localStorage.setItem(
            "accessToken",
            access
        );

        localStorage.setItem(
            "refreshToken",
            refresh
        );

        // DECODE TOKEN
        const decoded: any =
            jwtDecode(access);

        console.log(
            "DECODED TOKEN:",
            decoded
        );

        const userData: User = {
            id: decoded.user_id,
            email: decoded.email || email,
            full_name:
                decoded.full_name || "",
            mobile:
                decoded.mobile || "",
            preferred_language:
                decoded.preferred_language || "en",
            role:
                decoded.role || "user",
        };

        // SAVE USER
        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        setToken(access);

        setUser(userData);

        setIsAuthenticated(true);

        // START AUTO LOGOUT
        startAutoLogoutTimer(
            refresh
        );
    };


    // SIGNUP
    const signup = async (
        data: SignupPayload
    ) => {

        await signupApi(data);
    };


    /* LOGOUT */
    const logout = async () => {
        try {

            await logoutApi();

        } catch (error) {

            console.log(
                "Logout API Error:",
                error
            );

        } finally {

            clearTimeout(
                logoutTimer
            );

            /* CLEAR STORAGE */
            localStorage.removeItem(
                "accessToken"
            );

            localStorage.removeItem(
                "refreshToken"
            );

            localStorage.removeItem(
                "user"
            );

            /* CLEAR STATE */
            setUser(null);

            setToken(null);

            setIsAuthenticated(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                isAuthenticated,
                loading,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};