import { Route } from "@/types";
import { Calendar, UserCircle } from "lucide-react";

export const studentRoutes: Route[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "My Bookings",
                url: "/dashboard/student/bookings",
                icon: Calendar,
            },
            {
                title: "Profile",
                url: "/dashboard/student/profile",
                icon: UserCircle,
            },
        ],
    },
];
