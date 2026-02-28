"use client";

import React, { useState } from 'react';
import { TopDesign } from "@/components/ui/topDesign";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Users,
    Search,
    Filter,
    ShieldAlert,
    UserCheck,
    MoreHorizontal,
    MoreVertical,
    CheckCircle2,
    XCircle,
    Loader2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { updateUserStatusAction } from "@/actions/admin.actions";
import { toast } from "sonner";
import Image from "next/image";

interface ManageUsersClientProps {
    initialUsers: any[];
}

export default function ManageUsersClient({ initialUsers }: ManageUsersClientProps) {
    const [users, setUsers] = useState(initialUsers);
    const [searchTerm, setSearchTerm] = useState("");
    const [isUpdating, setIsUpdating] = useState<string | null>(null);

    const filteredUsers = users.filter((user: any) =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === "ACTIVE" ? "BANNED" : "ACTIVE";
        setIsUpdating(id);

        try {
            const res = await updateUserStatusAction(id, newStatus);
            if (!res.error) {
                toast.success(`User status updated to ${newStatus}`);
                setUsers(users.map((u: any) => u.id === id ? { ...u, status: newStatus } : u));
            } else {
                toast.error(res.error.message || "Failed to update status");
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
                            <Users className="h-8 w-8" />
                        </div>
                        <div className="text-white">
                            <h1 className="text-3xl font-black tracking-tight">System Registry</h1>
                            <p className="text-white/60 font-medium">Manage and audit user base records.</p>
                        </div>
                    </div>
                </div>

                <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden">
                    <CardHeader className="p-10 pb-0">
                        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
                            <div className="relative w-full lg:max-w-md group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                <Input
                                    placeholder="Search by name or email..."
                                    className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all shadow-sm font-bold text-[#173e72]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-4">
                                <Button variant="outline" className="h-14 rounded-2xl border-slate-100 bg-slate-50/50 hover:bg-white font-bold text-[#173e72] px-6">
                                    <Filter className="mr-2 h-4 w-4" /> Export Leads
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 pt-0">
                        <div className="rounded-[2.5rem] border border-slate-50 overflow-hidden shadow-sm">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow className="border-slate-100">
                                        <TableHead className="font-black text-[#173e72] pl-8 py-5 uppercase tracking-[0.2em] text-[10px]">Registry Node</TableHead>
                                        <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">Permission Role</TableHead>
                                        <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">System Status</TableHead>
                                        <TableHead className="font-black text-[#173e72] py-5 uppercase tracking-[0.2em] text-[10px]">Joined Date</TableHead>
                                        <TableHead className="text-right pr-8 py-5 uppercase tracking-[0.2em] text-[10px]">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredUsers.map((user: any) => (
                                        <TableRow key={user.id} className="group hover:bg-white transition-all duration-300 border-slate-50">
                                            <TableCell className="pl-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative h-12 w-12 rounded-2xl overflow-hidden bg-[#173e72]/5 border border-[#173e72]/10 flex items-center justify-center font-black text-[#173e72]">
                                                        {user.name?.charAt(0) || "U"}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-black text-[#173e72] text-base leading-tight">{user.name}</span>
                                                        <span className="text-xs font-bold text-slate-400">{user.email}</span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={`px-3 py-1 rounded-full font-black text-[9px] uppercase tracking-widest border-none ring-1 ring-inset ${user.role === 'ADMIN' ? 'bg-indigo-50 text-indigo-600 ring-indigo-500/10' :
                                                        user.role === 'TUTOR' ? 'bg-amber-50 text-amber-600 ring-amber-500/10' :
                                                            'bg-blue-50 text-blue-600 ring-blue-500/10'
                                                    }`}>
                                                    {user.role}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className={`h-2 w-2 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                                                    <span className={`text-[10px] font-black uppercase tracking-wider ${user.status === 'ACTIVE' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                                        {user.status}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm font-bold text-slate-500">
                                                {new Date(user.createdAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell className="text-right pr-8">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleToggleStatus(user.id, user.status)}
                                                        disabled={isUpdating === user.id}
                                                        className={`rounded-2xl font-black px-5 transition-all active:scale-95 flex items-center gap-2 h-10 ${user.status === 'ACTIVE'
                                                                ? 'border-rose-100 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white'
                                                                : 'border-emerald-100 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white'
                                                            }`}
                                                    >
                                                        {isUpdating === user.id ? (
                                                            <Loader2 className="h-4 w-4 animate-spin" />
                                                        ) : (
                                                            <>
                                                                {user.status === 'ACTIVE' ? <XCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                                                                {user.status === 'ACTIVE' ? 'RESTRICK' : 'RESTORE'}
                                                            </>
                                                        )}
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
