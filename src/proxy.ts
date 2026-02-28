import { NextRequest, NextResponse } from "next/server";
import { Roles } from "./constans/roles";
import { env } from "@/env";

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
  let isAuthenticated = false;
  let isAdmin = false;
  let isTutor = false;
  let isStudent = false;

  const cookie = request.cookies.toString();
  const data = await getSession(cookie);

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
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (pathname.startsWith("/tutor-dashboard") && !isTutor) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if (pathname.startsWith("/student-dashboard") && !isStudent) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard/:path*",
    "/tutor-dashboard/:path*",
    "/student-dashboard/:path*",
  ],
};
