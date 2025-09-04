import { Suspense } from "react";
import ResetPasswordComponent from "@/app/components/Auth/ResetPassword";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-sm text-gray-500">
          Loading…
        </div>
      }
    >
      <ResetPasswordComponent />
    </Suspense>
  );
}
