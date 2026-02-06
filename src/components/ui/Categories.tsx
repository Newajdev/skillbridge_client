import React from "react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import Link from "next/link";

export default function Categories() {

    const Catagory = [
            { title: "Mathematics", tutors: 120, icon: "∑" },
            { title: "Computer Science", tutors: 85, icon: "{/}" },
            { title: "English Language", tutors: 95, icon: "A" },
            { title: "Physics", tutors: 64, icon: "⚛" },
            { title: "Chemistry", tutors: 48, icon: "🧪" },
            { title: "Graphic Design", tutors: 32, icon: "🎨" },
            { title: "Business & Finance", tutors: 76, icon: "📈" },
            { title: "Music & Art", tutors: 45, icon: "🎵" },
          ]
  return (
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
            <Link href={"/tutors"}>View All Categories</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Catagory.map((cat) => (
            <Card key={cat.title} className="hover:border-primary/50 transition-all hover:shadow-lg group">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[#173e72]/5 flex items-center justify-center text-3xl group-hover:bg-[#173e72]/10 transition-colors">
                    {cat.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#173e72]">
                      {cat.title}
                    </h3>
                    <p className="text-muted-foreground">{cat.tutors} Tutors</p>
                  </div>
                </CardContent>
              </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
