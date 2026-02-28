import { Route } from "@/types";

export const studentRoutes: Route[] = [
    {
        title: "Student Portal",
        items: [
            {
                name: "Dashboard",
                url: "/student-dashboard",
            },
            {
                name: "My Bookings",
                url: "/student-dashboard/my-bookings",
            },
            {
                name: "Profile",
                url: "/student-dashboard/profile",
            }
        ]
    }

]