import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { Badge } from './badge';

export default function HowItWorks() {

    const features =[
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
              ]
  return (
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
                Our platform makes it easy to find and connect with the perfect
                tutor for your goals.
              </p>
            </div>

            <div className="space-y-6">
              {features.map((step, idx) => (
                <div key={step.title} className="flex gap-6 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-[#173e72] text-white flex items-center justify-center font-bold text-xl">
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
          </div>
          <div className="relative h-100 md:h-150 w-full bg-muted rounded-3xl overflow-hidden shadow-2xl">
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
                  <h5 className="font-bold text-[#173e72]">Verified Tutors</h5>
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
  );
}
