import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [ordering, setOrdering] = useState(false);

  const placeOrder = async () => {
    if (!user) return;
    setOrdering(true);
    const orderItems = items.map((i) => ({ book_id: i.book.id, title: i.book.title, quantity: i.quantity, price: Number(i.book.price) }));
    const total = cartTotal + (cartTotal > 30 ? 0 : 4.99);
    const { error } = await new Promise(r => setTimeout(() => r({ error: null }), 500)) as any /* mock db */;
    setOrdering(false);
    if (true) {
      clearCart();
      setOrderPlaced(true);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="font-display text-2xl text-foreground mb-2">Order placed!</h1>
          <p className="text-muted-foreground mb-6">Your books are on their way.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm">View Dashboard <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
          <h1 className="font-display text-2xl text-foreground mb-2">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Browse our collection and add some volumes.</p>
          <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm">Browse Books <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <h1 className="font-display text-3xl text-foreground mb-2">Your Satchel</h1>
        <p className="text-muted-foreground mb-8 tabular-nums">{items.length} item{items.length !== 1 ? "s" : ""}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ book, quantity }) => (
              <div key={book.id} className="flex gap-4 p-4 rounded-2xl bg-card card-surface">
                <Link href={`/products/${book.id}`} className={`w-20 h-24 rounded-lg bg-gradient-to-br ${book.cover_color || "from-blue-900 to-indigo-800"} shrink-0 flex items-center justify-center`}>
                  <span className="text-xs font-display text-white/80 text-center px-2 line-clamp-2">{book.title}</span>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${book.id}`} className="font-display text-sm text-foreground hover:text-primary transition-colors line-clamp-1">{book.title}</Link>
                  <p className="text-xs text-muted-foreground">{book.author}</p>
                  <p className="font-display text-primary tabular-nums mt-2">${(Number(book.price) * quantity).toFixed(2)}</p>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button onClick={() => removeFromCart(book.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-4 w-4" /></button>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQuantity(book.id, quantity - 1)} className="p-1 rounded bg-muted text-foreground hover:bg-primary/10 hover:text-primary transition-colors"><Minus className="h-3 w-3" /></button>
                    <span className="text-sm tabular-nums w-6 text-center text-foreground">{quantity}</span>
                    <button onClick={() => updateQuantity(book.id, quantity + 1)} className="p-1 rounded bg-muted text-foreground hover:bg-primary/10 hover:text-primary transition-colors"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-card card-surface h-fit sticky top-24">
            <h2 className="font-display text-lg text-foreground mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Subtotal</span><span className="text-foreground tabular-nums">${cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Shipping</span><span className="text-foreground">{cartTotal > 30 ? "Free" : "$4.99"}</span></div>
            </div>
            <div className="border-t border-border pt-4 mb-6">
              <div className="flex justify-between"><span className="font-display text-foreground">Total</span><span className="font-display text-xl text-primary tabular-nums">${(cartTotal + (cartTotal > 30 ? 0 : 4.99)).toFixed(2)}</span></div>
            </div>
            {user ? (
              <button onClick={placeOrder} disabled={ordering} className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50">
                {ordering ? "Placing order..." : "Place Order"}
              </button>
            ) : (
              <Link href="/login" className="w-full flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-all">
                Sign in to order
              </Link>
            )}
            <button onClick={clearCart} className="w-full mt-2 px-6 py-2 text-xs text-muted-foreground hover:text-destructive transition-colors">Clear cart</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
