import { env } from "@/env";

const API_URL = env.API_URL;

const getAllCategories = async () => {
  try {
    const result = await fetch(`${API_URL}/api/public/categories`);
    
    const response = await result.json();
    
    return { data: response.data, error: null };
  } catch (error) {
    return { data: null, error: { message: "Something Went Wrong", error } };
  }
};

export const categoryService = {
  getAllCategories,
};
