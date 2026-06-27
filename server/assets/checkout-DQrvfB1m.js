import { jsx, jsxs } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { S as Shell, I as Input, B as Button } from "./Shell-BI-QiD32.js";
import { c as useCart } from "./router-mRfm6bnQ.js";
import { i as inr } from "./products-BCQ0c9Lm.js";
import { c as createOrder } from "./orderService-DtqiCQHL.js";
import { toast } from "sonner";
import axios from "axios";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "@tanstack/react-query";
const API = "https://furnihub-hlkx.onrender.com/api/payment";
const createPaymentOrder = async (amount) => {
  const token = localStorage.getItem("token");
  const { data } = await axios.post(
    `${API}/create-order`,
    { amount },
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  return data;
};
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
function CheckoutPage() {
  const cart = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pinCode: ""
  });
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
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
        country: "India"
      },
      paymentMethod: "Razorpay",
      itemsPrice: cart.subtotal,
      taxPrice: cart.gst,
      shippingPrice: cart.shipping,
      totalPrice: cart.total,
      isPaid: true,
      paidAt: /* @__PURE__ */ new Date()
    };
    console.log("ORDER DATA =", orderData);
    const order = await createOrder(orderData);
    console.log("ORDER CREATED =", order);
    await cart.clear();
    toast.success("Payment Successful & Order Placed");
    navigate({
      to: "/dashboard"
    });
  };
  const handlePayment = async () => {
    try {
      if (!form.fullName || !form.phone || !form.address || !form.city || !form.state || !form.pinCode) {
        toast.error("Fill all fields");
        return;
      }
      const loaded = await loadRazorpay();
      console.log("RAZORPAY LOADED =", loaded);
      console.log("WINDOW RAZORPAY =", window.Razorpay);
      if (!loaded) {
        toast.error("Razorpay SDK Failed");
        return;
      }
      const order = await createPaymentOrder(cart.total);
      console.log("ORDER =", order);
      const options = {
        key: "rzp_test_T5aTbcewIV8mXC",
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "FurniHub",
        description: "Furniture Purchase",
        prefill: {
          name: form.fullName,
          contact: form.phone
        },
        theme: {
          color: "#0f3d2e"
        },
        handler: async function(response) {
          console.log(response);
          await createOrderAfterPayment();
        }
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log("ORDER ERROR =", error);
      toast.error(error?.response?.data?.message || "Order Failed");
    }
  };
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 md:px-8", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-4xl", children: "Checkout" }),
    /* @__PURE__ */ jsxs("div", { className: "mt-10 grid gap-10 lg:grid-cols-[1fr_400px]", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl", children: "Shipping Address" }),
        /* @__PURE__ */ jsx(Input, { name: "fullName", placeholder: "Full Name", value: form.fullName, onChange: handleChange }),
        /* @__PURE__ */ jsx(Input, { name: "phone", placeholder: "Phone Number", value: form.phone, onChange: handleChange }),
        /* @__PURE__ */ jsx(Input, { name: "address", placeholder: "Address", value: form.address, onChange: handleChange }),
        /* @__PURE__ */ jsx(Input, { name: "city", placeholder: "City", value: form.city, onChange: handleChange }),
        /* @__PURE__ */ jsx(Input, { name: "state", placeholder: "State", value: form.state, onChange: handleChange }),
        /* @__PURE__ */ jsx(Input, { name: "pinCode", placeholder: "PIN Code", value: form.pinCode, onChange: handleChange })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "h-fit rounded-md border p-6", children: [
        /* @__PURE__ */ jsx("h2", { className: "font-display text-2xl", children: "Order Summary" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-6 space-y-3", children: [
          /* @__PURE__ */ jsx(Row, { label: "Subtotal", value: inr(cart.subtotal) }),
          /* @__PURE__ */ jsx(Row, { label: "GST", value: inr(cart.gst) }),
          /* @__PURE__ */ jsx(Row, { label: "Shipping", value: inr(cart.shipping) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "my-4 h-px bg-border" }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between font-medium text-lg", children: [
          /* @__PURE__ */ jsx("span", { children: "Total" }),
          /* @__PURE__ */ jsx("span", { children: inr(cart.total) })
        ] }),
        /* @__PURE__ */ jsx(Button, { className: "mt-6 w-full", onClick: handlePayment, children: "Place Order" })
      ] })
    ] })
  ] }) });
}
function Row({
  label,
  value
}) {
  return /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
    /* @__PURE__ */ jsx("span", { children: label }),
    /* @__PURE__ */ jsx("span", { children: value })
  ] });
}
export {
  CheckoutPage as component
};
