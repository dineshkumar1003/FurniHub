import { jsx, jsxs } from "react/jsx-runtime";
import { S as Shell } from "./Shell-BI-QiD32.js";
import { S as SectionHeader, i as inspo3 } from "./inspo-3-nNevvMiJ.js";
import { i as inspo1 } from "./inspo-1-BvBXzaVU.js";
import { i as inspo2 } from "./inspo-2-BT0-FJ_c.js";
import "@tanstack/react-router";
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
import "motion/react";
const SplitComponent = () => /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-20 md:px-8", children: [
  /* @__PURE__ */ jsx(SectionHeader, { align: "center", eyebrow: "Editorial", title: "Inspiration", description: "A living archive of beautiful interiors." }),
  /* @__PURE__ */ jsx("div", { className: "mt-14 columns-1 gap-6 md:columns-2 lg:columns-3 [&>div]:mb-6", children: [inspo1, inspo2, inspo3, inspo2, inspo1, inspo3].map((src, i) => /* @__PURE__ */ jsx("div", { className: "break-inside-avoid overflow-hidden rounded-md", children: /* @__PURE__ */ jsx("img", { src, alt: "", loading: "lazy", className: "w-full" }) }, i)) })
] }) });
export {
  SplitComponent as component
};
