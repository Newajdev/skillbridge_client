"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Users,
    Calendar,
    Star,
    ArrowUpRight,
    ArrowDownRight,
    Users2,
    Clock,
    CheckCircle2,
    CalendarCheck,
    ChevronRight,
    UserPlus,
    LayoutDashboard,
    Sparkles,
    PlayCircle
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';

interface Booking {
    id: string;
    status: string;
    price: number | string;
    createdAt: string;
    student: {
        user: {
            name: string;
            image: string | null;
            email: string;
        }
    };
    slot: {
        day: string;
        startTime: string;
        endTime: string;
    };
}

interface TutorDashboardClientProps {
    initialBookings: Booking[];
}

export default function TutorDashboardClient({ initialBookings }: TutorDashboardClientProps) {
    // Derived Stats
    const totalStudents = new Set(initialBookings.map(b => b.student?.user?.email)).size;
    const pendingRequests = initialBookings.filter(b => b.status === "PENDING").length;
    const ongoingSessions = initialBookings.filter(b => b.status === "ONGOING").length;
    const confirmedUpcoming = initialBookings.filter(b => b.status === "CONFIRMED").length;

    const recentBookings = [...initialBookings]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);

    const stats = [
        {
            title: "Total Students",
            value: totalStudents.toString(),
            icon: Users2,
            color: "text-blue-600",
            bg: "bg-blue-50",
            description: "Unique students tutored"
        },
        {
            title: "Pending Requests",
            value: pendingRequests.toString(),
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
            description: "Awaiting your approval"
        },
        {
            title: "Ongoing Classes",
            value: ongoingSessions.toString(),
            icon: PlayCircle,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            description: "Classes currently in progress"
        },
        {
            title: "Booked Sessions",
            value: confirmedUpcoming.toString(),
            icon: CalendarCheck,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            description: "Confirmed upcoming sessions"
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-[#173e72] text-white rounded-[2rem] shadow-2xl shadow-blue-900/20">
                        <LayoutDashboard className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Tutor Dashboard</h1>
                        <p className="text-white/60 font-medium">Welcome back! Here's what's happening today.</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-12 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white hover:text-[#173e72] font-bold px-6 border backdrop-blur-md transition-all" asChild>
                        <Link href="/tutor-dashboard/manage-slot">
                            <Calendar className="mr-2 h-4 w-4" /> Manage Slots
                        </Link>
                    </Button>
                    <Button className="h-12 rounded-2xl bg-white text-[#173e72] hover:bg-blue-50 font-black px-6 shadow-xl transition-all active:scale-95" asChild>
                        <Link href="/tutor-dashboard/manage-sessions">
                            <Sparkles className="mr-2 h-5 w-5" /> Start Teaching
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden hover:scale-[1.03] transition-all duration-300">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-slate-300" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{stat.title}</h3>
                                <p className="text-3xl font-black text-[#173e72] tracking-tighter">{stat.value}</p>
                                <p className="text-[10px] font-bold text-slate-500">{stat.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Activities Section */}
                <Card className="lg:col-span-2 border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden">
                    <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-black text-[#173e72]">Recent Inquiries</CardTitle>
                            <CardDescription className="font-medium">Latest student booking requests.</CardDescription>
                        </div>
                        <Button variant="ghost" className="text-[#173e72] font-black text-xs uppercase tracking-widest hover:bg-slate-50 rounded-xl" asChild>
                            <Link href="/tutor-dashboard/manage-sessions">View All <ChevronRight className="ml-1 h-3 w-3" /></Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        {recentBookings.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UserPlus className="h-8 w-8 text-slate-200" />
                                </div>
                                <p className="text-slate-400 font-bold">No recent requests found</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentBookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-5 bg-[#f8fafc] rounded-[2rem] border border-slate-100 group hover:border-[#173e72]/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-12 w-12 border-2 border-white shadow-md">
                                                <AvatarImage src={booking.student.user.image || ""} />
                                                <AvatarFallback className="bg-white text-[#173e72] font-black uppercase">
                                                    {booking.student.user.name.substring(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-black text-[#173e72] leading-none mb-1">{booking.student.user.name}</span>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{booking.slot.day} • {booking.slot.startTime}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Badge className={cn(
                                                "rounded-full px-3 py-1 font-black text-[9px] uppercase tracking-widest border-none ring-1 ring-inset",
                                                booking.status === "PENDING" ? "bg-amber-50 text-amber-600 ring-amber-500/10" :
                                                    booking.status === "CONFIRMED" ? "bg-indigo-50 text-indigo-600 ring-indigo-500/10" :
                                                        booking.status === "ONGOING" ? "bg-sky-50 text-sky-600 ring-sky-500/10" :
                                                            "bg-slate-50 text-slate-600 ring-slate-500/10"
                                            )}>
                                                {booking.status}
                                            </Badge>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-white hover:shadow-md" asChild>
                                                <Link href="/tutor-dashboard/manage-sessions">
                                                    <ChevronRight className="h-4 w-4 text-[#173e72]" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Progress / Motivation Card */}
                <div className="space-y-6">
                    <Card className="border-none shadow-2xl bg-[#173e72] rounded-[3rem] overflow-hidden text-white relative h-full">
                        <div className="absolute -bottom-10 -right-10 opacity-10">
                            <Star className="h-64 w-64 fill-current" />
                        </div>
                        <CardHeader className="p-8 pt-10">
                            <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-2xl font-black">Teaching Streak</CardTitle>
                            <CardDescription className="text-white/50 font-medium">You're doing great, keep helping students achieve their goals!</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0">
                            <div className="mt-4 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Success Rate</p>
                                        <p className="text-3xl font-black">98.5%</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-full border-4 border-white border-t-emerald-400 rotate-45" />
                                </div>
                                <div className="p-5 bg-white/5 rounded-3xl border border-white/5 space-y-3 backdrop-blur-sm">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Next Class In</p>
                                    <div className="flex items-center gap-3">
                                        <Clock className="h-5 w-5 text-emerald-400" />
                                        <span className="text-lg font-black tracking-tight">2 Hours 15 Mins</span>
                                    </div>
                                </div>
                                <Button className="w-full h-14 rounded-2xl bg-white text-[#173e72] font-black hover:bg-slate-50 shadow-xl transition-all" asChild>
                                    <Link href="/tutor-dashboard/manage-slot">Open Schedule</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(" ");
}
