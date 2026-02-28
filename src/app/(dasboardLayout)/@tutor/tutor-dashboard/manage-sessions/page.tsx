import React from 'react';
import { bookingService } from "@/services/booking.service";
import ManageSessionClient from '@/components/modules/dashboard/ManageSessionClient';
import { TopDesign } from '@/components/ui/topDesign';

export default async function ManageSessionsPage() {
    const bookingsRes = await bookingService.getBookings();
    // The API returns { success: true, data: [...] }
    const bookings = bookingsRes.data?.data || [];

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            <TopDesign />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20">
                <ManageSessionClient initialBookings={bookings} />
            </div>
        </div>
    );
}
