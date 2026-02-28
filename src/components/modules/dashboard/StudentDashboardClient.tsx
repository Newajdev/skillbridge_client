"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    BookOpen,
    Calendar,
    GraduationCap,
    ArrowUpRight,
    PlayCircle,
    Clock,
    CheckCircle2,
    CalendarCheck,
    ChevronRight,
    Sparkles,
    Video,
    Search,
    BookMarked,
    LayoutDashboard,
    TrendingUp,
    Zap
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from 'next/link';

interface Booking {
    id: string;
    status: string;
    price: number | string;
    createdAt: string;
    sessionLinks?: string;
    tutor: {
        user: {
            name: string;
            image: string | null;
            email: string;
        };
        category?: {
            name: string;
        };
    };
    slot: {
        day: string;
        startTime: string;
        endTime: string;
    };
}

interface StudentDashboardClientProps {
    initialBookings: Booking[];
    userName?: string;
}

export default function StudentDashboardClient({ initialBookings, userName }: StudentDashboardClientProps) {
    // Derived Stats
    const totalBookings = initialBookings.length;
    const completedBookings = initialBookings.filter(b => b.status === "COMPLETED").length;
    const ongoingSessions = initialBookings.filter(b => b.status === "ONGOING");
    const upcomingSessions = initialBookings.filter(b => b.status === "CONFIRMED" || b.status === "PENDING");

    const recentBookings = [...initialBookings]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4);

    const stats = [
        {
            title: "Total Bookings",
            value: totalBookings.toString(),
            icon: BookMarked,
            color: "text-blue-600",
            bg: "bg-blue-50",
            description: "Total sessions booked"
        },
        {
            title: "Live Sessions",
            value: ongoingSessions.length.toString(),
            icon: PlayCircle,
            color: "text-rose-600",
            bg: "bg-rose-50",
            description: "Classes active right now"
        },
        {
            title: "Upcoming",
            value: upcomingSessions.length.toString(),
            icon: CalendarCheck,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
            description: "Scheduled learning"
        },
        {
            title: "Completed",
            value: completedBookings.toString(),
            icon: GraduationCap,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            description: "Goal achieved sessions"
        }
    ];

    const formatTime = (timeStr: string) => {
        try {
            const timePart = timeStr.includes('T') ? timeStr.split('T')[1].split('.')[0] : timeStr;
            const [hours, minutes] = timePart.split(':');
            const h = parseInt(hours);
            const ampm = h >= 12 ? 'PM' : 'AM';
            const displayHours = h % 12 || 12;
            return `${displayHours}:${minutes} ${ampm}`;
        } catch (e) {
            return timeStr;
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header / Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-[#173e72] text-white rounded-[2rem] shadow-2xl shadow-blue-900/20">
                        <LayoutDashboard className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Student Dashboard</h1>
                        <p className="text-white/60 font-medium">Hello {userName?.split(' ')[0] || 'Learner'}, ready for your next big step?</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="h-12 rounded-2xl border-white/20 bg-white/10 text-white hover:bg-white hover:text-[#173e72] font-bold px-6 border backdrop-blur-md transition-all" asChild>
                        <Link href="/dashboard/my-bookings">
                            <Calendar className="mr-2 h-4 w-4" /> My Schedule
                        </Link>
                    </Button>
                    <Button className="h-12 rounded-2xl bg-white text-[#173e72] hover:bg-blue-50 font-black px-6 shadow-xl transition-all active:scale-95" asChild>
                        <Link href="/tutors">
                            <Search className="mr-2 h-5 w-5" /> Find Tutors
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Ongoing Alert Box */}
            {ongoingSessions.length > 0 && (
                <div className="bg-rose-500 text-white rounded-[2.5rem] p-8 shadow-2xl shadow-rose-900/20 relative overflow-hidden group border border-white/10">
                    <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-500">
                        <PlayCircle className="h-24 w-24" />
                    </div>
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <span className="flex h-2 w-2 rounded-full bg-white animate-ping" />
                                <Badge className="bg-white/20 text-white border-none font-black text-[10px] uppercase">Live Now</Badge>
                            </div>
                            <h2 className="text-2xl font-black">Your session with {ongoingSessions[0].tutor.user.name} is started!</h2>
                            <p className="text-white/70 font-medium">Click the button to join the live video session now.</p>
                        </div>
                        <Button className="bg-white text-rose-600 hover:bg-blue-50 rounded-2xl h-14 px-10 font-black shadow-xl" asChild>
                            <a href={ongoingSessions[0].sessionLinks} target="_blank" rel="noopener noreferrer">
                                <Video className="h-5 w-5 mr-2" /> Join Session
                            </a>
                        </Button>
                    </div>
                </div>
            )}

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden hover:scale-[1.03] transition-all duration-300 border border-white/20">
                        <CardContent className="p-8">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 ${stat.bg} ${stat.color} rounded-2xl`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                <TrendingUp className="h-4 w-4 text-slate-300" />
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
                {/* Recent Learning Section */}
                <Card className="lg:col-span-2 border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/20">
                    <CardHeader className="p-8 pb-4 flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="text-xl font-black text-[#173e72]">Recent Learning Activity</CardTitle>
                            <CardDescription className="font-medium">Summary of your latest booking history.</CardDescription>
                        </div>
                        <Button variant="ghost" className="text-[#173e72] font-black text-xs uppercase tracking-widest hover:bg-slate-50 rounded-xl" asChild>
                            <Link href="/dashboard/my-bookings">View All <ChevronRight className="ml-1 h-3 w-3" /></Link>
                        </Button>
                    </CardHeader>
                    <CardContent className="p-8 pt-0">
                        {recentBookings.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-slate-200">
                                    <Sparkles className="h-10 w-10 text-slate-200" />
                                </div>
                                <h3 className="text-lg font-black text-[#173e72]">No sessions yet</h3>
                                <p className="text-slate-400 font-medium">Start your journey today by booking an expert tutor.</p>
                                <Button className="mt-6 bg-[#173e72] rounded-xl" asChild>
                                    <Link href="/tutors">Connect with Tutors</Link>
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {recentBookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-5 bg-[#f8fafc] rounded-[2rem] border border-slate-100 group hover:border-[#173e72]/20 transition-all hover:bg-white hover:shadow-lg">
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-14 w-14 border-2 border-white shadow-md">
                                                <AvatarImage src={booking.tutor.user.image || ""} />
                                                <AvatarFallback className="bg-white text-[#173e72] font-black uppercase">
                                                    {booking.tutor.user.name.substring(0, 2)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-black text-[#173e72] text-lg leading-none mb-1">{booking.tutor.user.name}</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em]">{booking.tutor.category?.name || "Private Session"}</span>
                                                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                                                    <span className="text-[10px] font-bold text-[#173e72] opacity-60">
                                                        {booking.slot.day} • {formatTime(booking.slot.startTime)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <Badge className={cn(
                                                "rounded-full px-4 py-1.5 font-black text-[9px] uppercase tracking-widest border-none ring-1 ring-inset",
                                                booking.status === "PENDING" ? "bg-amber-50 text-amber-600 ring-amber-500/10" :
                                                    booking.status === "CONFIRMED" ? "bg-indigo-50 text-indigo-600 ring-indigo-500/10" :
                                                        booking.status === "ONGOING" ? "bg-sky-50 text-sky-600 ring-sky-500/10" :
                                                            booking.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600 ring-emerald-500/10" :
                                                                "bg-rose-50 text-rose-600 ring-rose-500/10"
                                            )}>
                                                {booking.status}
                                            </Badge>
                                            <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-white hover:shadow-md" asChild>
                                                <Link href="/dashboard/my-bookings">
                                                    <ChevronRight className="h-5 w-5 text-[#173e72]" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Right Panel - Recommendation Card */}
                <div className="space-y-6">
                    <Card className="border-none shadow-2xl bg-[#173e72] rounded-[3rem] overflow-hidden text-white relative h-full group">
                        <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                            <Zap className="h-64 w-64 fill-current" />
                        </div>
                        <CardHeader className="p-8 pt-10">
                            <div className="bg-white/10 w-12 h-12 rounded-2xl flex items-center justify-center mb-4">
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                            <CardTitle className="text-2xl font-black">Daily Goal</CardTitle>
                            <CardDescription className="text-white/50 font-medium">Keep your learning momentum up by attending your scheduled sessions.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-8 pt-0">
                            <div className="mt-4 space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Weekly Progress</p>
                                        <div className="flex items-baseline gap-1">
                                            <p className="text-4xl font-black">{completedBookings}</p>
                                            <p className="text-sm font-black text-white/30">/ 5 Sessions</p>
                                        </div>
                                    </div>
                                    <div className="h-12 w-12 rounded-full border-4 border-white/10 border-t-blue-400 rotate-45" />
                                </div>
                                <div className="p-5 bg-white/5 rounded-3xl border border-white/5 space-y-3 backdrop-blur-sm">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Learning Tip</p>
                                    <p className="text-sm font-bold text-white/80 leading-relaxed italic">
                                        "Consistency is the key to mastering any skill. Even small sessions matter!"
                                    </p>
                                </div>
                                <Button className="w-full h-14 rounded-2xl bg-white text-[#173e72] font-black hover:bg-slate-50 shadow-xl transition-all" asChild>
                                    <Link href="/tutors">Find More Experts</Link>
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
