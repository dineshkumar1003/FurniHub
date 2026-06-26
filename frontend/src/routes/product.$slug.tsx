import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { Heart, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { inr } from "@/lib/data/products";
import { getProductById } from "@/services/productService";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { ProductCard } from "@/components/products/ProductCard";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { addReview } from "@/services/reviewService";

export const Route = createFileRoute("/product/$slug")({
 loader: async ({ params }) => {
  try {
    const p = await getProductById(params.slug);

const product = {
    _id: p._id,
    id: p._id,
    slug: p._id,
    title: p.name,
    subtitle: p.brand,
    category: p.category,
    price: p.price,
    mrp: p.price,
    rating: p.rating || 0,
    reviews: p.numReviews || 0,

    reviewList: p.reviews || [],

    image: p.image.startsWith("http")
      ? p.image
      : `https://furnihub-hlkx.onrender.com${p.image}`,

    description: p.description,
    colors: ["#000000"],
    material: "",
    craftsmanship: "",
    dimensions: "",
    care: "",
    inStock: p.countInStock > 0,
  };

    return { product,};
  } catch {
    throw notFound();
  }
},
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.product.title} — FurniHub` },
      { name: "description", content: loaderData.product.subtitle },
      { property: "og:title", content: loaderData.product.title },
      { property: "og:description", content: loaderData.product.subtitle },
      { property: "og:image", content: loaderData.product.image },
    ] : [],
  }),
  notFoundComponent: () => (
    <Shell>
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl">Piece not found</h1>
        <Button asChild className="mt-6"><Link to="/shop">Back to shop</Link></Button>
      </div>
    </Shell>
  ),
  errorComponent: () => <Shell><div className="px-4 py-32 text-center">Something went wrong.</div></Shell>,
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const wish = useWishlist();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [color, setColor] = useState(product.colors?.[0] || "#000000");
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState<string | null>(null);
  const disc = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const related: any[] = [];

  const checkPin = () => {
  if (!/^\d{6}$/.test(pin)) {
    setPinMsg(
      "Enter a valid 6-digit PIN code."
    );
    return;
  }

  const days =
    4 +
    (parseInt(pin.slice(0, 1)) %
      5);

  setPinMsg(
    `Delivers in ${days}–${
      days + 2
    } business days · Free white-glove assembly`
  );
};

const submitReview = async () => {
  try {
    await addReview(
      product._id,
      rating,
      comment
    );  

    toast.success(
      "Review Added Successfully"
    );

    window.location.reload();
  } catch (error: any) {
    toast.error(
      error?.response?.data
        ?.message ||
        "Review Failed"
    );
  }
};

return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 pt-12 md:px-8 md:pt-16">
        <nav className="mb-8 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link> /{" "}
          <Link to="/shop" className="hover:text-foreground">Shop</Link> / {product.title}
        </nav>
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <div className="group relative overflow-hidden rounded-md bg-[color:var(--surface)]">
              <img src={product.image} alt={product.title}
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-3">
              {[product.image, product.image, product.image, product.image].map((src, i) => (
                <div key={i} className="aspect-square overflow-hidden rounded-sm bg-[color:var(--surface)]">
                  <img src={src} alt="" loading="lazy" className="size-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-accent">{product.category}</p>
            <h1 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl text-balance">{product.title}</h1>
            <p className="mt-3 text-muted-foreground">{product.subtitle}</p>

            <div className="mt-5 flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-accent" /> {product.rating}</span>
              <span className="text-muted-foreground">{product.reviews} reviews</span>
            </div>

            <div className="mt-7 flex items-baseline gap-3">
              <span className="font-display text-3xl">{inr(product.price)}</span>
              {product.mrp > product.price && (
                <>
                  <span className="text-base text-muted-foreground line-through">{inr(product.mrp)}</span>
                  <span className="rounded-sm bg-primary px-2 py-0.5 text-xs text-primary-foreground">−{disc}%</span>
                </>
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Or 6 months no-cost EMI from <span className="text-foreground">{inr(Math.round(product.price / 6))}/mo</span>
            </p>

            <p className="mt-7 leading-relaxed text-foreground/85">{product.description}</p>

            <div className="mt-8">
              <p className="mb-2 text-xs uppercase tracking-[0.18em] text-foreground/70">Colour</p>
              <div className="flex gap-2">
                {product.colors.map((c: string) => (
                  <button key={c} aria-label={c}
                    onClick={() => setColor(c)}
                    className={cn("h-8 w-8 rounded-full border-2 transition", color === c ? "border-foreground" : "border-transparent")}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center rounded-sm border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-11 w-11 place-items-center hover:bg-muted" aria-label="Decrease quantity">
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-10 text-center text-sm">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="grid h-11 w-11 place-items-center hover:bg-muted" aria-label="Increase quantity">
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>
              <Button size="lg" className="rounded-sm" onClick={() => { add(product, qty); toast.success("Added to cart"); }}>
                <ShoppingBag className="mr-2 h-4 w-4" /> Add to cart
              </Button>
              <Button size="lg" variant="default" className="rounded-sm bg-[color:var(--gold)] text-[color:var(--gold-foreground)] hover:bg-[color:var(--gold)]/90"
                onClick={() => { add(product, qty); navigate({ to: "/checkout" }); }}
              >
                Buy now
              </Button>
              <Button size="lg" variant="outline" className="rounded-sm" onClick={() => wish.toggle(product.id)} aria-label="Wishlist">
                <Heart className={cn("h-4 w-4", wish.has(product.id) && "fill-accent text-accent")} />
              </Button>
            </div>

            <div className="mt-8 rounded-sm border border-border p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70">Delivery</p>
              <div className="mt-3 flex gap-2">
                <Input placeholder="Enter PIN code" value={pin} onChange={(e) => setPin(e.target.value)} maxLength={6} />
                <Button variant="outline" onClick={checkPin}>Check</Button>
              </div>
              {pinMsg && <p className="mt-3 text-sm text-muted-foreground">{pinMsg}</p>}
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-muted-foreground">
              <div className="rounded-sm border border-border p-3"><Truck className="mx-auto mb-1 h-4 w-4" />Free Delivery</div>
              <div className="rounded-sm border border-border p-3"><ShieldCheck className="mx-auto mb-1 h-4 w-4" />10-Yr Warranty</div>
              <div className="rounded-sm border border-border p-3"><RotateCcw className="mx-auto mb-1 h-4 w-4" />7-Day Returns</div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="mt-20">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
            <TabsTrigger value="care">Care</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="prose-sm mt-6 max-w-2xl text-foreground/80">
            <p><strong className="text-foreground">Material:</strong> {product.material}</p>
            <p className="mt-2"><strong className="text-foreground">Craftsmanship:</strong> {product.craftsmanship}</p>
          </TabsContent>
          <TabsContent value="dimensions" className="mt-6 text-foreground/80">{product.dimensions}</TabsContent>
          <TabsContent value="care" className="mt-6 text-foreground/80">{product.care}</TabsContent>
          <TabsContent
            value="reviews"
            className="mt-6 space-y-6"
          >
            <div className="rounded-md border p-6">
              <h3 className="mb-4 text-xl font-semibold">
                Write a Review
              </h3>

              <select
                value={rating}
                onChange={(e) =>
                  setRating(
                    Number(e.target.value)
                  )
                }
                className="mb-4 w-full rounded border p-3"
              >
                <option value={1}>
                  1 Star
                </option>

                <option value={2}>
                  2 Stars
                </option>

                <option value={3}>
                  3 Stars
                </option>

                <option value={4}>
                  4 Stars
                </option>

                <option value={5}>
                  5 Stars
                </option>
              </select>

              <textarea
                rows={4}
                value={comment}
                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }
                placeholder="Write your review..."
                className="mb-4 w-full rounded border p-3"
              />

              <Button
                onClick={submitReview}
              >
                Submit Review
              </Button>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-semibold">
                Customer Reviews
              </h3>

              {product.reviewList &&
              product.reviewList.length >
                0 ? (
                product.reviewList.map(
                  (review: any) => (
                    <div
                      key={review._id}
                      className="mb-4 rounded-md border p-5"
                    >
                      <div className="flex items-center justify-between">
                        <strong>
                          {review.name}
                        </strong>

                        <span>
                          ⭐
                          {review.rating}
                        </span>
                      </div>

                      <p className="mt-3 text-muted-foreground">
                        {review.comment}
                      </p>
                    </div>
                  )
                )
              ) : (
                <p className="text-muted-foreground">
                  No reviews yet.
                </p>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {related.length > 0 && (
          <section className="mt-24">
            <h2 className="font-display text-3xl">You may also love</h2>
            <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </section>
        )}
      </div>
    </Shell>
  );
}