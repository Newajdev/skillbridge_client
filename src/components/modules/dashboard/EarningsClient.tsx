"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    TrendingUp,
    DollarSign,
    Calendar,
    ArrowUpRight,
    ArrowDownRight,
    Wallet,
    CheckCircle2,
    Clock,
    Briefcase,
    BarChart3
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface EarningsClientProps {
    initialBookings: Booking[];
}

export default function EarningsClient({ initialBookings }: EarningsClientProps) {
    // Calculate stats
    const completedBookings = initialBookings.filter(b => b.status === "COMPLETED");
    const totalEarnings = completedBookings.reduce((sum, b) => sum + Number(b.price), 0);

    const pendingBookings = initialBookings.filter(b => b.status === "CONFIRMED" || b.status === "ONGOING");
    const pendingEarnings = pendingBookings.reduce((sum, b) => sum + Number(b.price), 0);

    const totalSessions = completedBookings.length;

    // Recent earnings (last 5 completed)
    const recentEarnings = [...completedBookings]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 5);

    const stats = [
        {
            title: "Total Earnings",
            value: `$${totalEarnings.toFixed(2)}`,
            description: "Total amount earned till date",
            icon: Wallet,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
            trend: "+12.5%",
            trendUp: true
        },
        {
            title: "Pending Balance",
            value: `$${pendingEarnings.toFixed(2)}`,
            description: "From upcoming & ongoing sessions",
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
            trend: "Awaiting completion",
            trendUp: null
        },
        {
            title: "Completed Sessions",
            value: totalSessions.toString(),
            description: "Total successfully tutored sessions",
            icon: CheckCircle2,
            color: "text-blue-600",
            bg: "bg-blue-50",
            trend: "+4 this month",
            trendUp: true
        }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#173e72] text-white rounded-[1.5rem] shadow-xl shadow-blue-900/10">
                        <TrendingUp className="h-8 w-8" />
                    </div>
                    <div className="text-white">
                        <h1 className="text-3xl font-black text-white/90 tracking-tight">Financial Overview</h1>
                        <p className="text-white/50 font-medium">Track your income and session performance.</p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="border-none shadow-xl bg-white/80 backdrop-blur-xl rounded-[2.5rem] overflow-hidden group hover:scale-[1.02] transition-all duration-300">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start">
                                <div className={`p-4 ${stat.bg} ${stat.color} rounded-2xl`}>
                                    <stat.icon className="h-6 w-6" />
                                </div>
                                {stat.trendUp !== null && (
                                    <Badge variant="outline" className={`rounded-full px-2 py-0 border-none font-bold text-xs ${stat.trendUp ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"}`}>
                                        {stat.trendUp ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                                        {stat.trend}
                                    </Badge>
                                )}
                            </div>
                            <div className="mt-6 space-y-1">
                                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">{stat.title}</h3>
                                <p className="text-4xl font-black text-[#173e72] tracking-tighter">{stat.value}</p>
                                <p className="text-xs font-medium text-slate-500 pt-2">{stat.description}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Earnings Activity / Chart Placeholder */}
                <Card className="lg:col-span-2 border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/20">
                    <CardHeader className="p-8 pb-0">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-black text-[#173e72]">Earnings History</CardTitle>
                                <CardDescription className="font-medium">Summary of your most recent payouts.</CardDescription>
                            </div>
                            <div className="p-2 bg-slate-50 rounded-xl">
                                <BarChart3 className="h-5 w-5 text-slate-400" />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8">
                        {completedBookings.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                <div className="p-6 bg-slate-50 rounded-full">
                                    <Briefcase className="h-12 w-12 text-slate-300" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#173e72]">No earnings yet</h3>
                                    <p className="text-slate-500 max-w-[300px] mx-auto">Complete your first session with a student to see your earnings here.</p>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                                <Table>
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow>
                                            <TableHead className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px] pl-8">Student</TableHead>
                                            <TableHead className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px]">Date</TableHead>
                                            <TableHead className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px] text-right pr-8">Amount</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentEarnings.map((earning) => (
                                            <TableRow key={earning.id} className="group hover:bg-slate-50/50 transition-colors">
                                                <TableCell className="pl-8 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                                            <AvatarImage src={earning.student.user.image || ""} />
                                                            <AvatarFallback className="bg-slate-100 text-slate-500 font-bold">
                                                                {earning.student.user.name.substring(0, 2).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-[#173e72] leading-tight">{earning.student.user.name}</span>
                                                            <span className="text-[10px] text-slate-400 font-bold uppercase">{earning.slot.day} Session</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                        <Calendar className="h-3.5 w-3.5 opacity-40" />
                                                        {new Date(earning.createdAt).toLocaleDateString()}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right pr-8">
                                                    <span className="font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm">
                                                        +${Number(earning.price).toFixed(2)}
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                        {completedBookings.length > 5 && (
                            <div className="mt-6 text-center">
                                <button className="text-xs font-black text-[#173e72] uppercase tracking-widest hover:underline opacity-50 hover:opacity-100 transition-opacity">
                                    View full transaction history
                                </button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Right Panel - Withdrawal info etc */}
                <Card className="border-none shadow-2xl bg-[#173e72] rounded-[3rem] overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-500">
                        <DollarSign className="h-32 w-32 text-white" />
                    </div>
                    <CardHeader className="p-8 pt-10">
                        <CardTitle className="text-white text-xl font-black">Withdraw Funds</CardTitle>
                        <CardDescription className="text-white/50 font-medium">Transfer your earnings to your bank account.</CardDescription>
                    </CardHeader>
                    <CardContent className="p-8 pt-0 space-y-6">
                        <div className="p-6 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 space-y-4">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Available to Withdraw</p>
                                <p className="text-4xl font-black text-white tracking-tighter">${totalEarnings.toFixed(2)}</p>
                            </div>
                            <div className="pt-4">
                                <button disabled className="w-full bg-white text-[#173e72] rounded-2xl h-14 font-black shadow-xl hover:bg-slate-50 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                    Send to Bank
                                </button>
                                <p className="text-[10px] text-white/30 text-center mt-4 font-bold uppercase tracking-widest italic">
                                    Minimum payout is $50.00
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <h4 className="text-xs font-black text-white/60 uppercase tracking-widest px-2">Payout Method</h4>
                            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 bg-white/10 rounded-xl flex items-center justify-center">
                                        <Briefcase className="h-5 w-5 text-white/70" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-white">Default Bank</span>
                                        <span className="text-[10px] text-white/40 font-bold uppercase">**** 4242</span>
                                    </div>
                                </div>
                                <button className="text-[10px] font-black text-white bg-white/10 px-3 py-1 rounded-full uppercase">Edit</button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
