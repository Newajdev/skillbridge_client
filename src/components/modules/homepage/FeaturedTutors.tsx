import { Search, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { TutorProfile as tutor } from "@/types";

export default async function FeaturedTutors({ tutors }: { tutors: tutor[] | undefined }) {
  const showTutor = tutors?.slice(0, 3)
  return (
    <section className="py-24 bg-linear-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge
            variant="outline"
            className="px-4 py-1.5 text-sm rounded-full border-primary/20 bg-primary/5 text-primary backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            Top Rated Tutors
          </Badge>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#173e72]">
            Meet Our <span className="text-primary">Expert</span> Tutors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4 text-lg">
            Empower your learning with industry-leading mentors through personalized, one-on-one sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {showTutor?.map((tutor: tutor) => (
            <Card
              key={tutor.user?.id || tutor.id}
              className="group relative overflow-hidden border border-white/20 shadow-2xl bg-white/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-primary/10 rounded-3xl"
            >
              <CardContent className="p-0">
                <div className="relative h-54 w-full overflow-hidden">
                  <Image
                    src={tutor.user?.image || "/placeholder-avatar.png"}
                    alt={tutor.user?.name || "Tutor Name"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-t-2xl"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-sm font-bold shadow-lg border border-white/40 text-[#173e72]">
                      ${tutor.hourlyRate}<span className="text-xs font-normal text-muted-foreground ml-1">/hr</span>
                    </div>
                  </div>

                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
                    <div className="flex items-center bg-yellow-400 px-2 py-1 rounded-xl shadow-lg">
                      <Star className="h-3.5 w-3.5 fill-black mr-1" />
                      <span className="text-xs font-black text-black">{tutor.averageRate}</span>
                    </div>
                    <Badge className="bg-white/90 text-[#173e72] border-none shadow-md backdrop-blur-sm">
                      {tutor.experience}+ Years Exp.
                    </Badge>
                  </div>
                </div>

                <div className="px-8 py-2 space-y-4">
                  <div className="space--2">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                        {tutor.category?.name}
                      </p>
                      <div className="flex -space-x-2">
                        {Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-muted" />
                        ))}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#173e72] leading-tight">
                      {tutor.user?.name}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {tutor.bio || "Specialized in providing high-quality educational support and mentoring."}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <Button
                      className="w-full h-12 rounded-2xl font-bold bg-[#173e72] hover:bg-[#1a4b8a] shadow-lg shadow-primary/20 transition-all active:scale-95"
                      asChild
                    >
                      <Link href={`/tutor/${tutor.id}`}>Book a Session</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-20">
          <Link
            href="/tutors"
            className="inline-flex items-center px-8 py-4 bg-white border border-muted shadow-xl rounded-full text-[#173e72] font-black text-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group"
          >
            Explore All Tutors
            <Search className="ml-3 h-5 w-5 transition-transform group-hover:rotate-12" />
          </Link>
        </div>
      </div>
    </section>
  );
}
