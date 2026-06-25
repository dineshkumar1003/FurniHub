import React, { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/context/AuthContext";
import inspo from "@/assets/inspo-1.jpg";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "@/firebase";

import { googleLogin } from "@/services/googleAuthService";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [{ title: "Sign in — FurniHub" }],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");

  React.useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      nav({
        to: "/",
        replace: true,
      });
    }
  }, [nav]);

  const handleGoogleLogin = async () => {
    try {
      const provider =
        new GoogleAuthProvider();

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const token =
        await result.user.getIdToken();

      const data =
        await googleLogin(token);

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data)
      );

      localStorage.setItem(
        "fh-user",
        JSON.stringify(data)
      );

      if (data.isAdmin) {
        window.location.href =
          "/admin";
      } else {
        window.location.href =
          "/";
      }
    } catch (error) {
      console.error(error);
      setError(
        "Google Login Failed"
      );
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setError("");

      const user =
        await login(
          email,
          pwd
        );

      if (user?.isAdmin) {
        nav({
          to: "/admin",
        });
      } else {
        nav({
          to: "/",
        });
      }
    } catch (err: any) {
      setError(
        err?.response?.data
          ?.message ||
          "Invalid email or password"
      );
    }
  };

  return (
    <Shell>
      <div className="mx-auto grid min-h-[80vh] max-w-7xl gap-0 px-0 md:grid-cols-2">
        <div className="hidden md:block">
          <img
            src={inspo}
            alt="Login"
            className="size-full object-cover"
          />
        </div>

        <div className="flex items-center px-4 py-16 md:px-16">
          <form
            className="w-full max-w-sm space-y-5"
            onSubmit={
              handleSubmit
            }
          >
            <h1 className="font-display text-3xl">
              Welcome back
            </h1>

            <p className="text-sm text-muted-foreground">
              Sign in to continue your journey.
            </p>

            {error && (
              <div className="rounded-md border border-red-300 bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <Label>
                Email
              </Label>

              <Input
                type="email"
                required
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                className="mt-2"
              />
            </div>

            <div>
              <Label>
                Password
              </Label>

              <Input
                type="password"
                required
                value={pwd}
                onChange={(e) =>
                  setPwd(
                    e.target.value
                  )
                }
                className="mt-2"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <Checkbox />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-muted-foreground hover:text-foreground"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full rounded-sm"
            >
              Sign in
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              Continue with Google
            </Button>

            <p className="text-sm text-muted-foreground">
              No account?{" "}
              <Link
                to="/register"
                className="text-foreground underline"
              >
                Create one
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Shell>
  );
}