import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Card, CardContent } from './card';
import Image from 'next/image';
import { Badge, BookOpen, GraduationCap, Star } from 'lucide-react';
import { Button } from './button';

export default function TutorsGrid() {
    const MOCK_TUTORS = [
      {
        id: 1,
        name: "Dr. Sarah Johnson",
        subject: "Advanced Physics",
        category: "Science",
        rate: 45,
        rating: 5.0,
        reviewCount: 124,
        image: "https://i.pravatar.cc/150?u=sarah",
        description:
          "PhD in Theoretical Physics with 10+ years of teaching experience. Specializing in Quantum Mechanics and Relativity.",
      },
      {
        id: 2,
        name: "Michael Chen",
        subject: "Full Stack Web Development",
        category: "Programming",
        rate: 60,
        rating: 4.9,
        reviewCount: 85,
        image: "https://i.pravatar.cc/150?u=michael",
        description:
          "Senior Software Engineer. Expert in React, Node.js, and Cloud Architecture. Learn by building real-world projects.",
      },
      {
        id: 3,
        name: "Elena Rodriguez",
        subject: "Spanish Language",
        category: "Languages",
        rate: 35,
        rating: 5.0,
        reviewCount: 210,
        image: "https://i.pravatar.cc/150?u=elena",
        description:
          "Certified DELE examiner. Native speaker from Madrid. Fun and interactive classes for all levels.",
      },
      {
        id: 4,
        name: "David Smith",
        subject: "Calculus & Algebra",
        category: "Mathematics",
        rate: 40,
        rating: 4.8,
        reviewCount: 156,
        image: "https://i.pravatar.cc/150?u=david",
        description:
          "Mathematics professor with a passion for simplifying complex theories. Expert in SAT/GRE prep.",
      },
      {
        id: 5,
        name: "Dr. Emily Brown",
        subject: "Organic Chemistry",
        category: "Science",
        rate: 50,
        rating: 4.9,
        reviewCount: 92,
        image: "https://i.pravatar.cc/150?u=emily",
        description:
          "Specializing in biochemistry and pharmaceutical chemistry. Helped 500+ students ace their exams.",
      },
      {
        id: 6,
        name: "James Wilson",
        subject: "English Literature",
        category: "Languages",
        rate: 30,
        rating: 4.7,
        reviewCount: 64,
        image: "https://i.pravatar.cc/150?u=james",
        description:
          "Expert in Shakespearean literature and creative writing. High school and college level tutoring available.",
      },
    ];

    const CATEGORIES = [
      "Mathematics",
      "Science",
      "Programming",
      "Languages",
      "Arts & Music",
      "Business",
    ];
  return (
    <main className="flex-1">
      <div className="hidden lg:flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border">
        <span className="font-bold text-[#173e72] text-lg">
          {MOCK_TUTORS.length} Professional Tutors Found
        </span>
        <div className="flex items-center gap-4">
          <span className="text-muted-foreground font-medium">Sort by:</span>
          <Select defaultValue="popular">
            <SelectTrigger className="w-45 rounded-xl border-muted">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rating</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {MOCK_TUTORS.map((tutor) => (
          <Card
            key={tutor.id}
            className="overflow-hidden border-none shadow-xl bg-background hover:-translate-y-1 transition-all duration-300"
          >
            <CardContent className="p-0">
              <div className="relative h-56 w-full">
                <Image
                  src={tutor.image}
                  alt={tutor.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur text-[#173e72] border-none font-bold px-3 py-1 text-sm">
                    {tutor.category}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#173e72] text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  ${tutor.rate}/hr
                </div>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-[#173e72]">
                      {tutor.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-700 px-2 py-0.5 rounded-lg text-sm font-bold">
                      <Star className="h-3.5 w-3.5 fill-yellow-400" />
                      {tutor.rating}
                    </div>
                  </div>
                  <p className="text-muted-foreground font-bold text-sm mt-1">
                    {tutor.subject}
                  </p>
                </div>

                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                  {tutor.description}
                </p>

                <div className="flex items-center gap-4 text-xs font-bold text-muted-foreground border-t pt-4">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-[#173e72]" />
                    <span>12 Courses</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-[#173e72]" />
                    <span>{tutor.reviewCount} Reviews</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <Button className="flex-1 rounded-xl h-11 font-bold">
                    View Profile
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 rounded-xl h-11 font-bold"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-16 flex justify-center">
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-xl w-10 p-0 h-10 border-muted"
          >
            1
          </Button>
          <Button variant="ghost" className="rounded-xl w-10 p-0 h-10">
            2
          </Button>
          <Button variant="ghost" className="rounded-xl w-10 p-0 h-10">
            3
          </Button>
          <span className="flex items-center px-2">...</span>
          <Button variant="ghost" className="rounded-xl w-10 p-0 h-10">
            12
          </Button>
        </div>
      </div>
    </main>
  );
}
