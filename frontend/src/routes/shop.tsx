import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Filter, Star } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { getProducts } from "@/services/productService";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — FurniHub" },
      { name: "description", content: "Browse the full FurniHub collection of premium furniture." },
    ],
  }),
  component: ShopPage,
});
const categories = [
  { id: "Sofa", label: "Sofa" },
  { id: "Bed", label: "Bed" },
  { id: "Chair", label: "Chair" },
  { id: "Table", label: "Table" },
  { id: "Wardrobe", label: "Wardrobe" },
];
type Sort = "popular" | "new" | "low" | "high";

function Filters({
  cats, setCats, price, setPrice, rating, setRating, inStockOnly, setInStockOnly,
}: {
  cats: string[]; setCats: (v: string[]) => void;
  price: [number, number]; setPrice: (v: [number, number]) => void;
  rating: number; setRating: (v: number) => void;
  inStockOnly: boolean; setInStockOnly: (v: boolean) => void;
}) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">Category</h3>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c.id} className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox checked={cats.includes(c.id)}
                onCheckedChange={(v) => setCats(v ? [...cats, c.id] : cats.filter((x) => x !== c.id))}
              />
              {c.label}
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">Price</h3>
        <Slider min={0} max={200000} step={5000} value={price} onValueChange={(v) => setPrice(v as [number, number])} />
        <p className="mt-3 text-xs text-muted-foreground">
          ₹{price[0].toLocaleString("en-IN")} – ₹{price[1].toLocaleString("en-IN")}
        </p>
      </div>
      <div>
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">Rating</h3>
        <div className="space-y-2">
          {[4.5, 4, 3.5].map((r) => (
            <label key={r} className="flex cursor-pointer items-center gap-2 text-sm">
              <Checkbox checked={rating === r} onCheckedChange={(v) => setRating(v ? r : 0)} />
              <Star className="h-3 w-3 fill-accent text-accent" /> {r}+
            </label>
          ))}
        </div>
      </div>
      <label className="flex cursor-pointer items-center gap-2 text-sm">
        <Checkbox checked={inStockOnly} onCheckedChange={(v) => setInStockOnly(Boolean(v))} />
        In stock only
      </label>
    </div>
  );
}

function ShopPage() {
  const [q, setQ] = useState("");
  const [cats, setCats] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([0, 200000]);
  const [rating, setRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<Sort>("popular");

  const [products, setProducts] = useState<any[]>([]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      const formatted = data.map((p: any) => ({
        id: p._id,
        slug: p._id,
        title: p.name,
        subtitle: p.description,
        category: p.category,
        price: p.price,
        mrp: p.price,
        rating: p.rating || 0,
        reviews: p.numReviews || 0,
        image: p.image.startsWith("http")
          ? p.image
          : `http://localhost:5000${p.image}`,
        colors: [],
        material: "",
        craftsmanship: "",
        dimensions: "",
        care: "",
        description: p.description,
        inStock: p.countInStock > 0,
      }));

      setProducts(formatted);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProducts();
}, []);

  const list = useMemo(() => {
    let l = [...products];
    if (q) l = l.filter((p) => (p.title + " " + p.subtitle + " " + p.category).toLowerCase().includes(q.toLowerCase()));
    if (cats.length) l = l.filter((p) => cats.includes(p.category));
    l = l.filter((p) => p.price >= price[0] && p.price <= price[1]);
    if (rating) l = l.filter((p) => p.rating >= rating);
    if (inStockOnly) l = l.filter((p) => p.inStock);
    if (sort === "low") l.sort((a, b) => a.price - b.price);
    else if (sort === "high") l.sort((a, b) => b.price - a.price);
    else if (sort === "new") l.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    else l.sort((a, b) => b.reviews - a.reviews);
    return l;
    }, [products,
    q,
    cats,
    price,
    rating,
    inStockOnly,
    sort,]);

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 md:px-8 md:pt-16">
        <nav className="mb-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> / Shop
        </nav>
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl md:text-5xl">The Collection</h1>
            <p className="mt-2 text-sm text-muted-foreground">{list.length} pieces</p>
          </div>
          <div className="flex flex-1 items-center justify-end gap-3 md:max-w-md">
            <Input placeholder="Search…" value={q} onChange={(e) => setQ(e.target.value)} />
            <Select value={sort} onValueChange={(v) => setSort(v as Sort)}>
              <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Popularity</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
                <SelectItem value="low">Price: Low to High</SelectItem>
                <SelectItem value="high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" aria-label="Filters">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
                <div className="mt-6">
                  <Filters cats={cats} setCats={setCats} price={price} setPrice={setPrice}
                    rating={rating} setRating={setRating} inStockOnly={inStockOnly} setInStockOnly={setInStockOnly} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>

        <div className="mt-10 grid gap-10 md:grid-cols-[240px_1fr]">
          <aside className="hidden md:block">
            <Filters cats={cats} setCats={setCats} price={price} setPrice={setPrice}
              rating={rating} setRating={setRating} inStockOnly={inStockOnly} setInStockOnly={setInStockOnly} />
          </aside>
          <div>
            {list.length === 0 ? (
              <div className="rounded-md border border-dashed border-border p-16 text-center">
                <h3 className="font-display text-2xl">Nothing matches your filters</h3>
                <p className="mt-2 text-sm text-muted-foreground">Try clearing a filter or two.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
                {list.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </Shell>
  );
}