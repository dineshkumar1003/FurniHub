import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { SectionHeader } from "@/components/common/SectionHeader";
import inspo1 from "@/assets/inspo-1.jpg";
import inspo2 from "@/assets/inspo-2.jpg";
import inspo3 from "@/assets/inspo-3.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({ meta: [{ title: "Collections — FurniHub" }] }),
  component: () => (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <SectionHeader eyebrow="Premium" title="Our Collections" description="Three editorial worlds. One commitment to craft." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "Heritage", img: inspo2, d: "Hand-built, signed by makers." },
            { n: "Sanctuary", img: inspo1, d: "Calm bedrooms, considered comfort." },
            { n: "Atelier", img: inspo3, d: "Workspaces with character." },
          ].map((c) => (
            <Link key={c.n} to="/shop" className="group block">
              <div className="aspect-[4/5] overflow-hidden rounded-md">
                <img src={c.img} alt="" className="size-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
              <h3 className="mt-4 font-display text-2xl">{c.n}</h3>
              <p className="text-sm text-muted-foreground">{c.d}</p>
            </Link>
          ))}
        </div>
      </div>
    </Shell>
  ),
});