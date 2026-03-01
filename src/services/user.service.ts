import { env } from "@/env";
import { cookies } from "next/headers";

const AUTH_URL = env.AUTH_URL;

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();


      const res = await fetch(`${AUTH_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      const session = await res.json();

      if (session === null) {
        return { data: null, error: { message: "Session is missing." } };
      }

      return { data: session, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  getProfile: async function () {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.API_URL}/api/profile/me`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        return { data: null, error: { message: "Failed to fetch profile" } };
      }

      const response = await res.json();
      return { data: response.data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  },
  updateProfile: async function (data: any) {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${env.API_URL}/api/profile/update/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();

      if (!res.ok) {
        return { data: null, error: { message: response.message || "Failed to update profile" } };
      }

      return { data: response.data, error: null };
    } catch (err) {
      console.error(err);
      return { data: null, error: { message: "Something Went Wrong" } };
    }
  }
};
