import { Route } from "@/types";

export const tutorRoutes : Route[] = [
    {
        title: "User Management",
        items: [
             {
        name: "Dashboard",
        url: "/tutor-dashboard",
    },
    {
        name: "My Sessions",
        url: "/tutor-dashboard/my-sessions"
    },
    {
        name: "Manage Availability",
        url: "/tutor-dashboard/manage-availability",
    },
    {
        name: "Earnings",
        url: "/tutor-dashboard/earnings",
    },
    {
        name: "Profile",
        url: "/tutor-dashboard/profile",
    } 
        ]
   }
    
]