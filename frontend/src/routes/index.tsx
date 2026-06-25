import { useEffect, useState } from "react";
import { getProducts } from "@/services/productService";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Award, Leaf, ShieldCheck, Truck } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/common/SectionHeader";
import { ProductCard } from "@/components/products/ProductCard";
import { categories, products } from "@/lib/data/products";
import hero from "@/assets/hero.jpg";
import inspo1 from "@/assets/inspo-1.jpg";
import inspo2 from "@/assets/inspo-2.jpg";
import inspo3 from "@/assets/inspo-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FurniHub 2026 — Timeless Luxury Furniture" },
      { name: "description", content: "Transform your home into timeless luxury. Premium handcrafted furniture for the modern Indian home." },
      { property: "og:title", content: "FurniHub 2026 — Timeless Luxury Furniture" },
      { property: "og:description", content: "Transform your home into timeless luxury." },
    ],
  }),
  component: Index,
});

function Index() {
  const newArrivals = products.filter((p) => p.isNew);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const [mongoProducts, setMongoProducts] = useState<any[]>([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setMongoProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []); 
  return (
    <Shell>
      {/* Hero */}
      <section className="relative -mt-16 h-[100svh] min-h-[640px] w-full overflow-hidden">
        <img src={hero} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/55" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-20 pt-32 text-white md:px-8 md:pb-28">
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80"
          >
            The 2026 Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-3xl font-display text-4xl leading-[1.05] text-balance md:text-6xl lg:text-7xl"
          >
            Transform your home into <em className="not-italic text-[color:var(--gold)]">timeless luxury</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-white/85"
          >
            Handcrafted pieces, considered materials, quiet luxury. Built to last a lifetime —
            shipped to your doorstep across India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <Button asChild size="lg" className="rounded-sm bg-[color:var(--gold)] text-[color:var(--gold-foreground)] hover:bg-[color:var(--gold)]/90">
              <Link to="/shop">Shop the collection <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-sm border-white/40 bg-transparent text-white hover:bg-white hover:text-foreground">
              <Link to="/inspiration">Explore designs</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
        <SectionHeader
          eyebrow="Shop by Category"
          title="Furniture for every room"
          description="A curated collection across every room in your home."
          action={<Button asChild variant="link"><Link to="/shop">View all <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>}
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {categories.map((c, i) => (
            <motion.div key={c.id}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Link to="/shop" search={{ category: c.id } as never} className="group block">
                <div className="relative aspect-[5/6] overflow-hidden rounded-md bg-[color:var(--surface)]">
                  <img src={c.image} alt={c.label} loading="lazy"
                    className="size-full object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5 text-white"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.55), transparent)" }}>
                    <span className="font-display text-xl md:text-2xl">{c.label}</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="mx-auto max-w-7xl px-4 pb-24 md:px-8 md:pb-32">
        <SectionHeader eyebrow="Just In" title="New arrivals"
          description="The latest from our ateliers, photographed in natural light."
          action={<Button asChild variant="link"><Link to="/shop">See all</Link></Button>}
        />
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {newArrivals.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Editorial banner */}
      <section className="relative my-24 overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-24 md:grid-cols-2 md:items-center md:px-8 md:py-32">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--gold)]">Premium Collection</p>
            <h3 className="mt-4 font-display text-4xl text-balance md:text-5xl">The Heritage Series</h3>
            <p className="mt-5 max-w-md text-primary-foreground/80">
              A tribute to enduring craft. Each piece is shaped by hand, signed by its maker
              and built to be passed down for generations.
            </p>
            <Button asChild className="mt-8 bg-[color:var(--gold)] text-[color:var(--gold-foreground)] hover:bg-[color:var(--gold)]/90" size="lg">
              <Link to="/collections">Discover the series</Link>
            </Button>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img src={inspo2} alt="" loading="lazy" className="size-full object-cover" />
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <SectionHeader eyebrow="Loved by many" title="Best sellers" />
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
          {bestSellers.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </section>

      {/* Inspiration */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <SectionHeader align="center" eyebrow="Interior Inspiration"
          title="Homes that wear their pieces well"
          description="Real interiors, styled with FurniHub. A quiet kind of luxury that lasts." />
        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-6">
          {[inspo1, inspo2, inspo3].map((src, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}
              className="relative aspect-[3/4] overflow-hidden rounded-md"
            >
              <img src={src} alt="" loading="lazy" className="size-full object-cover transition-transform duration-[1400ms] hover:scale-105" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <SectionHeader align="center" eyebrow="Why FurniHub" title="Crafted with intention" />
        <div className="mt-14 grid gap-10 md:grid-cols-4">
          {[
            { Icon: Award, title: "Heirloom-grade craft", body: "Hand-built by masters across India." },
            { Icon: Leaf, title: "Considered materials", body: "Responsibly-sourced wood, natural fabrics." },
            { Icon: Truck, title: "White-glove delivery", body: "Free assembly across 800+ Indian cities." },
            { Icon: ShieldCheck, title: "10-year warranty", body: "Built to be passed down, guaranteed." },
          ].map(({ Icon, title, body }) => (
            <div key={title} className="text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-border bg-[color:var(--surface)] text-accent">
                <Icon className="h-5 w-5" />
              </div>
              <h4 className="mt-5 font-display text-lg">{title}</h4>
              <p className="mt-2 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-8">
        <SectionHeader align="center" eyebrow="Kind Words" title="What our clients say" />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { q: "The sofa is a piece of art. Our living room finally feels finished.", n: "Ananya R.", c: "Mumbai" },
            { q: "Heirloom quality, considered service. Worth every rupee.", n: "Karan S.", c: "Bengaluru" },
            { q: "A rare brand that delivers on its promise of luxury.", n: "Priya M.", c: "New Delhi" },
          ].map((t) => (
            <figure key={t.n} className="rounded-md border border-border/60 bg-[color:var(--surface)] p-8">
              <blockquote className="font-display text-lg leading-snug text-balance">“{t.q}”</blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t.n} · {t.c}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="mx-auto mt-12 max-w-4xl px-4 py-24 text-center md:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">The Atelier Letter</p>
        <h2 className="mt-4 font-display text-3xl md:text-5xl text-balance">
          Quiet stories from the workshop, in your inbox.
        </h2>
        <form
          onSubmit={(e) => { e.preventDefault(); }}
          className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <input type="email" required placeholder="you@home.com"
            className="h-12 flex-1 rounded-sm border border-border bg-background px-4 text-sm outline-none focus:border-primary"
          />
          <Button type="submit" size="lg" className="rounded-sm">Subscribe</Button>
        </form>
      </section>
    </Shell>
  );
}
