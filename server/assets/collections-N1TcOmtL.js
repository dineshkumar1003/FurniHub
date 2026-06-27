import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { S as Shell } from "./Shell-BI-QiD32.js";
import { S as SectionHeader, i as inspo3 } from "./inspo-3-nNevvMiJ.js";
import { i as inspo1 } from "./inspo-1-BvBXzaVU.js";
import { i as inspo2 } from "./inspo-2-BT0-FJ_c.js";
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
  /* @__PURE__ */ jsx(SectionHeader, { eyebrow: "Premium", title: "Our Collections", description: "Three editorial worlds. One commitment to craft." }),
  /* @__PURE__ */ jsx("div", { className: "mt-12 grid gap-6 md:grid-cols-3", children: [{
    n: "Heritage",
    img: inspo2,
    d: "Hand-built, signed by makers."
  }, {
    n: "Sanctuary",
    img: inspo1,
    d: "Calm bedrooms, considered comfort."
  }, {
    n: "Atelier",
    img: inspo3,
    d: "Workspaces with character."
  }].map((c) => /* @__PURE__ */ jsxs(Link, { to: "/shop", className: "group block", children: [
    /* @__PURE__ */ jsx("div", { className: "aspect-[4/5] overflow-hidden rounded-md", children: /* @__PURE__ */ jsx("img", { src: c.img, alt: "", className: "size-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" }) }),
    /* @__PURE__ */ jsx("h3", { className: "mt-4 font-display text-2xl", children: c.n }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: c.d })
  ] }, c.n)) })
] }) });
export {
  SplitComponent as component
};
