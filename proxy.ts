import { Roles } from "@/constants/roles";
import { env } from "@/env";
import { NextRequest, NextResponse } from "next/server";

const API_URL = env.API_URL;
async function getSession(cookie: string) {
  try {
    const res = await fetch(`${API_URL}/auth/get-session`, {
      headers: {
        cookie: cookie,
      },
      cache: "no-store",
    });
    const session = await res.json();
    if (!session) return null;
    return session;
  } catch (error) {
    console.log("Error fetching session in proxy", error);
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip middleware for verify-email route
  if (pathname.startsWith("/verify-email")) {
    return NextResponse.next();
  }

  // Check for session token in cookies
  const sessionToken = request.cookies.get("better-auth.session_token");

  //* User is not authenticated at all
  if (!sessionToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  let isAuthenticated = false;
  let isAdmin = false;
  let isTutor = false;
  let isStudent = false;

  const cookie = request.cookies.toString();
  const data = await getSession(cookie);
  console.log(data.user.role)

  if (data?.user) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
    isTutor = data.user.role === Roles.tutor;
    isStudent = data.user.role === Roles.student;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based protection:
  // If user tries to access a dashboard not for their role, redirect them to the main /dashboard default
  // The layout at /dashboard handles showing the correct slot.

  if (pathname.startsWith("/admin-dashboard") && !isAdmin) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname.startsWith("/tutor-dashboard") && !isTutor) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (pathname.startsWith("/student-dashboard") && !isStudent) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access if session exists
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/tutor-dashboard",
    "/tutor-dashboard/:path*",
    "/student-dashboard",
    "/student-dashboard/:path*",
  ],
};
