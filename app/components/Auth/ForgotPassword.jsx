"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import TextInput from "../Inputs/TextInput";
import BaseButton from "../Buttons/BaseButton";

// simple zod schema
import { z } from "zod";
import { AuthAPI } from "@/app/services/authServices";

const forgotPasswordSchema = z.object({
    email: z.string().email("Enter a valid email"),
});

const ForgotPasswordComponent = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const links = [
        { title: "About", href: "/about" },
        { title: "Contact", href: "/contact" },
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
        { title: "Help", href: "/help" },
    ];

    async function onSubmit(values) {
        try {
            const { data } = await AuthAPI.forgotPassword(values?.email);
            toast.success(data?.message || "Reset link sent to your email");
            setTimeout(() => {
                router.push("/login");
            }, 1500);
        } catch (error) {
            const msg =
                error?.response?.data?.error ||
                error?.message ||
                "Something went wrong";
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
                <h1 className="text-3xl md:text-4xl text-center font-extralight pb-4 text-textBlack dark:text-textWhite">
                    DevHub
                </h1>

                <div className="flex flex-col gap-3 w-full">
                    <TextInput
                        id="email"
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email")}
                        error={errors.email}
                        className="text-textBlack dark:text-textWhite placeholder:text-gray-400"
                    />

                    <BaseButton
                        title="Send Reset Link"
                        id="forgot-password-button"
                        disabled={isSubmitting}
                        isSubmitting={isSubmitting}
                        classNames="text-textWhite w-full"
                    />
                </div>

                <div className="flex justify-center items-center my-2 sm:my-3.5">
                    <span className="px-2 text-gray-400 text-sm">
                        Remember your password?
                    </span>
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
                <span>
                    &copy; {new Date().getFullYear()} DevHub. All rights reserved.
                </span>
            </div>
        </div>
    );
};

export default ForgotPasswordComponent;
