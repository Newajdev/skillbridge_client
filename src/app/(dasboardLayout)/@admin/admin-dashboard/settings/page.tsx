import React from 'react';
import { userService } from "@/services/user.service";
import AdminSettingsClient from "@/components/modules/dashboard/AdminSettingsClient";

export default async function AdminSettingsPage() {
    const { data: profile } = await userService.getProfile();

    return (
        <AdminSettingsClient initialProfile={profile?.adminProfile || profile?.user || {}} />
    );
}
