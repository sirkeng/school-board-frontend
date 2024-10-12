"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const { user, login } = useAuth();

    useEffect(() => {
      // Check if the accessToken exists in localStorage
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        setIsAuthenticated(true);
        login(accessToken); // Optionally update the AuthContext with the token
      } else {
        // If no token, redirect to login page
        router.push("/login");
      }
    }, [router, user, login]);

    if (!isAuthenticated) {
      return null; // Show nothing while checking authentication
    }

    return <WrappedComponent {...props} />;
  };

  // Set a display name for the HOC for debugging and development tools
  AuthComponent.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthComponent;
};

export default withAuth;
