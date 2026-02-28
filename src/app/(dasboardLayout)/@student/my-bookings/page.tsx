import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MoreHorizontal, Video, Search, Filter, Clock, CreditCard, User, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { bookingService } from "@/services/booking.service";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default async function MyBookings() {
    const bookingsRes = await bookingService.getBookings();
    const bookings = bookingsRes.data?.data || [];

    return (
        <div className="space-y-8 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-[#173e72] flex items-center gap-3">
                        <Calendar className="h-8 w-8 text-primary" />
                        My Bookings
                    </h1>
                    <p className="text-muted-foreground font-medium mt-1">Manage and track your tutoring sessions in real-time.</p>
                </div>
                <Button className="bg-[#173e72] hover:bg-[#1a4b8a] rounded-2xl font-black h-12 px-8 shadow-xl shadow-primary/20 transition-all active:scale-95" asChild>
                    <a href="/tutors">
                        <Sparkles className="mr-2 h-5 w-5" /> Book New Session
                    </a>
                </Button>
            </div>

            <Card className="border-none shadow-2xl bg-white/40 backdrop-blur-xl rounded-[2.5rem] overflow-hidden border border-white/20">
                <CardHeader className="p-8 pb-0">
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
                        <div className="relative w-full lg:max-w-md group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                placeholder="Search by tutor or subject..."
                                className="pl-12 h-14 rounded-2xl border-white/40 bg-white/50 focus:bg-white transition-all shadow-sm font-medium"
                            />
                        </div>
                        <div className="flex items-center gap-3 w-full lg:w-auto">
                            <Button variant="outline" className="flex-1 lg:flex-none h-14 rounded-2x border-white/40 bg-white/50 hover:bg-white font-bold text-[#173e72]">
                                <Filter className="mr-2 h-4 w-4" /> Filter
                            </Button>
                            <div className="px-6 h-14 rounded-2xl bg-[#173e72] text-white flex items-center font-bold shadow-lg">
                                Total: {bookings.length}
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-primary/5">
                                <TableRow className="hover:bg-transparent border-white/20">
                                    <TableHead className="font-black text-[#173e72] pl-8 py-5 uppercase tracking-widest text-[10px]">Booking Details</TableHead>
                                    <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-widest text-[10px]">Schedule Details</TableHead>
                                    <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-widest text-[10px]">Current Status</TableHead>
                                    <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-widest text-[10px]">Investment</TableHead>
                                    <TableHead className="text-right pr-8 py-5 uppercase tracking-widest text-[10px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bookings.length > 0 ? bookings.map((booking: any) => (
                                    <TableRow key={booking.id} className="group hover:bg-white/40 transition-colors border-white/10">
                                        <TableCell className="pl-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-12 w-12 rounded-xl overflow-hidden border-2 border-primary/10 shadow-sm transition-transform group-hover:rotate-2">
                                                    <Image
                                                        src={booking.tutor?.user?.image || "/placeholder-avatar.png"}
                                                        alt={booking.tutor?.user?.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-black text-[#173e72] text-lg">{booking.tutor?.user?.name || "Expert Tutor"}</span>
                                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{booking.tutor?.category?.name || "Private Session"}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col gap-1.5">
                                                <div className="flex items-center gap-2 text-sm font-black text-[#173e72]">
                                                    <Calendar className="h-3.5 w-3.5 text-primary" />
                                                    {booking.slot?.day || "TBD"}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                                                    <Clock className="h-3.5 w-3.5" />
                                                    {booking.slot?.startTime ? new Date(booking.slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "N/A"}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <Badge
                                                className={cn(
                                                    "px-3 py-1 rounded-lg font-black text-[10px] uppercase border",
                                                    booking.status === "CONFIRMED" ? "bg-blue-100 text-blue-700 border-blue-200" :
                                                        booking.status === "COMPLETED" ? "bg-green-100 text-green-700 border-green-200" :
                                                            booking.status === "PENDING" ? "bg-yellow-100 text-yellow-700 border-yellow-200" :
                                                                "bg-red-100 text-red-700 border-red-200"
                                                )}
                                            >
                                                {booking.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex items-center gap-1.5 font-black text-[#173e72]">
                                                <CreditCard className="h-4 w-4 opacity-40" />
                                                ${booking.price}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right pr-8 py-6">
                                            <div className="flex items-center justify-end gap-2">
                                                {booking.status === "CONFIRMED" && (
                                                    <Button size="sm" className="bg-[#173e72] hover:bg-[#1a4b8a] rounded-xl font-black transition-all active:scale-95 shadow-lg shadow-primary/10">
                                                        <Video className="h-4 w-4 mr-2" /> Join Session
                                                    </Button>
                                                )}
                                                <Button size="icon" variant="outline" className="rounded-xl border-white/40 bg-white/50">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="py-20 text-center">
                                            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                                                <div className="bg-muted/30 p-4 rounded-full">
                                                    <Calendar className="h-8 w-8 opacity-20" />
                                                </div>
                                                <div>
                                                    <p className="font-black text-xl text-[#173e72]">No bookings yet</p>
                                                    <p className="font-medium">Start your journey today by finding a tutor.</p>
                                                </div>
                                                <Button className="bg-[#173e72] rounded-xl font-bold mt-4" asChild>
                                                    <a href="/tutors">Find Tutors</a>
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
