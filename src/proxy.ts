import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.servce";
import { Roles } from "./constans/roles";

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  let isAuthenticated = false;
  let isAdmin = false;
  let isTutor = false;
  let isStudent = false;

  const { data } = await userService.getSesion();

  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.ADMIN;
    isTutor = data.user.role === Roles.TUTOR;
    isStudent = data.user.role === Roles.STUDENT;
  }

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (!isAdmin && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  } else if (!isTutor && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/tutor-dashboard", request.url));
  } else if (!isStudent && pathname.startsWith("/dashboard/student")) {
    return NextResponse.redirect(new URL("/student-dashboard", request.url));
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
