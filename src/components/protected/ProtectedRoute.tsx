//src/components/protected/ProtectedRoute.tsx
import {
    Navigate,
} from "@tanstack/react-router";

import {useAuth} from "../../hooks/useAuth";

type Props = {
    children: React.ReactNode;
};

const ProtectedRoute = ({
                            children,
                        }: Props) => {
    const {
        isAuthenticated,
        loading,
    } = useAuth();

    // LOADING
    if (loading) {
        return (
            <div
                className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#f5f3ed]
        "
            >
                Loading...
            </div>
        );
    }

    // NOT LOGGED IN
    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
            />
        );
    }

    return children;
};

export default ProtectedRoute;