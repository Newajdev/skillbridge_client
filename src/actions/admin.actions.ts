"use server";

import { adminService } from "@/services/admin.service";
import { revalidatePath } from "next/cache";

// User Actions
export async function updateUserStatusAction(id: string, status: string) {
    const result = await adminService.updateUserStatus(id, status);
    if (!result.error) {
        revalidatePath("/admin-dashboard/manage-users");
        revalidatePath("/admin-dashboard");
    }
    return result;
}

// Category Actions
export async function createCategoryAction(name: string) {
    const result = await adminService.createCategory(name);
    if (!result.error) {
        revalidatePath("/admin-dashboard/manage-categories");
    }
    return result;
}

export async function updateCategoryAction(id: string, name: string) {
    const result = await adminService.updateCategory(id, name);
    if (!result.error) {
        revalidatePath("/admin-dashboard/manage-categories");
    }
    return result;
}

export async function deleteCategoryAction(id: string) {
    const result = await adminService.deleteCategory(id);
    if (!result.error) {
        revalidatePath("/admin-dashboard/manage-categories");
    }
    return result;
}

// Booking actions (using booking service if needed or specialized admin booking actions)
// Currently, simple revalidation is sufficient for many admin tasks.
