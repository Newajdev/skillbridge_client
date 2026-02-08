import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Calendar, Clock, GraduationCap, Video } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const stats = [
  {
    title: "Total Bookings",
    value: "12",
    description: "Lessons booked so far",
    icon: BookOpen,
    color: "text-blue-600",
    bgColor: "bg-blue-100"
  },
  {
    title: "Completed Lessons",
    value: "8",
    description: "Successfully finished",
    icon: GraduationCap,
    color: "text-green-600",
    bgColor: "bg-green-100"
  },
  {
    title: "Upcoming Lessons",
    value: "4",
    description: "Scheduled for this week",
    icon: Calendar,
    color: "text-orange-600",
    bgColor: "bg-orange-100"
  }
];

const upcomingSessions = [
  {
    id: 1,
    tutor: "Dr. Sarah Johnson",
    subject: "Advanced Mathematics",
    date: "Today, Oct 24",
    time: "4:00 PM - 5:00 PM",
    status: "Upcoming"
  },
  {
    id: 2,
    tutor: "James Wilson",
    subject: "Practical JavaScript",
    date: "Tomorrow, Oct 25",
    time: "10:00 AM - 11:30 AM",
    status: "Upcoming"
  }
];

export default function StudentDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-[#173e72]">Student Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your learning progress.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <Card key={index} className="border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bgColor} p-2 rounded-full`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Upcoming Sessions */}
        <Card className="lg:col-span-4 border-none shadow-md">
          <CardHeader>
            <CardTitle>Upcoming Lessons</CardTitle>
            <CardDescription>You have 2 lessons scheduled for the next 48 hours.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-muted/50 transition-colors">
                <div className="flex gap-4 items-center">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-[#173e72]">{session.subject}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{session.tutor}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {session.time}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="mb-2 bg-blue-50 text-blue-700 border-blue-200">
                    {session.status}
                  </Badge>
                  <p className="text-xs font-medium text-muted-foreground">{session.date}</p>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link href="/dashboard/my-bookings">View All Bookings</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions / Featured Tutors */}
        <Card className="lg:col-span-3 border-none shadow-md">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Everything you need to keep learning.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full justify-start h-12 text-[#173e72] font-semibold" variant="outline" asChild>
              <Link href="/tutors">
                <BookOpen className="mr-2 h-5 w-5" /> Browse New Tutors
              </Link>
            </Button>
            <Button className="w-full justify-start h-12 text-[#173e72] font-semibold" variant="outline" asChild>
              <Link href="/dashboard/profile">
                <Clock className="mr-2 h-5 w-5" /> Update My Availability
              </Link>
            </Button>
            <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <h4 className="font-bold text-[#173e72] mb-1">Need help?</h4>
              <p className="text-sm text-muted-foreground mb-3">Our support team is available 24/7 to help you with your lessons.</p>
              <Button size="sm" variant="link" className="p-0 h-auto font-bold text-primary">Contact Support</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
