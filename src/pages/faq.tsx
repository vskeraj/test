import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  { q: "How do I place an order?", a: "Browse our collection, add books to your cart, and proceed to checkout. You'll need to create an account to complete your purchase." },
  { q: "What payment methods do you accept?", a: "We accept all major credit cards, PayPal, and Apple Pay. All transactions are secured with SSL encryption." },
  { q: "How long does shipping take?", a: "Standard shipping takes 5-7 business days. Express shipping (2-3 days) is available for an additional fee. Free shipping on orders over $30." },
  { q: "Can I return a book?", a: "Yes! We offer a 30-day return policy. Books must be in their original condition. Contact us to initiate a return." },
  { q: "Do you ship internationally?", a: "Yes, we ship to over 40 countries. International shipping times vary by location, typically 10-21 business days." },
  { q: "How do I track my order?", a: "Once your order ships, you'll receive an email with a tracking number. You can also check your order status in your dashboard." },
  { q: "Do you offer gift wrapping?", a: "Yes! During checkout, you can select our premium gift wrapping option for a small additional fee." },
  { q: "How do I contact customer support?", a: "You can reach us through our Contact page, by email at support@firefly.com, or by calling us during business hours." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-display text-4xl text-foreground mb-2">Frequently Asked Questions</h1>
          <p className="text-muted-foreground mb-10">Everything you need to know about Firefly.</p>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-xl bg-card card-surface overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-medium text-foreground pr-4">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FAQ;
