import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hasAuth =
    request.cookies
      .getAll()
      .some((cookie) =>
        cookie.name.includes("sb-")
      );

  if (
    request.nextUrl.pathname.startsWith("/pakar") &&
    !hasAuth
  ) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/pakar/:path*"],
};