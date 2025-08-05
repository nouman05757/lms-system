import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { User, AuthContextType } from "../types/index";
import { initialUsers } from "../data/mockData";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      console.log("Login attempt:", { email, password });
      const foundUser = users.find((u) => u.email === email);
      console.log("Found user:", foundUser);

      if (foundUser && password === "password") {
        console.log("Login successful, setting user:", foundUser);
        setUser(foundUser);
        setIsLoading(false);
        return true;
      }
      console.log("Login failed");
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Check if user already exists
      const existingUser = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase()
      );
      if (existingUser) {
        setIsLoading(false);
        return false; // User already exists
      }

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        role: role as "student" | "teacher" | "admin",
        joinDate: new Date().toISOString().split("T")[0],
        lastLogin: new Date().toISOString().split("T")[0],
        status: "active",
      };
      setUsers((prev) => [...prev, newUser]);
      setUser(newUser);
      console.log("Signup successful, setting user:", newUser);
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Signup error:", error);
      setIsLoading(false);
      return false;
    }
  };

  const updateUser = (userId: string, userData: Partial<User>) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, ...userData } : u))
    );
    if (user && user.id === userId) {
      setUser((prev) => (prev ? { ...prev, ...userData } : null));
    }
  };

  const deleteUser = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    if (user && user.id === userId) {
      setUser(null);
    }
  };

  const createUser = (userData: Omit<User, "id">) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      joinDate: new Date().toISOString().split("T")[0],
      lastLogin: new Date().toISOString().split("T")[0],
      status: "active",
    };
    setUsers((prev) => [...prev, newUser]);
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    signup,
    updateUser,
    deleteUser,
    createUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
