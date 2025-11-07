import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STORAGE_KEYS } from "@/constants";

export function proxy(request: NextRequest) {
  const token = request.cookies.get(STORAGE_KEYS.token)?.value;
  const pathname = request.nextUrl.pathname;

  const isAuthPage = pathname === "/";
  const isDashboardPage = pathname.startsWith("/dashboard");

  if (!token && isDashboardPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
