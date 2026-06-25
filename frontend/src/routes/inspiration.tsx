import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { SectionHeader } from "@/components/common/SectionHeader";
import inspo1 from "@/assets/inspo-1.jpg";
import inspo2 from "@/assets/inspo-2.jpg";
import inspo3 from "@/assets/inspo-3.jpg";

export const Route = createFileRoute("/inspiration")({
  head: () => ({ meta: [{ title: "Inspiration — FurniHub" }] }),
  component: () => (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <SectionHeader align="center" eyebrow="Editorial" title="Inspiration" description="A living archive of beautiful interiors." />
        <div className="mt-14 columns-1 gap-6 md:columns-2 lg:columns-3 [&>div]:mb-6">
          {[inspo1, inspo2, inspo3, inspo2, inspo1, inspo3].map((src, i) => (
            <div key={i} className="break-inside-avoid overflow-hidden rounded-md">
              <img src={src} alt="" loading="lazy" className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </Shell>
  ),
});