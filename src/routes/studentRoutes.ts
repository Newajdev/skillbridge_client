import { Route } from "@/types";

export const studentRoutes: Route[] = [
    {
        title: "User Management",
        items: [
            {
                name: "Dashboard",
                url: "/dashboard/student-dashboard",
            },
            {
                name: "Browse Tutors",
                url: "/dashboard/browse-tutors",
            },
            {
                name: "My Bookings",
                url: "/dashboard/my-bookings",
            },
            {
                name: "Profile",
                url: "/dashboard/profile",
            }
        ]
    }

]