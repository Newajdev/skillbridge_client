import React from 'react';
import { userService } from "@/services/user.service";
import { categoryService } from "@/services/categories.service";
import { bookingService } from "@/services/booking.service";
import ProfileClient from '@/components/modules/dashboard/ProfileClient';

export default async function TutorProfilePage() {
    const [sessionRes, profileRes, categoriesRes, bookingsRes] = await Promise.all([
        userService.getSession(),
        userService.getProfile(),
        categoryService.getAllCategories(),
        bookingService.getBookings()
    ]);

    const user = sessionRes.data?.user;
    const profile = profileRes.data;

    // Robust category data extraction
    let categories = [];
    if (Array.isArray(categoriesRes.data?.data)) {
        categories = categoriesRes.data.data;
    } else if (Array.isArray(categoriesRes.data)) {
        categories = categoriesRes.data;
    }

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            <div className="relative h-64 w-full bg-linear-to-r from-[#173e72] via-[#1a4b8a] to-[#2563eb] overflow-hidden rounded-b-[3rem]">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-40 pb-20 relative z-20">
                <ProfileClient
                    initialUser={user}
                    initialProfile={profile}
                    categories={categories}
                    bookings={bookingsRes.data?.data || []}
                />
            </div>
        </div>
    );
}
