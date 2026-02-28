"use client";

import React from 'react';
import { adminService } from "@/services/admin.service";
import { TopDesign } from "@/components/ui/topDesign";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Users,
    BookCheck,
    Layers,
    Star,
    TrendingUp,
    UserCheck,
    AlertTriangle,
    ShieldCheck
} from "lucide-react";

interface AdminDashboardClientProps {
    users: any[];
    reviews: any[];
}

export default function AdminDashboardClient({ users, reviews }: AdminDashboardClientProps) {
    // Quick statistics
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === "ACTIVE").length;
    const bannedUsers = users.filter(u => u.status === "BANNED").length;
    const tutors = users.filter(u => u.role === "TUTOR").length;
    const students = users.filter(u => u.role === "STUDENT").length;
    const totalReviews = reviews.length;
    const avgRating = reviews.length > 0
        ? (reviews.reduce((acc, r) => acc + (r.rating || 0), 0) / reviews.length).toFixed(1)
        : "N/A";

    const stats = [
        {
            title: "Total Users",
            value: totalUsers,
            icon: Users,
            color: "bg-blue-50 text-blue-600",
            description: `${tutors} Tutors, ${students} Students`
        },
        {
            title: "Active Nodes",
            value: activeUsers,
            icon: UserCheck,
            color: "bg-emerald-50 text-emerald-600",
            description: "Verified active accounts"
        },
        {
            title: "Banned Users",
            value: bannedUsers,
            icon: AlertTriangle,
            color: "bg-rose-50 text-rose-600",
            description: "Restricted access nodes"
        },
        {
            title: "Platform Rating",
            value: avgRating,
            icon: Star,
            color: "bg-amber-50 text-amber-600",
            description: `Based on ${totalReviews} reviews`
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            <TopDesign />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20 space-y-8 animate-in fade-in duration-700">
                {/* Header */}
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-[#173e72] text-white rounded-[2rem] shadow-2xl shadow-blue-900/20">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <div className="text-white">
                        <h1 className="text-3xl font-black tracking-tight">System Control</h1>
                        <p className="text-white/60 font-medium">Platform architecture overview and monitoring.</p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stats.map((stat, idx) => (
                        <Card key={idx} className="border-none shadow-xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden transition-all hover:scale-[1.02] duration-300">
                            <CardContent className="p-8">
                                <div className="flex items-start justify-between">
                                    <div className={`p-4 rounded-2xl ${stat.color} shadow-inner`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                    <TrendingUp className="h-5 w-5 text-slate-200" />
                                </div>
                                <div className="mt-6">
                                    <h3 className="text-4xl font-black text-[#173e72] tracking-tighter">{stat.value}</h3>
                                    <p className="text-sm font-bold text-[#173e72]/40 uppercase tracking-widest mt-1">{stat.title}</p>
                                    <div className="mt-4 pt-4 border-t border-slate-50">
                                        <p className="text-xs font-bold text-slate-400">{stat.description}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Recent Users List */}
                    <Card className="lg:col-span-2 border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden">
                        <CardHeader className="p-10 pb-0 flex flex-row items-center justify-between">
                            <CardTitle className="text-2xl font-black text-[#173e72] tracking-tight flex items-center gap-3">
                                <span className="h-8 w-1.5 bg-[#173e72] rounded-full" />
                                Recent User Nodes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-10 pt-6">
                            <div className="space-y-4">
                                {users.slice(0, 5).map((user) => (
                                    <div key={user.id} className="group p-5 rounded-[2rem] border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-lg transition-all duration-300 flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-2xl bg-[#173e72]/5 flex items-center justify-center font-black text-[#173e72] border border-[#173e72]/10 uppercase">
                                                {user.name?.charAt(0) || "U"}
                                            </div>
                                            <div>
                                                <p className="font-black text-[#173e72]">{user.name}</p>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{user.role}</p>
                                            </div>
                                        </div>
                                        <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${user.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                                            }`}>
                                            {user.status}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Launch Panel */}
                    <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden">
                        <CardHeader className="p-10">
                            <CardTitle className="text-2xl font-black text-[#173e72] tracking-tight">System Access</CardTitle>
                        </CardHeader>
                        <CardContent className="px-10 pb-10 space-y-4">
                            {[
                                { name: "Manage Users", icon: Users, url: "/admin-dashboard/manage-users" },
                                { name: "Manage Bookings", icon: BookCheck, url: "/admin-dashboard/manage-bookings" },
                                { name: "Manage Categories", icon: Layers, url: "/admin-dashboard/manage-categories" }
                            ].map((item, idx) => (
                                <a key={idx} href={item.url} className="flex items-center justify-between p-5 rounded-[2rem] bg-[#173e72] text-white hover:bg-black transition-all group">
                                    <div className="flex items-center gap-4">
                                        <item.icon className="h-5 w-5 opacity-60 group-hover:opacity-100 transition-opacity" />
                                        <span className="font-bold tracking-tight">{item.name}</span>
                                    </div>
                                    <TrendingUp className="h-4 w-4 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                </a>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
