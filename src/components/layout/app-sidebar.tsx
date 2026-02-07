"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

import { GraduationCap } from "lucide-react";
import { adminRoutes } from "@/routes/adminRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";
import { studentRoutes } from "@/routes/studentRoutes";
import { Route } from "@/types/routes.type";

export function AppSidebar({
    user,
    ...props
}: {
    user: { role: string};
} & React.ComponentProps<typeof Sidebar>) {
    let routes: Route[] = []

    switch(user.role.toUpperCase()) {
        case "ADMIN":
            routes = adminRoutes;
            break;
        case "TUTOR":
            routes = tutorRoutes
            break;
        case "STUDENT":
            routes = studentRoutes;
            break; 
        default:
            routes =[];
            break;
    }
    

    return (
        <Sidebar {...props}>
            <SidebarHeader className="h-16 border-b flex items-center px-6">
                <Link href="/" className="flex items-center gap-2">
                    <GraduationCap className="size-6 text-primary" />
                    <span className="font-bold text-xl tracking-tight">SkillBridge</span>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.name}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                <span>{item.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
