import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flame } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });

type RegisterForm = z.infer<typeof registerSchema>;

const Register = () => {
  const { signUp, user } = useAuth();
  const router = useRouter();
  const navigate = router.push;
  const [authError, setAuthError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  if (user) {
    navigate("/dashboard");
    return null;
  }

  const onSubmit = async (data: RegisterForm) => {
    setAuthError(null);
    const { error } = await signUp(data.email, data.password, data.name);
    if (error) {
      setAuthError(error.message);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Flame className="h-10 w-10 text-primary mx-auto mb-3" />
            <h1 className="font-display text-2xl text-foreground mb-1">Create an account</h1>
            <p className="text-sm text-muted-foreground">Join the Firefly community</p>
          </div>

          {success ? (
            <div className="p-6 rounded-2xl bg-card card-surface text-center">
              <h2 className="font-display text-lg text-foreground mb-2">Check your email!</h2>
              <p className="text-sm text-muted-foreground mb-4">We've sent a confirmation link to your email address.</p>
              <Link href="/login" className="text-sm text-primary hover:underline">Back to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {(["name", "email", "password", "confirmPassword"] as const).map((field) => (
                <div key={field}>
                  <input
                    {...register(field)}
                    type={field.includes("assword") ? "password" : field === "email" ? "email" : "text"}
                    placeholder={field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
                    className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  {errors[field] && <p className="text-xs text-destructive mt-1">{errors[field]?.message}</p>}
                </div>
              ))}
              {authError && <p className="text-sm text-destructive text-center">{authError}</p>}
              <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50">
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>
            </form>
          )}

          {!success && (
            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account? <Link href="/login" className="text-primary hover:underline">Sign in</Link>
            </p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
