import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

export const adminService = {
    // User Management
    getAllUsers: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            if (!res.ok) {
                return { data: null, error: { message: "Failed to fetch users" } };
            }

            const response = await res.json();
            return { data: response.data, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    updateUserStatus: async function (id: string, status: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/users/status/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ status }),
            });

            const response = await res.json();
            if (!res.ok) {
                return { data: null, error: { message: response.message || "Failed to update status" } };
            }

            return { data: response.data, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    // Category Management
    createCategory: async function (name: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/category`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ name }),
            });

            const response = await res.json();
            if (!res.ok) {
                return { data: null, error: { message: response.message || "Failed to create category" } };
            }

            return { data: response.data, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    updateCategory: async function (id: string, name: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/category/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ name }),
            });

            const response = await res.json();
            if (!res.ok) {
                return { data: null, error: { message: response.message || "Failed to update category" } };
            }

            return { data: response.data, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    deleteCategory: async function (id: string) {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/category/${id}`, {
                method: "DELETE",
                headers: {
                    Cookie: cookieStore.toString(),
                },
            });

            if (!res.ok) {
                const response = await res.json();
                return { data: null, error: { message: response.message || "Failed to delete category" } };
            }

            return { data: true, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    // Review Management
    getAllReviews: async function () {
        try {
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/admin/reviews`, {
                headers: {
                    Cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });

            if (!res.ok) {
                return { data: null, error: { message: "Failed to fetch reviews" } };
            }

            const response = await res.json();
            return { data: response.data, error: null };
        } catch (err) {
            console.error(err);
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },
};
