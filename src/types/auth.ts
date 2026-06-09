export interface LoginPayload {
    email: string;
    password: string;
}

export interface SignupPayload {
    full_name: string;
    email: string;
    mobile_number: string;
    password: string;
    language: string;
    password_confirm: string;
}

export interface User {
    id: number;

    full_name: string;

    email: string;

    mobile: string;

    preferred_language: string;

    role: string;
}

export interface UserProfile {
    address: string;

    city: string;

    state: string;

    pincode: string;

    farming_interest: string;
}

export interface ProfileResponse {
    id: number;

    email: string;

    mobile_number: string;

    full_name: string;

    role: string;

    preferred_language: string;

    is_active: boolean;

    profile: UserProfile;
}

export interface LoginResponse {
    access: string;

    refresh: string;

    user: User;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;

    isAuthenticated: boolean;

    loading: boolean;

    login: (
        email: string,
        password: string
    ) => Promise<void>;

    signup: (
        data: SignupPayload
    ) => Promise<void>;

    logout: () => Promise<void>;
}