"use client";

import React, { useState } from "react";
import { Search, Star, Filter, SlidersHorizontal, BookOpen, GraduationCap, DollarSign, ChevronDown } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
    description: "PhD in Theoretical Physics with 10+ years of teaching experience. Specializing in Quantum Mechanics and Relativity.",
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
    description: "Senior Software Engineer. Expert in React, Node.js, and Cloud Architecture. Learn by building real-world projects.",
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
    description: "Certified DELE examiner. Native speaker from Madrid. Fun and interactive classes for all levels.",
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
    description: "Mathematics professor with a passion for simplifying complex theories. Expert in SAT/GRE prep.",
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
    description: "Specializing in biochemistry and pharmaceutical chemistry. Helped 500+ students ace their exams.",
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
    description: "Expert in Shakespearean literature and creative writing. High school and college level tutoring available.",
  },
];

const CATEGORIES = ["Mathematics", "Science", "Programming", "Languages", "Arts & Music", "Business"];

export default function TutorsPage() {
  const [priceRange, setPriceRange] = useState([20, 100]);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-24">
      {/* Header Section */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/heroBanner.png"
            alt="SkillBridge Banner"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-3xl space-y-4 md:space-y-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="px-4 py-1 text-sm rounded-full bg-white/20 text-white backdrop-blur border-none">
                Explore Tutors
              </Badge>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
                Find Your Perfect Tutor
              </h1>
              <p className="text-lg md:text-xl font-medium text-white/90 drop-shadow-md max-w-2xl">
                Browse through our list of verified expert tutors and start your learning journey today.
              </p>
            </div>

            {/* Premium Search Bar */}
            <div className="flex flex-col md:flex-row items-center bg-white/95 backdrop-blur shadow-2xl rounded-2xl md:rounded-full md:h-18 p-2 md:p-1.5 md:pl-8 md:pr-1.5 w-full max-w-3xl mt-8 border border-white/20">
              <div className="flex items-center flex-1 w-full border-b md:border-b-0 py-4 md:py-0 px-2 md:px-0">
                <Search className="text-muted-foreground mr-3 h-6 w-6 shrink-0" />
                <input
                  type="text"
                  placeholder="Search by name or subject..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-foreground text-lg w-full placeholder:text-muted-foreground focus:ring-0 font-medium"
                />
              </div>

              <div className="hidden md:block w-px h-8 bg-border/50 mx-4" />

              <div className="flex flex-col sm:flex-row items-center w-full md:w-auto gap-3 md:gap-0 pt-3 md:pt-0">
                <Select>
                  <SelectTrigger className="border-none bg-transparent h-12 md:h-full px-4 md:px-6 text-lg focus:ring-0 w-full md:w-[180px] justify-start md:justify-center font-medium">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="hidden md:block w-px h-8 bg-border/50 mx-2" />

                <Button className="h-14 px-10 rounded-xl md:rounded-full text-lg w-full md:w-auto font-bold shadow-lg">
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Desktop Sidebar */}
          <aside className="hidden lg:block w-72 space-y-8 shrink-0">
            <div className="bg-white rounded-3xl p-8 shadow-sm border space-y-8 sticky top-24">
              <div className="flex items-center justify-between border-b pb-4">
                <h3 className="text-xl font-bold text-[#173e72]">Filters</h3>
                <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              </div>

              {/* Category Filter */}
              <div className="space-y-4">
                <h4 className="font-bold text-[#173e72] flex items-center gap-2">
                  <BookOpen className="h-4 w-4" /> Category
                </h4>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-muted group-hover:border-[#173e72] transition-colors" />
                      <span className="text-muted-foreground group-hover:text-[#173e72] transition-colors font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="space-y-6">
                <h4 className="font-bold text-[#173e72] flex items-center gap-2">
                  <DollarSign className="h-4 w-4" /> Price Range
                </h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={200}
                  step={5}
                  className="py-4"
                />
                <div className="flex justify-between text-sm font-bold text-muted-foreground">
                  <span>${priceRange[0]}/hr</span>
                  <span>${priceRange[1]}/hr</span>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="space-y-4">
                <h4 className="font-bold text-[#173e72] flex items-center gap-2">
                  <Star className="h-4 w-4" /> Rating
                </h4>
                <div className="flex flex-col gap-2">
                  {[5, 4, 3].map((rating) => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-muted" />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted/30"}`} />
                        ))}
                        <span className="ml-1 text-sm font-medium text-muted-foreground">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <Button className="w-full rounded-2xl h-12">Apply Filters</Button>
              <Button variant="ghost" className="w-full text-muted-foreground hover:text-destructive">Reset All</Button>
            </div>
          </aside>

          {/* Mobile Filter Trigger */}
          <div className="lg:hidden flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border mb-4">
            <span className="font-bold text-[#173e72]">{MOCK_TUTORS.length} Tutors found</span>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2 rounded-xl">
                  <Filter className="h-4 w-4" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader className="mb-8">
                  <SheetTitle className="text-2xl font-bold text-[#173e72]">Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-8 overflow-y-auto max-h-[calc(100vh-200px)] px-2">
                  {/* Reuse sidebar logic or simplify for mobile */}
                  <div className="space-y-4">
                    <h4 className="font-bold text-[#173e72]">Category</h4>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-bold text-[#173e72]">Price Range</h4>
                    <Slider value={priceRange} onValueChange={setPriceRange} max={200} step={5} />
                    <div className="flex justify-between font-bold text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-8 rounded-xl h-12">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Tutor Grid */}
          <main className="flex-1">
            <div className="hidden lg:flex justify-between items-center mb-8 bg-white p-6 rounded-3xl shadow-sm border">
              <span className="font-bold text-[#173e72] text-lg">{MOCK_TUTORS.length} Professional Tutors Found</span>
              <div className="flex items-center gap-4">
                <span className="text-muted-foreground font-medium">Sort by:</span>
                <Select defaultValue="popular">
                  <SelectTrigger className="w-[180px] rounded-xl border-muted">
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
                <Card key={tutor.id} className="overflow-hidden border-none shadow-xl bg-background hover:translate-y-[-4px] transition-all duration-300">
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
                          <h3 className="text-xl font-bold text-[#173e72]">{tutor.name}</h3>
                          <div className="flex items-center gap-1 bg-yellow-400/10 text-yellow-700 px-2 py-0.5 rounded-lg text-sm font-bold">
                            <Star className="h-3.5 w-3.5 fill-yellow-400" />
                            {tutor.rating}
                          </div>
                        </div>
                        <p className="text-muted-foreground font-bold text-sm mt-1">{tutor.subject}</p>
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
                        <Button className="flex-1 rounded-xl h-11 font-bold">View Profile</Button>
                        <Button variant="secondary" className="flex-1 rounded-xl h-11 font-bold">Book Now</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination Placeholder */}
            <div className="mt-16 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" className="rounded-xl w-10 p-0 h-10 border-muted">1</Button>
                <Button variant="ghost" className="rounded-xl w-10 p-0 h-10">2</Button>
                <Button variant="ghost" className="rounded-xl w-10 p-0 h-10">3</Button>
                <span className="flex items-center px-2">...</span>
                <Button variant="ghost" className="rounded-xl w-10 p-0 h-10">12</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
