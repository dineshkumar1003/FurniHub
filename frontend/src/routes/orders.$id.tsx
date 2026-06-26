import {
  createFileRoute,
} from "@tanstack/react-router";

import {
  useEffect,
  useState,
} from "react";

import { Shell } from "@/components/layout/Shell";

import {
  getOrderById,
} from "@/services/orderService";

import { inr } from "@/lib/data/products";

export const Route =
  createFileRoute(
    "/orders/$id"
  )({
    component: OrderPage,
  });

function OrderPage() {
  const { id } =
    Route.useParams();

  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder =
    async () => {
      try {
        const data =
          await getOrderById(id);

        setOrder(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <Shell>
        <div className="p-10">
          Loading...
        </div>
      </Shell>
    );
  }

  if (!order) {
    return (
      <Shell>
        <div className="p-10">
          Order not found
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="font-display text-4xl">
          Order Details
        </h1>

        {/* ORDER INFO */}

        <div className="mt-8 rounded-md border p-6">
          <p>
            <strong>
              Order ID:
            </strong>{" "}
            {order._id}
          </p>

          <p className="mt-4">
            <strong>
              Status:
            </strong>{" "}

            <span
              className={`inline-block rounded px-3 py-1 text-sm font-medium
              ${
                order.orderStatus ===
                "Placed"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.orderStatus ===
                    "Shipped"
                  ? "bg-blue-100 text-blue-700"
                  : order.orderStatus ===
                    "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {order.orderStatus}
            </span>
          </p>

          <p className="mt-4">
            <strong>
              Date:
            </strong>{" "}
            {new Date(
              order.createdAt
            ).toLocaleDateString()}
          </p>
        </div>

        {/* PRODUCTS */}

        <div className="mt-10">
          <h2 className="mb-4 text-2xl font-medium">
            Products
          </h2>

          <div className="space-y-4">
            {order.orderItems.map(
              (item: any) => (
                <div
                  key={item._id}
                  className="flex items-center gap-4 rounded-md border p-4"
                >
                  <img
                    src={`https://furnihub-hlkx.onrender.com${item.image}`}
                    alt={item.name}
                    className="h-24 w-24 rounded object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">
                      {item.name}
                    </h3>

                    <p>
                      Qty: {item.qty}
                    </p>
                  </div>

                  <div>
                    {inr(
                      item.price
                    )}
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* SHIPPING + PAYMENT */}

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-md border p-6">
            <h3 className="mb-4 text-xl font-medium">
              Shipping Address
            </h3>

            <p>
              {
                order
                  .shippingAddress
                  .address
              }
            </p>

            <p>
              {
                order
                  .shippingAddress
                  .city
              }
            </p>

            <p>
              {
                order
                  .shippingAddress
                  .postalCode
              }
            </p>

            <p>
              {
                order
                  .shippingAddress
                  .country
              }
            </p>
          </div>

          <div className="rounded-md border p-6">
            <h3 className="mb-4 text-xl font-medium">
              Payment
            </h3>

            <p>
              Method:{" "}
              {
                order
                  .paymentMethod
              }
            </p>

            <p className="mt-2">
              Total:{" "}
              {inr(
                order.totalPrice
              )}
            </p>

            <p className="mt-2">
              Paid:{" "}
              {order.isPaid
                ? "Yes"
                : "No"}
            </p>
          </div>
        </div>

        {/* ORDER TRACKING */}

        <div className="mt-10 rounded-md border p-6">
          <h2 className="mb-6 text-2xl font-medium">
            Order Tracking
          </h2>

          <ol className="relative border-l pl-6">
            {order.trackingHistory?.map(
              (
                item: any,
                index: number
              ) => (
                <li
                  key={index}
                  className="mb-8"
                >
                  <span className="absolute -left-1.5 h-3 w-3 rounded-full bg-green-600" />

                  <div className="font-medium">
                    {item.status}
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {new Date(
                      item.updatedAt
                    ).toLocaleString()}
                  </div>
                </li>
              )
            )}
          </ol>
        </div>
      </div>
    </Shell>
  );
}