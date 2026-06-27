import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { S as Shell, B as Button } from "./Shell-BI-QiD32.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BK7KLmKm.js";
import { b as useAuth, u as useWishlist } from "./router-mRfm6bnQ.js";
import { p as products, i as inr } from "./products-BCQ0c9Lm.js";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-tabs";
import "@tanstack/react-query";
import "axios";
import "sonner";
function Dash() {
  const {
    user,
    logout
  } = useAuth();
  const nav = useNavigate();
  const {
    ids
  } = useWishlist();
  useEffect(() => {
    if (!user) nav({
      to: "/login"
    });
  }, [user, nav]);
  if (!user) return null;
  const wishProducts = products.filter((p) => ids.includes(p.id));
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 pb-24 pt-12 md:px-8", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.22em] text-accent", children: "Welcome back" }),
        /* @__PURE__ */ jsx("h1", { className: "mt-2 font-display text-4xl", children: user.name }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: user.email })
      ] }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => {
        logout();
        nav({
          to: "/"
        });
      }, children: "Log out" })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "orders", className: "mt-10", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "orders", children: "Orders" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "wishlist", children: "Wishlist" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "addresses", children: "Addresses" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "settings", children: "Settings" })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "orders", className: "mt-8", children: /* @__PURE__ */ jsx("ol", { className: "relative border-l border-border pl-6", children: [{
        id: "FH-2026-104",
        date: "May 28, 2026",
        status: "Delivered",
        total: 89990
      }, {
        id: "FH-2026-082",
        date: "Apr 12, 2026",
        status: "Shipped",
        total: 34990
      }].map((o) => /* @__PURE__ */ jsxs("li", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full bg-accent" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: o.id }),
          /* @__PURE__ */ jsx("span", { children: inr(o.total) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
          o.date,
          " · ",
          o.status
        ] })
      ] }, o.id)) }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "wishlist", className: "mt-8", children: wishProducts.length === 0 ? /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Nothing saved yet. ",
        /* @__PURE__ */ jsx(Link, { to: "/shop", className: "underline", children: "Browse" })
      ] }) : /* @__PURE__ */ jsx("ul", { className: "grid gap-4 md:grid-cols-2", children: wishProducts.map((p) => /* @__PURE__ */ jsxs("li", { className: "flex gap-4 rounded-md border border-border p-4", children: [
        /* @__PURE__ */ jsx("img", { src: p.image, alt: "", className: "h-20 w-20 rounded-sm object-cover bg-[color:var(--surface)]" }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { className: "font-display", children: p.title }),
          /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: inr(p.price) })
        ] })
      ] }, p.id)) }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "addresses", className: "mt-8 text-sm text-muted-foreground", children: /* @__PURE__ */ jsx("p", { children: "No saved addresses yet. Add one at checkout." }) }),
      /* @__PURE__ */ jsx(TabsContent, { value: "settings", className: "mt-8 text-sm text-muted-foreground", children: /* @__PURE__ */ jsx("p", { children: "Account settings will appear here." }) })
    ] })
  ] }) });
}
export {
  Dash as component
};
