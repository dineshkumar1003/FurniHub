import { jsx, jsxs } from "react/jsx-runtime";
import React__default, { useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { S as Shell, I as Input, B as Button } from "./Shell-BI-QiD32.js";
import { L as Label } from "./label-C93B3-1h.js";
import { C as Checkbox } from "./checkbox-tCCCTH2f.js";
import { b as useAuth } from "./router-mRfm6bnQ.js";
import { i as inspo1 } from "./inspo-1-BvBXzaVU.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";
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
const firebaseConfig = {
  apiKey: "AIzaSyDF15lPxn7D_Hf88OKn6o1izmGRJuQa1qg",
  authDomain: "furnihub-8611c.firebaseapp.com",
  projectId: "furnihub-8611c",
  storageBucket: "furnihub-8611c.firebasestorage.app",
  messagingSenderId: "817264791177",
  appId: "1:817264791177:web:8fa44cd3dbb57be4d94058"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleLogin = async (token) => {
  const { data } = await axios.post(
    "https://furnihub-hlkx.onrender.com/api/auth/google",
    { token }
  );
  return data;
};
function LoginPage() {
  const {
    login
  } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  React__default.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      nav({
        to: "/",
        replace: true
      });
    }
  }, [nav]);
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      const data = await googleLogin(token);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("fh-user", JSON.stringify(data));
      if (data.isAdmin) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }
    } catch (error2) {
      console.error(error2);
      setError("Google Login Failed");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      const user = await login(email, pwd);
      if (user?.isAdmin) {
        nav({
          to: "/admin"
        });
      } else {
        nav({
          to: "/"
        });
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Invalid email or password");
    }
  };
  return /* @__PURE__ */ jsx(Shell, { children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid min-h-[80vh] max-w-7xl gap-0 px-0 md:grid-cols-2", children: [
    /* @__PURE__ */ jsx("div", { className: "hidden md:block", children: /* @__PURE__ */ jsx("img", { src: inspo1, alt: "Login", className: "size-full object-cover" }) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center px-4 py-16 md:px-16", children: /* @__PURE__ */ jsxs("form", { className: "w-full max-w-sm space-y-5", onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx("h1", { className: "font-display text-3xl", children: "Welcome back" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: "Sign in to continue your journey." }),
      error && /* @__PURE__ */ jsx("div", { className: "rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-600", children: error }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Email" }),
        /* @__PURE__ */ jsx(Input, { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { children: "Password" }),
        /* @__PURE__ */ jsx(Input, { type: "password", required: true, value: pwd, onChange: (e) => setPwd(e.target.value), className: "mt-2" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between text-sm", children: [
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(Checkbox, {}),
          "Remember me"
        ] }),
        /* @__PURE__ */ jsx(Link, { to: "/forgot-password", className: "text-muted-foreground hover:text-foreground", children: "Forgot password?" })
      ] }),
      /* @__PURE__ */ jsx(Button, { type: "submit", size: "lg", className: "w-full rounded-sm", children: "Sign in" }),
      /* @__PURE__ */ jsx(Button, { type: "button", variant: "outline", className: "w-full", onClick: handleGoogleLogin, children: "Continue with Google" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        "No account?",
        " ",
        /* @__PURE__ */ jsx(Link, { to: "/register", className: "text-foreground underline", children: "Create one" })
      ] })
    ] }) })
  ] }) });
}
export {
  LoginPage as component
};
