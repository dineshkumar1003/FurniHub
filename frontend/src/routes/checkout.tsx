import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { inr } from "@/lib/data/products";
import { createOrder } from "@/services/orderService";
import { toast } from "sonner";
import { createPaymentOrder } from "@/services/paymentService";
import { loadRazorpay } from "@/utils/loadRazorpay";  

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
});

function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const createOrderAfterPayment = async () => {
  console.log("CREATE ORDER START");

  const orderData = {
    orderItems: cart.items,

    shippingAddress: {
      address: form.address,
      city: form.city,
      postalCode: form.pinCode,
      country: "India",
    },

    paymentMethod: "Razorpay",

    itemsPrice: cart.subtotal,
    taxPrice: cart.gst,
    shippingPrice: cart.shipping,
    totalPrice: cart.total,

    isPaid: true,
    paidAt: new Date(),
  };

  console.log("ORDER DATA =", orderData);

  const order = await createOrder(orderData);

  console.log("ORDER CREATED =", order);

  await cart.clear();

  toast.success(
    "Payment Successful & Order Placed"
  );

  navigate({
    to: "/dashboard",
  });
};

const handlePayment = async () => {
  try {
    if (
      !form.fullName ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pinCode
    ) {
      toast.error("Fill all fields");
      return;
    }

const loaded = await loadRazorpay();

console.log("RAZORPAY LOADED =", loaded);
console.log("WINDOW RAZORPAY =", (window as any).Razorpay);

if (!loaded) {
  toast.error("Razorpay SDK Failed");
  return;
}

const order = await createPaymentOrder(
  cart.total
);
console.log("ORDER =", order);

const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: order.currency,
  order_id: order.id,

  name: "FurniHub",
  description: "Furniture Purchase",

  prefill: {
    name: form.fullName,
    contact: form.phone,
  },

  theme: {
    color: "#0f3d2e",
  },

  handler: async function (response: any) {
    console.log(response);
    await createOrderAfterPayment();
  },
};

const razorpay = new (window as any).Razorpay(
  options
);

razorpay.open();
  } catch (error: any) {
    console.log(
      "ORDER ERROR =",
      error
    );

    toast.error(
      error?.response?.data?.message ||
      "Order Failed"
    );
  }
};

  return (
    <Shell>
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8">
        <h1 className="font-display text-4xl">
          Checkout
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_400px]">

          <div className="space-y-4">

            <h2 className="font-display text-2xl">
              Shipping Address
            </h2>

            <Input
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
            />

            <Input
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />

            <Input
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />

            <Input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
            />

            <Input
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
            />

            <Input
              name="pinCode"
              placeholder="PIN Code"
              value={form.pinCode}
              onChange={handleChange}
            />

          </div>

          <aside className="h-fit rounded-md border p-6">

            <h2 className="font-display text-2xl">
              Order Summary
            </h2>

            <div className="mt-6 space-y-3">

              <Row
                label="Subtotal"
                value={inr(
                  cart.subtotal
                )}
              />

              <Row
                label="GST"
                value={inr(
                  cart.gst
                )}
              />

              <Row
                label="Shipping"
                value={inr(
                  cart.shipping
                )}
              />

            </div>

            <div className="my-4 h-px bg-border" />

          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>{inr(cart.total)}</span>
          </div>

          <Button
            className="mt-6 w-full"
            onClick={handlePayment}
          >
            Place Order
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