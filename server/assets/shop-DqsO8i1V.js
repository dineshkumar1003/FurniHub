import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import { ChevronDown, Check, ChevronUp, Filter, Star } from "lucide-react";
import { c as cn, S as Shell, I as Input, a as Sheet, b as SheetTrigger, B as Button, d as SheetContent, e as SheetHeader, f as SheetTitle } from "./Shell-BI-QiD32.js";
import { P as ProductCard } from "./ProductCard-DnBhrtKq.js";
import { C as Checkbox } from "./checkbox-tCCCTH2f.js";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as SelectPrimitive from "@radix-ui/react-select";
import { a as getProducts } from "./router-mRfm6bnQ.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "motion/react";
import "sonner";
import "@radix-ui/react-checkbox";
import "@tanstack/react-query";
import "axios";
const Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(
  SliderPrimitive.Root,
  {
    ref,
    className: cn("relative flex w-full touch-none select-none items-center", className),
    ...props,
    children: [
      /* @__PURE__ */ jsx(SliderPrimitive.Track, { className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20", children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" }) }),
      /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })
    ]
  }
));
Slider.displayName = SliderPrimitive.Root.displayName;
const Select = SelectPrimitive.Root;
const SelectValue = SelectPrimitive.Value;
const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Trigger,
  {
    ref,
    className: cn(
      "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsx(SelectPrimitive.Icon, { asChild: true, children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4 opacity-50" }) })
    ]
  }
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
const SelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollUpButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronUp, { className: "h-4 w-4" })
  }
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;
const SelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.ScrollDownButton,
  {
    ref,
    className: cn("flex cursor-default items-center justify-center py-1", className),
    ...props,
    children: /* @__PURE__ */ jsx(ChevronDown, { className: "h-4 w-4" })
  }
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;
const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ jsx(SelectPrimitive.Portal, { children: /* @__PURE__ */ jsxs(
  SelectPrimitive.Content,
  {
    ref,
    className: cn(
      "relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)",
      position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    ),
    position,
    ...props,
    children: [
      /* @__PURE__ */ jsx(SelectScrollUpButton, {}),
      /* @__PURE__ */ jsx(
        SelectPrimitive.Viewport,
        {
          className: cn(
            "p-1",
            position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          ),
          children
        }
      ),
      /* @__PURE__ */ jsx(SelectScrollDownButton, {})
    ]
  }
) }));
SelectContent.displayName = SelectPrimitive.Content.displayName;
const SelectLabel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Label,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", className),
    ...props
  }
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;
const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(
  SelectPrimitive.Item,
  {
    ref,
    className: cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsx("span", { className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsx(SelectPrimitive.ItemIndicator, { children: /* @__PURE__ */ jsx(Check, { className: "h-4 w-4" }) }) }),
      /* @__PURE__ */ jsx(SelectPrimitive.ItemText, { children })
    ]
  }
));
SelectItem.displayName = SelectPrimitive.Item.displayName;
const SelectSeparator = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  SelectPrimitive.Separator,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;
const categories = [{
  id: "Sofa",
  label: "Sofa"
}, {
  id: "Bed",
  label: "Bed"
}, {
  id: "Chair",
  label: "Chair"
}, {
  id: "Table",
  label: "Table"
}, {
  id: "Wardrobe",
  label: "Wardrobe"
}];
function Filters({
  cats,
  setCats,
  price,
  setPrice,
  rating,
  setRating,
  inStockOnly,
  setInStockOnly
}) {
  return /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70", children: "Category" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: categories.map((c) => /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(Checkbox, { checked: cats.includes(c.id), onCheckedChange: (v) => setCats(v ? [...cats, c.id] : cats.filter((x) => x !== c.id)) }),
        c.label
      ] }, c.id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70", children: "Price" }),
      /* @__PURE__ */ jsx(Slider, { min: 0, max: 2e5, step: 5e3, value: price, onValueChange: (v) => setPrice(v) }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs text-muted-foreground", children: [
        "₹",
        price[0].toLocaleString("en-IN"),
        " – ₹",
        price[1].toLocaleString("en-IN")
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("h3", { className: "mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70", children: "Rating" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2", children: [4.5, 4, 3.5].map((r) => /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(Checkbox, { checked: rating === r, onCheckedChange: (v) => setRating(v ? r : 0) }),
        /* @__PURE__ */ jsx(Star, { className: "h-3 w-3 fill-accent text-accent" }),
        " ",
        r,
        "+"
      ] }, r)) })
    ] }),
    /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-2 text-sm", children: [
      /* @__PURE__ */ jsx(Checkbox, { checked: inStockOnly, onCheckedChange: (v) => setInStockOnly(Boolean(v)) }),
      "In stock only"
    ] })
  ] });
}
function ShopPage() {
  const [q, setQ] = useState("");
  const [cats, setCats] = useState([]);
  const [price, setPrice] = useState([0, 2e5]);
  const [rating, setRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState("popular");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        const formatted = data.map((p) => ({
          id: p._id,
          slug: p._id,
          title: p.name,
          subtitle: p.description,
          category: p.category,
          price: p.price,
          mrp: p.price,
          rating: p.rating || 0,
          reviews: p.numReviews || 0,
          image: p.image.startsWith("http") ? p.image : `https://furnihub-hlkx.onrender.com${p.image}`,
          colors: [],
          material: "",
          craftsmanship: "",
          dimensions: "",
          care: "",
          description: p.description,
          inStock: p.countInStock > 0
        }));
        setProducts(formatted);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);
  const list = useMemo(() => {
    let l = [...products];
    if (q) l = l.filter((p) => (p.title + " " + p.subtitle + " " + p.category).toLowerCase().includes(q.toLowerCase()));
    if (cats.length) l = l.filter((p) => cats.includes(p.category));
    l = l.filter((p) => p.price >= price[0] && p.price <= price[1]);
    if (rating) l = l.filter((p) => p.rating >= rating);
    if (inStockOnly) l = l.filter((p) => p.inStock);
    if (sort === "low") l.sort((a, b) => a.price - b.price);
    else if (sort === "high") l.sort((a, b) => b.price - a.price);
    else if (sort === "new") l.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    else l.sort((a, b) => b.reviews - a.reviews);
    return l;
  }, [products, q, cats, price, rating, inStockOnly, sort]);
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 pb-24 pt-12 md:px-8 md:pt-16", children: [
    /* @__PURE__ */ jsxs("nav", { className: "mb-6 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-foreground", children: "Home" }),
      " / Shop"
    ] }),
    /* @__PURE__ */ jsxs("header", { className: "flex flex-wrap items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl md:text-5xl", children: "The Collection" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-muted-foreground", children: [
          list.length,
          " pieces"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-1 items-center justify-end gap-3 md:max-w-md", children: [
        /* @__PURE__ */ jsx(Input, { placeholder: "Search…", value: q, onChange: (e) => setQ(e.target.value) }),
        /* @__PURE__ */ jsxs(Select, { value: sort, onValueChange: (v) => setSort(v), children: [
          /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[180px]", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
          /* @__PURE__ */ jsxs(SelectContent, { children: [
            /* @__PURE__ */ jsx(SelectItem, { value: "popular", children: "Popularity" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "new", children: "Newest" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "low", children: "Price: Low to High" }),
            /* @__PURE__ */ jsx(SelectItem, { value: "high", children: "Price: High to Low" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(Sheet, { children: [
          /* @__PURE__ */ jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", size: "icon", className: "md:hidden", "aria-label": "Filters", children: /* @__PURE__ */ jsx(Filter, { className: "h-4 w-4" }) }) }),
          /* @__PURE__ */ jsxs(SheetContent, { children: [
            /* @__PURE__ */ jsx(SheetHeader, { children: /* @__PURE__ */ jsx(SheetTitle, { children: "Filters" }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(Filters, { cats, setCats, price, setPrice, rating, setRating, inStockOnly, setInStockOnly }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-10 md:grid-cols-[240px_1fr]", children: [
      /* @__PURE__ */ jsx("aside", { className: "hidden md:block", children: /* @__PURE__ */ jsx(Filters, { cats, setCats, price, setPrice, rating, setRating, inStockOnly, setInStockOnly }) }),
      /* @__PURE__ */ jsx("div", { children: list.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-dashed border-border p-16 text-center", children: [
        /* @__PURE__ */ jsx("h3", { className: "font-display text-2xl", children: "Nothing matches your filters" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Try clearing a filter or two." })
      ] }) : /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3", children: list.map((p, i) => /* @__PURE__ */ jsx(ProductCard, { product: p, index: i }, p.id)) }) })
    ] })
  ] }) });
}
export {
  ShopPage as component
};
