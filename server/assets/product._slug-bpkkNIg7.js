import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Star, Minus, Plus, ShoppingBag, Heart, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { S as Shell, c as cn, B as Button, I as Input } from "./Shell-BI-QiD32.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-BK7KLmKm.js";
import { i as inr } from "./products-BCQ0c9Lm.js";
import { R as Route, c as useCart, u as useWishlist } from "./router-mRfm6bnQ.js";
import { P as ProductCard } from "./ProductCard-DnBhrtKq.js";
import { toast } from "sonner";
import axios from "axios";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-tabs";
import "@tanstack/react-query";
const API = "https://furnihub-hlkx.onrender.com/api/products";
const getConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem(
      "token"
    )}`
  }
});
const addReview = async (productId, rating, comment) => {
  const { data } = await axios.post(
    `${API}/${productId}/reviews`,
    {
      rating,
      comment
    },
    getConfig()
  );
  return data;
};
function ProductPage() {
  const {
    product
  } = Route.useLoaderData();
  const {
    add
  } = useCart();
  const wish = useWishlist();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [color, setColor] = useState(product.colors?.[0] || "#000000");
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState(null);
  const disc = Math.round((product.mrp - product.price) / product.mrp * 100);
  const related = [];
  const checkPin = () => {
    if (!/^\d{6}$/.test(pin)) {
      setPinMsg("Enter a valid 6-digit PIN code.");
      return;
    }
    const days = 4 + parseInt(pin.slice(0, 1)) % 5;
    setPinMsg(`Delivers in ${days}–${days + 2} business days · Free white-glove assembly`);
  };
  const submitReview = async () => {
    try {
      await addReview(product._id, rating, comment);
      toast.success("Review Added Successfully");
      window.location.reload();
    } catch (error) {
      toast.error(error?.response?.data?.message || "Review Failed");
    }
  };
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 pt-12 md:px-8 md:pt-16", children: [
    /* @__PURE__ */ jsxs("nav", { className: "mb-8 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-foreground", children: "Home" }),
      " /",
      " ",
      /* @__PURE__ */ jsx(Link, { to: "/shop", className: "hover:text-foreground", children: "Shop" }),
      " / ",
      product.title
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-10 md:grid-cols-2 md:gap-16", children: [
      /* @__PURE__ */ jsxs(motion.div, { initial: {
        opacity: 0
      }, animate: {
        opacity: 1
      }, transition: {
        duration: 0.6
      }, children: [
        /* @__PURE__ */ jsx("div", { className: "group relative overflow-hidden rounded-md bg-[color:var(--surface)]", children: /* @__PURE__ */ jsx("img", { src: product.image, alt: product.title, className: "aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110" }) }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 grid grid-cols-4 gap-3", children: [product.image, product.image, product.image, product.image].map((src, i) => /* @__PURE__ */ jsx("div", { className: "aspect-square overflow-hidden rounded-sm bg-[color:var(--surface)]", children: /* @__PURE__ */ jsx("img", { src, alt: "", loading: "lazy", className: "size-full object-cover" }) }, i)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] uppercase tracking-[0.22em] text-accent", children: product.category }),
        /* @__PURE__ */ jsx("h1", { className: "mt-3 font-display text-3xl md:text-4xl lg:text-5xl text-balance", children: product.title }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: product.subtitle }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 flex items-center gap-3 text-sm", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Star, { className: "h-4 w-4 fill-accent text-accent" }),
            " ",
            product.rating
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-muted-foreground", children: [
            product.reviews,
            " reviews"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-7 flex items-baseline gap-3", children: [
          /* @__PURE__ */ jsx("span", { className: "font-display text-3xl", children: inr(product.price) }),
          product.mrp > product.price && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx("span", { className: "text-base text-muted-foreground line-through", children: inr(product.mrp) }),
            /* @__PURE__ */ jsxs("span", { className: "rounded-sm bg-primary px-2 py-0.5 text-xs text-primary-foreground", children: [
              "−",
              disc,
              "%"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
          "Or 6 months no-cost EMI from ",
          /* @__PURE__ */ jsxs("span", { className: "text-foreground", children: [
            inr(Math.round(product.price / 6)),
            "/mo"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-7 leading-relaxed text-foreground/85", children: product.description }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2 text-xs uppercase tracking-[0.18em] text-foreground/70", children: "Colour" }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-2", children: product.colors.map((c) => /* @__PURE__ */ jsx("button", { "aria-label": c, onClick: () => setColor(c), className: cn("h-8 w-8 rounded-full border-2 transition", color === c ? "border-foreground" : "border-transparent"), style: {
            backgroundColor: c
          } }, c)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap items-center gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center rounded-sm border border-border", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => setQty(Math.max(1, qty - 1)), className: "grid h-11 w-11 place-items-center hover:bg-muted", "aria-label": "Decrease quantity", children: /* @__PURE__ */ jsx(Minus, { className: "h-3.5 w-3.5" }) }),
            /* @__PURE__ */ jsx("span", { className: "w-10 text-center text-sm", children: qty }),
            /* @__PURE__ */ jsx("button", { onClick: () => setQty(qty + 1), className: "grid h-11 w-11 place-items-center hover:bg-muted", "aria-label": "Increase quantity", children: /* @__PURE__ */ jsx(Plus, { className: "h-3.5 w-3.5" }) })
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "lg", className: "rounded-sm", onClick: () => {
            add(product, qty);
            toast.success("Added to cart");
          }, children: [
            /* @__PURE__ */ jsx(ShoppingBag, { className: "mr-2 h-4 w-4" }),
            " Add to cart"
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "default", className: "rounded-sm bg-[color:var(--gold)] text-[color:var(--gold-foreground)] hover:bg-[color:var(--gold)]/90", onClick: () => {
            add(product, qty);
            navigate({
              to: "/checkout"
            });
          }, children: "Buy now" }),
          /* @__PURE__ */ jsx(Button, { size: "lg", variant: "outline", className: "rounded-sm", onClick: () => wish.toggle(product.id), "aria-label": "Wishlist", children: /* @__PURE__ */ jsx(Heart, { className: cn("h-4 w-4", wish.has(product.id) && "fill-accent text-accent") }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-sm border border-border p-5", children: [
          /* @__PURE__ */ jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70", children: "Delivery" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsx(Input, { placeholder: "Enter PIN code", value: pin, onChange: (e) => setPin(e.target.value), maxLength: 6 }),
            /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: checkPin, children: "Check" })
          ] }),
          pinMsg && /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-muted-foreground", children: pinMsg })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-sm border border-border p-3", children: [
            /* @__PURE__ */ jsx(Truck, { className: "mx-auto mb-1 h-4 w-4" }),
            "Free Delivery"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-sm border border-border p-3", children: [
            /* @__PURE__ */ jsx(ShieldCheck, { className: "mx-auto mb-1 h-4 w-4" }),
            "10-Yr Warranty"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-sm border border-border p-3", children: [
            /* @__PURE__ */ jsx(RotateCcw, { className: "mx-auto mb-1 h-4 w-4" }),
            "7-Day Returns"
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "details", className: "mt-20", children: [
      /* @__PURE__ */ jsxs(TabsList, { children: [
        /* @__PURE__ */ jsx(TabsTrigger, { value: "details", children: "Details" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "dimensions", children: "Dimensions" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "care", children: "Care" }),
        /* @__PURE__ */ jsx(TabsTrigger, { value: "reviews", children: "Reviews" })
      ] }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "details", className: "prose-sm mt-6 max-w-2xl text-foreground/80", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Material:" }),
          " ",
          product.material
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2", children: [
          /* @__PURE__ */ jsx("strong", { className: "text-foreground", children: "Craftsmanship:" }),
          " ",
          product.craftsmanship
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "dimensions", className: "mt-6 text-foreground/80", children: product.dimensions }),
      /* @__PURE__ */ jsx(TabsContent, { value: "care", className: "mt-6 text-foreground/80", children: product.care }),
      /* @__PURE__ */ jsxs(TabsContent, { value: "reviews", className: "mt-6 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-md border p-6", children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-semibold", children: "Write a Review" }),
          /* @__PURE__ */ jsxs("select", { value: rating, onChange: (e) => setRating(Number(e.target.value)), className: "mb-4 w-full rounded border p-3", children: [
            /* @__PURE__ */ jsx("option", { value: 1, children: "1 Star" }),
            /* @__PURE__ */ jsx("option", { value: 2, children: "2 Stars" }),
            /* @__PURE__ */ jsx("option", { value: 3, children: "3 Stars" }),
            /* @__PURE__ */ jsx("option", { value: 4, children: "4 Stars" }),
            /* @__PURE__ */ jsx("option", { value: 5, children: "5 Stars" })
          ] }),
          /* @__PURE__ */ jsx("textarea", { rows: 4, value: comment, onChange: (e) => setComment(e.target.value), placeholder: "Write your review...", className: "mb-4 w-full rounded border p-3" }),
          /* @__PURE__ */ jsx(Button, { onClick: submitReview, children: "Submit Review" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-semibold", children: "Customer Reviews" }),
          product.reviewList && product.reviewList.length > 0 ? product.reviewList.map((review) => /* @__PURE__ */ jsxs("div", { className: "mb-4 rounded-md border p-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("strong", { children: review.name }),
              /* @__PURE__ */ jsxs("span", { children: [
                "⭐",
                review.rating
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-muted-foreground", children: review.comment })
          ] }, review._id)) : /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: "No reviews yet." })
        ] })
      ] })
    ] }),
    related.length > 0 && /* @__PURE__ */ jsxs("section", { className: "mt-24", children: [
      /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl", children: "You may also love" }),
      /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4", children: related.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, index: i }, p.id)) })
    ] })
  ] }) });
}
export {
  ProductPage as component
};
