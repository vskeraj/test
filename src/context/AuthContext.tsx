import React, { createContext, useContext } from "react";
import { useSession, signIn as nextSignIn, signOut as nextSignOut } from "next-auth/react";

interface AuthContextType {
  user: any;
  session: any;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string, displayName: string) => Promise<{ error: Error | null }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  
  const loading = status === "loading";
  const user = session?.user ?? null;
  const isAdmin = (user as any)?.role === "admin";

  const signUp = async (email: string, password: string, displayName: string) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, displayName }),
      });
      const data = await res.json();
      if (!res.ok) {
        return { error: new Error(data.message || "Something went wrong") };
      }
      return { error: null };
    } catch (err: any) {
      return { error: new Error(err.message) };
    }
  };

  const signIn = async (email: string, password: string) => {
    const res = await nextSignIn("credentials", { email, password, redirect: false });
    if (res?.error) return { error: new Error(res.error) };
    return { error: null };
  };

  const signOut = async () => {
    await nextSignOut({ redirect: false });
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
