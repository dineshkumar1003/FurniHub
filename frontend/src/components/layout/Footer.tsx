import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border/60 bg-[color:var(--surface)]">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-4 md:px-8">
        <div>
          <div className="font-display text-2xl">
            Furni<span className="text-accent">Hub</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            Premium designer furniture, handcrafted across India for the modern home.
          </p>
          <div className="mt-6 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a href="#" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Youtube"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">Shop</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/shop">All Furniture</Link></li>
            <li><Link to="/shop">New Arrivals</Link></li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/inspiration">Inspiration</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">Support</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Delivery & Assembly</li>
            <li>10-Year Warranty</li>
            <li>Care Guides</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">Visit</h4>
          <p className="text-sm text-muted-foreground">
            Design Atelier, Indiranagar<br />
            Attur 636107, India<br /><br />
            Mon–Sun · 11:00–20:00
          </p>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} FurniHub. Crafted with care.
      </div>
    </footer>
  );
}