import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth";

const protectedRoutes = ["/admin", "/dentist", "/receptionist", "/patient"];
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/",
  "/favicon.ico",
  "/_next",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgot-password",
];

const protectedApiRoutes = [
  "/api/users",
  "/api/appointments",
  "/api/inventory",
  "/api/dashboard",
  "/api/treatments",
  "/api/invoices",
];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Allow public routes without authentication
  if (publicRoutes.some((route) => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Get session cookie
  const cookie = req.cookies.get("session")?.value;

  // Handle API routes
  if (path.startsWith("/api/")) {
    // Check if it's a protected API route
    const isProtectedApi = protectedApiRoutes.some((route) =>
      path.startsWith(route)
    );

    if (!isProtectedApi) {
      return NextResponse.next();
    }

    if (!cookie) {
      return NextResponse.json(
        { error: "Unauthorized - No session" },
        { status: 401 }
      );
    }

    try {
      const session = await decrypt(cookie);
      if (!session?.user) {
        return NextResponse.json(
          { error: "Unauthorized - Invalid session" },
          { status: 401 }
        );
      }
      return NextResponse.next();
    } catch (error) {
      console.error("API auth error:", error);
      return NextResponse.json(
        { error: "Unauthorized - Invalid token" },
        { status: 401 }
      );
    }
  }

  // Handle web routes
  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route)
  );

  // If no cookie and trying to access protected route, redirect to login
  if (!cookie && isProtectedRoute) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  // If no cookie and not a protected route, allow access
  if (!cookie) {
    return NextResponse.next();
  }

  try {
    const session = await decrypt(cookie);

    // Redirect to dashboard if accessing public route with session
    if (publicRoutes.includes(path) && session?.user) {
      const role = session.user.role;
      return NextResponse.redirect(new URL(`/${role}/dashboard`, req.nextUrl));
    }

    // Check role-based access for protected routes
    if (isProtectedRoute && session?.user) {
      const userRole = session.user.role;
      const requestedRole = path.split("/")[1];

      if (userRole !== requestedRole) {
        return NextResponse.redirect(
          new URL(`/${userRole}/dashboard`, req.nextUrl)
        );
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Auth error:", error);
    // If token is invalid, redirect to login for protected routes
    if (isProtectedRoute) {
      return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/|.*\\.png$).*)",
  ],
};
