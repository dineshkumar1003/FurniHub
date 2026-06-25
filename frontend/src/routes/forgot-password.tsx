import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "@/components/layout/Shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

import {
  sendOtp,
  verifyOtp,
  resetPassword,
} from "@/services/forgotPasswordService";

export const Route =
  createFileRoute(
    "/forgot-password"
  )({
    component: Forgot,
  });

function Forgot() {
  const [step, setStep] =
    useState<1 | 2 | 3>(1);

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const sendOtpHandler =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await sendOtp(email);

        toast.success(
          "OTP Sent Successfully"
        );

        setStep(2);
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Failed to send OTP"
        );
      }
    };

  const verifyOtpHandler =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      try {
        await verifyOtp(
          email,
          otp
        );

        toast.success(
          "OTP Verified"
        );

        setStep(3);
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Invalid OTP"
        );
      }
    };

  const resetPasswordHandler =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (
        password !==
        confirmPassword
      ) {
        toast.error(
          "Passwords do not match"
        );
        return;
      }

      try {
        await resetPassword(
          email,
          password
        );

        toast.success(
          "Password Updated Successfully"
        );
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ||
            "Reset failed"
        );
      }
    };

  return (
    <Shell>
      <div className="mx-auto max-w-md px-4 py-20">
        <h1 className="font-display text-3xl">
          Reset Password
        </h1>

        {step === 1 && (
          <form
            onSubmit={
              sendOtpHandler
            }
            className="mt-8 space-y-5"
          >
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

            <Button
              className="w-full"
            >
              Send OTP
            </Button>
          </form>
        )}

        {step === 2 && (
          <form
            onSubmit={
              verifyOtpHandler
            }
            className="mt-8 space-y-5"
          >
            <Label>
              Enter OTP
            </Label>

            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map(
                  (i) => (
                    <InputOTPSlot
                      key={i}
                      index={i}
                    />
                  )
                )}
              </InputOTPGroup>
            </InputOTP>

            <Button className="w-full">
              Verify OTP
            </Button>
          </form>
        )}

        {step === 3 && (
          <form
            onSubmit={
              resetPasswordHandler
            }
            className="mt-8 space-y-5"
          >
            <div>
              <Label>
                New Password
              </Label>

              <Input
                type="password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
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
                value={
                  confirmPassword
                }
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="mt-2"
              />
            </div>

            <Button className="w-full">
              Update Password
            </Button>
          </form>
        )}
      </div>
    </Shell>
  );
}