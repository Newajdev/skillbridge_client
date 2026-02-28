"use server";

import { reviewService } from "@/services/review.service";
import { revalidatePath } from "next/cache";

export const createReviewAction = async (tutorId: string, rating: number, comment: string) => {
    try {
        const res = await reviewService.createReview(tutorId, rating, comment);
        if (!res.error) {
            revalidatePath("/student-dashboard/my-bookings");
        }
        return res;
    } catch (error: any) {
        return { data: null, error: { message: error.message || "Failed to create review" } };
    }
};
