import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { inr } from "@/lib/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Cart — FurniHub" }],
  }),
  component: CartPage,
});

function CartPage() {
  const c = useCart();
  const nav = useNavigate();

  console.log("CART ITEMS =", c.items);

  if (!c.items || c.items.length === 0) {
    return (
      <Shell>
        <div className="mx-auto max-w-xl px-4 py-32 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-muted-foreground" />

          <h1 className="mt-6 font-display text-3xl">
            Your cart is empty
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Begin with a piece that speaks to you.
          </p>

          <Button asChild className="mt-8">
            <Link to="/shop">
              Shop the collection
            </Link>
          </Button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-12 md:px-8">
        <h1 className="font-display text-4xl md:text-5xl">
          Your Cart
        </h1>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
          <ul className="divide-y divide-border">
            {c.items.map((item: any) => (
              <li
                key={item._id}
                className="flex gap-5 py-6"
              >
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `https://furnihub-hlkx.onrender.com${item.image}`
                  }
                  alt={item.name}
                  className="aspect-square w-28 rounded-sm object-cover md:w-36"
                />

                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-display text-lg">
                        {item.name}
                      </h3>

                      <p className="text-sm text-muted-foreground">
                        Qty: {item.qty}
                      </p>
                    </div>

                    <div className="font-medium">
                      {inr(item.price * item.qty)}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <div className="inline-flex items-center rounded-sm border">
                      <button
                        onClick={() =>
                          c.setQty(
                            item.product,
                            Math.max(1, item.qty - 1)
                          )
                        }
                        className="grid h-9 w-9 place-items-center"
                      >
                        <Minus className="h-3 w-3" />
                      </button>

                      <span className="w-8 text-center">
                        {item.qty}
                      </span>

                      <button
                        onClick={() =>
                          c.setQty(
                            item.product,
                            item.qty + 1
                          )
                        }
                        className="grid h-9 w-9 place-items-center"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        c.remove(item.product)
                      }
                      className="inline-flex items-center gap-1 text-xs text-red-500"
                    >
                      <Trash2 className="h-3 w-3" />
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <aside className="h-fit rounded-md border p-6">
            <h2 className="font-display text-xl">
              Order Summary
            </h2>

            <div className="mt-6 space-y-2">
              <Row
                label="Subtotal"
                value={inr(c.subtotal)}
              />

              <Row
                label="GST"
                value={inr(c.gst)}
              />

              <Row
                label="Shipping"
                value={inr(c.shipping)}
              />
            </div>

            <div className="my-4 h-px bg-border" />

            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{inr(c.total)}</span>
            </div>

            <Button
              className="mt-6 w-full"
              onClick={() =>
                nav({
                  to: "/checkout",
                })
              }
            >
              Proceed to Checkout
            </Button>
          </aside>
        </div>
      </div>
    </Shell>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}