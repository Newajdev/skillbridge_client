import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

const createReview = async (bookingId: string, rating: number, comment: string) => {
    try {
        const cookieStore = await cookies();
        const result = await fetch(`${API_URL}/api/post-reviews`, {
            method: "POST",
            body: JSON.stringify({ bookingId, rating, comment }),
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });

        if (!result.ok) {
            let backendMessage = `Failed to submit review: ${result.status}`;
            try {
                const errorData = await result.json();
                backendMessage = errorData.message || backendMessage;
            } catch (e) {
                // Ignore parse error
            }
            return { data: null, error: { message: backendMessage } };
        }

        const data = await result.json();
        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: { message: "Network error submitting review", error } };
    }
};

export const reviewService = {
    createReview
};
