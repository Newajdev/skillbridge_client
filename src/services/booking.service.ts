import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

const getBookings = async () => {
    try {
        const cookieStore = await cookies();
        const result = await fetch(`${API_URL}/bookings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        });

        if (!result.ok) {
            return { data: null, error: { message: `Server error: ${result.status}` } };
        }

        const response = await result.json();
        return { data: response.data || response, error: null };
    } catch (error) {
        return { data: null, error: { message: "Network error fetching bookings", error } };
    }
};

const createBooking = async (slotId: string) => {
    try {
        const cookieStore = await cookies();
        const result = await fetch(`${API_URL}/create-bookings`, {
            method: "POST",
            body: JSON.stringify({ slotId }),
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });

        if (!result.ok) {
            return { data: null, error: { message: `Booking failed: ${result.status}` } };
        }

        const data = await result.json();
        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: { message: "Network error creating booking", error } };
    }
};

const updateBookingStatus = async (bookingId: string, status: string, sessionLinks?: string) => {
    try {
        const cookieStore = await cookies();
        const result = await fetch(`${API_URL}/change-booking-status/${bookingId}`, {
            method: "PUT",
            body: JSON.stringify({ status, sessionLinks }),
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });

        if (!result.ok) {
            return { data: null, error: { message: `Update failed: ${result.status}` } };
        }

        const data = await result.json();
        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: { message: "Network error updating booking", error } };
    }
};

const startSession = async (bookingId: string, sessionLinks: string) => {
    try {
        const cookieStore = await cookies();
        const result = await fetch(`${API_URL}/start-session/${bookingId}`, {
            method: "PUT",
            body: JSON.stringify({ sessionLinks }),
            headers: {
                "Content-Type": "application/json",
                Cookie: cookieStore.toString(),
            },
        });

        if (!result.ok) {
            return { data: null, error: { message: `Update failed: ${result.status}` } };
        }

        const data = await result.json();
        return { data: data, error: null };
    } catch (error) {
        return { data: null, error: { message: "Network error starting session", error } };
    }
};

export const bookingService = {
    getBookings,
    createBooking,
    updateBookingStatus,
    startSession
};
