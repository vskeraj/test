import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

import { BookOpen, ShoppingBag, Heart, TrendingUp } from "lucide-react";
import Link from 'next/link';
import type { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";
import Favorite from "@/models/Favorite";

interface OrderItem {
  quantity: number;
}

interface OrderDTO {
  id: string;
  total_amount: number;
  status: string;
  paymentStatus?: string;
  createdAt: string;
  items: OrderItem[];
}

const Dashboard = ({ orders, favoritesCount }: { orders: OrderDTO[]; favoritesCount: number }) => {
  const { user } = useAuth();
  const totalSpent = orders.reduce((s, o) => s + Number(o.total_amount), 0);
  const booksOwned = orders.reduce(
    (s, o) => s + (o.items?.reduce((n, i) => n + (Number(i.quantity) || 0), 0) ?? 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="font-display text-3xl text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground mb-8">Welcome back{user?.name ? `, ${user.name}` : ""}, to your reading sanctuary.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { icon: BookOpen, label: "Books Owned", value: booksOwned, change: "From your orders" },
            { icon: ShoppingBag, label: "Orders", value: orders.length, change: "All time" },
            { icon: Heart, label: "Wishlist", value: favoritesCount, change: favoritesCount > 0 ? "Saved items" : "Add favorites" },
            { icon: TrendingUp, label: "Spent", value: `$${totalSpent.toFixed(2)}`, change: "Total" },
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
            {orders.length > 0 ? (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                    <div>
                      <p className="text-sm text-foreground tabular-nums">${Number(order.total_amount).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${order.paymentStatus === "paid" ? "bg-green-500/10 text-green-400" : order.paymentStatus === "failed" ? "bg-red-500/10 text-red-400" : "bg-amber-500/10 text-amber-400"}`}>{order.paymentStatus === "paid" ? "Paid" : order.paymentStatus === "failed" ? "Payment failed" : "Payment pending"}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${order.status === "delivered" ? "bg-green-500/10 text-green-400" : order.status === "shipped" ? "bg-blue-500/10 text-blue-400" : "bg-primary/10 text-primary"}`}>{order.status}</span>
                    </div>
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

// SSR: fetch the signed-in user's orders fresh on every request.
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  await dbConnect();
  const userId = (session.user as any).id;
  const [docs, favoritesCount] = await Promise.all([
    (Order as any).find({ userId }).sort({ createdAt: -1 }),
    (Favorite as any).countDocuments({ userId }),
  ]);
  const orders = JSON.parse(JSON.stringify(docs));

  return { props: { orders, favoritesCount } };
};

export default Dashboard;
