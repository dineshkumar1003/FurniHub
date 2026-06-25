import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { products, inr } from "@/lib/data/products";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — FurniHub" }] }),
  component: Dash,
});

function Dash() {
  const { user, logout } = useAuth();
  const nav = useNavigate();
  const { ids } = useWishlist();
  useEffect(() => { if (!user) nav({ to: "/login" }); }, [user, nav]);
  if (!user) return null;
  const wishProducts = products.filter((p) => ids.includes(p.id));
  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-12 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent">Welcome back</p>
            <h1 className="mt-2 font-display text-4xl">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <Button variant="outline" onClick={() => { logout(); nav({ to: "/" }); }}>Log out</Button>
        </div>
        <Tabs defaultValue="orders" className="mt-10">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className="mt-8">
            <ol className="relative border-l border-border pl-6">
              {[
                { id: "FH-2026-104", date: "May 28, 2026", status: "Delivered", total: 89990 },
                { id: "FH-2026-082", date: "Apr 12, 2026", status: "Shipped", total: 34990 },
              ].map((o) => (
                <li key={o.id} className="mb-8">
                  <span className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-accent" />
                  <div className="flex justify-between text-sm"><span className="font-medium">{o.id}</span><span>{inr(o.total)}</span></div>
                  <div className="text-xs text-muted-foreground">{o.date} · {o.status}</div>
                </li>
              ))}
            </ol>
          </TabsContent>
          <TabsContent value="wishlist" className="mt-8">
            {wishProducts.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing saved yet. <Link to="/shop" className="underline">Browse</Link></p>
            ) : (
              <ul className="grid gap-4 md:grid-cols-2">
                {wishProducts.map((p) => (
                  <li key={p.id} className="flex gap-4 rounded-md border border-border p-4">
                    <img src={p.image} alt="" className="h-20 w-20 rounded-sm object-cover bg-[color:var(--surface)]" />
                    <div><div className="font-display">{p.title}</div><div className="text-sm text-muted-foreground">{inr(p.price)}</div></div>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
          <TabsContent value="addresses" className="mt-8 text-sm text-muted-foreground">
            <p>No saved addresses yet. Add one at checkout.</p>
          </TabsContent>
          <TabsContent value="settings" className="mt-8 text-sm text-muted-foreground">
            <p>Account settings will appear here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </Shell>
  );
}