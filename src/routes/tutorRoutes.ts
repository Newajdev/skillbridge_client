import { Route } from "@/types";

export const tutorRoutes : Route[] = [
    {
        title: "Tutor Portal",
        items: [
             {
        name: "Dashboard",
        url: "/tutor-dashboard/analytics",
    },
    {
        name: "Sessions Menagement",
        url: "/tutor-dashboard/manage-sessions"
    },
    {
        name: "Schedule management",
        url: "/tutor-dashboard/manage-slot",
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