import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { S as Shell } from "./Shell-BI-QiD32.js";
import axios from "axios";
import { i as inr } from "./products-BCQ0c9Lm.js";
import "@tanstack/react-router";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "./router-mRfm6bnQ.js";
import "@tanstack/react-query";
import "sonner";
const API = "https://furnihub-hlkx.onrender.com/api/orders";
const getConfig = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};
const getAllOrders = async () => {
  const { data } = await axios.get(
    API,
    getConfig()
  );
  return data;
};
const updateOrderStatus = async (id, orderStatus) => {
  const { data } = await axios.put(
    `${API}/${id}/status`,
    { orderStatus },
    getConfig()
  );
  return data;
};
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadOrders();
  }, []);
  const loadOrders = async () => {
    try {
      const data = await getAllOrders();
      console.log("ORDERS LOADED:", data);
      setOrders(data);
    } catch (error) {
      console.log("LOAD ERROR:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleStatusChange = async (id, orderStatus) => {
    try {
      console.log("STATUS CHANGED:", id, orderStatus);
      const result = await updateOrderStatus(id, orderStatus);
      console.log("UPDATE SUCCESS:", result);
      await loadOrders();
    } catch (error) {
      console.log("UPDATE ERROR:", error?.response?.data || error);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsx("div", { className: "p-10", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12", children: [
    /* @__PURE__ */ jsx("h1", { className: "mb-8 font-display text-4xl", children: "Admin Orders" }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded-md border", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b bg-muted", children: [
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Order ID" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Customer" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Amount" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Status" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Update" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: orders.map((order) => /* @__PURE__ */ jsxs("tr", { className: "border-b", children: [
        /* @__PURE__ */ jsx("td", { className: "p-4", children: order._id }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: order.user?.name }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: inr(order.totalPrice) }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: order.orderStatus }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: /* @__PURE__ */ jsxs("select", { value: order.orderStatus, onChange: (e) => handleStatusChange(order._id, e.target.value), className: "rounded border px-3 py-2", children: [
          /* @__PURE__ */ jsx("option", { value: "Placed", children: "Placed" }),
          /* @__PURE__ */ jsx("option", { value: "Processing", children: "Processing" }),
          /* @__PURE__ */ jsx("option", { value: "Packed", children: "Packed" }),
          /* @__PURE__ */ jsx("option", { value: "Shipped", children: "Shipped" }),
          /* @__PURE__ */ jsx("option", { value: "Out For Delivery", children: "Out For Delivery" }),
          /* @__PURE__ */ jsx("option", { value: "Delivered", children: "Delivered" })
        ] }) })
      ] }, order._id)) })
    ] }) })
  ] }) });
}
export {
  AdminOrders as component
};
