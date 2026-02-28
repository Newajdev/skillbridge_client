import React from 'react';
import ReviewModerationClient from "@/components/modules/dashboard/ReviewModerationClient";
import { adminService } from "@/services/admin.service";

export default async function ManageReviewsPage() {
    const { data: reviews } = await adminService.getAllReviews();

    return (
        <ReviewModerationClient initialReviews={reviews || []} />
    );
}
