import { env } from "@/env";

const API_URL = env.API_URL;

const getTutors = async () => {
  try {
    const result = await fetch(`${API_URL}/public/tutors`);

    const data = await result.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong", error } };
  }
};

const getTutorById = async (id: string | string[]) => {
  try {
    const result = await fetch(`${API_URL}/public/tutors/${id}`);

    const data = await result.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong", error } };
  }
};

export const tutorService = {
  getTutors,
  getTutorById,
};
