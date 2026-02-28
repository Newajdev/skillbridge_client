import React from 'react';
import { slotService } from "@/services/slot.service";
import ManageSlotClient from '@/components/modules/dashboard/ManageSlotClient';
import { TopDesign } from '@/components/ui/topDesign';

export default async function ManageSlotPage() {
    const slotsRes = await slotService.getMySlots();
    const slots = slotsRes.data || [];

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            <TopDesign />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20">
                <ManageSlotClient initialSlots={slots} />
            </div>
        </div>
    );
}
