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
import { adminRoutes, tutorRoutes, studentRoutes } from "@/routes";
import { Route } from "@/types";
import { GraduationCap } from "lucide-react";

export function AppSidebar({
    user,
    ...props
}: {
    user: { role: string; name?: string; email?: string };
} & React.ComponentProps<typeof Sidebar>) {
    let routes: Route[] = [];

    switch (user.role.toUpperCase()) {
        case "ADMIN":
            routes = adminRoutes;
            break;
        case "TUTOR":
            routes = tutorRoutes;
            break;
        case "STUDENT":
            routes = studentRoutes;
            break;
        default:
            routes = [];
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
                {routes.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                {item.icon && <item.icon />}
                                                <span>{item.title}</span>
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
