import { jsxs, jsx } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";
import { c as cn, B as Button } from "./Shell-BI-QiD32.js";
import { c as useCart, u as useWishlist } from "./router-mRfm6bnQ.js";
import { toast } from "sonner";
function ProductCard({
  product,
  index = 0
}) {
  const { add } = useCart();
  const wish = useWishlist();
  return /* @__PURE__ */ jsxs(
    motion.article,
    {
      initial: { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      className: "group",
      children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            to: "/product/$slug",
            params: { slug: product.slug },
            className: "block",
            children: /* @__PURE__ */ jsxs("div", { className: "relative aspect-[4/5] overflow-hidden rounded-md", children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: product.image,
                  alt: product.title,
                  className: "size-full object-cover"
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: (e) => {
                    e.preventDefault();
                    wish.toggle(product.id);
                  },
                  className: "absolute bottom-3 right-3",
                  children: /* @__PURE__ */ jsx(
                    Heart,
                    {
                      className: cn(
                        "h-4 w-4",
                        wish.has(product.id) && "fill-accent text-accent"
                      )
                    }
                  )
                }
              )
            ] })
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("h3", { children: product.title }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Star, { className: "h-3 w-3" }),
            product.rating
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "font-medium", children: [
            "₹",
            product.price
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          Button,
          {
            className: "mt-3 w-full",
            onClick: () => {
              add(product);
              toast.success("Added to cart");
            },
            children: [
              /* @__PURE__ */ jsx(ShoppingBag, { className: "mr-2 h-3.5 w-3.5" }),
              "Add to Cart"
            ]
          }
        )
      ]
    }
  );
}
export {
  ProductCard as P
};
