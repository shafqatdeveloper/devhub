import { NextResponse } from "next/server";

const PUBLIC_ROUTES = [
 "/about","/verify-email", "/contact", "/login", "/signup", "/privacy", "/terms", "/help","/forgot-password","/reset-password"
];

const isPublic = (pathname) =>
  PUBLIC_ROUTES.some((base) => pathname === base || pathname.startsWith(base + "/"));

export function middleware(req) {
  const { pathname, search } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/static") ||
    pathname.match(/\.(?:png|jpg|jpeg|gif|svg|ico|css|js|txt|woff2?)$/)
  ) return NextResponse.next();

  if (isPublic(pathname)) return NextResponse.next();

  const session = req.cookies.get("access_token")?.value;
  if (session) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("callback", pathname + search);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
