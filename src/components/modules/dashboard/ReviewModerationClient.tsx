"use client";

import React, { useState } from 'react';
import { TopDesign } from "@/components/ui/topDesign";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    MessageSquareQuote,
    Search,
    Filter,
    Star,
    Trash2,
    ShieldAlert,
    CalendarDays
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface ReviewModerationClientProps {
    initialReviews: any[];
}

export default function ReviewModerationClient({ initialReviews }: ReviewModerationClientProps) {
    const [reviews, setReviews] = useState(initialReviews);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState<any>(null);

    const filteredReviews = reviews.filter((review: any) =>
        review.tutor?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.student?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openDelete = (review: any) => {
        setSelectedReview(review);
        setIsDeleteOpen(true);
    };

    const handleDelete = async () => {
        // Mock Delete Action as Admin Delete Review API is not defined in backend yet
        toast.info("Delete review functionality requires backend API: DELETE /api/admin/reviews/:id");
        setIsDeleteOpen(false);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            <TopDesign />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20 space-y-8 animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="p-4 bg-[#173e72] text-white rounded-[2rem] shadow-2xl shadow-blue-900/20">
                            <MessageSquareQuote className="h-8 w-8" />
                        </div>
                        <div className="text-white">
                            <h1 className="text-3xl font-black tracking-tight">Review Content Moderation</h1>
                            <p className="text-white/60 font-medium">Monitor and manage platform feedback quality.</p>
                        </div>
                    </div>
                </div>

                <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden">
                    <CardHeader className="p-10 pb-0">
                        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
                            <div className="relative w-full lg:max-w-md group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                <Input
                                    placeholder="Search feedback content or users..."
                                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all shadow-sm font-bold text-[#173e72]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Button variant="outline" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 hover:bg-white font-bold text-[#173e72] px-6">
                                    <Filter className="mr-2 h-4 w-4" /> Filter Flags
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 pt-0">
                        <div className="rounded-[2.5rem] border border-slate-50 overflow-hidden shadow-sm">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="border-slate-100">
                                        <TableHead className="font-black text-[#173e72] pl-8 py-5 uppercase tracking-[0.2em] text-[10px]">Evaluation Target</TableHead>
                                        <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">Feedback Narrative</TableHead>
                                        <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">Metric</TableHead>
                                        <TableHead className="text-right pr-8 py-5 uppercase tracking-[0.2em] text-[10px]">Intervention</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredReviews.map((review: any) => (
                                        <TableRow key={review.id} className="group hover:bg-white transition-all duration-300 border-slate-50">
                                            <TableCell className="pl-8 py-6 align-top">
                                                <div className="flex flex-col gap-4">
                                                    {/* Tutor Info */}
                                                    <div>
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Target (Tutor)</span>
                                                        <span className="font-black text-[#173e72] text-sm leading-tight block">{review.tutor?.user?.name || "Unknown"}</span>
                                                    </div>

                                                    {/* Student Info */}
                                                    <div>
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Source (Student)</span>
                                                        <span className="font-bold text-slate-600 text-xs leading-tight block">{review.student?.user?.name || "Unknown"}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="align-top py-6 max-w-md">
                                                <p className="text-sm font-bold text-slate-600 line-clamp-3 leading-relaxed">"{review.comment}"</p>
                                                <div className="flex items-center gap-1.5 mt-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                                    <CalendarDays className="h-3 w-3" />
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </div>
                                            </TableCell>
                                            <TableCell className="align-top py-6 text-center">
                                                <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-600 font-black text-lg border border-amber-100 tabular-nums">
                                                    <Star className="h-4 w-4 fill-amber-400 text-amber-500 line-clamp-3" />
                                                    {review.rating}.0
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right pr-8 align-top py-6">
                                                <div className="flex flex-col items-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        className="h-10 px-4 rounded-xl hover:bg-rose-50 text-rose-500 hover:text-rose-600 font-black tracking-widest text-[10px]"
                                                        onClick={() => openDelete(review)}
                                                    >
                                                        <Trash2 className="h-4 w-4 mr-2" />
                                                        REMOVE
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {filteredReviews.length === 0 && (
                                        <TableRow>
                                            <TableCell colSpan={4} className="text-center py-10 font-bold text-slate-400">
                                                No specific qualitative narrative collected.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* DELETE REVIEW MODAL */}
            <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                <DialogContent className="rounded-[2.5rem] border-none shadow-[0_0_100px_rgba(0,0,0,0.1)] p-8 max-w-md bg-white">
                    <div className="mx-auto w-16 h-16 bg-rose-50 text-rose-500 rounded-[1.5rem] flex items-center justify-center mb-6">
                        <ShieldAlert className="h-8 w-8" />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black text-[#173e72] tracking-tighter text-center uppercase">Violating Content</DialogTitle>
                    </DialogHeader>
                    <div className="text-center py-6">
                        <p className="text-sm font-bold text-slate-500">
                            Remove this feedback narrative from the platform? This action cannot be reversed.
                        </p>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="outline"
                            onClick={() => setIsDeleteOpen(false)}
                            className="flex-1 h-14 rounded-2xl font-black tracking-widest border-slate-200 text-slate-500 hover:text-slate-600 hover:bg-slate-50"
                        >
                            RETAIN
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white h-14 rounded-2xl font-black tracking-widest uppercase transition-all shadow-rose-200 shadow-xl"
                        >
                            EXPUNGE
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
