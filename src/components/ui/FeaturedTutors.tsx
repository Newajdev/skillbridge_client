import { Search, Star } from "lucide-react";
import React from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedTutors() {
  const fTutor = [
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
  ];
  return (
    <section className="py-24 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <Badge variant="secondary" className="px-4 py-1 text-sm rounded-full">
            Top Rated
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-[#173e72]">
            Meet Our Expert Tutors
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto px-4">
            Learn from the best in the industry. Our tutors are highly qualified
            and vetted professional experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {fTutor.map((tutor) => (
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
                    <Button variant="secondary" className="flex-1 rounded-full">
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
            <Link href={"/tutors"}>
              See more tutors <Search className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
