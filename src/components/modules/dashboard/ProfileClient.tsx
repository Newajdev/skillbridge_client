"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    User, Mail, Sparkles, Phone, Image as ImageIcon, Award, DollarSign, Loader2, BadgeCheck, BookOpen
} from "lucide-react";
import { Roles } from "@/constants/roles";
import { updateProfileAction } from "@/actions/user.actions";
import { toast } from "sonner";

interface ProfileClientProps {
    initialUser: any;
    initialProfile: any;
    categories?: any[];
    bookings?: any[];
}

export default function ProfileClient({ initialUser, initialProfile, categories = [], bookings = [] }: ProfileClientProps) {
    const isTutor = initialUser?.role?.toUpperCase() === Roles.tutor;
    const currentProfile = isTutor ? initialProfile?.tutorProfile : initialProfile?.studentProfile;

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialUser?.name || "",
        phone: currentProfile?.phone || "",
        bio: currentProfile?.bio || "",
        image: initialUser?.image || "",
        hourlyRate: currentProfile?.hourlyRate || 0,
        experience: currentProfile?.experience || 0,
        categoryId: currentProfile?.categoryId || "",
    });

    const initials = formData.name ? formData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : "U";
    const selectedCategory = categories?.find(cat => cat.id === formData.categoryId);

    // Disable category select if it already has a value in initialProfile
    const isCategoryDisabled = !!currentProfile?.categoryId;

    const handleUpdate = async () => {
        setLoading(true);
        const toastId = toast.loading("Updating profile...");

        try {
            const dataToUpdate: any = {
                name: formData.name,
                image: formData.image,
                phone: formData.phone,
                bio: formData.bio,
            };

            if (isTutor) {
                dataToUpdate.hourlyRate = Number(formData.hourlyRate);
                dataToUpdate.experience = Number(formData.experience);
                dataToUpdate.categoryId = formData.categoryId;
            }

            const res = await updateProfileAction(dataToUpdate);

            if (res.error) {
                toast.error(res.error.message, { id: toastId });
            } else {
                toast.success("Profile updated successfully!", { id: toastId });
            }
        } catch (error) {
            toast.error("Something went wrong", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="grid gap-8 lg:grid-cols-12">
            {/* Left Sidebar - Profile Summary */}
            <div className="lg:col-span-4 space-y-6">
                <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-white/20 animate-in fade-in slide-in-from-bottom-8 duration-500">
                    <CardHeader className="text-center p-8 pb-4">
                        <div className="relative mx-auto w-44 h-44 mb-6 group">
                            <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl group-hover:bg-blue-500/40 transition-all duration-500" />
                            <Avatar className="w-full h-full border-4 border-white shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.05]">
                                <AvatarImage src={formData.image || ""} className="object-cover" />
                                <AvatarFallback className="text-5xl font-black bg-gradient-to-br from-blue-50 to-blue-100 text-[#173e72]">{initials}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center justify-center gap-2">
                                <CardTitle className="text-2xl font-black text-[#173e72] tracking-tight">{formData.name}</CardTitle>
                                <BadgeCheck className="h-6 w-6 text-blue-500 fill-blue-50" />
                            </div>
                            <CardDescription className="text-sm font-bold uppercase tracking-widest opacity-60">
                                {isTutor ? (selectedCategory?.name || "Expert Tutor") : "Student Profile"}
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="p-8 pt-4 space-y-6">
                        <div className={`grid gap-4 ${isTutor ? "grid-cols-2" : "grid-cols-1"}`}>
                            <div className="p-4 rounded-3xl bg-blue-50/50 border border-blue-100/50 text-center animate-in zoom-in-50 duration-500 delay-100">
                                <p className="text-2xl font-black text-[#173e72]">
                                    {isTutor
                                        ? bookings.filter(b => b.status === "COMPLETED").length
                                        : bookings.length
                                    }
                                </p>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                                    {isTutor ? "Classes" : "Courses"}
                                </p>
                            </div>
                            {isTutor && (
                                <div className="p-4 rounded-3xl bg-emerald-50/50 border border-emerald-100/50 text-center animate-in zoom-in-50 duration-500 delay-200">
                                    <p className="text-2xl font-black text-emerald-700">
                                        5.0
                                    </p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">
                                        Rating
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-all">
                                <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-blue-100 transition-colors">
                                    <Mail className="h-4.5 w-4.5 text-slate-600 group-hover:text-[#173e72]" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Email</p>
                                    <p className="text-sm font-bold text-[#173e72] truncate max-w-[180px]">{initialUser?.email}</p>
                                </div>
                            </div>
                            {formData.phone && (
                                <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-all">
                                    <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-blue-100 transition-colors">
                                        <Phone className="h-4.5 w-4.5 text-slate-600 group-hover:text-[#173e72]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Phone</p>
                                        <p className="text-sm font-bold text-[#173e72]">{formData.phone}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Right Main Content - Details Section */}
            <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white/20 overflow-hidden">
                    <CardHeader className="p-10 pb-4">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="p-3 bg-blue-50 text-[#173e72] rounded-2xl">
                                <Sparkles className="h-6 w-6" />
                            </div>
                            <div>
                                <CardTitle className="text-3xl font-black text-[#173e72] tracking-tight">Profile Details</CardTitle>
                                <CardDescription className="text-base font-medium opacity-60">Manage your core information and professional bio.</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-10 pt-4 space-y-10">
                        {/* Basic Information */}
                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                                <Label htmlFor="fullName" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Full Name</Label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                    <Input
                                        id="fullName"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-[#173e72]/50 focus:ring-4 focus:ring-[#173e72]/5 transition-all font-bold text-[#173e72] shadow-sm"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                    <Input id="email" type="email" defaultValue={initialUser?.email} disabled className="pl-12 h-14 rounded-2xl bg-slate-100/50 border-slate-200 font-bold cursor-not-allowed text-slate-500 opacity-80" />
                                </div>
                            </div>
                        </div>

                        {/* Phone and Image URL */}
                        <div className="grid gap-8 md:grid-cols-2">
                            <div className="space-y-3">
                                <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Phone Number</Label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                    <Input
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-[#173e72]/50 focus:ring-4 focus:ring-[#173e72]/5 transition-all font-bold text-[#173e72] shadow-sm"
                                        placeholder="+880 1XXXXXXXXX"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label htmlFor="imageUrl" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Profile Image URL</Label>
                                <div className="relative group">
                                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                    <Input
                                        id="imageUrl"
                                        value={formData.image}
                                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                        className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-[#173e72]/50 focus:ring-4 focus:ring-[#173e72]/5 transition-all font-bold text-[#173e72] shadow-sm"
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tutor Specific Fields */}
                        {isTutor && (
                            <>
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="space-y-3">
                                        <Label htmlFor="hourlyRate" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Hourly Rate ($)</Label>
                                        <div className="relative group">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                            <Input
                                                id="hourlyRate"
                                                type="number"
                                                value={formData.hourlyRate}
                                                onChange={(e) => setFormData({ ...formData, hourlyRate: Number(e.target.value) })}
                                                className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-[#173e72]/50 focus:ring-4 focus:ring-[#173e72]/5 transition-all font-bold text-[#173e72] shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label htmlFor="experience" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Experience (Years)</Label>
                                        <div className="relative group">
                                            <Award className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                            <Input
                                                id="experience"
                                                type="number"
                                                value={formData.experience}
                                                onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                                                className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-[#173e72]/50 focus:ring-4 focus:ring-[#173e72]/5 transition-all font-bold text-[#173e72] shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Category Dropdown */}
                                <div className="space-y-3">
                                    <Label htmlFor="category" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Subject Category (Cannot be changed after set)</Label>
                                    <div className="relative">
                                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 z-10 pointer-events-none" />
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    disabled={isCategoryDisabled}
                                                    className="pl-12 h-14 w-full rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-[#173e72]/50 focus:ring-4 focus:ring-[#173e72]/5 transition-all font-bold text-[#173e72] shadow-sm relative justify-start text-left hover:bg-slate-50"
                                                >
                                                    {selectedCategory?.name || "Select a subject category"}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] min-w-[200px] rounded-2xl border-slate-200 shadow-xl max-h-[300px] overflow-y-auto" align="start">
                                                <DropdownMenuLabel className="font-black text-[10px] uppercase tracking-widest opacity-50 px-4 py-2">Available Categories</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                {categories && categories.length > 0 ? (
                                                    categories.map((cat) => (
                                                        <DropdownMenuItem
                                                            key={cat.id}
                                                            onClick={() => setFormData({ ...formData, categoryId: cat.id })}
                                                            className="rounded-xl font-bold py-3 px-4 cursor-pointer focus:bg-blue-50 focus:text-[#173e72]"
                                                        >
                                                            {cat.name}
                                                        </DropdownMenuItem>
                                                    ))
                                                ) : (
                                                    <div className="p-4 text-center text-sm text-slate-500 font-bold">
                                                        No categories found
                                                    </div>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    {isCategoryDisabled && (
                                        <p className="text-[10px] font-bold text-amber-600 ml-1 uppercase tracking-widest">
                                            Category is locked to your profile.
                                        </p>
                                    )}
                                </div>
                            </>
                        )}

                        {/* Bio Section */}
                        <div className="space-y-3">
                            <Label htmlFor="bio" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Professional Bio</Label>
                            <Textarea
                                id="bio"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                className="min-h-[150px] rounded-[2rem] bg-slate-50 border-slate-200 focus:bg-white focus:border-[#173e72]/50 focus:ring-4 focus:ring-[#173e72]/5 transition-all font-medium text-[#173e72] p-6 shadow-sm resize-none"
                                placeholder="Write a brief introduction about yourself..."
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="bg-[#173e72]/[0.02] p-10 border-t border-slate-100 flex items-center justify-between">
                        <p className="text-sm font-medium text-slate-400">Sync with SkillBridge Cloud to save changes.</p>
                        <Button
                            onClick={handleUpdate}
                            disabled={loading}
                            className="bg-[#173e72] hover:bg-black rounded-2xl font-black h-14 px-12 shadow-xl shadow-blue-900/10 transition-all active:scale-95 group"
                        >
                            {loading ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : "Update Profile"}
                            {!loading && <div className="ml-2 w-2 h-2 rounded-full bg-blue-400 animate-pulse group-hover:bg-emerald-400" />}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
