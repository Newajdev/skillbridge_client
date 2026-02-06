"use client"
import { useState } from 'react'
import { Button } from './button';
import { Slider } from './slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './sheet';
import { BookOpen, DollarSign, Filter, SlidersHorizontal, Star } from 'lucide-react';

export default function FilterSction() {
    const [priceRange, setPriceRange] = useState([20, 100]);

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
    <>
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
                <label
                  key={cat}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-5 h-5 rounded border border-muted group-hover:border-[#173e72] transition-colors" />
                  <span className="text-muted-foreground group-hover:text-[#173e72] transition-colors font-medium">
                    {cat}
                  </span>
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
                <label
                  key={rating}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <div className="w-5 h-5 rounded border border-muted" />
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted/30"}`}
                      />
                    ))}
                    <span className="ml-1 text-sm font-medium text-muted-foreground">
                      & up
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Button className="w-full rounded-2xl h-12">Apply Filters</Button>
          <Button
            variant="ghost"
            className="w-full text-muted-foreground hover:text-destructive"
          >
            Reset All
          </Button>
        </div>
      </aside>

      {/* Mobile Filter Trigger */}
      <div className="lg:hidden flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border mb-4">
        <span className="font-bold text-[#173e72]">
          {MOCK_TUTORS.length} Tutors found
        </span>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 rounded-xl">
              <Filter className="h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-75 sm:w-100">
            <SheetHeader className="mb-8">
              <SheetTitle className="text-2xl font-bold text-[#173e72]">
                Filters
              </SheetTitle>
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
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-6">
                <h4 className="font-bold text-[#173e72]">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={200}
                  step={5}
                />
                <div className="flex justify-between font-bold text-muted-foreground">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <Button className="w-full mt-8 rounded-xl h-12">
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
