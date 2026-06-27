import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { a as getProducts } from "./router-mRfm6bnQ.js";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Award, Leaf, Truck, ShieldCheck } from "lucide-react";
import { S as Shell, B as Button } from "./Shell-BI-QiD32.js";
import { S as SectionHeader, i as inspo3 } from "./inspo-3-nNevvMiJ.js";
import { P as ProductCard } from "./ProductCard-DnBhrtKq.js";
import { p as products, c as categories } from "./products-BCQ0c9Lm.js";
import { i as inspo1 } from "./inspo-1-BvBXzaVU.js";
import { i as inspo2 } from "./inspo-2-BT0-FJ_c.js";
import "@tanstack/react-query";
import "axios";
import "sonner";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
const hero = "/assets/hero-xLIy6zIK.jpg";
function Index() {
  const newArrivals = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const [mongoProducts, setMongoProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setMongoProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  return /* @__PURE__ */ jsxs(Shell, { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative -mt-16 h-[100svh] min-h-[640px] w-full overflow-hidden", children: [
      /* @__PURE__ */ jsx("img", { src: hero, alt: "", className: "absolute inset-0 size-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/55" }),
      /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-20 pt-32 text-white md:px-8 md:pb-28", children: [
        /* @__PURE__ */ jsx(motion.p, { initial: {
          opacity: 0,
          y: 10
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.8
        }, className: "text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80", children: "The 2026 Collection" }),
        /* @__PURE__ */ jsxs(motion.h1, { initial: {
          opacity: 0,
          y: 30
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 1,
          delay: 0.1,
          ease: [0.22, 1, 0.36, 1]
        }, className: "mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-balance md:text-6xl lg:text-7xl", children: [
          "Transform your home into ",
          /* @__PURE__ */ jsx("em", { className: "not-italic text-[color:var(--gold)]", children: "timeless luxury" }),
          "."
        ] }),
        /* @__PURE__ */ jsx(motion.p, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.8,
          delay: 0.25
        }, className: "mt-6 max-w-xl text-white/85", children: "Handcrafted pieces, considered materials, quiet luxury. Built to last a lifetime — shipped to your doorstep across India." }),
        /* @__PURE__ */ jsxs(motion.div, { initial: {
          opacity: 0,
          y: 20
        }, animate: {
          opacity: 1,
          y: 0
        }, transition: {
          duration: 0.8,
          delay: 0.4
        }, className: "mt-10 flex flex-wrap items-center gap-3", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "rounded-sm bg-[color:var(--gold)] text-[color:var(--gold-foreground)] hover:bg-[color:var(--gold)]/90", children: /* @__PURE__ */ jsxs(Link, { to: "/shop", children: [
            "Shop the collection ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })
          ] }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "rounded-sm border-white/40 bg-transparent text-white hover:bg-white hover:text-foreground", children: /* @__PURE__ */ jsx(Link, { to: "/inspiration", children: "Explore designs" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32", children: [
      /* @__PURE__ */ jsx(SectionHeader, { eyebrow: "Shop by Category", title: "Furniture for every room", description: "A curated collection across every room in your home.", action: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "link", children: /* @__PURE__ */ jsxs(Link, { to: "/shop", children: [
        "View all ",
        /* @__PURE__ */ jsx(ArrowRight, { className: "ml-1 h-4 w-4" })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6", children: categories.map((c, i) => /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 24
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.6,
        delay: i * 0.05
      }, children: /* @__PURE__ */ jsx(Link, { to: "/shop", search: {
        category: c.id
      }, className: "group block", children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[5/6] overflow-hidden rounded-md bg-[color:var(--surface)]", children: [
        /* @__PURE__ */ jsx("img", { src: c.image, alt: c.label, loading: "lazy", className: "size-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" }),
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-white", style: {
          background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)"
        }, children: [
          /* @__PURE__ */ jsx("span", { className: "font-display text-xl md:text-2xl", children: c.label }),
          /* @__PURE__ */ jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover:translate-x-1" })
        ] })
      ] }) }) }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-24 md:px-8 md:pb-32", children: [
      /* @__PURE__ */ jsx(SectionHeader, { eyebrow: "Just In", title: "New arrivals", description: "The latest from our ateliers, photographed in natural light.", action: /* @__PURE__ */ jsx(Button, { asChild: true, variant: "link", children: /* @__PURE__ */ jsx(Link, { to: "/shop", children: "See all" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4", children: newArrivals.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, index: i }, p.id)) })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "relative my-24 overflow-hidden bg-primary text-primary-foreground", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 px-4 py-24 md:grid-cols-2 md:items-center md:px-8 md:py-32", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--gold)]", children: "Premium Collection" }),
        /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-4xl text-balance md:text-5xl", children: "The Heritage Series" }),
        /* @__PURE__ */ jsx("p", { className: "mt-5 max-w-md text-primary-foreground/80", children: "A tribute to enduring craft. Each piece is shaped by hand, signed by its maker and built to be passed down for generations." }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-8 bg-[color:var(--gold)] text-[color:var(--gold-foreground)] hover:bg-[color:var(--gold)]/90", size: "lg", children: /* @__PURE__ */ jsx(Link, { to: "/collections", children: "Discover the series" }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative aspect-[4/5] overflow-hidden rounded-sm", children: /* @__PURE__ */ jsx("img", { src: inspo2, alt: "", loading: "lazy", className: "size-full object-cover" }) })
    ] }) }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-24 md:px-8", children: [
      /* @__PURE__ */ jsx(SectionHeader, { eyebrow: "Loved by many", title: "Best sellers" }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4", children: bestSellers.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, index: i }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-24 md:px-8", children: [
      /* @__PURE__ */ jsx(SectionHeader, { align: "center", eyebrow: "Interior Inspiration", title: "Homes that wear their pieces well", description: "Real interiors, styled with FurniHub. A quiet kind of luxury that lasts." }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 grid gap-4 md:grid-cols-3 md:gap-6", children: [inspo1, inspo2, inspo3].map((src, i) => /* @__PURE__ */ jsx(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.7,
        delay: i * 0.1
      }, className: "relative aspect-[3/4] overflow-hidden rounded-md", children: /* @__PURE__ */ jsx("img", { src, alt: "", loading: "lazy", className: "size-full object-cover transition-transform duration-[1400ms] hover:scale-105" }) }, i)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-24 md:px-8", children: [
      /* @__PURE__ */ jsx(SectionHeader, { align: "center", eyebrow: "Why FurniHub", title: "Crafted with intention" }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 grid gap-10 md:grid-cols-4", children: [{
        Icon: Award,
        title: "Heirloom-grade craft",
        body: "Hand-built by masters across India."
      }, {
        Icon: Leaf,
        title: "Considered materials",
        body: "Responsibly-sourced wood, natural fabrics."
      }, {
        Icon: Truck,
        title: "White-glove delivery",
        body: "Free assembly across 800+ Indian cities."
      }, {
        Icon: ShieldCheck,
        title: "10-year warranty",
        body: "Built to be passed down, guaranteed."
      }].map(({
        Icon,
        title,
        body
      }) => /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "mx-auto grid h-14 w-14 place-items-center rounded-full border border-border bg-[color:var(--surface)] text-accent", children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx("h4", { className: "mt-5 font-display text-lg", children: title }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: body })
      ] }, title)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 py-24 md:px-8", children: [
      /* @__PURE__ */ jsx(SectionHeader, { align: "center", eyebrow: "Kind Words", title: "What our clients say" }),
      /* @__PURE__ */ jsx("div", { className: "mt-14 grid gap-6 md:grid-cols-3", children: [{
        q: "The sofa is a piece of art. Our living room finally feels finished.",
        n: "Ananya R.",
        c: "Mumbai"
      }, {
        q: "Heirloom quality, considered service. Worth every rupee.",
        n: "Karan S.",
        c: "Bengaluru"
      }, {
        q: "A rare brand that delivers on its promise of luxury.",
        n: "Priya M.",
        c: "New Delhi"
      }].map((t) => /* @__PURE__ */ jsxs("figure", { className: "rounded-md border border-border/60 bg-[color:var(--surface)] p-8", children: [
        /* @__PURE__ */ jsxs("blockquote", { className: "font-display text-lg leading-snug text-balance", children: [
          "“",
          t.q,
          "”"
        ] }),
        /* @__PURE__ */ jsxs("figcaption", { className: "mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground", children: [
          t.n,
          " · ",
          t.c
        ] })
      ] }, t.n)) })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto mt-12 max-w-4xl px-4 py-24 text-center md:px-8", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[11px] font-semibold uppercase tracking-[0.22em] text-accent", children: "The Atelier Letter" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-4 font-display text-3xl md:text-5xl text-balance", children: "Quiet stories from the workshop, in your inbox." }),
      /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
      }, className: "mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row", children: [
        /* @__PURE__ */ jsx("input", { type: "email", required: true, placeholder: "you@home.com", className: "h-12 flex-1 rounded-sm border border-border bg-background px-4 text-sm outline-none focus:border-primary" }),
        /* @__PURE__ */ jsx(Button, { type: "submit", size: "lg", className: "rounded-sm", children: "Subscribe" })
      ] })
    ] })
  ] });
}
export {
  Index as component
};
