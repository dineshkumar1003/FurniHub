import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { S as Shell } from "./Shell-BI-QiD32.js";
import { a as getProduct, u as updateProduct } from "./adminProductService-29Fh11kX.js";
import axios from "axios";
import { e as Route } from "./router-mRfm6bnQ.js";
import "@tanstack/react-router";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "@tanstack/react-query";
import "sonner";
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append(
    "image",
    file
  );
  const { data } = await axios.post(
    "https://furnihub-hlkx.onrender.com/api/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
  return data.image;
};
function AdminProductEdit() {
  const {
    id
  } = Route.useParams();
  const [product, setProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    loadProduct();
  }, []);
  const loadProduct = async () => {
    const data = await getProduct(id);
    setProduct(data);
  };
  const uploadHandler = async (e) => {
    if (!e.target.files?.[0]) return;
    try {
      setUploading(true);
      const image = await uploadImage(e.target.files[0]);
      setProduct({
        ...product,
        image
      });
    } catch (error) {
      alert("Image Upload Failed");
    } finally {
      setUploading(false);
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    await updateProduct(id, product);
    alert("Product Updated Successfully");
  };
  if (!product) return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsx("div", { className: "p-10", children: "Loading..." }) });
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto p-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl mb-8", children: "Edit Product" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submitHandler, className: "space-y-4", children: [
      /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Product Name", value: product.name, onChange: (e) => setProduct({
        ...product,
        name: e.target.value
      }), className: "w-full border p-3" }),
      /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Price", value: product.price, onChange: (e) => setProduct({
        ...product,
        price: Number(e.target.value)
      }), className: "w-full border p-3" }),
      /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Brand", value: product.brand, onChange: (e) => setProduct({
        ...product,
        brand: e.target.value
      }), className: "w-full border p-3" }),
      /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Category", value: product.category, onChange: (e) => setProduct({
        ...product,
        category: e.target.value
      }), className: "w-full border p-3" }),
      /* @__PURE__ */ jsx("input", { type: "number", placeholder: "Stock", value: product.countInStock, onChange: (e) => setProduct({
        ...product,
        countInStock: Number(e.target.value)
      }), className: "w-full border p-3" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block mb-2 font-medium", children: "Product Image" }),
        /* @__PURE__ */ jsx("input", { type: "file", onChange: uploadHandler, className: "w-full border p-3" }),
        uploading && /* @__PURE__ */ jsx("p", { className: "mt-2", children: "Uploading..." }),
        product.image && /* @__PURE__ */ jsx("img", { src: `https://furnihub-hlkx.onrender.com${product.image}`, alt: "Product", className: "mt-4 h-40 rounded border" })
      ] }),
      /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Image URL", value: product.image, onChange: (e) => setProduct({
        ...product,
        image: e.target.value
      }), className: "w-full border p-3" }),
      /* @__PURE__ */ jsx("textarea", { placeholder: "Description", value: product.description, onChange: (e) => setProduct({
        ...product,
        description: e.target.value
      }), rows: 5, className: "w-full border p-3" }),
      /* @__PURE__ */ jsx("button", { type: "submit", className: "bg-black text-white px-6 py-3", children: "Save Changes" })
    ] })
  ] }) });
}
export {
  AdminProductEdit as component
};
