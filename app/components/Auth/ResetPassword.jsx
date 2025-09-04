"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useSearchParams, useRouter } from "next/navigation";
import PasswordInput from "../Inputs/PasswordInput";
import BaseButton from "../Buttons/BaseButton";
import { AuthAPI } from "@/app/services/authServices";

const resetSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(128, "Password is too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

function maskEmail(email) {
  if (!email || !email.includes("@")) return email || "";
  const [user, domain] = email.split("@");
  const head = user.slice(0, 2);
  return `${head}${user.length > 2 ? "****" : ""}@${domain}`;
}

const ResetPasswordComponent = () => {
  const router = useRouter();
  const search = useSearchParams();

  const token = search.get("token");
  const email = search.get("email");
  const masked = useMemo(() => maskEmail(email), [email]);
  const canReset = Boolean(token && email);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(resetSchema),
  });

  const links = [
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Help", href: "/help" },
  ];

  async function onSubmit(values) {
    if (!canReset) {
      toast.error("Invalid or missing token/email in the URL.");
      return;
    }
    try {
      const { data } = await AuthAPI.resetPassword({
        token,
        email,
        password: values.password,
      });
      toast.success(data?.message || "Password reset successful");
      reset();
      setTimeout(() => router.replace("/login"), 1200);
    } catch (error) {
      const msg =
        error?.response?.data?.error ||
        error?.message ||
        "Failed to reset password. The link may be invalid or expired.";
      toast.error(String(msg));
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      {/* Form Input */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md flex flex-col gap-5 px-5"
      >
        <h1 className="text-3xl md:text-4xl text-center font-extralight pb-1 text-textBlack dark:text-textWhite">
          DevHub
        </h1>

        <p className="text-center text-sm text-textGray">
          Reset password for <span className="font-medium">{masked || "—"}</span>
        </p>

        {!canReset && (
          <p className="text-center text-xs text-red-500 -mt-2">
            Invalid or missing token/email. Please use the link from your email.
          </p>
        )}

        <div className="flex flex-col gap-3 w-full">
          <PasswordInput
            id="password"
            label="New Password"
            placeholder="********"
            {...register("password")}
            error={errors.password}
            className="text-textBlack dark:text-textWhite placeholder:text-gray-400"
          />

          <PasswordInput
            id="confirmPassword"
            label="Confirm New Password"
            placeholder="********"
            {...register("confirmPassword")}
            error={errors.confirmPassword}
            className="text-textBlack dark:text-textWhite placeholder:text-gray-400"
          />

          <BaseButton
            title="Reset Password"
            id="reset-password-button"
            disabled={isSubmitting || !canReset}
            isSubmitting={isSubmitting}
            classNames="text-textWhite w-full"
          />
        </div>

        <div className="flex justify-center items-center my-2 sm:my-3.5">
          <span className="px-2 text-gray-400 text-sm">Remember your password?</span>
          <Link
            href={"/login"}
            className="text-primaryLight border-b border-b-transparent hover:border-b-primaryLight"
          >
            Back to Login
          </Link>
        </div>
      </form>

      {/* Pages Links */}
      <div className="px-5 absolute bottom-10 lg:bottom-16 w-full flex items-center justify-center gap-x-6 gap-y-3 flex-wrap text-sm md:text-base">
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="border-b border-b-transparent hover:border-b-primaryLight text-textGray hover:text-primaryLight"
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* All Rights reserved */}
      <div className="absolute bottom-2.5 lg:bottom-5 w-full flex items-center justify-center text-sm text-textGray">
        <span>&copy; {new Date().getFullYear()} DevHub. All rights reserved.</span>
      </div>
    </div>
  );
};

export default ResetPasswordComponent;
