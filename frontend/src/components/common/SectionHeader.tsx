import type { ReactNode } from "react";
import { motion } from "motion/react";

export function SectionHeader({
  eyebrow, title, description, align = "left", action,
}: {
  eyebrow?: string; title: string; description?: string;
  align?: "left" | "center"; action?: ReactNode;
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "flex items-end justify-between gap-8"}>
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}
      >
        {eyebrow && (
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
        )}
        <h2 className="font-display text-3xl text-balance md:text-4xl lg:text-5xl">{title}</h2>
        {description && (
          <p className="mt-4 max-w-xl text-muted-foreground">{description}</p>
        )}
      </motion.div>
      {action && align !== "center" && <div className="hidden md:block">{action}</div>}
    </div>
  );
}