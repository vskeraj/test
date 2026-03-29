import Link from 'next/link';
import { useRouter } from 'next/router';
import { ShoppingCart, Heart, Search, Menu, X, Flame, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
  { to: "/faq", label: "FAQ" },
];

const Header = () => {
  const { cartCount, favorites } = useCart();
  const { user, signOut, isAdmin } = useAuth();
  const router = useRouter();
  const location = { pathname: router.pathname };
  const navigate = router.push;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <Flame className="h-6 w-6 text-primary transition-all group-hover:drop-shadow-[0_0_8px_hsl(45,93%,47%,0.5)]" />
          <span className="font-display text-xl text-foreground">Firefly</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              href={link.to}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                location.pathname === link.to
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {isAdmin && (
            <Link href="/admin" className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === "/admin" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/search" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <Search className="h-5 w-5" />
          </Link>
          {user && (
            <Link href="/favorites" className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          )}
          <Link href="/cart" className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-1">
              <Link href="/dashboard" className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <User className="h-5 w-5" />
              </Link>
              <button onClick={handleSignOut} className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden md:inline-flex px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
              Sign In
            </Link>
          )}

          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 rounded-md text-muted-foreground hover:text-foreground md:hidden">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-border/50 md:hidden">
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link key={link.to} href={link.to} onClick={() => setMobileOpen(false)} className={`px-4 py-3 rounded-md text-sm font-medium transition-colors ${location.pathname === link.to ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}>
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted">Dashboard</Link>
                  {isAdmin && <Link href="/admin" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted">Admin</Link>}
                  <button onClick={() => { handleSignOut(); setMobileOpen(false); }} className="px-4 py-3 rounded-md text-sm font-medium text-left text-muted-foreground hover:text-foreground hover:bg-muted">Sign Out</button>
                </>
              ) : (
                <Link href="/login" onClick={() => setMobileOpen(false)} className="px-4 py-3 rounded-md text-sm font-medium text-primary">Sign In</Link>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
