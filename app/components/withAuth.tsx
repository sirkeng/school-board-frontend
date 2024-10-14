"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(
      null
    );
    const router = useRouter();
    const { login } = useAuth();

    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        login(accessToken);
        setIsAuthenticated(true);

        const hasRefreshed = sessionStorage.getItem("hasRefreshed");
        if (hasRefreshed === "false") {
          sessionStorage.setItem("hasRefreshed", "true");
          router.refresh();
        }
      } else {
        router.push("/login");
        setIsAuthenticated(false);
      }
    }, []);

    // Handle loading state while checking authentication
    if (isAuthenticated === null) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthComponent;
};

export default withAuth;
