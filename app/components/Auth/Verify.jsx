"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthAPI } from "@/app/services/authServices";
import BaseButton from "../Buttons/BaseButton";
import ButtonLoader from "../Loaders/ButtonLoader";

function maskEmail(email) {
    if (!email || !email.includes("@")) return email || "";
    const [user, domain] = email.split("@");
    const head = user.slice(0, 2);
    return `${head}${user.length > 2 ? "****" : ""}@${domain}`;
}

function truncateToken(t) {
    if (!t) return "";
    if (t.length <= 12) return t;
    return `${t.slice(0, 6)}…${t.slice(-6)}`;
}

export default function VerifyEmailComponent() {
    const router = useRouter();
    const search = useSearchParams();
    const token = search.get("token");
    const email = search.get("email");

    const [verifying, setVerifying] = useState(false);
    const [resending, setResending] = useState(false);
    const [status, setStatus] = useState(/** "idle" | "success" | "error" */ "idle");

    const masked = useMemo(() => maskEmail(email), [email]);

    const canVerify = Boolean(token && email);

    async function handleVerify() {
        if (!canVerify) {
            toast.error("Invalid verification link.");
            return;
        }
        try {
            setVerifying(true);
            const { data } = await AuthAPI.verifyEmail({ token, email });
            toast.success(String(data?.message ?? "Email verified successfully"));
            setStatus("success");
            setTimeout(() => router.replace("/login"), 1500);
        } catch (error) {
            const msg =
                error?.details?.error ||
                error?.message ||
                "Verification failed. The link may be invalid or expired.";
            toast.error(String(msg));
            setStatus("error");
        } finally {
            setVerifying(false);
        }
    }

    async function handleResend() {
        if (!email) {
            toast.error("Missing email to resend verification.");
            return;
            setResending(false);
        }
        try {
            setResending(true);
            const { data } = await AuthAPI.resendVerification({ email });
            toast.success(String(data?.message ?? "Verification email resent"));
        } catch (error) {
            const msg = error?.details?.error || error?.message || "Failed to resend verification email.";
            toast.error(String(msg));
        } finally {
            setResending(false);
        }
    }

    return (
        <div className="min-h-[70vh] w-full flex items-center justify-center px-4">
            <div className="w-full max-w-lg rounded-2xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-[#171717] p-6 sm:p-8 shadow-sm">
                <h1 className="text-2xl sm:text-3xl font-semibold text-textBlack text-center pb-10 dark:text-textWhite">
                    Verify your email
                </h1>

                <p className="mt-2 text-sm text-textGray">
                    Click the button below to verify and activate your DevHub account.
                </p>

                <div className="mt-5 space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                        <span className="text-textGray">Email</span>
                        <span className="font-medium text-textBlack dark:text-textWhite">
                            {masked || "—"}
                        </span>
                    </div>
                    {!canVerify && (
                        <p className="text-xs text-red-500 mt-2">
                            Invalid or missing token/email in the URL.
                        </p>
                    )}
                </div>

                <div className="mt-10 flex flex-col gap-2 ">
                    <button
                        type="button"
                        onClick={handleVerify}
                        disabled={!email || verifying}
                        className="inline-flex items-center h-11 justify-center rounded-lg bg-primaryLight px-4 py-2 border border-gray-300 dark:border-gray-600 text-textBlack dark:text-textWhite"
                    >
                        {
                            verifying ? <ButtonLoader /> : "Verify"
                        }
                    </button>

                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={!email || verifying}
                        className="inline-flex items-center h-11 justify-center rounded-lg px-4 py-2 border border-gray-300 dark:border-gray-600 text-textBlack dark:text-textWhite"
                    >
                        {
                            resending ? <ButtonLoader /> : "Resend Verification Email"
                        }
                    </button>
                </div>

                {status === "success" && (
                    <p className="mt-4 text-sm text-green-600">
                        Success! Redirecting you to login…
                    </p>
                )}
                {status === "error" && (
                    <p className="mt-4 text-sm text-red-500">
                        Couldn’t verify. You can try resending the verification email.
                    </p>
                )}
            </div>
        </div>
    );
}
