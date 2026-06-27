import { jsx, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState } from "react";
import { c as cn, S as Shell, I as Input, B as Button } from "./Shell-BI-QiD32.js";
import { L as Label } from "./label-C93B3-1h.js";
import { OTPInput, OTPInputContext } from "input-otp";
import { Minus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import "@tanstack/react-router";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dialog";
import "@radix-ui/react-dropdown-menu";
import "./router-mRfm6bnQ.js";
import "@tanstack/react-query";
import "@radix-ui/react-label";
const InputOTP = React.forwardRef(({ className, containerClassName, ...props }, ref) => /* @__PURE__ */ jsx(
  OTPInput,
  {
    ref,
    containerClassName: cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      containerClassName
    ),
    className: cn("disabled:cursor-not-allowed", className),
    ...props
  }
));
InputOTP.displayName = "InputOTP";
const InputOTPGroup = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center", className), ...props }));
InputOTPGroup.displayName = "InputOTPGroup";
const InputOTPSlot = React.forwardRef(({ index, className, ...props }, ref) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      ),
      ...props,
      children: [
        char,
        hasFakeCaret && /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "h-4 w-px animate-caret-blink bg-foreground duration-1000" }) })
      ]
    }
  );
});
InputOTPSlot.displayName = "InputOTPSlot";
const InputOTPSeparator = React.forwardRef(({ ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, role: "separator", ...props, children: /* @__PURE__ */ jsx(Minus, {}) }));
InputOTPSeparator.displayName = "InputOTPSeparator";
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
const resetPassword = async (email, newPassword) => {
  const { data } = await axios.post(
    `${API}/reset-password`,
    {
      email,
      newPassword
    }
  );
  return data;
};
function Forgot() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      await sendOtp(email);
      toast.success("OTP Sent Successfully");
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to send OTP");
    }
  };
  const verifyOtpHandler = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(email, otp);
      toast.success("OTP Verified");
      setStep(3);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid OTP");
    }
  };
  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      await resetPassword(email, password);
      toast.success("Password Updated Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Reset failed");
    }
  };
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-md px-4 py-20", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl", children: "Reset Password" }),
    step === 1 && /* @__PURE__ */ jsxs("form", { onSubmit: sendOtpHandler, className: "mt-8 space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsx(Input, { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx(Button, { className: "w-full", children: "Send OTP" })
    ] }),
    step === 2 && /* @__PURE__ */ jsxs("form", { onSubmit: verifyOtpHandler, className: "mt-8 space-y-5", children: [
      /* @__PURE__ */ jsx(Label, { children: "Enter OTP" }),
      /* @__PURE__ */ jsx(InputOTP, { maxLength: 6, value: otp, onChange: setOtp, children: /* @__PURE__ */ jsx(InputOTPGroup, { children: [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsx(InputOTPSlot, { index: i }, i)) }) }),
      /* @__PURE__ */ jsx(Button, { className: "w-full", children: "Verify OTP" })
    ] }),
    step === 3 && /* @__PURE__ */ jsxs("form", { onSubmit: resetPasswordHandler, className: "mt-8 space-y-5", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "New Password" }),
        /* @__PURE__ */ jsx(Input, { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Confirm Password" }),
        /* @__PURE__ */ jsx(Input, { type: "password", required: true, value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsx(Button, { className: "w-full", children: "Update Password" })
    ] })
  ] }) });
}
export {
  Forgot as component
};
