import React from 'react';
import { adminService } from "@/services/admin.service";
import AdminDashboardClient from "@/components/modules/dashboard/AdminDashboardClient";

export default async function AdminDashboard() {
  const { data: users } = await adminService.getAllUsers();
  const { data: reviews } = await adminService.getAllReviews();

  return (
    <AdminDashboardClient
      users={users || []}
      reviews={reviews || []}
    />
  );
}
