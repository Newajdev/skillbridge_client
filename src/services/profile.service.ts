import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const profileService = {
    getProfile: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/profile/me`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            const data = await res.json();

            if (!res.ok) {
                return { data: null, error: { message: data.message || "Failed to fetch profile" } };
            }

            return { data: data.data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    updateProfile: async function (profileData: any) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/profile/update`, {
                method: "PUT",
                headers: {
                    Cookie: cookieStore.toString(),
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(profileData),
            });

            const data = await res.json();

            if (!res.ok) {
                return { data: null, error: { message: data.message || "Failed to update profile" } };
            }

            return { data: data.data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },
};
