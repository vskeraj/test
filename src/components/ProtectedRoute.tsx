import { useAuth } from "@/context/AuthContext";
import { Flame } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [user, loading, router]);

  if (loading || !user) return <div className="min-h-screen bg-background flex items-center justify-center"><Flame className="h-8 w-8 text-primary animate-pulse" /></div>;
  return <>{children}</>;
};

export const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) router.replace("/login");
      else if (!isAdmin) router.replace("/dashboard");
    }
  }, [user, loading, isAdmin, router]);

  if (loading || !user || !isAdmin) return <div className="min-h-screen bg-background flex items-center justify-center"><Flame className="h-8 w-8 text-primary animate-pulse" /></div>;
  return <>{children}</>;
};
