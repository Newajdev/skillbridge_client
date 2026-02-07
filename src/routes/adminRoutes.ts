import { Route } from "@/types";

export const adminRoutes : Route[] = [
   {
        title: "User Management",
        items: [
             {
        name: "Dashboard",
        url: "/admin-dashboard",
    },
    {
        name: "Manage Users",
        url: "/admin-dashboard/manage-users",  
    },
    {
        name: "Manage Categories",
        url: "/admin-dashboard/manage-categories",
    },
    {
        name: "Manage Bookings",
        url: "/admin-dashboard/manage-bookings",   
    },
    {
        name: "Reviews",
        url: "/admin-dashboard/reviews",
    },
    {
        name: "Settings",
        url: "/admin-dashboard/settings",
    }
        ]
   }

]