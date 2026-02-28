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
    SidebarFooter,
} from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { adminRoutes } from "@/routes/adminRoutes";
import { tutorRoutes } from "@/routes/tutorRoutes";
import { studentRoutes } from "@/routes/studentRoutes";
import { Route } from "@/types/routes.type";
import { Roles } from "@/constants/roles";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

export function AppSidebar({
    user,
    ...props
}: {
    user: { role: string; name?: string; email?: string; image?: string };
} & React.ComponentProps<typeof Sidebar>) {
    const router = useRouter();
    const pathname = usePathname();
    let routes: Route[] = []

    switch (user.role.toUpperCase()) {
        case Roles.admin:
            routes = adminRoutes;
            break;
        case Roles.tutor:
            routes = tutorRoutes
            break;
        case Roles.student:
            routes = studentRoutes;
            break;
        default:
            routes = [];
            break;
    }

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/");
                },
            },
        });
    };

    return (
        <Sidebar className="border-r border-border/40 bg-white shadow-xl" {...props}>
            <SidebarHeader className="h-24 border-b border-border/40 flex items-center justify-center px-6 pt-4 pb-2">
                <Link href="/" className="flex items-center gap-3 transition-transform hover:scale-105">
                    <Image
                        src="/logo.png"
                        alt="SkillBridge Logo"
                        width={50}
                        height={50}
                        className="object-contain"
                    />
                    <span className="font-black text-2xl tracking-tight text-[#173e72]">SkillBridge</span>
                </Link>
            </SidebarHeader>
            <SidebarContent className="px-4 py-8 gap-8">
                {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-50 mb-3 px-2">
                            {item.title}
                        </SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu className="gap-2">
                                {item.items.map((routeItem) => {
                                    const isActive = routeItem.url === "/student-dashboard" || routeItem.url === "/tutor-dashboard" || routeItem.url === "/admin-dashboard"
                                        ? pathname === routeItem.url
                                        : pathname === routeItem.url || pathname.startsWith(routeItem.url + '/');

                                    return (
                                        <SidebarMenuItem key={routeItem.name}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                                className="h-12 rounded-2xl px-4 font-bold text-muted-foreground hover:bg-[#173e72]/5 hover:text-[#173e72] transition-all data-[active=true]:bg-[#173e72] data-[active=true]:text-white data-[active=true]:shadow-md"
                                            >
                                                <Link href={routeItem.url}>
                                                    <span className="text-[15px]">{routeItem.name}</span>
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarFooter className="p-6 border-t border-border/40 bg-slate-50/50">
                <div className="flex flex-col gap-4">
                    {user.name && (
                        <div className="flex items-center gap-3 px-2 mb-2">
                            <div className="flex flex-col overflow-hidden">
                                <span className="text-sm font-bold text-[#173e72] truncate">{user.name}</span>
                                <span className="text-xs font-semibold text-muted-foreground capitalize truncate">{user.role.toLowerCase()} Account</span>
                            </div>
                        </div>
                    )}
                    <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="w-full justify-start h-12 rounded-2xl font-bold bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 border-none shadow-none group transition-all"
                    >
                        <LogOut className="mr-3 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                        Log Out securely
                    </Button>
                </div>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
