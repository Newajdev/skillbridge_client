import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

const getTutors = async (params?: Record<string, any>) => {
  try {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          if (Array.isArray(value)) {
            queryParams.append(key, value.join(","));
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });
    }

    const url = `${API_URL}/api/public/tutors${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    const result = await fetch(url);

    const data = await result.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong", error } };
  }
};

const getTutorById = async (id: string | string[]) => {
  try {
    const result = await fetch(`${API_URL}/api/public/tutors/${id}`);

    const data = await result.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong", error } };
  }
};

const getTutorSlots = async (tutorId: string) => {
  try {
    const result = await fetch(`${API_URL}/api/slots?tutorId=${tutorId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!result.ok) {
      return { data: null, error: { message: `Server error: ${result.status}` } };
    }

    const data = await result.json();
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Network error fetching slots", error } };
  }
};

const getPlatformStats = async () => {
  try {
    const result = await fetch(`${API_URL}/api/public/stats`, {
      cache: "no-store",
    });

    const data = await result.json();
    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong", error } };
  }
};

export const publicService = {
  getTutors,
  getTutorById,
  getTutorSlots,
  getPlatformStats,
};
