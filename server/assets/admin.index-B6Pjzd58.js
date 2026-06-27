import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { S as Shell } from "./Shell-BI-QiD32.js";
import { useEffect, useState } from "react";
import axios from "axios";
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
const API = "https://furnihub-hlkx.onrender.com/api/admin/dashboard";
const getDashboardStats = async () => {
  const { data } = await axios.get(
    `${API}/stats`
  );
  return data;
};
function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user") || localStorage.getItem("fh-user") || "null");
  useEffect(() => {
    if (!user || !user.isAdmin) {
      window.location.href = "/login";
    }
  }, []);
  const [stats, setStats] = useState(null);
  useEffect(() => {
    if (user?.isAdmin) {
      loadStats();
    }
  }, []);
  const loadStats = async () => {
    try {
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.log(error);
    }
  };
  if (!user || !user.isAdmin) {
    return null;
  }
  if (!stats) {
    return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsx("div", { className: "p-10", children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-6 py-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-5xl font-bold mb-10", children: "Admin Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-4 gap-6 mb-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { children: "Total Products" }),
        /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold mt-3", children: stats.totalProducts })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { children: "Total Orders" }),
        /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold mt-3", children: stats.totalOrders })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { children: "Total Users" }),
        /* @__PURE__ */ jsx("p", { className: "text-4xl font-bold mt-3", children: stats.totalUsers })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-6 shadow-sm", children: [
        /* @__PURE__ */ jsx("h3", { children: "Revenue" }),
        /* @__PURE__ */ jsxs("p", { className: "text-4xl font-bold mt-3", children: [
          "₹",
          stats.revenue.toLocaleString()
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ jsxs(Link, { to: "/admin/products", className: "border rounded-lg p-8 text-center hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Products" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-500", children: "Manage Products" })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/admin/orders", className: "border rounded-lg p-8 text-center hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Orders" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-500", children: "Manage Orders" })
      ] }),
      /* @__PURE__ */ jsxs(Link, { to: "/admin/users", className: "border rounded-lg p-8 text-center hover:bg-gray-50", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-semibold", children: "Users" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-gray-500", children: "Manage Users" })
      ] })
    ] })
  ] }) });
}
export {
  AdminDashboard as component
};
