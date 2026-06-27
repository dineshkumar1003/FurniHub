import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { S as Shell, I as Input, B as Button } from "./Shell-BI-QiD32.js";
import { L as Label } from "./label-C93B3-1h.js";
import { C as Checkbox } from "./checkbox-tCCCTH2f.js";
import { b as useAuth } from "./router-mRfm6bnQ.js";
import axios from "axios";
import { i as inspo2 } from "./inspo-2-BT0-FJ_c.js";
import "lucide-react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "@radix-ui/react-label";
import "@radix-ui/react-checkbox";
import "@tanstack/react-query";
import "sonner";
const API = "https://furnihub-hlkx.onrender.com/api/otp";
const sendOtp = async (email) => {
  const { data } = await axios.post(
    `${API}/send`,
    { email }
  );
  return data;
};
const verifyOtp = async (email, otp) => {
  const { data } = await axios.post(
    `${API}/verify`,
    {
      email,
      otp
    }
  );
  return data;
};
function RegisterPage() {
  const {
    register
  } = useAuth();
  const nav = useNavigate();
  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    pwd: "",
    confirm: ""
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const sendOtpHandler = async () => {
    try {
      await sendOtp(f.email);
      setOtpSent(true);
      alert("OTP Sent Successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to Send OTP");
    }
  };
  const verifyOtpHandler = async () => {
    try {
      await verifyOtp(f.email, otp);
      setOtpVerified(true);
      alert("OTP Verified Successfully");
    } catch (error) {
      console.log(error);
      alert("Invalid OTP");
    }
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (f.pwd !== f.confirm) {
      alert("Passwords do not match");
      return;
    }
    if (!otpVerified) {
      alert("Please Verify OTP First");
      return;
    }
    try {
      await register(f.name, f.email, f.phone, f.pwd);
      nav({
        to: "/dashboard"
      });
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
    }
  };
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid min-h-[80vh] max-w-7xl gap-0 px-0 md:grid-cols-2", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center px-4 py-16 md:px-16", children: /* @__PURE__ */ jsxs("form", { className: "w-full max-w-sm space-y-5", onSubmit: submitHandler, children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl", children: "Create your account" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Full Name" }),
        /* @__PURE__ */ jsx(Input, { required: true, value: f.name, onChange: (e) => setF({
          ...f,
          name: e.target.value
        }), className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsx(Input, { type: "email", required: true, value: f.email, onChange: (e) => setF({
          ...f,
          email: e.target.value
        }), className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "button", className: "w-full", onClick: sendOtpHandler, children: "Send OTP" }),
      otpSent && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(Input, { placeholder: "Enter OTP", value: otp, onChange: (e) => setOtp(e.target.value) }),
        /* @__PURE__ */ jsx(Button, { type: "button", className: "w-full", onClick: verifyOtpHandler, children: "Verify OTP" })
      ] }),
      otpVerified && /* @__PURE__ */ jsx("p", { className: "text-green-600 text-sm", children: "OTP Verified Successfully" }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Mobile Number" }),
        /* @__PURE__ */ jsx(Input, { required: true, value: f.phone, onChange: (e) => setF({
          ...f,
          phone: e.target.value
        }), className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3 md:grid-cols-2", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Password" }),
          /* @__PURE__ */ jsx(Input, { type: "password", required: true, value: f.pwd, onChange: (e) => setF({
            ...f,
            pwd: e.target.value
          }), className: "mt-2" })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Label, { children: "Confirm Password" }),
          /* @__PURE__ */ jsx(Input, { type: "password", required: true, value: f.confirm, onChange: (e) => setF({
            ...f,
            confirm: e.target.value
          }), className: "mt-2" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
        /* @__PURE__ */ jsx(Checkbox, { required: true }),
        "I agree to the Terms & Privacy"
      ] }),
      /* @__PURE__ */ jsx(Button, { size: "lg", className: "w-full rounded-sm", type: "submit", children: "Create Account" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "Have an account?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/login", className: "text-foreground underline", children: "Sign in" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx("img", { src: inspo2, alt: "", className: "size-full object-cover" }) })
  ] }) });
}
export {
  RegisterPage as component
};
