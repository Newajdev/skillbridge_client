"use client"
import { BookOpen, GraduationCap, Star, Users, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { publicService } from '@/services/public.service';

export default function StatesSections() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await publicService.getPlatformStats();
      if (data?.success) {
        setStats(data.data);
      }
      setLoading(false);
    };
    fetchStats();
  }, []);

  const statItems = [
    {
      icon: Users,
      label: "Active Students",
      value: stats?.totalStudents ? `${stats.totalStudents.toLocaleString()}+` : "0+",
    },
    {
      icon: GraduationCap,
      label: "Expert Tutors",
      value: stats?.totalTutors ? `${stats.totalTutors.toLocaleString()}+` : "0+",
    },
    {
      icon: BookOpen,
      label: "Subjects Covered",
      value: stats?.totalCategories ? `${stats.totalCategories.toLocaleString()}+` : "0+",
    },
    {
      icon: Star,
      label: "Satisfaction Rate",
      value: stats?.satisfactionRate ? `${stats.satisfactionRate}%` : "0%",
    }
  ];

  return (
    <section className="py-20 bg-linear-to-b from-muted/30 to-background border-y border-muted-foreground/5">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {statItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                <item.icon className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-1">
                <div className="text-4xl font-black text-[#173e72] tracking-tight">
                  {loading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground/30 mx-auto" />
                  ) : (
                    item.value
                  )}
                </div>
                <div className="text-sm font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
