import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { S as Shell, B as Button } from "./Shell-BI-QiD32.js";
import { c as useCart } from "./router-mRfm6bnQ.js";
import { i as inr } from "./products-BCQ0c9Lm.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "@tanstack/react-query";
import "axios";
import "sonner";
function CartPage() {
  const c = useCart();
  const nav = useNavigate();
  console.log("CART ITEMS =", c.items);
  if (!c.items || c.items.length === 0) {
    return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-xl px-4 py-32 text-center", children: [
      /* @__PURE__ */ jsx(ShoppingBag, { className: "mx-auto h-10 w-10 text-muted-foreground" }),
      /* @__PURE__ */ jsx("h1", { className: "mt-6 font-display text-3xl", children: "Your cart is empty" }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Begin with a piece that speaks to you." }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-8", children: /* @__PURE__ */ jsx(Link, { to: "/shop", children: "Shop the collection" }) })
    ] }) });
  }
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 pb-24 pt-12 md:px-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl md:text-5xl", children: "Your Cart" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-12 lg:grid-cols-[1fr_380px]", children: [
      /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border", children: c.items.map((item) => /* @__PURE__ */ jsxs("li", { className: "flex gap-5 py-6", children: [
        /* @__PURE__ */ jsx("img", { src: item.image?.startsWith("http") ? item.image : `https://furnihub-hlkx.onrender.com${item.image}`, alt: item.name, className: "aspect-square w-28 rounded-sm object-cover md:w-36" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "font-display text-lg", children: item.name }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Qty: ",
                item.qty
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "font-medium", children: inr(item.price * item.qty) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center rounded-sm border", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => c.setQty(item.product, Math.max(1, item.qty - 1)), className: "grid h-9 w-9 place-items-center", children: /* @__PURE__ */ jsx(Minus, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsx("span", { className: "w-8 text-center", children: item.qty }),
              /* @__PURE__ */ jsx("button", { onClick: () => c.setQty(item.product, item.qty + 1), className: "grid h-9 w-9 place-items-center", children: /* @__PURE__ */ jsx(Plus, { className: "h-3 w-3" }) })
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: () => c.remove(item.product), className: "inline-flex items-center gap-1 text-xs text-red-500", children: [
              /* @__PURE__ */ jsx(Trash2, { className: "h-3 w-3" }),
              "Remove"
            ] })
          ] })
        ] })
      ] }, item._id)) }),
      /* @__PURE__ */ jsxs("aside", { className: "h-fit rounded-md border p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-xl", children: "Order Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-2", children: [
          /* @__PURE__ */ jsx(Row, { label: "Subtotal", value: inr(c.subtotal) }),
          /* @__PURE__ */ jsx(Row, { label: "GST", value: inr(c.gst) }),
          /* @__PURE__ */ jsx(Row, { label: "Shipping", value: inr(c.shipping) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "my-4 h-px bg-border" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-medium", children: [
          /* @__PURE__ */ jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsx("span", { children: inr(c.total) })
        ] }),
        /* @__PURE__ */ jsx(Button, { className: "mt-6 w-full", onClick: () => nav({
          to: "/checkout"
        }), children: "Proceed to Checkout" })
      ] })
    ] })
  ] }) });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx("span", { children: value })
  ] });
}
export {
  CartPage as component
};
