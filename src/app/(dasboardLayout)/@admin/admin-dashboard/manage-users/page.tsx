import React from 'react';
import { adminService } from "@/services/admin.service";
import ManageUsersClient from "@/components/modules/dashboard/ManageUsersClient";

export default async function ManageUsersPage() {
    const { data: users } = await adminService.getAllUsers();

    return (
        <ManageUsersClient initialUsers={users || []} />
    );
}
