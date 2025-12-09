import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function proxy(req) {
  const token = req.cookies.get("token")?.value;
  const decoded = token ? verifyToken(token) : null;

  if (!decoded && req.nextUrl.pathname.startsWith("/dashboard")) {
    // Redirect blocks access to /dashboard
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Allow request to continue
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
