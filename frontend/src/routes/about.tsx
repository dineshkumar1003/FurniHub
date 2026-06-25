import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "Journal — FurniHub" }] }),
  component: () => (
    <Shell>
      <article className="mx-auto max-w-2xl px-4 py-24 md:px-8">
        <p className="text-[11px] uppercase tracking-[0.22em] text-accent">The Journal</p>
        <h1 className="mt-4 font-display text-4xl md:text-5xl">Furniture, made slowly.</h1>
        <p className="mt-8 text-lg leading-relaxed text-foreground/85">
          FurniHub was founded with a simple belief — that the things we live with should be built with intention.
          Every piece is hand-finished in our ateliers across India, using materials that age beautifully.
        </p>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          We work directly with master craftspeople in Jodhpur, Jaipur and Bengaluru, paying fair wages
          and using slow, considered methods. Our promise is simple — furniture you'll want to pass down.
        </p>
      </article>
    </Shell>
  ),
});