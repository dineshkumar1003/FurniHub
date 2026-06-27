import { jsxs, jsx } from "react/jsx-runtime";
import { motion } from "motion/react";
function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  action
}) {
  return /* @__PURE__ */ jsxs("div", { className: align === "center" ? "mx-auto max-w-2xl text-center" : "flex items-end justify-between gap-8", children: [
    /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 },
        children: [
          eyebrow && /* @__PURE__ */ jsx("p", { className: "mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent", children: eyebrow }),
          /* @__PURE__ */ jsx("h2", { className: "font-display text-3xl text-balance md:text-4xl lg:text-5xl", children: title }),
          description && /* @__PURE__ */ jsx("p", { className: "mt-4 max-w-xl text-muted-foreground", children: description })
        ]
      }
    ),
    action && align !== "center" && /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: action })
  ] });
}
const inspo3 = "/assets/inspo-3-Drx-mAsP.jpg";
export {
  SectionHeader as S,
  inspo3 as i
};
