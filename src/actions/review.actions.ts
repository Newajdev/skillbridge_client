"use server";

import { reviewService } from "@/services/review.service";
import { revalidatePath } from "next/cache";

export async function createReviewAction(bookingId: string, rating: number, comment: string) {
    const res = await reviewService.createReview(bookingId, rating, comment);
    if (!res.error) {
        revalidatePath("/student-dashboard/my-bookings");
    }
    return res;
}
