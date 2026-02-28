import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    User, Mail, School, MapPin, Camera, Sparkles,
    ShieldCheck, BadgeCheck, Phone, Briefcase,
    Zap, Star, Clock, GraduationCap, Settings,
    Bell, Globe, LogOut
} from "lucide-react";
import { userService } from "@/services/user.service";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function StudentProfile() {
    const sessionRes = await userService.getSession();
    const user = sessionRes.data?.user;

    const initials = user?.name ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : "U";

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            {/* Header / Banner Area */}
            <div className="relative h-64 w-full bg-gradient-to-r from-[#173e72] via-[#1a4b8a] to-[#2563eb] overflow-hidden rounded-b-[3rem]">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
                </div>
                <div className="absolute bottom-10 left-10 text-white z-10 hidden md:block animate-in fade-in slide-in-from-left-8 duration-700">
                    <h1 className="text-4xl font-black tracking-tight flex items-center gap-3">
                        Student Workspace
                    </h1>
                    <p className="text-blue-100 font-medium mt-2 max-w-md">
                        Manage your learning journey, track progress, and update your professional identity.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 pb-20 relative z-20">
                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Left Sidebar - Profile Summary */}
                    <div className="lg:col-span-4 space-y-6">
                        <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden border border-white/20 animate-in fade-in slide-in-from-bottom-8 duration-500">
                            <CardHeader className="text-center p-8 pb-4">
                                <div className="relative mx-auto w-44 h-44 mb-6 group">
                                    <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl group-hover:bg-blue-500/40 transition-all duration-500" />
                                    <Avatar className="w-full h-full border-4 border-white shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-[1.05]">
                                        <AvatarImage src={user?.image || ""} className="object-cover" />
                                        <AvatarFallback className="text-5xl font-black bg-gradient-to-br from-blue-50 to-blue-100 text-[#173e72]">{initials}</AvatarFallback>
                                    </Avatar>
                                    <button className="absolute bottom-2 right-2 p-3.5 bg-[#173e72] text-white rounded-2xl shadow-xl hover:bg-black transition-all z-20 active:scale-90 border-2 border-white">
                                        <Camera className="h-5 w-5" />
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex items-center justify-center gap-2">
                                        <CardTitle className="text-2xl font-black text-[#173e72] tracking-tight">{user?.name}</CardTitle>
                                        <BadgeCheck className="h-6 w-6 text-blue-500 fill-blue-50" />
                                    </div>
                                    <CardDescription className="text-sm font-bold uppercase tracking-widest opacity-60">
                                        {user?.role?.toLowerCase() || 'Student'} ID: SB-{user?.id?.slice(-6).toUpperCase() || '88291'}
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <CardContent className="p-8 pt-4 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-3xl bg-blue-50/50 border border-blue-100/50 text-center">
                                        <p className="text-2xl font-black text-[#173e72]">12</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Courses</p>
                                    </div>
                                    <div className="p-4 rounded-3xl bg-emerald-50/50 border border-emerald-100/50 text-center">
                                        <p className="text-2xl font-black text-emerald-700">4.8</p>
                                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">GPA Avg</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-4">
                                    <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-all">
                                        <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-blue-100 transition-colors">
                                            <Mail className="h-4.5 w-4.5 text-slate-600 group-hover:text-[#173e72]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Email</p>
                                            <p className="text-sm font-bold text-[#173e72] truncate max-w-[180px]">{user?.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-all">
                                        <div className="p-2.5 rounded-xl bg-slate-100 group-hover:bg-blue-100 transition-colors">
                                            <MapPin className="h-4.5 w-4.5 text-slate-600 group-hover:text-[#173e72]" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-widest opacity-50">Location</p>
                                            <p className="text-sm font-bold text-[#173e72]">Dhaka, Bangladesh</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="p-8 pt-0">
                                <Button variant="outline" className="w-full rounded-2xl h-12 border-slate-200 font-bold hover:bg-slate-50 transition-all group">
                                    Download CV
                                    <Zap className="h-4 w-4 ml-2 text-yellow-500 fill-yellow-500 group-hover:animate-pulse" />
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Achievement Card */}
                        <Card className="border-none shadow-xl bg-gradient-to-br from-[#173e72] to-[#1a4b8a] rounded-[2.5rem] p-8 text-white animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <p className="text-blue-200 text-xs font-bold uppercase tracking-widest">Active Status</p>
                                    <h3 className="text-xl font-black">Top Learner</h3>
                                </div>
                                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                                    <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                                </div>
                            </div>
                            <div className="mt-8 space-y-2">
                                <div className="flex justify-between text-sm font-bold">
                                    <span>Profile Completion</span>
                                    <span>85%</span>
                                </div>
                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-blue-400 to-emerald-400 w-[85%] rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
                                </div>
                            </div>
                            <p className="mt-6 text-sm text-blue-100/70 font-medium">You're just a few steps away from a verified professional profile!</p>
                        </Card>
                    </div>

                    {/* Right Main Content */}
                    <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
                        <Tabs defaultValue="personal" className="w-full">
                            <TabsList className="bg-white/60 backdrop-blur-xl p-1.5 rounded-3xl mb-8 border border-white/40 h-16 w-full md:w-fit shadow-lg">
                                <TabsTrigger value="personal" className="rounded-2xl h-full px-8 data-[state=active]:bg-[#173e72] data-[state=active]:text-white data-[state=active]:shadow-xl font-black transition-all">
                                    Personal Info
                                </TabsTrigger>
                                <TabsTrigger value="security" className="rounded-2xl h-full px-8 data-[state=active]:bg-[#173e72] data-[state=active]:text-white data-[state=active]:shadow-xl font-black transition-all">
                                    Security
                                </TabsTrigger>
                                <TabsTrigger value="preferences" className="rounded-2xl h-full px-8 data-[state=active]:bg-[#173e72] data-[state=active]:text-white data-[state=active]:shadow-xl font-black transition-all">
                                    Preferences
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="personal" className="mt-0 space-y-8">
                                <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white/20 overflow-hidden">
                                    <CardHeader className="p-10 pb-4">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="p-3 bg-blue-50 text-[#173e72] rounded-2xl">
                                                <Sparkles className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-3xl font-black text-[#173e72] tracking-tight">Identity Settings</CardTitle>
                                                <CardDescription className="text-base font-medium opacity-60">Control how you're perceived by tutors and peers.</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-10 pt-4 space-y-10">
                                        <div className="grid gap-8 md:grid-cols-2">
                                            <div className="space-y-3">
                                                <Label htmlFor="fullName" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Full Name</Label>
                                                <div className="relative group">
                                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                                    <Input id="fullName" defaultValue={user?.name} className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-[#173e72]/50 focus:ring-4 focus:ring-[#173e72]/5 transition-all font-bold text-[#173e72] shadow-sm" />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Email Address</Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                                                    <Input id="email" type="email" defaultValue={user?.email} disabled className="pl-12 h-14 rounded-2xl bg-slate-100/50 border-slate-200 font-bold cursor-not-allowed text-slate-500 opacity-80" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid gap-8 md:grid-cols-2">
                                            <div className="space-y-3">
                                                <Label htmlFor="phone" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Phone Number</Label>
                                                <div className="relative group">
                                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                                    <Input id="phone" className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-[#173e72]/50 focus:ring-4 focus:ring-[#173e72]/5 transition-all font-bold text-[#173e72] shadow-sm" defaultValue="+880 1XXXXXXXXX" />
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <Label htmlFor="occupation" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Current Status</Label>
                                                <div className="relative group">
                                                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                                    <Input id="occupation" className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-[#173e72]/50 focus:ring-4 focus:ring-[#173e72]/5 transition-all font-bold text-[#173e72] shadow-sm" defaultValue="Undergraduate Student" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label htmlFor="school" className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Educational Institution</Label>
                                            <div className="relative group">
                                                <School className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-[#173e72] transition-colors" />
                                                <Input id="school" className="pl-12 h-14 rounded-2xl bg-slate-50 border-slate-200 focus:bg-white focus:border-[#173e72]/50 focus:ring-4 focus:ring-[#173e72]/5 transition-all font-bold text-[#173e72] shadow-sm" defaultValue="University of Technology, Dhaka" />
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-[#173e72]/[0.02] p-10 border-t border-slate-100 flex items-center justify-between">
                                        <p className="text-sm font-medium text-slate-400">Last updated: Today at 2:45 PM</p>
                                        <Button className="bg-[#173e72] hover:bg-black rounded-2xl font-black h-14 px-12 shadow-xl shadow-blue-900/10 transition-all active:scale-95 group">
                                            Sync Profile
                                            <div className="ml-2 w-2 h-2 rounded-full bg-blue-400 animate-pulse group-hover:bg-emerald-400" />
                                        </Button>
                                    </CardFooter>
                                </Card>

                                <div className="grid gap-6 md:grid-cols-3">
                                    <div className="p-6 rounded-[2rem] bg-indigo-50/50 border border-indigo-100/50 flex flex-col items-center text-center space-y-3 group hover:bg-indigo-50 transition-all">
                                        <div className="p-3 bg-white rounded-2xl shadow-sm text-indigo-600">
                                            <GraduationCap className="h-6 w-6" />
                                        </div>
                                        <h4 className="font-black text-[#173e72]">Degree Path</h4>
                                        <p className="text-xs font-bold opacity-60">Computer Science</p>
                                    </div>
                                    <div className="p-6 rounded-[2rem] bg-amber-50/50 border border-amber-100/50 flex flex-col items-center text-center space-y-3 group hover:bg-amber-50 transition-all">
                                        <div className="p-3 bg-white rounded-2xl shadow-sm text-amber-600">
                                            <Clock className="h-6 w-6" />
                                        </div>
                                        <h4 className="font-black text-[#173e72]">Learning Hours</h4>
                                        <p className="text-xs font-bold opacity-60">128 Hours Total</p>
                                    </div>
                                    <div className="p-6 rounded-[2rem] bg-rose-50/50 border border-rose-100/50 flex flex-col items-center text-center space-y-3 group hover:bg-rose-50 transition-all">
                                        <div className="p-3 bg-white rounded-2xl shadow-sm text-rose-600">
                                            <ShieldCheck className="h-6 w-6" />
                                        </div>
                                        <h4 className="font-black text-[#173e72]">Certifications</h4>
                                        <p className="text-xs font-bold opacity-60">4 Active Badges</p>
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="security" className="mt-0">
                                <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white/20 overflow-hidden">
                                    <CardHeader className="p-10 pb-4">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
                                                <ShieldCheck className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-3xl font-black text-[#173e72] tracking-tight">Security & Privacy</CardTitle>
                                                <CardDescription className="text-base font-medium opacity-60">Manage your credentials and login sessions.</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-10 pt-4 space-y-8">
                                        <div className="p-6 rounded-3xl bg-emerald-50 text-emerald-800 border border-emerald-100 flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <BadgeCheck className="h-10 w-10 opacity-40 shrink-0" />
                                                <div className="space-y-0.5">
                                                    <p className="font-black">Two-Factor Authentication is Active</p>
                                                    <p className="text-sm font-medium opacity-70">Your account is secured with biometric verification.</p>
                                                </div>
                                            </div>
                                            <Button variant="outline" className="rounded-xl border-emerald-200 text-emerald-700 font-bold hover:bg-emerald-100">Configure</Button>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-3">
                                                <Label className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Current Password</Label>
                                                <Input type="password" placeholder="••••••••" className="h-14 rounded-2xl bg-slate-50 border-slate-200 transition-all font-bold" />
                                            </div>
                                            <div className="grid gap-6 md:grid-cols-2">
                                                <div className="space-y-3">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">New Password</Label>
                                                    <Input type="password" placeholder="********" className="h-14 rounded-2xl bg-slate-50 border-slate-200 transition-all font-bold" />
                                                </div>
                                                <div className="space-y-3">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-[#173e72] opacity-60 ml-1">Confirm New Password</Label>
                                                    <Input type="password" placeholder="********" className="h-14 rounded-2xl bg-slate-50 border-slate-200 transition-all font-bold" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                            <div className="flex flex-col">
                                                <p className="font-black text-[#173e72]">Delete Account</p>
                                                <p className="text-sm font-medium text-slate-400">Permanently remove all your data and access.</p>
                                            </div>
                                            <Button variant="ghost" className="text-rose-500 font-bold hover:bg-rose-50 hover:text-rose-600 rounded-xl px-6">
                                                Deactivate
                                            </Button>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-slate-50/50 p-10 border-t border-slate-100">
                                        <Button className="ml-auto bg-slate-900 hover:bg-black rounded-2xl font-black h-14 px-10 transition-all shadow-lg active:scale-95">
                                            Update Security Policy
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="preferences" className="mt-0">
                                <Card className="border-none shadow-2xl bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white/20 overflow-hidden">
                                    <CardHeader className="p-10 pb-4">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                                <Settings className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-3xl font-black text-[#173e72] tracking-tight">Platform Preferences</CardTitle>
                                                <CardDescription className="text-base font-medium opacity-60">Customize your notifications and platform experience.</CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-10 pt-4 space-y-10">
                                        <div className="grid gap-6">
                                            <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50/80 border border-slate-100">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2.5 bg-blue-100 text-[#173e72] rounded-xl">
                                                        <Bell className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-[#173e72]">Email Notifications</p>
                                                        <p className="text-xs font-medium text-slate-400">Receive updates about your bookings and messages.</p>
                                                    </div>
                                                </div>
                                                <div className="w-12 h-6 bg-emerald-500 rounded-full relative cursor-pointer shadow-inner">
                                                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50/80 border border-slate-100 opacity-60">
                                                <div className="flex items-center gap-4">
                                                    <div className="p-2.5 bg-slate-200 text-slate-600 rounded-xl">
                                                        <Globe className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className="font-black text-[#173e72]">Public Search Visibility</p>
                                                        <p className="text-xs font-medium text-slate-400">Allow tutors to find your profile in searches.</p>
                                                    </div>
                                                </div>
                                                <div className="w-12 h-6 bg-slate-300 rounded-full relative cursor-pointer transition-all">
                                                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-6 border-t border-slate-100 flex items-center gap-4">
                                            <Button variant="outline" className="flex-1 rounded-2xl h-14 border-slate-200 font-bold hover:bg-slate-50 text-rose-600 hover:text-rose-700 transition-all">
                                                <LogOut className="h-4 w-4 mr-2" />
                                                Sign Out of All Sessions
                                            </Button>
                                            <Button variant="outline" className="flex-1 rounded-2xl h-14 border-slate-200 font-bold hover:bg-slate-50 transition-all">
                                                Download My Data (JSON)
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </div>
        </div>
    );
}
