import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({ children }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("access_token")?.value;

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}
