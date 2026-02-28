export interface Booking {
  status: "CONFIRMED" | "CANCELLED" | "PENDING";
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilitySlot {
  id: string;
  tutorId: string;
  day: string;
  startTime: string;
  endTime: string;
  bookings?: Booking[];
}

export interface Review {
  id: string;
  bookingId: string;
  tutorId: string;
  studentId: string;
  rating: string;
  comment: string;
  createdAt: string;
  student?: {
    user: {
      name: string;
      image: string;
    };
  };
}

export interface tutor {
  id: string;
  userId: string;
  bio: string;
  phone: string;
  hourlyRate: number;
  experience: number;
  averageRate: number;
  totalSessions: number;
  categoryId: string;
  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string;
    role: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  availabilitySlots?: AvailabilitySlot[];
  reviews?: Review[];
}
