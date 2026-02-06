import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

interface ServiceOptions {
    cache?: RequestCache;
    revalidate?: number;
}

interface GetTutorsParams {
    category?: string;
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    page?: number;
    limit?: number;
    sortBy?: string;
}

export const tutorService = {
    getTutors: async function (
        params?: GetTutorsParams,
        options?: ServiceOptions,
    ) {
        try {
            const url = new URL(`${API_URL}/public/tutors`);

            if (params) {
                Object.entries(params).forEach(([key, value]) => {
                    if (value !== undefined && value !== null && value !== "") {
                        url.searchParams.append(key, value.toString());
                    }
                });
            }

            const config: RequestInit = {};

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            const res = await fetch(url.toString(), config);
            const data = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: data.message || "Failed to fetch tutors" },
                };
            }

            return { data: data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    getTutorById: async function (id: string, options?: ServiceOptions) {
        try {
            const config: RequestInit = {};

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            const res = await fetch(`${API_URL}/public/tutors/${id}`, config);
            const data = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: data.message || "Failed to fetch tutor details" },
                };
            }

            return { data: data.data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },

    getCategories: async function (options?: ServiceOptions) {
        try {
            const config: RequestInit = {};

            if (options?.cache) {
                config.cache = options.cache;
            }

            if (options?.revalidate) {
                config.next = { revalidate: options.revalidate };
            }

            const res = await fetch(`${API_URL}/public/categories`, config);
            const data = await res.json();

            if (!res.ok) {
                return {
                    data: null,
                    error: { message: data.message || "Failed to fetch categories" },
                };
            }

            return { data: data.data, error: null };
        } catch (err) {
            return { data: null, error: { message: "Something Went Wrong" } };
        }
    },
};
