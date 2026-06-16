import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, XCircle, ArrowRight } from "lucide-react";

// Landing page for redirect-based payment methods (the required return_url) and
// for the inline card flow. Clears the cart on a successful payment.
const CheckoutSuccess = () => {
  const router = useRouter();
  const { clearCart } = useCart();
  const status = router.query.redirect_status as string | undefined;
  const succeeded = status === "succeeded" || status === undefined;

  useEffect(() => {
    if (succeeded) clearCart();
  }, [succeeded]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-20 text-center">
        {succeeded ? (
          <>
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="font-display text-2xl text-foreground mb-2">Payment successful!</h1>
            <p className="text-muted-foreground mb-6">Thank you — your order is confirmed and your books are on their way.</p>
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm">View your orders <ArrowRight className="h-4 w-4" /></Link>
          </>
        ) : (
          <>
            <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
            <h1 className="font-display text-2xl text-foreground mb-2">Payment not completed</h1>
            <p className="text-muted-foreground mb-6">Your payment didn't go through. You can try again from your cart.</p>
            <Link href="/cart" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm">Back to cart <ArrowRight className="h-4 w-4" /></Link>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
