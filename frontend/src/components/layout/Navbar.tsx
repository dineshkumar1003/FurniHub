import { Link } from "@tanstack/react-router";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/common/ThemeToggle";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/collections", label: "Collections" },
  { to: "/inspiration", label: "Inspiration" },
  { to: "/about", label: "Journal" },
];

export function Navbar() {
  const { count } = useCart();
  const { ids } = useWishlist();
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-[0_1px_0_0_rgba(0,0,0,0.02)]"
          : "bg-background/40 backdrop-blur-sm"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-8">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px]">
            <SheetHeader>
              <SheetTitle className="font-display text-2xl">FurniHub</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1">
              {nav.map((n) => (
                <Link key={n.to} to={n.to} className="rounded-md px-3 py-3 text-base hover:bg-muted">
                  {n.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <Link to="/" className="font-display text-xl tracking-tight md:text-2xl">
          Furni<span className="text-accent">Hub</span>
        </Link>

        <nav className="ml-8 hidden items-center gap-7 md:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1">
          <Sheet open={searchOpen} onOpenChange={setSearchOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Search">
                <Search className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="h-auto">
              <SheetHeader>
                <SheetTitle className="font-display">Search the collection</SheetTitle>
              </SheetHeader>
              <form
                className="mt-4 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = (e.currentTarget.elements.namedItem("q") as HTMLInputElement).value;
                  window.location.href = `/shop?q=${encodeURIComponent(q)}`;
                }}
              >
                <Input name="q" autoFocus placeholder="Search sofas, beds, dining…" />
                <Button type="submit">Search</Button>
              </form>
            </SheetContent>
          </Sheet>

          <ThemeToggle />

          <Link to="/wishlist" aria-label="Wishlist">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-4 w-4" />
              {ids.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-accent-foreground">
                  {ids.length}
                </span>
              )}
            </Button>
          </Link>

          <Link to="/cart" aria-label="Cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-4 w-4" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                  {count}
                </span>
              )}
            </Button>
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Account">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
            <DropdownMenuLabel>
              Hi, {user.name}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link to="/dashboard">
                Dashboard
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/dashboard">
                Orders
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link to="/wishlist">
                Wishlist
              </Link>
            </DropdownMenuItem>

            {user?.isAdmin && (
              <>
                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                  <Link to="/admin">
                    Admin Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/admin/products">
                    Manage Products
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link to="/admin/orders">
                    Manage Orders
                  </Link>
                </DropdownMenuItem>
              </>
            )}

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={logout}
            >
              Log out
            </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild><Link to="/login">Sign in</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link to="/register">Create account</Link></DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}