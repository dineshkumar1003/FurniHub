import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { S as Shell } from "./Shell-BI-QiD32.js";
import { g as getAllProducts, c as createProduct, d as deleteProduct } from "./adminProductService-29Fh11kX.js";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "./router-mRfm6bnQ.js";
import "@tanstack/react-query";
import "axios";
import "sonner";
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    loadProducts();
  }, []);
  const loadProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCreate = async () => {
    try {
      await createProduct();
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete Product?")) return;
    try {
      await deleteProduct(id);
      loadProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl p-10", children: [
    /* @__PURE__ */ jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl", children: "Admin Products" }),
      /* @__PURE__ */ jsx("button", { onClick: handleCreate, className: "rounded bg-black px-4 py-2 text-white", children: "Create Product" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "overflow-x-auto rounded border", children: /* @__PURE__ */ jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b bg-muted", children: [
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "ID" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Name" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Price" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Stock" }),
        /* @__PURE__ */ jsx("th", { className: "p-4 text-left", children: "Actions" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: products.map((product) => /* @__PURE__ */ jsxs("tr", { className: "border-b", children: [
        /* @__PURE__ */ jsx("td", { className: "p-4", children: product._id }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: product.name }),
        /* @__PURE__ */ jsxs("td", { className: "p-4", children: [
          "₹",
          product.price
        ] }),
        /* @__PURE__ */ jsx("td", { className: "p-4", children: product.countInStock }),
        /* @__PURE__ */ jsxs("td", { className: "space-x-2 p-4", children: [
          /* @__PURE__ */ jsx("button", { onClick: () => navigate({
            to: "/admin/product-edit/$id",
            params: {
              id: product._id
            }
          }), className: "rounded bg-blue-600 px-3 py-1 text-white", children: "Edit" }),
          /* @__PURE__ */ jsx("button", { onClick: () => handleDelete(product._id), className: "rounded bg-red-600 px-3 py-1 text-white", children: "Delete" })
        ] })
      ] }, product._id)) })
    ] }) })
  ] }) });
}
export {
  AdminProducts as component
};
