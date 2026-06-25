import {
  createFileRoute,
  Link,
} from "@tanstack/react-router";

import {
  Heart,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/ProductCard";

import {
  useWishlist,
} from "@/context/WishlistContext";

import {
  getProductsByIds,
} from "@/services/productService";

export const Route =
  createFileRoute(
    "/wishlist"
  )({
    head: () => ({
      meta: [
        {
          title:
            "Wishlist — FurniHub",
        },
      ],
    }),
    component: WishPage,
  });

function WishPage() {
  const { ids } =
    useWishlist();

  const [products,
    setProducts] =
    useState<any[]>([]);

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {
    const load =
      async () => {
        try {
          if (
            ids.length === 0
          ) {
            setProducts([]);
            return;
          }

          const data =
            await getProductsByIds(
              ids
            );

          const formatted =
            data.map(
              (p: any) => ({
                _id: p._id,
                id: p._id,
                slug: p._id,
                title: p.name,
                category:
                  p.category,
                price: p.price,
                image:
                  p.image.startsWith(
                    "http"
                  )
                    ? p.image
                    : `http://localhost:5000${p.image}`,
                rating:
                  p.rating || 0,
              })
            );

          setProducts(
            formatted
          );
        } catch (
          error
        ) {
          console.log(
            error
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    load();
  }, [ids]);

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 md:px-8">
        <h1 className="font-display text-4xl md:text-5xl">
          Wishlist
        </h1>

        {loading ? (
          <div className="mt-10">
            Loading...
          </div>
        ) : products.length ===
          0 ? (
          <div className="mt-16 rounded-md border border-dashed border-border p-16 text-center">
            <Heart className="mx-auto h-10 w-10 text-muted-foreground" />

            <h2 className="mt-6 font-display text-2xl">
              Your wishlist is
              empty
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Save pieces you
              love for later.
            </p>

            <Button
              asChild
              className="mt-6"
            >
              <Link to="/shop">
                Browse the
                collection
              </Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4">
            {products.map(
              (
                product,
                index
              ) => (
                <ProductCard
                  key={
                    product._id
                  }
                  product={
                    product
                  }
                  index={
                    index
                  }
                />
              )
            )}
          </div>
        )}
      </div>
    </Shell>
  );
}