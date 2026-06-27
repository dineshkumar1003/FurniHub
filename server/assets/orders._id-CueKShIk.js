import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { S as Shell } from "./Shell-BI-QiD32.js";
import { g as getOrderById } from "./orderService-DtqiCQHL.js";
import { i as inr } from "./products-BCQ0c9Lm.js";
import { d as Route } from "./router-mRfm6bnQ.js";
import "@tanstack/react-router";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "axios";
import "@tanstack/react-query";
import "sonner";
function OrderPage() {
  const {
    id
  } = Route.useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadOrder();
  }, []);
  const loadOrder = async () => {
    try {
      const data = await getOrderById(id);
      setOrder(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsx("div", { className: "p-10", children: "Loading..." }) });
  }
  if (!order) {
    return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsx("div", { className: "p-10", children: "Order not found" }) });
  }
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-6xl px-4 py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl", children: "Order Details" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-8 rounded-md border p-6", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("strong", { children: "Order ID:" }),
        " ",
        order._id
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
        /* @__PURE__ */ jsx("strong", { children: "Status:" }),
        " ",
        /* @__PURE__ */ jsx("span", { className: `inline-block rounded px-3 py-1 text-sm font-medium
              ${order.orderStatus === "Placed" ? "bg-yellow-100 text-yellow-700" : order.orderStatus === "Shipped" ? "bg-blue-100 text-blue-700" : order.orderStatus === "Delivered" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`, children: order.orderStatus })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "mt-4", children: [
        /* @__PURE__ */ jsx("strong", { children: "Date:" }),
        " ",
        new Date(order.createdAt).toLocaleDateString()
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-4 text-2xl font-medium", children: "Products" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", children: order.orderItems.map((item) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 rounded-md border p-4", children: [
        /* @__PURE__ */ jsx("img", { src: `https://furnihub-hlkx.onrender.com${item.image}`, alt: item.name, className: "h-24 w-24 rounded object-cover" }),
        /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-medium", children: item.name }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Qty: ",
            item.qty
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { children: inr(item.price) })
      ] }, item._id)) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-6 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "rounded-md border p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-medium", children: "Shipping Address" }),
        /* @__PURE__ */ jsx("p", { children: order.shippingAddress.address }),
        /* @__PURE__ */ jsx("p", { children: order.shippingAddress.city }),
        /* @__PURE__ */ jsx("p", { children: order.shippingAddress.postalCode }),
        /* @__PURE__ */ jsx("p", { children: order.shippingAddress.country })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "rounded-md border p-6", children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-4 text-xl font-medium", children: "Payment" }),
        /* @__PURE__ */ jsxs("p", { children: [
          "Method:",
          " ",
          order.paymentMethod
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2", children: [
          "Total:",
          " ",
          inr(order.totalPrice)
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2", children: [
          "Paid:",
          " ",
          order.isPaid ? "Yes" : "No"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 rounded-md border p-6", children: [
      /* @__PURE__ */ jsx("h2", { className: "mb-6 text-2xl font-medium", children: "Order Tracking" }),
      /* @__PURE__ */ jsx("ol", { className: "relative border-l pl-6", children: order.trackingHistory?.map((item, index) => /* @__PURE__ */ jsxs("li", { className: "mb-8", children: [
        /* @__PURE__ */ jsx("span", { className: "absolute -left-1.5 h-3 w-3 rounded-full bg-green-600" }),
        /* @__PURE__ */ jsx("div", { className: "font-medium", children: item.status }),
        /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground", children: new Date(item.updatedAt).toLocaleString() })
      ] }, index)) })
    ] })
  ] }) });
}
export {
  OrderPage as component
};
