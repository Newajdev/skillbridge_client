export interface User {
  id: string;
  name?: string;
  email: string;
  password?: string;
  role: "ADMIN" | "TUTOR" | "STUDENT";
  status: "ACTIVE" | "BANNED" | "HOLD";
  createdAt?: string;
  updatedAt?: string;
  image?: string;
  tutorProfile?: TutorProfile;
  studentProfile?: StudentProfile;
}

export interface Category {
    id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
    tutors?: TutorProfile[];
}

export interface TutorProfile {
    id: string;
    userId: string;
    bio?: string;
    phone?: string;
    hourlyRate?: number;
    experience?: number;
    categoryId?: string;
    category?: Category;
    user?: User;
    slots?: Slot[];
    reviewsGiven?: Review[];
    reviewsReceived?: Review[];
    averageRate?: number;
    totalSessions?: number;
    availabilitySlots?: Slot[];
    reviews?: Review[];
    stats?: {
        totalBookings: number;
        completedBookings: number;
        bookingCompletionRate: number;
        totalReviews: number;
        averageRating: number;
    };
    createdAt?: string;
    updatedAt?: string;
}

export interface StudentProfile {
    id: string;
    userId: string;
    phone?: string;
    bio?: string;
    user?: User;
    reviewsGiven?: Review[];
    createdAt?: string;
    updatedAt?: string;
}

export interface Slot {
    id: string;
    tutorId: string;
    day: string;
    startTime: string;
    endTime: string;
    isBooked?: boolean;
    fee: number;
    bookings?: Booking[];
    tutor?: TutorProfile;
    createdAt?: string;
    updatedAt?: string;
}

export interface Booking {
    id: string;
    studentId: string;
    tutorId: string;
    slotId: string;
    status: "CONFIRMED" | "CANCELLED" | "PENDING" | "COMPLETED" | "ONGOING" | "RESCHEDULED";
    price: number;
    transactionId?: string;
    student?: StudentProfile;
    tutor?: TutorProfile;
    slot?: Slot;
    review?: Review;
    createdAt?: string;
    updatedAt?: string;
}

export interface Review {
    id: string;
    bookingId: string;
    tutorId: string;
    studentId: string;
    rating: number;
    comment?: string;
    createdAt?: string;
    updatedAt?: string;
    student?: StudentProfile;
    tutor?: TutorProfile;
}
