// app/(Auth)/login/page.jsx
import { Suspense } from "react";
import LoginComponent from "@/app/components/Auth/Login";
import { getUserFromCookies } from "@/app/lib/server/auth";
// import { redirect } from "next/navigation"; // optional

export const metadata = {
  title: "Login - DevHub",
  description: "Find the best tools and resources for developers.",
  keywords: "developer, resources, tools",
  authors: [{ name: "DevHub" }],
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const user = await getUserFromCookies();

  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center text-sm text-gray-500">
          Loading…
        </div>
      }
    >
      <LoginComponent user={user} />
    </Suspense>
  );
}
