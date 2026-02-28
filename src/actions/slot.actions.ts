"use server";

import { slotService } from "@/services/slot.service";
import { revalidatePath } from "next/cache";

export async function createSlotAction(data: any) {
    const res = await slotService.createSlot(data);
    if (!res.error) {
        revalidatePath("/tutor-dashboard/manage-slot");
    }
    return res;
}

export async function updateSlotAction(id: string, data: any) {
    const res = await slotService.updateSlot(id, data);
    if (!res.error) {
        revalidatePath("/tutor-dashboard/manage-slot");
    }
    return res;
}

export async function deleteSlotAction(id: string) {
    const res = await slotService.deleteSlot(id);
    if (!res.error) {
        revalidatePath("/tutor-dashboard/manage-slot");
    }
    return res;
}
