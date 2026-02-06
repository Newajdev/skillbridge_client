import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

export async function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    let isAuthenticated = false;
    let role = "";

    const { data } = await userService.getSession();

    if (data) {
        isAuthenticated = true;
        role = data.user.role;
    }

    //* User in not authenticated at all
    if (!isAuthenticated) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    //* Additional role-based redirection logic can be added here
    //* For SkillBridge, many dashboards might be under the same /dashboard path
    //* using parallel routes, but we still ensure they are authenticated.

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
