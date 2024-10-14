"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: any;
  login: (token: string) => void;
  logout: () => void;
  handleAuthError: (response: Response) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setUser({ token: accessToken });
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("accessToken", token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    sessionStorage.removeItem("hasRefreshed");
    setUser(null);
    router.push("/login");
  };

  const handleAuthError = async (response: Response) => {
    if (response.status === 403) {
      alert("Your session has expired. Please log in again.");
      logout(); // Log out the user and redirect to the login page
    } else if (!response.ok) {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, handleAuthError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
