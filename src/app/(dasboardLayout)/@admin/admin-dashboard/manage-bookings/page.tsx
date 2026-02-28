import React from 'react';
import ManageBookingsAdminClient from "@/components/modules/dashboard/ManageBookingsAdminClient";
import { bookingService } from "@/services/booking.service";

export default async function ManageBookingsPage() {
    const { data: bookings } = await bookingService.getBookings();

    return (
        <ManageBookingsAdminClient initialBookings={bookings || []} />
    );
}
