import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Server-side route protection by role. Runs before the protected pages render.
// Client-side ProtectedRoute/AdminRoute components remain as defense in depth.
export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // Admin area requires the admin role.
    if (pathname.startsWith("/admin") && token?.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      // Any non-null token means the user is authenticated. Unauthenticated
      // users are redirected to the sign-in page by next-auth.
      authorized: ({ token }) => !!token,
    },
    pages: { signIn: "/login" },
  }
);

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/cart/:path*", "/favorites/:path*", "/admin/:path*"],
};
