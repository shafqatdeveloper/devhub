// app/(Auth)/verify-email/page.jsx
import { Suspense } from "react";
import VerifyEmailComponent from "@/app/components/Auth/Verify";

export const dynamic = "force-dynamic"; // avoid prerender issues

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-sm text-gray-500">
          Loading…
        </div>
      }
    >
      <VerifyEmailComponent />
    </Suspense>
  );
}
