import { Route } from "@/types";

export const studentRoutes: Route[] = [
    {
        title: "User Management",
        items: [
             {
        name: "Dashboard",
        url: "/student-dashboard",
    },
    {
        name: "Browse Tutors",
        url: "/student-dashboard/browse-tutors",   
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