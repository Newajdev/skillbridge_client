import React from 'react';
import { userService } from "@/services/user.service";
import { bookingService } from "@/services/booking.service";
import StudentDashboardClient from "@/components/modules/dashboard/StudentDashboardClient";
import { TopDesign } from "@/components/ui/topDesign";

export default async function StudentDashboard() {
  const [sessionRes, bookingsRes] = await Promise.all([
    userService.getSession(),
    bookingService.getBookings(),
  ]);

  const user = sessionRes.data?.user;
  const bookings = bookingsRes.data?.data || [];

  return (
    <div className="min-h-screen bg-[#f8fafc]/50">
      <TopDesign />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20">
        <StudentDashboardClient
          initialBookings={bookings}
          userName={user?.name}
        />
      </div>
    </div>
  );
}
