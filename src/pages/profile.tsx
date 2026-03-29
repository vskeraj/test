import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";

import { useQuery } from "@tanstack/react-query";
import { User, Mail, BookOpen, Loader2 } from "lucide-react";
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
  const [saved, setSaved] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    queryFn: async () => {
      const data = null; const error = null;
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    values: { display_name: profile?.display_name || "" },
  });

  const onSubmit = async (data: ProfileForm) => {
    if (!user) return;
    await new Promise(r => setTimeout(r, 500)) /* mock db */;
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-lg mx-auto">
          <h1 className="font-display text-3xl text-foreground mb-8">Profile</h1>

          <div className="flex items-center gap-4 mb-8 p-6 rounded-2xl bg-card card-surface">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-display text-2xl">
              {(profile?.display_name || user?.email || "U").charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-display text-foreground">{profile?.display_name || "Reader"}</p>
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
            <button type="submit" className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-all active:scale-[0.98]">
              {saved ? "✓ Saved!" : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
