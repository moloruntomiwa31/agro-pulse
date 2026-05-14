import { NextRequest, NextResponse } from "next/server";

/** Routes that require authentication */
const PROTECTED_PREFIXES = ["/marketplace", "/farmer", "/rider", "/onboarding"];

/** Routes only accessible when NOT authenticated */
const AUTH_ROUTES = ["/auth/signin", "/auth/signup"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Read token from Authorization header or auth-store cookie (set by client)
  const authCookie = request.cookies.get("auth-token")?.value;

  const isProtected = PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isAuthRoute = AUTH_ROUTES.some((p) => pathname.startsWith(p));

  if (isProtected && !authCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/signin";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthRoute && authCookie) {
    const url = request.nextUrl.clone();
    url.pathname = "/marketplace";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/marketplace/:path*",
    "/farmer/:path*",
    "/rider/:path*",
    "/onboarding/:path*",
    "/auth/:path*",
  ],
};
