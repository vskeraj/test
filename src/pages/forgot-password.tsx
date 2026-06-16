import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Flame, MailCheck } from "lucide-react";
import { useState } from "react";

const schema = z.object({ email: z.string().trim().email("Invalid email") });
type Form = z.infer<typeof schema>;

const ForgotPassword = () => {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    setError(null);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Flame className="h-10 w-10 text-primary mx-auto mb-3" />
            <h1 className="font-display text-2xl text-foreground mb-1">Forgot your password?</h1>
            <p className="text-sm text-muted-foreground">Enter your email and we'll send you a reset link.</p>
          </div>

          {sent ? (
            <div className="p-6 rounded-2xl bg-card card-surface text-center">
              <MailCheck className="h-10 w-10 text-primary mx-auto mb-3" />
              <h2 className="font-display text-lg text-foreground mb-2">Check your inbox</h2>
              <p className="text-sm text-muted-foreground mb-4">
                If an account exists for that email, a reset link is on its way. The link is valid for 1 hour.
              </p>
              <Link href="/login" className="text-sm text-primary hover:underline">Back to Sign In</Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <input {...register("email")} type="email" placeholder="Email" className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                </div>
                {error && <p className="text-sm text-destructive text-center">{error}</p>}
                <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50">
                  {isSubmitting ? "Sending..." : "Send reset link"}
                </button>
              </form>
              <p className="text-center text-sm text-muted-foreground mt-6">
                Remembered it? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
