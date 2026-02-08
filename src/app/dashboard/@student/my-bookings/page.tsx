import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MoreHorizontal, Video, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";

const bookings = [
    {
        id: "BK-101",
        tutor: "Dr. Sarah Johnson",
        subject: "Advanced Mathematics",
        date: "Oct 24, 2026",
        time: "4:00 PM - 5:00 PM",
        status: "Confirmed",
        amount: "$45.00"
    },
    {
        id: "BK-102",
        tutor: "James Wilson",
        subject: "Practical JavaScript",
        date: "Oct 25, 2026",
        time: "10:00 AM - 11:30 AM",
        status: "Confirmed",
        amount: "$60.00"
    },
    {
        id: "BK-098",
        tutor: "Emily Davis",
        subject: "English Literature",
        date: "Oct 20, 2026",
        time: "2:00 PM - 3:00 PM",
        status: "Completed",
        amount: "$35.00"
    },
    {
        id: "BK-095",
        tutor: "Michael Brown",
        subject: "Physics 101",
        date: "Oct 18, 2026",
        time: "11:00 AM - 12:00 PM",
        status: "Cancelled",
        amount: "$40.00"
    }
];

export default function MyBookings() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-[#173e72]">My Bookings</h1>
                    <p className="text-muted-foreground">Manage and track your tutoring sessions.</p>
                </div>
                <Button className="bg-[#173e72] hover:bg-[#1d4d8d]">
                    <Calendar className="mr-2 h-4 w-4" /> Book New Session
                </Button>
            </div>

            <Card className="border-none shadow-md overflow-hidden">
                <CardHeader className="bg-muted/50 pb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input placeholder="Search by tutor or subject..." className="pl-10" />
                        </div>
                        <div className="flex items-center gap-2 w-full md:w-auto">
                            <Button variant="outline" size="sm" className="flex-1 md:flex-none text-[#173e72]">
                                <Filter className="mr-2 h-4 w-4" /> Filter
                            </Button>
                            <Badge variant="secondary" className="px-3 py-1 bg-white border">All Bookings</Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-muted/30">
                            <TableRow>
                                <TableHead className="font-bold text-[#173e72] pl-6">ID</TableHead>
                                <TableHead className="font-bold text-[#173e72]">Tutor & Subject</TableHead>
                                <TableHead className="font-bold text-[#173e72]">Date & Time</TableHead>
                                <TableHead className="font-bold text-[#173e72]">Status</TableHead>
                                <TableHead className="font-bold text-[#173e72]">Amount</TableHead>
                                <TableHead className="text-right pr-6">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bookings.map((booking) => (
                                <TableRow key={booking.id}>
                                    <TableCell className="font-medium pl-6">{booking.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-bold text-[#173e72]">{booking.tutor}</span>
                                            <span className="text-sm text-muted-foreground">{booking.subject}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{booking.date}</span>
                                            <span className="text-sm text-muted-foreground">{booking.time}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                booking.status === "Confirmed" ? "default" :
                                                    booking.status === "Completed" ? "outline" : "destructive"
                                            }
                                            className={
                                                booking.status === "Confirmed" ? "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100" :
                                                    booking.status === "Completed" ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-100" :
                                                        "bg-red-100 text-red-700 border-red-200 hover:bg-red-100"
                                            }
                                        >
                                            {booking.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{booking.amount}</TableCell>
                                    <TableCell className="text-right pr-6">
                                        {booking.status === "Confirmed" ? (
                                            <div className="flex items-center justify-end gap-2">
                                                <Button size="sm" variant="ghost" className="text-blue-600">
                                                    <Video className="h-4 w-4 mr-1" /> Join
                                                </Button>
                                                <Button size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ) : (
                                            <Button size="icon" variant="ghost">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
