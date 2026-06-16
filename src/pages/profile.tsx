import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";

const profileSchema = z.object({
  display_name: z.string().trim().min(1, "Name is required").max(100),
});

type ProfileForm = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user } = useAuth();
  const { update } = useSession();
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentName = (user as any)?.name || "";

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: { display_name: currentName },
  });

  const onSubmit = async (data: ProfileForm) => {
    if (!user) return;
    setError(null);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.display_name }),
      });
      if (!res.ok) throw new Error("Request failed");
      // Refresh the session so the Header/avatar reflect the new name immediately.
      await update({ name: data.display_name });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Could not save your profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-lg mx-auto">
          <h1 className="font-display text-3xl text-foreground mb-8">Profile</h1>

          <div className="flex items-center gap-4 mb-8 p-6 rounded-2xl bg-card card-surface">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display text-2xl">
              {(currentName || user?.email || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-display text-foreground">{currentName || "Reader"}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Display Name</label>
              <input {...register("display_name")} className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
              {errors.display_name && <p className="text-xs text-destructive mt-1">{errors.display_name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input value={user?.email || ""} disabled className="w-full px-4 py-2.5 rounded-lg bg-muted border border-border text-sm text-muted-foreground" />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button type="submit" disabled={isSubmitting} className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50">
              {saved ? "✓ Saved!" : isSubmitting ? "Saving..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
