"use client";

import React, { useState } from 'react';
import { bookingService } from "@/services/booking.service";
import { TopDesign } from "@/components/ui/topDesign";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Calendar,
    MoreHorizontal,
    Video,
    Search,
    Filter,
    Clock,
    CreditCard,
    Sparkles,
    Star,
    MessageSquare,
    Loader2,
    ArrowUpRight
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from 'next/link';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createReviewAction } from "@/actions/review.actions";
import { ReviewModal } from "./ReviewModal";

interface MyBookingsClientProps {
    initialBookings: any[];
}

export default function MyBookingsClient({ initialBookings }: MyBookingsClientProps) {
    const [bookings, setBookings] = useState(initialBookings);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [selectedTutor, setSelectedTutor] = useState<any>(null);
    // Removed: const [rating, setRating] = useState(5);
    // Removed: const [comment, setComment] = useState("");
    // Removed: const [isSubmitting, setIsSubmitting] = useState(false);

    const cn = (...inputs: any[]) => inputs.filter(Boolean).join(" ");

    const handleOpenReview = (tutor: any) => {
        setSelectedTutor(tutor);
        setIsReviewModalOpen(true);
    };

    // Removed: handleSubmitReview function

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            <TopDesign />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20 space-y-8 animate-in fade-in duration-700">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-[#173e72] text-white rounded-[2rem] shadow-2xl shadow-blue-900/20">
                            <Calendar className="h-8 w-8" />
                        </div>
                        <div className="text-white">
                            <h1 className="text-3xl font-black text-white tracking-tight">My Bookings</h1>
                            <p className="text-white/60 font-medium">Track your learning journey and upcoming sessions.</p>
                        </div>
                    </div>
                    <Button className="h-12 rounded-2xl bg-white text-[#173e72] hover:bg-blue-50 font-black px-6 shadow-xl transition-all active:scale-95" asChild>
                        <Link href="/tutors">
                            <Sparkles className="mr-2 h-5 w-5" /> Book New Session
                        </Link>
                    </Button>
                </div>

                {/* Main Card */}
                <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/20">
                    <CardHeader className="p-10 pb-0">
                        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
                            <div className="relative w-full lg:max-w-md group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                <Input
                                    placeholder="Find tutor or subject..."
                                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all shadow-sm font-bold text-[#173e72]"
                                />
                            </div>
                            <div className="flex items-center gap-3 w-full lg:w-auto">
                                <Button variant="outline" className="flex-1 lg:flex-none h-14 rounded-2xl border-slate-100 bg-slate-50/50 hover:bg-white font-bold text-[#173e72] px-6">
                                    <Filter className="mr-2 h-4 w-4" /> Filter
                                </Button>
                                <div className="px-8 h-14 rounded-2xl bg-[#173e72] text-white flex items-center font-black shadow-xl tracking-tight">
                                    Total: {bookings.length}
                                </div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 pt-0">
                        {bookings.length > 0 ? (
                            <div className="rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                                <Table>
                                    <TableHeader className="bg-slate-50/50">
                                        <TableRow className="border-slate-100">
                                            <TableHead className="font-black text-[#173e72] pl-8 py-5 uppercase tracking-[0.2em] text-[10px]">Tutor & Subject</TableHead>
                                            <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">Schedule</TableHead>
                                            <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">Status</TableHead>
                                            <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">Investment</TableHead>
                                            <TableHead className="text-right pr-8 py-5 uppercase tracking-[0.2em] text-[10px]">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {bookings.map((booking: any) => (
                                            <TableRow key={booking.id} className="group hover:bg-slate-50/30 transition-colors border-slate-50">
                                                <TableCell className="pl-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="relative h-14 w-14 rounded-2xl overflow-hidden border-2 border-white shadow-md transition-transform group-hover:scale-105">
                                                            <Image
                                                                src={booking.tutor?.user?.image || "/placeholder-avatar.png"}
                                                                alt={booking.tutor?.user?.name}
                                                                fill
                                                                className="object-cover"
                                                                sizes="56px"
                                                            />
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-[#173e72] text-lg leading-tight">{booking.tutor?.user?.name || "Expert Tutor"}</span>
                                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{booking.tutor?.category?.name || "Knowledge Pro"}</span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex items-center gap-2 text-sm font-black text-[#173e72]">
                                                            <Calendar className="h-3.5 w-3.5 opacity-40" />
                                                            {booking.slot?.day || "TBD"}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                            <Clock className="h-3.5 w-3.5 opacity-40" />
                                                            {booking.slot?.startTime ? new Date(booking.slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={cn(
                                                            "px-4 py-1.5 rounded-full font-black text-[9px] uppercase tracking-widest border-none ring-1 ring-inset",
                                                            booking.status === "CONFIRMED" ? "bg-indigo-50 text-indigo-600 ring-indigo-500/10" :
                                                                booking.status === "ONGOING" ? "bg-sky-50 text-sky-600 ring-sky-500/10 animate-pulse" :
                                                                    booking.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600 ring-emerald-500/10" :
                                                                        booking.status === "PENDING" ? "bg-amber-50 text-amber-600 ring-amber-500/10" :
                                                                            "bg-rose-50 text-rose-600 ring-rose-500/10"
                                                        )}
                                                    >
                                                        {booking.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1.5 font-black text-[#173e72]">
                                                        <CreditCard className="h-4 w-4 opacity-30" />
                                                        ${booking.price}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right pr-8">
                                                    <div className="flex items-center justify-end gap-3">
                                                        {booking.status === "ONGOING" && booking.sessionLinks && (
                                                            <Button
                                                                size="sm"
                                                                className="bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-black px-6 shadow-xl shadow-sky-200 transition-all active:scale-95"
                                                                asChild
                                                            >
                                                                <a href={booking.sessionLinks} target="_blank" rel="noopener noreferrer">
                                                                    <Video className="h-4 w-4 mr-2" /> Join
                                                                </a>
                                                            </Button>
                                                        )}

                                                        {booking.status === "COMPLETED" && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                className="rounded-2xl border-emerald-100 bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white font-black px-5 transition-all active:scale-95 flex items-center gap-2"
                                                                onClick={() => handleOpenReview(booking.tutor)}
                                                            >
                                                                <Star className="h-4 w-4 fill-current" /> Leave Review
                                                            </Button>
                                                        )}

                                                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-full hover:bg-white hover:shadow-md transition-all">
                                                            <MoreHorizontal className="h-5 w-5 text-slate-400" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="py-24 text-center space-y-6">
                                <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-inner border border-slate-100">
                                    <Calendar className="h-10 w-10 text-slate-200" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-2xl font-black text-[#173e72]">Empty Schedule</h3>
                                    <p className="text-slate-400 font-medium max-w-sm mx-auto">You haven't booked any sessions yet. Connect with a tutor to start learning.</p>
                                </div>
                                <Button className="bg-[#173e72] rounded-2xl font-black h-12 px-10" asChild>
                                    <Link href="/tutors">Find Your Perfect Tutor</Link>
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Review Modal Component */}
            <ReviewModal
                isOpen={isReviewModalOpen}
                onOpenChange={setIsReviewModalOpen}
                selectedTutor={selectedTutor}
            />
        </div>
    );
}
