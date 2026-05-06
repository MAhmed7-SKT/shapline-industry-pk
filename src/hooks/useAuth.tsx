import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  isReady: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAdmin") === "true";
    setIsLoggedIn(auth);
    setIsReady(true);
  }, []);

  const login = (username: string, password: string) => {
    if (username === "Admin1" && password === "admin@123") {
      setIsLoggedIn(true);
      localStorage.setItem("isAdmin", "true");
      localStorage.removeItem("admin_auth");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("admin_auth");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
