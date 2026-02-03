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

      {/* Featured Categories */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="space-y-4">
              <Badge
                variant="secondary"
                className="px-4 py-1 text-sm rounded-full"
              >
                Explore Categories
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-[#173e72]">
                Find the Best Subject for You
              </h2>
            </div>
            <Button variant="outline" className="rounded-full w-full md:w-auto">
              View All Categories
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { title: "Mathematics", tutors: 120, icon: "∑" },
              { title: "Computer Science", tutors: 85, icon: "{/}" },
              { title: "English Language", tutors: 95, icon: "A" },
              { title: "Physics", tutors: 64, icon: "⚛" },
              { title: "Chemistry", tutors: 48, icon: "🧪" },
              { title: "Graphic Design", tutors: 32, icon: "🎨" },
              { title: "Business & Finance", tutors: 76, icon: "📈" },
              { title: "Music & Art", tutors: 45, icon: "🎵" },
            ].map((cat) => (
              <Link
                key={cat.title}
                href={`/categories/${cat.title.toLowerCase()}`}
              >
                <Card className="hover:border-primary/50 transition-all hover:shadow-lg group">
                  <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#173e72]/5 flex items-center justify-center text-3xl group-hover:bg-[#173e72]/10 transition-colors">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#173e72]">
                        {cat.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {cat.tutors} Tutors
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge
              variant="secondary"
              className="px-4 py-1 text-sm rounded-full"
            >
              Top Rated
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-[#173e72]">
              Meet Our Expert Tutors
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto px-4">
              Learn from the best in the industry. Our tutors are highly
              qualified and vetted professional experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                subject: "Advanced Physics",
                rate: "$45/hr",
                rating: 5.0,
                image: "https://i.pravatar.cc/150?u=sarah",
              },
              {
                name: "Michael Chen",
                subject: "Full Stack Web Dev",
                rate: "$60/hr",
                rating: 4.9,
                image: "https://i.pravatar.cc/150?u=michael",
              },
              {
                name: "Elena Rodriguez",
                subject: "Spanish Language",
                rate: "$35/hr",
                rating: 5.0,
                image: "https://i.pravatar.cc/150?u=elena",
              },
            ].map((tutor) => (
              <Card
                key={tutor.name}
                className="overflow-hidden border-none shadow-xl bg-background/80 backdrop-blur-sm"
              >
                <CardContent className="p-0">
                  <div className="relative h-64 w-full">
                    <Image
                      src={tutor.image}
                      alt={tutor.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                      {tutor.rate}
                    </div>
                  </div>
                  <div className="p-8 space-y-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-[#173e72]">
                          {tutor.name}
                        </h3>
                        <p className="text-lg font-medium text-muted-foreground">
                          {tutor.subject}
                        </p>
                      </div>
                      <div className="flex items-center bg-yellow-400/10 text-yellow-700 px-2 py-1 rounded-lg">
                        <Star className="h-4 w-4 fill-yellow-400 mr-1" />
                        <span className="font-bold">{tutor.rating}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 pt-2">
                      <Button className="flex-1 rounded-full">
                        Book a Session
                      </Button>
                      <Button
                        variant="secondary"
                        className="flex-1 rounded-full"
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="link" className="text-[#173e72] font-bold text-lg">
              See more tutors <Search className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      {/* How it Works */}
      <section className="py-24 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="px-4 py-1 text-sm rounded-full"
                >
                  Process
                </Badge>
                <h2 className="text-3xl md:text-5xl font-bold text-[#173e72] leading-tight">
                  Start Your Learning Journey with SkillBridge
                </h2>
                <p className="text-lg text-muted-foreground">
                  Our platform makes it easy to find and connect with the
                  perfect tutor for your goals.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Find your ideal tutor",
                    desc: "Search by subject, price, and rating to find the perfect match.",
                  },
                  {
                    title: "Schedule a session",
                    desc: "Choose a time slot that works for you and book instantly.",
                  },
                  {
                    title: "Start learning",
                    desc: "Join your private session and achieve your learning goals.",
                  },
                ].map((step, idx) => (
                  <div key={step.title} className="flex gap-6 items-start">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#173e72] text-white flex items-center justify-center font-bold text-xl">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-[#173e72] mb-1">
                        {step.title}
                      </h4>
                      <p className="text-muted-foreground">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="rounded-full h-14 px-10 text-lg font-bold shadow-lg w-full md:w-auto">
                Get Started Today
              </Button>
            </div>
            <div className="relative h-[400px] md:h-[600px] w-full bg-muted rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                alt="Learning environment"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#173e72]">
                      Verified Tutors
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      All our tutors pass background checks and academic
                      verification.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
