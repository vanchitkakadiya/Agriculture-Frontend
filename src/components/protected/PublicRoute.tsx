import {
  Navigate,
} from "@tanstack/react-router";

import { useAuth } from "../../hooks/useAuth";

type Props = {
  children: React.ReactNode;
};

const PublicRoute = ({
  children,
}: Props) => {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
        "
      >
        Loading...
      </div>
    );
  }

  // ALREADY LOGGED IN
  if (isAuthenticated) {
    return (
      <Navigate
        to="/"
      />
    );
  }

  return children;
};

export default PublicRoute;