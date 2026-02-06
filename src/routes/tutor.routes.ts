import { Route } from "@/types";
import { LayoutDashboard, Calendar, UserCircle } from "lucide-react";

export const tutorRoutes: Route[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/dashboard/tutor",
                icon: LayoutDashboard,
            },
            {
                title: "My Bookings",
                url: "/dashboard/tutor/bookings",
                icon: Calendar,
            },
            {
                title: "Profile",
                url: "/dashboard/tutor/profile",
                icon: UserCircle,
            },
        ],
    },
];
