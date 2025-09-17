// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public paths
  if (
    pathname.startsWith("/api/auth") || // NextAuth API routes
    pathname.startsWith("/_next") ||    // Next.js internals
    pathname.startsWith("/static") ||
    pathname === "/favicon.ico" ||
    pathname === "/signup"              // Public signup page
  ) {
    return NextResponse.next();
  }

  // Get token (if session exists)
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // If no token → redirect to signup
  if (!token) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  // If token exists → allow
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|static|favicon.ico).*)"],
};
