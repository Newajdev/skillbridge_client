"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Plus,
    Calendar,
    Clock,
    Trash2,
    Edit2,
    Loader2,
    CalendarCheck,
    AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { createSlotAction, updateSlotAction, deleteSlotAction } from "@/actions/slot.actions";

const DAYS_OF_WEEK = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
];

interface Slot {
    id: string;
    day: string;
    startTime: string;
    endTime: string;
}

interface ManageSlotClientProps {
    initialSlots: Slot[];
}

export default function ManageSlotClient({ initialSlots }: ManageSlotClientProps) {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentSlot, setCurrentSlot] = useState<Slot | null>(null);

    const [formData, setFormData] = useState({
        day: "MONDAY",
        startTime: "",
        endTime: ""
    });

    const formatTime = (timeStr: string) => {
        try {
            // Handle both ISO strings and HH:mm:ss strings
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

    const handleCreate = async () => {
        if (!formData.startTime || !formData.endTime) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Creating slot...");
        try {
            const res = await createSlotAction(formData);
            if (res.error) {
                toast.error(res.error.message, { id: toastId });
            } else {
                toast.success("Slot created successfully!", { id: toastId });
                setIsCreateOpen(false);
                setFormData({ day: "MONDAY", startTime: "", endTime: "" });
            }
        } catch (error) {
            toast.error("Failed to create slot", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!currentSlot) return;

        setLoading(true);
        const toastId = toast.loading("Updating slot...");
        try {
            const res = await updateSlotAction(currentSlot.id, formData);
            if (res.error) {
                toast.error(res.error.message, { id: toastId });
            } else {
                toast.success("Slot updated successfully!", { id: toastId });
                setIsEditOpen(false);
            }
        } catch (error) {
            toast.error("Failed to update slot", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this slot?")) return;

        const toastId = toast.loading("Deleting slot...");
        try {
            const res = await deleteSlotAction(id);
            if (res.error) {
                toast.error(res.error.message, { id: toastId });
            } else {
                toast.success("Slot deleted successfully!", { id: toastId });
            }
        } catch (error) {
            toast.error("Failed to delete slot", { id: toastId });
        }
    };

    const openEdit = (slot: Slot) => {
        setCurrentSlot(slot);
        // Extract HH:mm from time string
        const start = slot.startTime.includes('T') ? slot.startTime.split('T')[1].substring(0, 5) : slot.startTime.substring(0, 5);
        const end = slot.endTime.includes('T') ? slot.endTime.split('T')[1].substring(0, 5) : slot.endTime.substring(0, 5);

        setFormData({
            day: slot.day,
            startTime: start,
            endTime: end
        });
        setIsEditOpen(true);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-[#173e72] text-white rounded-[1.5rem] shadow-xl shadow-blue-900/10">
                        <CalendarCheck className="h-8 w-8" />
                    </div>
                    <div className='text-white'>
                        <h1 className="text-3xl font-black text-white/90 tracking-tight">Manage Schedule</h1>
                        <p className="text-white/50 font-medium">Set your weekly availability slots for students.</p>
                    </div>
                </div>

                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#173e72] hover:bg-black rounded-2xl h-14 px-8 font-black shadow-xl shadow-blue-900/10 transition-all active:scale-95">
                            <Plus className="mr-2 h-5 w-5" />
                            Add New Slot
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="rounded-[2.5rem] p-8 sm:max-w-[425px] border-none shadow-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black text-[#173e72]">Create Availability</DialogTitle>
                            <DialogDescription className="font-medium text-slate-500">
                                Define a new time slot for your sessions.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Day of Week</Label>
                                <Select value={formData.day} onValueChange={(v) => setFormData({ ...formData, day: v })}>
                                    <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-bold text-[#173e72]">
                                        <SelectValue placeholder="Select Day" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                        {DAYS_OF_WEEK.map(day => (
                                            <SelectItem key={day} value={day} className="font-bold">{day}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Start Time</Label>
                                    <Input
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                        className="h-12 rounded-xl bg-slate-50 border-slate-200 font-bold text-[#173e72]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">End Time</Label>
                                    <Input
                                        type="time"
                                        value={formData.endTime}
                                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                        className="h-12 rounded-xl bg-slate-50 border-slate-200 font-bold text-[#173e72]"
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={handleCreate}
                                disabled={loading}
                                className="w-full bg-[#173e72] hover:bg-black rounded-xl h-12 font-black shadow-lg shadow-blue-900/10"
                            >
                                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Availability"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Info Card */}
            <div className="p-6 rounded-[2rem] bg-amber-50 border border-amber-100 flex items-start gap-4">
                <AlertCircle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                    <p className="font-black text-amber-800 uppercase tracking-widest text-[10px]">Important Note</p>
                    <p className="text-sm font-medium text-amber-700 leading-relaxed">
                        Slots once added will be available for recurring weekly bookings. If you have an active session for a specific slot, deleting or updating it will only affect future bookings.
                    </p>
                </div>
            </div>

            {/* Slots List Card */}
            <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden border border-white/20">
                <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-xl font-black text-[#173e72]">Weekly Schedule</CardTitle>
                    <CardDescription className="font-medium">All your defined availability slots sorted by day.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                    {initialSlots.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                            <div className="p-6 bg-slate-50 rounded-full">
                                <Clock className="h-12 w-12 text-slate-300" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-[#173e72]">No slots defined yet</h3>
                                <p className="text-slate-500 max-w-[300px] mx-auto">Add your first availability slot to start receiving bookings from students.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow>
                                        <TableHead className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px] pl-8">Day</TableHead>
                                        <TableHead className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px]">Timing</TableHead>
                                        <TableHead className="font-black text-[#173e72] uppercase tracking-[0.2em] text-[10px] text-right pr-8">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {initialSlots.map((slot) => (
                                        <TableRow key={slot.id} className="group hover:bg-slate-50/50 transition-colors">
                                            <TableCell className="pl-8">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-blue-50 text-[#173e72] rounded-lg">
                                                        <Calendar className="h-4 w-4" />
                                                    </div>
                                                    <span className="font-bold text-[#173e72]">{slot.day}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 font-bold text-slate-600">
                                                    <span className="px-3 py-1 bg-slate-100 rounded-full text-xs">{formatTime(slot.startTime)}</span>
                                                    <span className="text-slate-300">→</span>
                                                    <span className="px-3 py-1 bg-[#173e72]/5 text-[#173e72] rounded-full text-xs">{formatTime(slot.endTime)}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => openEdit(slot)}
                                                        className="h-10 w-10 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                    >
                                                        <Edit2 className="h-4 w-4" />
                                                    </Button>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => handleDelete(slot.id)}
                                                        className="h-10 w-10 rounded-xl hover:bg-red-50 hover:text-red-600 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Edit Dialog */}
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogContent className="rounded-[2.5rem] p-8 sm:max-w-[425px] border-none shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-[#173e72]">Edit Availability</DialogTitle>
                        <DialogDescription className="font-medium text-slate-500">
                            Modify your existing time slot.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Day of Week</Label>
                            <Select value={formData.day} onValueChange={(v) => setFormData({ ...formData, day: v })}>
                                <SelectTrigger className="h-12 rounded-xl bg-slate-50 border-slate-200 font-bold text-[#173e72]">
                                    <SelectValue placeholder="Select Day" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-200 shadow-xl">
                                    {DAYS_OF_WEEK.map(day => (
                                        <SelectItem key={day} value={day} className="font-bold">{day}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">Start Time</Label>
                                <Input
                                    type="time"
                                    value={formData.startTime}
                                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                    className="h-12 rounded-xl bg-slate-50 border-slate-200 font-bold text-[#173e72]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-xs font-black uppercase tracking-widest opacity-50 ml-1">End Time</Label>
                                <Input
                                    type="time"
                                    value={formData.endTime}
                                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                                    className="h-12 rounded-xl bg-slate-50 border-slate-200 font-bold text-[#173e72]"
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="w-full bg-[#173e72] hover:bg-black rounded-xl h-12 font-black shadow-lg shadow-blue-900/10"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Update Availability"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
