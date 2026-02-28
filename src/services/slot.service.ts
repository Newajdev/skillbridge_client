import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const slotService = {
    getMySlots: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/slots/my`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const response = await res.json();
            if (!res.ok) {
                return { data: null, error: { message: response.message || "Failed to fetch slots" } };
            }

            return { data: response.data, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    createSlot: async function (data: any) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/create-slot`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });

            const response = await res.json();
            if (!res.ok) {
                return { data: null, error: { message: response.message || "Failed to create slot" } };
            }

            return { data: response.data, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    updateSlot: async function (id: string, data: any) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/update-slot/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify(data),
            });

            const response = await res.json();
            if (!res.ok) {
                return { data: null, error: { message: response.message || "Failed to update slot" } };
            }

            return { data: response.data, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    deleteSlot: async function (id: string) {
        try {
            const cookieStore = await cookies();
            // Using /update-slot/ because of the backend route mismatch
            const res = await fetch(`${API_URL}/update-slot/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            const response = await res.json();
            if (!res.ok) {
                return { data: null, error: { message: response.message || "Failed to delete slot" } };
            }

            return { data: response.data, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },
};
