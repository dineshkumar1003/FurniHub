import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  index = 0,
}: {
  product: any;
  index?: number;
}) {
  const { add } = useCart();
  const wish = useWishlist();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-md">
          <img
            src={product.image}
            alt={product.title}
            className="size-full object-cover"
          />

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              wish.toggle(product.id);
            }}
            className="absolute bottom-3 right-3"
          >
            <Heart
              className={cn(
                "h-4 w-4",
                wish.has(product.id) &&
                  "fill-accent text-accent"
              )}
            />
          </button>
        </div>
      </Link>

      <div className="mt-4">
        <h3>{product.title}</h3>

        <div className="flex items-center gap-1">
          <Star className="h-3 w-3" />
          {product.rating}
        </div>

        <div className="font-medium">
          ₹{product.price}
        </div>
      </div>

      <Button
        className="mt-3 w-full"
        onClick={() => {
          add(product);
          toast.success("Added to cart");
        }}
      >
        <ShoppingBag className="mr-2 h-3.5 w-3.5" />
        Add to Cart
      </Button>
    </motion.article>
  );
}