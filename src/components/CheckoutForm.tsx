import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import { useCart } from "@/context/CartContext";
import { Lock } from "lucide-react";

const CheckoutForm = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const { clearCart } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;
    setProcessing(true);
    setError(null);

    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      // Stay on-page for card payments; only redirect for methods that require it.
      redirect: "if_required",
    });

    if (submitError) {
      setError(submitError.message || "Payment failed. Please try again.");
      setProcessing(false);
      return;
    }

    if (paymentIntent && paymentIntent.status === "succeeded") {
      clearCart();
      router.push("/checkout/success?redirect_status=succeeded");
    } else {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <PaymentElement />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50"
      >
        <Lock className="h-4 w-4" />
        {processing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Test mode — use card 4242 4242 4242 4242, any future date, any CVC.
      </p>
    </form>
  );
};

export default CheckoutForm;
