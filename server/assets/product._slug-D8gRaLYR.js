import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { S as Shell, B as Button } from "./Shell-BI-QiD32.js";
import "lucide-react";
import "react";
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
const SplitNotFoundComponent = () => /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-xl px-4 py-32 text-center", children: [
  /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl", children: "Piece not found" }),
  /* @__PURE__ */ jsx(Button, { asChild: true, className: "mt-6", children: /* @__PURE__ */ jsx(Link, { to: "/shop", children: "Back to shop" }) })
] }) });
export {
  SplitNotFoundComponent as notFoundComponent
};
