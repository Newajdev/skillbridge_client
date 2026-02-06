import { BookOpen, GraduationCap, Star, Users } from 'lucide-react';


export default function StatesSections() {
  return (
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
  );
}
