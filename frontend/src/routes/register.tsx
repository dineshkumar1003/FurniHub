import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";

import { useState } from "react";

import { Shell } from "@/components/layout/Shell";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Checkbox } from "@/components/ui/checkbox";

import { useAuth } from "@/context/AuthContext";

import {
  sendOtp,
  verifyOtp,
} from "@/services/otpService";

import inspo from "@/assets/inspo-2.jpg";

export const Route =
  createFileRoute("/register")({
    head: () => ({
      meta: [
        {
          title:
            "Create account — FurniHub",
        },
      ],
    }),
    component: RegisterPage,
  });

function RegisterPage() {
  const { register } = useAuth();

  const nav = useNavigate();

  const [f, setF] = useState({
    name: "",
    email: "",
    phone: "",
    pwd: "",
    confirm: "",
  });

  const [otp, setOtp] =
    useState("");

  const [otpSent, setOtpSent] =
    useState(false);

  const [otpVerified,
    setOtpVerified] =
    useState(false);

  const sendOtpHandler =
    async () => {
      try {
        await sendOtp(
          f.email
        );

        setOtpSent(true);

        alert(
          "OTP Sent Successfully"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Failed to Send OTP"
        );
      }
    };

  const verifyOtpHandler =
    async () => {
      try {
        await verifyOtp(
          f.email,
          otp
        );

        setOtpVerified(true);

        alert(
          "OTP Verified Successfully"
        );
      } catch (error) {
        console.log(error);

        alert("Invalid OTP");
      }
    };

  const submitHandler =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (
        f.pwd !==
        f.confirm
      ) {
        alert(
          "Passwords do not match"
        );

        return;
      }

      if (!otpVerified) {
        alert(
          "Please Verify OTP First"
        );

        return;
      }

      try {
        await register(
          f.name,
          f.email,
          f.phone,
          f.pwd
        );

        nav({
          to: "/dashboard",
        });
      } catch (error) {
        console.log(error);

        alert(
          "Registration Failed"
        );
      }
    };

  return (
    <Shell>
      <div className="mx-auto grid min-h-[80vh] max-w-7xl gap-0 px-0 md:grid-cols-2">
        <div className="flex items-center px-4 py-16 md:px-16">
          <form
            className="w-full max-w-sm space-y-5"
            onSubmit={
              submitHandler
            }
          >
            <h1 className="font-display text-3xl">
              Create your account
            </h1>

            <div>
              <Label>
                Full Name
              </Label>

              <Input
                required
                value={f.name}
                onChange={(e) =>
                  setF({
                    ...f,
                    name:
                      e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>

            <div>
              <Label>
                Email
              </Label>

              <Input
                type="email"
                required
                value={f.email}
                onChange={(e) =>
                  setF({
                    ...f,
                    email:
                      e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>

            <Button
              type="button"
              className="w-full"
              onClick={
                sendOtpHandler
              }
            >
              Send OTP
            </Button>

            {otpSent && (
              <>
                <Input
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value
                    )
                  }
                />

                <Button
                  type="button"
                  className="w-full"
                  onClick={
                    verifyOtpHandler
                  }
                >
                  Verify OTP
                </Button>
              </>
            )}

            {otpVerified && (
              <p className="text-green-600 text-sm">
                OTP Verified
                Successfully
              </p>
            )}

            <div>
              <Label>
                Mobile Number
              </Label>

              <Input
                required
                value={f.phone}
                onChange={(e) =>
                  setF({
                    ...f,
                    phone:
                      e.target.value,
                  })
                }
                className="mt-2"
              />
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <Label>
                  Password
                </Label>

                <Input
                  type="password"
                  required
                  value={f.pwd}
                  onChange={(e) =>
                    setF({
                      ...f,
                      pwd:
                        e.target.value,
                    })
                  }
                  className="mt-2"
                />
              </div>

              <div>
                <Label>
                  Confirm Password
                </Label>

                <Input
                  type="password"
                  required
                  value={f.confirm}
                  onChange={(e) =>
                    setF({
                      ...f,
                      confirm:
                        e.target
                          .value,
                    })
                  }
                  className="mt-2"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm">
              <Checkbox required />
              I agree to the
              Terms & Privacy
            </label>

            <Button
              size="lg"
              className="w-full rounded-sm"
              type="submit"
            >
              Create Account
            </Button>

            <p className="text-sm text-muted-foreground">
              Have an account?{" "}
              <Link
                to="/login"
                className="text-foreground underline"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>

        <div className="hidden md:block">
          <img
            src={inspo}
            alt=""
            className="size-full object-cover"
          />
        </div>
      </div>
    </Shell>
  );
}