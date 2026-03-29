import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";


const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  subject: z.string().trim().min(1, "Subject is required").max(200),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (formData: ContactForm) => {
    setSubmitError(null);
    const { error } = await new Promise(r => setTimeout(() => r({ error: null }), 500)) as any /* mock db */;
    if (error) {
      setSubmitError("Failed to send message. Please try again.");
      return;
    }
    setSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-lg mx-auto">
          <h1 className="font-display text-4xl text-foreground mb-2">Get in Touch</h1>
          <p className="text-muted-foreground mb-8">Have a question? We'd love to hear from you.</p>

          {submitted ? (
            <div className="p-8 rounded-2xl bg-card card-surface text-center">
              <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="font-display text-xl text-foreground mb-2">Message Sent!</h2>
              <p className="text-muted-foreground text-sm mb-4">We'll get back to you within 24 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-sm text-primary hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {(["name", "email", "subject"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-foreground mb-1.5 capitalize">{field}</label>
                  <input {...register(field)} type={field === "email" ? "email" : "text"} className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder={`Your ${field}`} />
                  {errors[field] && <p className="text-xs text-destructive mt-1">{errors[field]?.message}</p>}
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                <textarea {...register("message")} rows={5} className="w-full px-4 py-2.5 rounded-lg bg-card border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" placeholder="Your message..." />
                {errors.message && <p className="text-xs text-destructive mt-1">{errors.message.message}</p>}
              </div>
              {submitError && <p className="text-sm text-destructive">{submitError}</p>}
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-all active:scale-[0.98] disabled:opacity-50">
                <Send className="h-4 w-4" /> {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
