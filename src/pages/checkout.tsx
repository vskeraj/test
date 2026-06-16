import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CheckoutForm from "@/components/CheckoutForm";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";

// Loaded once with the publishable key (safe to expose on the client).
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const Checkout = () => {
  const { items, cartTotal } = useCart();
  const { user, loading } = useAuth();
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const cartKey = useMemo(
    () => items.map((i) => `${i.book.id}x${i.quantity}`).join(","),
    [items]
  );

  useEffect(() => {
    if (loading) return;
    if (!user) { router.replace("/login"); return; }
    if (items.length === 0) return;

    let active = true;
    const body = { items: items.map((i) => ({ productId: i.book.id, quantity: i.quantity })) };
    fetch("/api/checkout/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error || "Could not start checkout");
        return data;
      })
      .then((data) => { if (active) { setClientSecret(data.clientSecret); setAmount(data.amount); } })
      .catch((e) => { if (active) setError(e.message); });
    return () => { active = false; };
    // Re-create the intent if the cart contents change.
  }, [cartKey, user, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"><ArrowLeft className="h-4 w-4" /> Back to cart</Link>
        <div className="max-w-md mx-auto">
          <h1 className="font-display text-3xl text-foreground mb-8">Checkout</h1>

          {items.length === 0 ? (
            <div className="p-6 rounded-2xl bg-card card-surface text-center">
              <p className="text-muted-foreground mb-4">Your cart is empty.</p>
              <Link href="/products" className="text-sm text-primary hover:underline">Browse books</Link>
            </div>
          ) : error ? (
            <div className="p-6 rounded-2xl bg-card card-surface text-center">
              <p className="text-destructive text-sm mb-4">{error}</p>
              <Link href="/cart" className="text-sm text-primary hover:underline">Return to cart</Link>
            </div>
          ) : !clientSecret ? (
            <div className="flex justify-center py-16"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>
          ) : (
            <div className="p-6 rounded-2xl bg-card card-surface">
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "night", variables: { colorPrimary: "#f59e0b" } } }}>
                <CheckoutForm amount={amount || cartTotal} />
              </Elements>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
