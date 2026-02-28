import React from 'react';
import { bookingService } from "@/services/booking.service";
import MyBookingsClient from '@/components/modules/dashboard/MyBookingsClient';

export default async function MyBookings() {
    const bookingsRes = await bookingService.getBookings();
    const bookings = bookingsRes.data?.data || [];

    return (
        <MyBookingsClient initialBookings={bookings} />
    );
}
