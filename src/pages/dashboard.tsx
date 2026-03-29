import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

import { useQuery } from "@tanstack/react-query";
import { BookOpen, ShoppingBag, Heart, TrendingUp, Loader2 } from "lucide-react";
import Link from 'next/link';

const Dashboard = () => {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: async () => {
      const data = null; const error = null;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="font-display text-3xl text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Welcome back to your reading sanctuary.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BookOpen, label: "Books Read", value: "—", change: "Start reading" },
            { icon: ShoppingBag, label: "Orders", value: orders?.length ?? 0, change: "All time" },
            { icon: Heart, label: "Wishlist", value: "—", change: "Add favorites" },
            { icon: TrendingUp, label: "Spent", value: orders ? `$${orders.reduce((s, o) => s + Number(o.total_amount), 0).toFixed(2)}` : "$0", change: "Total" },
          ].map(({ icon: Icon, label, value, change }) => (
            <div key={label} className="p-5 rounded-2xl bg-card card-surface">
              <Icon className="h-5 w-5 text-primary mb-3" />
              <p className="font-display text-2xl text-foreground tabular-nums">{value}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-xs text-primary">{change}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-card card-surface">
            <h2 className="font-display text-lg text-foreground mb-4">Recent Orders</h2>
            {isLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 text-primary animate-spin" /></div>
            ) : orders && orders.length > 0 ? (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm text-foreground tabular-nums">${Number(order.total_amount).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${order.status === "delivered" ? "bg-green-500/10 text-green-400" : order.status === "shipped" ? "bg-blue-500/10 text-blue-400" : "bg-primary/10 text-primary"}`}>{order.status}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No orders yet. <Link href="/products" className="text-primary hover:underline">Browse books</Link></p>
            )}
          </div>

          <div className="p-6 rounded-2xl bg-card card-surface">
            <h2 className="font-display text-lg text-foreground mb-4">Quick Links</h2>
            <div className="space-y-2">
              {[
                { label: "Edit Profile", to: "/profile" },
                { label: "Browse Books", to: "/products" },
                { label: "View Favorites", to: "/favorites" },
                { label: "Shopping Cart", to: "/cart" },
              ].map(({ label, to }) => (
                <Link key={to} href={to} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors">
                  <span className="text-sm text-foreground">{label}</span>
                  <span className="text-xs text-muted-foreground">→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
