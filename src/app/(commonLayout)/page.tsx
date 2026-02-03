import { Search, Users, BookOpen, Star, GraduationCap, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-150 md:h-180 overflow-hidden">
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
          <div className="max-w-2xl space-y-4 md:space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
              SkillBridge
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl font-medium text-white/90 drop-shadow-md">
              Connect with Expert Tutors
            </p>

            {/* Floating Search Bar */}
            <div className="flex flex-col md:flex-row items-center bg-white/95 backdrop-blur shadow-2xl rounded-2xl md:rounded-full md:h-18 p-2 md:p-1.5 md:pl-8 md:pr-1.5 w-full max-w-3xl mt-8 md:mt-12 border border-white/20">
              <div className="flex items-center flex-1 w-full border-b md:border-b-0 py-4 md:py-0 px-2 md:px-0">
                <Search className="text-muted-foreground mr-3 h-6 w-6 shrink-0" />
                <input
                  type="text"
                  placeholder="What do you want to learn?"
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
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="programming">Programming</SelectItem>
                    <SelectItem value="languages">Languages</SelectItem>
                    <SelectItem value="arts">Arts & Music</SelectItem>
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

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <Users className="h-8 w-8 text-[#173e72]" />
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-muted-foreground font-medium">
                Active Students
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <GraduationCap className="h-8 w-8 text-[#173e72]" />
              <div className="text-3xl font-bold">500+</div>
              <div className="text-muted-foreground font-medium">
                Expert Tutors
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <BookOpen className="h-8 w-8 text-[#173e72]" />
              <div className="text-3xl font-bold">1,200+</div>
              <div className="text-muted-foreground font-medium">
                Subjects Covered
              </div>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Star className="h-8 w-8 text-[#173e72]" />
              <div className="text-3xl font-bold">4.9/5</div>
              <div className="text-muted-foreground font-medium">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
