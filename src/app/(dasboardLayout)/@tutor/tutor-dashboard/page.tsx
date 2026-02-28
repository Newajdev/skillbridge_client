import React from 'react';
import { bookingService } from "@/services/booking.service";
import TutorDashboardClient from '@/components/modules/dashboard/TutorDashboardClient';
import { TopDesign } from '@/components/ui/topDesign';

export default async function TutorDasboard() {
  const bookingsRes = await bookingService.getBookings();
  const bookings = bookingsRes.data?.data || [];

  return (
    <div className="min-h-screen bg-[#f8fafc]/50">
      <TopDesign />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20">
        <TutorDashboardClient initialBookings={bookings} />
      </div>
    </div>
  );
}
