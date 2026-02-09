import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, School, MapPin, Camera } from "lucide-react";

export default function StudentProfile() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-[#173e72]">My Profile</h1>
                <p className="text-muted-foreground">Manage your personal information and account settings.</p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
                {/* Profile Picture Card */}
                <Card className="md:col-span-1 border-none shadow-md h-fit">
                    <CardHeader className="text-center">
                        <div className="relative mx-auto w-32 h-32 mb-4 group">
                            <Avatar className="w-full h-full border-4 border-white shadow-lg">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">JD</AvatarFallback>
                            </Avatar>
                            <button className="absolute bottom-1 right-1 p-2 bg-primary text-white rounded-full shadow-md hover:bg-primary/90 transition-colors">
                                <Camera className="h-4 w-4" />
                            </button>
                        </div>
                        <CardTitle className="text-xl font-bold text-[#173e72]">John Doe</CardTitle>
                        <CardDescription>Student since Oct 2026</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>john.doe@example.com</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>Dhaka, Bangladesh</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Personal Information Form */}
                <div className="md:col-span-2 space-y-8">
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Update your general information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" defaultValue="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue="john.doe@example.com" disabled />
                                <p className="text-xs text-muted-foreground">Email change requires verification.</p>
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="school">School/Collage</Label>
                                    <div className="relative">
                                        <School className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input id="school" className="pl-10" defaultValue="Dhaka University" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="grade">Grade/Year</Label>
                                    <Input id="grade" defaultValue="3rd Year" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/30 border-t py-4">
                            <Button className="bg-[#173e72] hover:bg-[#1d4d8d] ml-auto">Save Changes</Button>
                        </CardFooter>
                    </Card>

                    {/* Change Password */}
                    <Card className="border-none shadow-md">
                        <CardHeader>
                            <CardTitle>Account Security</CardTitle>
                            <CardDescription>Update your password to keep your account secure.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" type="password" />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                    <Input id="confirmPassword" type="password" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-muted/30 border-t py-4">
                            <Button variant="outline" className="ml-auto text-[#173e72] border-[#173e72] hover:bg-[#173e72]/5">Update Password</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
