import { Route } from "@/types";
import { LayoutDashboard, Users, Calendar, FolderTree } from "lucide-react";

export const adminRoutes: Route[] = [
    {
        title: "Dashboard",
        items: [
            {
                title: "Overview",
                url: "/dashboard/admin",
                icon: LayoutDashboard,
            },
            {
                title: "Users",
                url: "/dashboard/admin/users",
                icon: Users,
            },
            {
                title: "Bookings",
                url: "/dashboard/admin/bookings",
                icon: Calendar,
            },
            {
                title: "Categories",
                url: "/dashboard/admin/categories",
                icon: FolderTree,
            },
        ],
    },
];
