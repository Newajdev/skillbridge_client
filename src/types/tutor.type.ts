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
  },
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
}

