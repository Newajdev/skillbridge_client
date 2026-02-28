"use client";

import React, { useState } from 'react';
import { TopDesign } from "@/components/ui/topDesign";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    BookCheck,
    Search,
    Filter,
    Calendar,
    Clock,
    CreditCard,
    MoreHorizontal,
    CheckCircle2,
    XCircle,
    Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { updateBookingStatusAction } from "@/actions/booking.actions";

interface ManageBookingsClientProps {
    initialBookings: any[];
}

export default function ManageBookingsClient({ initialBookings }: ManageBookingsClientProps) {
    const [bookings, setBookings] = useState(initialBookings);
    const [searchTerm, setSearchTerm] = useState("");
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const filteredBookings = bookings.filter((booking: any) =>
        booking.tutor?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.student?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.status?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        setIsUpdating(id);

        try {
            const res = await updateBookingStatusAction(id, newStatus);
            if (!res.error) {
                toast.success(`Booking status updated to ${newStatus}`);
                setBookings(bookings.map((b: any) => b.id === id ? { ...b, status: newStatus } : b));
            } else {
                toast.error(res.error.message || "Failed to update booking status");
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
        } finally {
            setIsUpdating(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            <TopDesign />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20 space-y-8 animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-[#173e72] text-white rounded-[2rem] shadow-2xl shadow-blue-900/20">
                            <BookCheck className="h-8 w-8" />
                        </div>
                        <div className="text-white">
                            <h1 className="text-3xl font-black tracking-tight">Booking Logistics</h1>
                            <p className="text-white/60 font-medium">Monitor and manage all platform sessions.</p>
                        </div>
                    </div>
                </div>

                <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden">
                    <CardHeader className="p-10 pb-0">
                        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
                            <div className="relative w-full lg:max-w-md group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                <Input
                                    placeholder="Search by tutor, student, or status..."
                                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all shadow-sm font-bold text-[#173e72]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Button variant="outline" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 hover:bg-white font-bold text-[#173e72] px-6">
                                    <Filter className="mr-2 h-4 w-4" /> Filter Logistics
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 pt-0">
                        <div className="rounded-[2.5rem] border border-slate-50 overflow-hidden shadow-sm">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="border-slate-100">
                                        <TableHead className="font-black text-[#173e72] pl-8 py-5 uppercase tracking-[0.2em] text-[10px]">Session Matrix (Tutor & Student)</TableHead>
                                        <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">Time Vector</TableHead>
                                        <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">Transaction</TableHead>
                                        <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">State</TableHead>
                                        <TableHead className="text-right pr-8 py-5 uppercase tracking-[0.2em] text-[10px]">Overrides</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredBookings.map((booking: any) => (
                                        <TableRow key={booking.id} className="group hover:bg-white transition-all duration-300 border-slate-50">
                                            <TableCell className="pl-8 py-6">
                                                <div className="flex flex-col gap-3">
                                                    {/* Tutor Info */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-10 w-10 mx-1 rounded-xl overflow-hidden bg-[#173e72]/5 border border-[#173e72]/10 flex items-center justify-center font-black text-[#173e72] text-xs">
                                                            T
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-[#173e72] text-sm leading-tight">{booking.tutor?.user?.name || "Tutor"}</span>
                                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{booking.tutor?.user?.email || "Unknown"}</span>
                                                        </div>
                                                    </div>
                                                    {/* Student Info */}
                                                    <div className="flex items-center gap-3">
                                                        <div className="relative h-8 w-8 ml-2 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center font-black text-emerald-600 text-[10px]">
                                                            S
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-bold text-slate-600 text-xs leading-tight">{booking.student?.user?.name || "Student"}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col gap-1.5">
                                                    <div className="flex items-center gap-2 text-sm font-black text-[#173e72]">
                                                        <Calendar className="h-4 w-4 opacity-40 text-[#173e72]" />
                                                        {booking.slot?.day || "TBD"}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                        <Clock className="h-4 w-4 opacity-40" />
                                                        {booking.slot?.startTime ? new Date(booking.slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-1.5 font-black text-[#173e72]">
                                                    <CreditCard className="h-4 w-4 opacity-30 text-emerald-600" />
                                                    <span className="text-emerald-600">${booking.price}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={`px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest border-none ring-1 ring-inset ${booking.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600 ring-emerald-500/10" :
                                                    booking.status === "CONFIRMED" ? "bg-indigo-50 text-indigo-600 ring-indigo-500/10" :
                                                        booking.status === "ONGOING" ? "bg-sky-50 text-sky-600 ring-sky-500/10 animate-pulse" :
                                                            booking.status === "CANCELLED" ? "bg-rose-50 text-rose-600 ring-rose-500/10" :
                                                                "bg-amber-50 text-amber-600 ring-amber-500/10"
                                                    }`}>
                                                    {booking.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <div className="flex items-center justify-end gap-2">
                                                    {booking.status !== "CANCELLED" && booking.status !== "COMPLETED" && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            disabled={isUpdating === booking.id}
                                                            onClick={() => handleUpdateStatus(booking.id, "CANCELLED")}
                                                            className="rounded-2xl border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white font-black px-4 transition-all active:scale-95 flex items-center gap-2 h-9"
                                                        >
                                                            {isUpdating === booking.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <XCircle className="h-3 w-3" />}
                                                            CANCEL
                                                        </Button>
                                                    )}
                                                    {booking.status === "PENDING" && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            disabled={isUpdating === booking.id}
                                                            onClick={() => handleUpdateStatus(booking.id, "CONFIRMED")}
                                                            className="rounded-2xl border-emerald-100 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white font-black px-4 transition-all active:scale-95 flex items-center gap-2 h-9"
                                                        >
                                                            {isUpdating === booking.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle2 className="h-3 w-3" />}
                                                            CONFIRM
                                                        </Button>
                                                    )}
                                                    <Button size="icon" variant="ghost" className="h-9 w-9 rounded-full hover:bg-slate-100 hover:shadow-sm transition-all text-slate-400">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
