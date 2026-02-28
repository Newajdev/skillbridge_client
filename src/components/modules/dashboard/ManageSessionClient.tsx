"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";
import {
    Calendar,
    Clock,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Loader2,
    Mail,
    DollarSign,
    PlayCircle,
    Info,
    ExternalLink,
    CheckCircle,
    Activity
} from "lucide-react";
import { toast } from "sonner";
import { updateBookingStatusAction, startSessionAction } from "@/actions/booking.actions";

interface Booking {
    id: string;
    status: string;
    price: number;
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

interface ManageSessionClientProps {
    initialBookings: Booking[];
}

const statusConfig: Record<string, { color: string, ring: string, icon: any }> = {
    PENDING: { color: "bg-amber-50 text-amber-600", ring: "ring-amber-500/10", icon: Clock },
    CONFIRMED: { color: "bg-indigo-50 text-indigo-600", ring: "ring-indigo-500/10", icon: CheckCircle2 },
    ONGOING: { color: "bg-sky-50 text-sky-600", ring: "ring-sky-500/10", icon: PlayCircle },
    COMPLETED: { color: "bg-emerald-50 text-emerald-600", ring: "ring-emerald-500/10", icon: CheckCircle2 },
    CANCELLED: { color: "bg-rose-50 text-rose-600", ring: "ring-rose-500/10", icon: XCircle },
};

export default function ManageSessionClient({ initialBookings }: ManageSessionClientProps) {
    const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});
    const [isUrlModalOpen, setIsUrlModalOpen] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
    const [meetingUrl, setMeetingUrl] = useState("");

    const cn = (...inputs: any[]) => inputs.filter(Boolean).join(" ");

    const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
        setLoadingMap(prev => ({ ...prev, [bookingId]: true }));
        const toastId = toast.loading(`Updating status to ${newStatus}...`);

        try {
            const res = await updateBookingStatusAction(bookingId, newStatus);
            if (res.error) {
                toast.error(res.error.message, { id: toastId });
            } else {
                toast.success(`Booking ${newStatus.toLowerCase()} successfully!`, { id: toastId });
            }
        } catch (error) {
            toast.error("Failed to update status", { id: toastId });
        } finally {
            setLoadingMap(prev => ({ ...prev, [bookingId]: false }));
        }
    };

    const handleStartSession = async (bookingId: string, url: string) => {
        setLoadingMap(prev => ({ ...prev, [bookingId]: true }));
        const toastId = toast.loading("Starting session...");

        try {
            const res = await startSessionAction(bookingId, url);
            if (res.error) {
                toast.error(res.error.message, { id: toastId });
            } else {
                toast.success("Session started successfully!", { id: toastId });
                setIsUrlModalOpen(false);
                setMeetingUrl("");
            }
        } catch (error) {
            toast.error("Failed to start session", { id: toastId });
        } finally {
            setLoadingMap(prev => ({ ...prev, [bookingId]: false }));
        }
    };

    const handleStartSessionClick = (bookingId: string) => {
        setSelectedBookingId(bookingId);
        setIsUrlModalOpen(true);
    };

    const handleUrlSubmit = () => {
        if (!meetingUrl) {
            toast.error("Please provide a meeting URL");
            return;
        }
        if (selectedBookingId) {
            handleStartSession(selectedBookingId, meetingUrl);
        }
    };

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
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className="p-4 bg-[#173e72] text-white rounded-[2rem] shadow-2xl shadow-blue-900/20">
                        <Activity className="h-8 w-8" />
                    </div>
                    <div className="text-white">
                        <h1 className="text-3xl font-black text-white tracking-tight">Manage Sessions</h1>
                        <p className="text-white/60 font-medium">Full control over your student interactions and status.</p>
                    </div>
                </div>
            </div>

            {/* Info Hint */}
            <div className="p-8 rounded-[3rem] bg-indigo-50 border border-indigo-100/50 flex items-start gap-5 shadow-inner">
                <div className="p-3 bg-white rounded-2xl shadow-sm">
                    <Info className="h-6 w-6 text-[#173e72]" />
                </div>
                <div className="space-y-1">
                    <p className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px]">Tutor Excellence Tip</p>
                    <p className="text-sm font-bold text-indigo-900/70 leading-relaxed">
                        Setting sessions to <span className='text-[#173e72] font-black'>ONGOING</span> immediately notifies the student. Remember to mark as <span className='text-emerald-700 font-black'>COMPLETED</span> to finalize your earnings.
                    </p>
                </div>
            </div>

            {/* Sessions Table Card */}
            <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3.5rem] overflow-hidden border border-white/20">
                <CardHeader className="p-10 pb-4">
                    <CardTitle className="text-2xl font-black text-[#173e72]">Live & Upcoming Bookings</CardTitle>
                    <CardDescription className="text-slate-400 font-medium text-base">Directly manage session flow and student records.</CardDescription>
                </CardHeader>
                <CardContent className="p-10 pt-0">
                    {initialBookings.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-24 text-center space-y-6">
                            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 shadow-inner">
                                <Calendar className="h-14 w-14 text-slate-200" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-black text-[#173e72]">No bookings yet</h3>
                                <p className="text-slate-400 font-medium max-w-sm mx-auto leading-relaxed">Your professional journey starts here. Once students book your slots, they'll appear in this list.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="border-slate-100">
                                        <TableHead className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px] pl-10 py-6">Student Participant</TableHead>
                                        <TableHead className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px] py-6">Time Window</TableHead>
                                        <TableHead className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px] py-6">Rate</TableHead>
                                        <TableHead className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px] py-6">Status</TableHead>
                                        <TableHead className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px] text-right pr-10 py-6">Management</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {initialBookings.map((booking) => {
                                        const StatusIcon = statusConfig[booking.status]?.icon || Info;
                                        return (
                                            <TableRow key={booking.id} className="group hover:bg-slate-50/30 transition-all border-slate-50">
                                                <TableCell className="pl-10 py-8">
                                                    <div className="flex items-center gap-5">
                                                        <Avatar className="h-14 w-14 border-2 border-white shadow-xl transition-transform group-hover:scale-110">
                                                            <AvatarImage src={booking.student.user.image || ""} />
                                                            <AvatarFallback className="bg-[#173e72] text-white font-black text-lg">
                                                                {booking.student.user.name.substring(0, 2).toUpperCase()}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div className="flex flex-col">
                                                            <span className="font-black text-[#173e72] text-lg leading-tight mb-1">{booking.student.user.name}</span>
                                                            <span className="text-xs text-slate-400 font-bold flex items-center gap-2">
                                                                <Mail className="h-3.5 w-3.5 opacity-60" /> {booking.student.user.email}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col gap-1.5">
                                                        <div className="flex items-center gap-2 text-sm font-black text-[#173e72]">
                                                            <Calendar className="h-4 w-4 opacity-30" />
                                                            {booking.slot.day}
                                                        </div>
                                                        <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 bg-slate-100 w-fit px-2 py-0.5 rounded-lg">
                                                            <Clock className="h-3.5 w-3.5 opacity-40" />
                                                            {formatTime(booking.slot.startTime)} - {formatTime(booking.slot.endTime)}
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-1 font-black text-[#173e72] text-lg">
                                                        <DollarSign className="h-4 w-4 opacity-30" />
                                                        {booking.price}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={cn(
                                                        "rounded-full px-4 py-1.5 font-black text-[9px] uppercase tracking-widest border-none ring-1 ring-inset",
                                                        statusConfig[booking.status]?.color,
                                                        statusConfig[booking.status]?.ring,
                                                        booking.status === "ONGOING" && "animate-pulse"
                                                    )}>
                                                        <StatusIcon className="h-3.5 w-3.5 mr-2" />
                                                        {booking.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right pr-10">
                                                    <div className="flex items-center justify-end gap-3">
                                                        {booking.status === "ONGOING" && (
                                                            <Button
                                                                size="sm"
                                                                className="rounded-2xl h-11 bg-emerald-600 hover:bg-emerald-700 text-white font-black px-6 transition-all active:scale-95 shadow-lg shadow-emerald-500/20"
                                                                onClick={() => handleStatusUpdate(booking.id, "COMPLETED")}
                                                                disabled={loadingMap[booking.id]}
                                                            >
                                                                <CheckCircle className="h-4 w-4 mr-2" /> Complete
                                                            </Button>
                                                        )}

                                                        {(booking.status === "PENDING" || booking.status === "CONFIRMED") && (
                                                            <Button
                                                                size="sm"
                                                                className="rounded-2xl h-11 bg-sky-600 hover:bg-sky-700 text-white font-black px-6 transition-all active:scale-95 shadow-lg shadow-sky-500/20"
                                                                onClick={() => handleStartSessionClick(booking.id)}
                                                                disabled={loadingMap[booking.id]}
                                                            >
                                                                <PlayCircle className="h-4 w-4 mr-2" /> Start Now
                                                            </Button>
                                                        )}

                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl hover:bg-white hover:shadow-md border border-transparent hover:border-slate-100" disabled={loadingMap[booking.id]}>
                                                                    {loadingMap[booking.id] ? <Loader2 className="h-5 w-5 animate-spin text-[#173e72]" /> : <MoreVertical className="h-5 w-5 text-slate-300" />}
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="rounded-[2rem] border-none shadow-2xl p-3 min-w-[200px] bg-white/95 backdrop-blur-xl">
                                                                <div className='px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1'>Control Panel</div>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleStartSessionClick(booking.id)}
                                                                    className="rounded-xl font-bold text-sky-600 focus:bg-sky-50 focus:text-sky-700 py-3 cursor-pointer"
                                                                >
                                                                    <PlayCircle className="h-4 w-4 mr-3" /> Start Session
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleStatusUpdate(booking.id, "COMPLETED")}
                                                                    className="rounded-xl font-bold text-emerald-600 focus:bg-emerald-50 focus:text-emerald-700 py-3 cursor-pointer"
                                                                >
                                                                    <CheckCircle2 className="h-4 w-4 mr-3" /> Mark Finished
                                                                </DropdownMenuItem>
                                                                <div className="h-px bg-slate-100 my-2 mx-1" />
                                                                <DropdownMenuItem
                                                                    onClick={() => handleStatusUpdate(booking.id, "CANCELLED")}
                                                                    className="rounded-xl font-bold text-rose-600 focus:bg-rose-50 focus:text-rose-700 py-3 cursor-pointer"
                                                                >
                                                                    <XCircle className="h-4 w-4 mr-3" /> Cancel Session
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Meeting URL Dialog */}
            <Dialog open={isUrlModalOpen} onOpenChange={setIsUrlModalOpen}>
                <DialogContent className="rounded-[3rem] p-10 sm:max-w-[450px] border-none shadow-2xl bg-white/95 backdrop-blur-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-3xl font-black text-[#173e72] tracking-tight">Initiate Session</DialogTitle>
                        <DialogDescription className="font-bold text-slate-400 text-base mt-2">
                            Drop the meeting link below to notify your student and start the live class.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-8 py-8">
                        <div className="space-y-3">
                            <div className="flex items-center justify-between ml-1">
                                <Label className="text-xs font-black uppercase tracking-[0.2em] opacity-40">Meeting Platform Link</Label>
                                <Badge className="bg-sky-50 text-sky-600 border-none text-[9px]">Required</Badge>
                            </div>
                            <div className="relative group">
                                <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300 group-focus-within:text-[#173e72] transition-colors" />
                                <Input
                                    placeholder="e.g., zoom.us/j/12345 or meet.google.com/abc-defg"
                                    value={meetingUrl}
                                    onChange={(e) => setMeetingUrl(e.target.value)}
                                    className="h-16 pl-12 rounded-[1.5rem] bg-slate-50 border-slate-100 font-bold text-[#173e72] focus:ring-2 focus:ring-[#173e72]/20 focus:bg-white transition-all shadow-inner"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleUrlSubmit}
                            className="w-full bg-[#173e72] hover:bg-black text-white rounded-[1.5rem] h-16 font-black text-lg shadow-2xl shadow-blue-900/20 transition-all active:scale-[0.98]"
                        >
                            {loadingMap[selectedBookingId!] ? <Loader2 className="h-6 w-6 animate-spin" /> : "Start & Notify Student"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
