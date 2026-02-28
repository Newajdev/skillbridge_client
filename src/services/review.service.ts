import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

const createReview = async (tutorId: string, rating: number, comment: string) => {
    try {
        const cookieStore = await cookies();
        const result = await fetch(`${API_URL}/create-review`, {
            method: "POST",
            body: JSON.stringify({ tutorId, rating, comment }),
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });

        const data = await result.json();

        if (!result.ok) {
            return { data: null, error: { message: data.message || `Review failed: ${result.status}` } };
        }

        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: { message: "Network error creating review", error } };
    }
};

const getTutorReviews = async (tutorId: string) => {
    try {
        const result = await fetch(`${API_URL}/reviews/${tutorId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!result.ok) {
            return { data: null, error: { message: `Fetch failed: ${result.status}` } };
        }

        const data = await result.json();
        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: { message: "Network error fetching reviews", error } };
    }
};

export const reviewService = {
    createReview,
    getTutorReviews
};
