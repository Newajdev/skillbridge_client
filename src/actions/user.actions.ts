"use server"

import { userService } from "@/services/user.service";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(data: any) {
    const result = await userService.updateProfile(data);
    if (!result.error) {
        revalidatePath("/student-dashboard/profile");
        revalidatePath("/tutor-dashboard/profile");
    }
    return result;
}
