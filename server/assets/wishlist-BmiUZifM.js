import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { S as Shell, B as Button } from "./Shell-BI-QiD32.js";
import { P as ProductCard } from "./ProductCard-DnBhrtKq.js";
import { u as useWishlist, g as getProductsByIds } from "./router-mRfm6bnQ.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "motion/react";
import "sonner";
import "@tanstack/react-query";
import "axios";
function WishPage() {
  const {
    ids
  } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const load = async () => {
      try {
        if (ids.length === 0) {
          setProducts([]);
          return;
        }
        const data = await getProductsByIds(ids);
        const formatted = data.map((p) => ({
          _id: p._id,
          id: p._id,
          slug: p._id,
          title: p.name,
          category: p.category,
          price: p.price,
          image: p.image.startsWith("http") ? p.image : `https://furnihub-hlkx.onrender.com${p.image}`,
          rating: p.rating || 0
        }));
        setProducts(formatted);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [ids]);
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 pb-24 pt-12 md:px-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl md:text-5xl", children: "Wishlist" }),
    loading ? /* @__PURE__ */ jsx("div", { className: "mt-10", children: "Loading..." }) : products.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "mt-16 rounded-md border border-dashed border-border p-16 text-center", children: [
      /* @__PURE__ */ jsx(Heart, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-6 font-display text-2xl", children: "Your wishlist is empty" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Save pieces you love for later." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/shop", children: "Browse the collection" }) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4", children: products.map((product, index) => /* @__PURE__ */ jsx(ProductCard, { product, index }, product._id)) })
  ] }) });
}
export {
  WishPage as component
};
