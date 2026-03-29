import Link from 'next/link';
import { Flame } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/50">
    <div className="container mx-auto px-4 py-12 lg:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-4">
            <Flame className="h-5 w-5 text-primary" />
            <span className="font-display text-lg text-foreground">Firefly</span>
          </Link>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Read by the light of the Firefly. Your sanctuary for curated literature.
          </p>
        </div>
        <div>
          <h4 className="font-display text-sm text-foreground mb-3">Explore</h4>
          <div className="flex flex-col gap-2">
            {[["Products", "/products"], ["Search", "/search"], ["FAQ", "/faq"]].map(([label, to]) => (
              <Link key={to} href={to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm text-foreground mb-3">Company</h4>
          <div className="flex flex-col gap-2">
            {[["About", "/about"], ["Contact", "/contact"], ["Terms", "/terms"]].map(([label, to]) => (
              <Link key={to} href={to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{label}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display text-sm text-foreground mb-3">Account</h4>
          <div className="flex flex-col gap-2">
            {[["Login", "/login"], ["Register", "/register"], ["Cart", "/cart"]].map(([label, to]) => (
              <Link key={to} href={to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{label}</Link>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 Firefly Bookstore. All rights reserved.</p>
        <p className="text-xs text-muted-foreground tabular-nums">4,829 volumes curated</p>
      </div>
    </div>
  </footer>
);

export default Footer;
