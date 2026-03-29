import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FireflyBanner from "@/components/FireflyBanner";
import BookCard from "@/components/BookCard";
import { useBooks } from "@/hooks/useBooks";
import { categories } from "@/data/books";
import Link from 'next/link';
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Truck, Shield, Loader2 } from "lucide-react";

const Index = () => {
  const { data: books, isLoading } = useBooks();
  const featured = books?.slice(0, 4) ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <FireflyBanner />

      <section className="py-16 border-b border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: "Curated Collection", desc: "Hand-picked volumes from world-class authors" },
              { icon: Truck, title: "Swift Delivery", desc: "Free shipping on orders over $30" },
              { icon: Shield, title: "Quality Guaranteed", desc: "Every book inspected before dispatch" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0"><Icon className="h-5 w-5" /></div>
                <div>
                  <h3 className="font-display text-sm text-foreground mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-foreground mb-2">Featured Volumes</h2>
              <p className="text-muted-foreground">Discover our editors' top picks this season</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center gap-2 text-sm text-primary hover:underline">View all <ArrowRight className="h-4 w-4" /></Link>
          </div>
          {isLoading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-primary animate-spin" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((book, i) => (
                <motion.div key={book.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                  <BookCard book={book} />
                </motion.div>
              ))}
            </div>
          )}
          <Link href="/products" className="mt-8 flex md:hidden items-center gap-2 text-sm text-primary hover:underline justify-center">View all books <ArrowRight className="h-4 w-4" /></Link>
        </div>
      </section>

      <section className="py-20 border-t border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="font-display text-3xl text-foreground mb-10 text-center">Browse by Genre</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Link key={cat} href={`/products?category=${encodeURIComponent(cat)}`} className="px-5 py-2.5 rounded-full border border-border text-sm text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all">{cat}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="relative rounded-2xl bg-card card-surface p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 firefly-glow pointer-events-none" />
            <h2 className="relative font-display text-3xl md:text-4xl text-foreground mb-4">Your collection is <span className="text-gradient-amber">growing</span></h2>
            <p className="relative text-muted-foreground mb-8 max-w-md mx-auto">Join thousands of readers who have found their next favorite book through Firefly.</p>
            <Link href="/register" className="relative inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-display text-sm hover:bg-primary/90 transition-colors">Create your account <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
