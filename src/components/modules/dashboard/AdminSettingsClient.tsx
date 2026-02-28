"use client";

import React, { useState } from 'react';
import { TopDesign } from "@/components/ui/topDesign";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, UserCog, Mail, Key, Loader2, User } from "lucide-react";
import { toast } from "sonner";
import { updateProfileAction } from "@/actions/user.actions";

interface AdminSettingsClientProps {
    initialProfile: any;
}

export default function AdminSettingsClient({ initialProfile }: AdminSettingsClientProps) {
    const [name, setName] = useState(initialProfile?.name || "");
    const [email, setEmail] = useState(initialProfile?.email || "");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = {
                name,
            };
            const result = await updateProfileAction(formData);

            if (!result.error) {
                toast.success("Security profile updated successfully");
            } else {
                toast.error(result.error.message || "Operation failed");
            }
        } catch (error) {
            toast.error("An unexpected security error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            <TopDesign />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20 space-y-8 animate-in fade-in duration-700">
                <div className="flex flex-col md:flex-row md:items-center gap-6 mb-12">
                    <div className="p-4 bg-[#173e72] text-white rounded-[2rem] shadow-2xl shadow-blue-900/20">
                        <UserCog className="h-8 w-8" />
                    </div>
                    <div className="text-white">
                        <h1 className="text-3xl font-black tracking-tight">Security Credentials</h1>
                        <p className="text-white/60 font-medium text-sm">Update platform authorization protocols.</p>
                    </div>
                </div>

                <div className="grid gap-8">
                    <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] overflow-hidden">
                        <CardHeader className="p-10 pb-0 flex flex-row items-center gap-4">
                            <div className="h-10 w-1.5 bg-[#173e72]" />
                            <div>
                                <CardTitle className="text-2xl font-black text-[#173e72] tracking-tighter uppercase">Identity Information</CardTitle>
                            </div>
                        </CardHeader>

                        <CardContent className="p-10">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="space-y-6">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#173e72] opacity-50 flex items-center gap-2">
                                            <User className="h-3 w-3" /> Root Authorization Name
                                        </Label>
                                        <Input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="System Administrator"
                                            className="h-14 font-black text-[#173e72] text-lg bg-slate-50 border-slate-100 rounded-2xl px-6 focus:ring-4 focus:ring-[#173e72]/10 transition-all border-none"
                                        />
                                    </div>

                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#173e72] opacity-50 flex items-center gap-2">
                                            <Mail className="h-3 w-3" /> Security Access Email
                                        </Label>
                                        <Input
                                            type="email"
                                            value={email}
                                            disabled
                                            className="h-14 font-black text-slate-400 text-lg bg-slate-100 rounded-2xl px-6 border-none italic opacity-70"
                                        />
                                        <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 max-w-max px-3 py-1 rounded-full flex items-center gap-2">
                                            <ShieldCheck className="h-3 w-3" /> Root Identifier Verified
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#173e72] hover:bg-black text-white rounded-2xl font-black px-8 transition-all h-16 text-lg tracking-[0.2em] shadow-xl group border-l-[6px] border-amber-400 mt-6"
                                >
                                    {isSubmitting ? (
                                        <Loader2 className="h-6 w-6 animate-spin mx-auto text-amber-400" />
                                    ) : (
                                        <div className="flex items-center justify-center gap-3">
                                            <Key className="h-5 w-5 opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                                            Update Protocols
                                        </div>
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

// Note: Handled the UserSecret missing import warning by using ShieldCheck in UI fallback.
