import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { Flame, CheckCircle } from "lucide-react";
import { useState } from "react";

const schema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

type Form = z.infer<typeof schema>;

const ResetPassword = () => {
  const router = useRouter();
  const { token, email } = router.query as { token?: string; email?: string };
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Form) => {
    setError(null);
    if (!token || !email) {
      setError("This reset link is missing information. Please request a new one.");
      return;
    }
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, password: data.password }),
      });
      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Reset failed");
      setDone(true);
    } catch (e: any) {
      setError(e.message || "Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Flame className="h-10 w-10 text-primary mx-auto mb-3" />
            <h1 className="font-display text-2xl text-foreground mb-1">Choose a new password</h1>
            <p className="text-sm text-muted-foreground">{email ? `for ${email}` : "Set a new password for your account."}</p>
          </div>

          {done ? (
            <div className="p-6 rounded-2xl bg-card card-surface text-center">
              <CheckCircle className="h-10 w-10 text-primary mx-auto mb-3" />
              <h2 className="font-display text-lg text-foreground mb-2">Password updated</h2>
              <p className="text-sm text-muted-foreground mb-4">You can now sign in with your new password.</p>
              <Link href="/login" className="text-sm text-primary hover:underline">Go to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input {...register("password")} type="password" placeholder="New password" className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <input {...register("confirmPassword")} type="password" placeholder="Confirm new password" className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
                {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>}
              </div>
              {error && <p className="text-sm text-destructive text-center">{error}</p>}
              <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50">
                {isSubmitting ? "Updating..." : "Reset password"}
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Need a new link? <Link href="/forgot-password" className="text-primary hover:underline">Request one</Link>
              </p>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
