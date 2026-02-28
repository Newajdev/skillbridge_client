"use server";

import { bookingService } from "@/services/booking.service";
import { revalidatePath } from "next/cache";

export async function updateBookingStatusAction(bookingId: string, status: string, sessionLinks?: string) {
    const res = await bookingService.updateBookingStatus(bookingId, status, sessionLinks);
    if (!res.error) {
        revalidatePath("/tutor-dashboard/manage-sessions");
    }
    return res;
}

export async function startSessionAction(bookingId: string, sessionLinks: string) {
    const res = await bookingService.startSession(bookingId, sessionLinks);
    if (!res.error) {
        revalidatePath("/tutor-dashboard/manage-sessions");
    }
    return res;
}
