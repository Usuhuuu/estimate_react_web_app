import { createContext, useContext, useState, ReactNode } from "react";

type AuthContextType = {
  LoginStatus: boolean;
  loginFunction: () => void;
  logoutFunction: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const stored = localStorage.getItem("isAuthenticated");
    return stored === "true"; // restore from storage
  });
  const loginFunction = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };
  const logoutFunction = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };
  return (
    <AuthContext.Provider
      value={{ LoginStatus: isAuthenticated, loginFunction, logoutFunction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
