import { cookies } from "next/headers";

export async function getUserFromCookies() {
  const cookieStore = await cookies();
  const access = cookieStore.get("access_token")?.value;
  if (!access) return null;

  const cookieHeader = cookieStore.toString();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/me`, {
    method: "GET",
    headers: {
      cookie: cookieHeader,  
    },
    cache: "no-store",
  });

  if (!res.ok) return null;

  const data = await res.json();
  return data.user ?? data;
}
