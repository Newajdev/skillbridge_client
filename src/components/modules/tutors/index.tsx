"use client"
import { useState, useEffect, useCallback } from "react";
import TutorFilters from "./TutorFilters";
import TutorList from "./TutorList";
import { TutorProfile as tutor } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Sparkles, SlidersHorizontal, ArrowRight, Zap, Loader2 } from "lucide-react";
import { publicService } from "@/services/public.service";
import { cn } from "@/lib/utils";

interface TutorsModuleProps {
  initialTutors: tutor[];
  categories: any[];
  initialMeta?: {
    total: number;
    totalPage: number;
  };
}

export default function TutorsModule({ initialTutors, categories, initialMeta }: TutorsModuleProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [tutors, setTutors] = useState<tutor[]>(initialTutors);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState(initialMeta || {
    total: initialTutors.length,
    totalPage: 1
  });

  const [filters, setFilters] = useState<{
    categoryId: string | null;
    priceRange: [number, number];
    rating: number | null;
  }>({
    categoryId: null,
    priceRange: [0, 200],
    rating: null,
  });

  const fetchTutors = useCallback(async () => {
    setLoading(true);
    const params = {
      searchTerm: searchQuery,
      categoryId: filters.categoryId,
      minPrice: filters.priceRange[0],
      maxPrice: filters.priceRange[1],
      rating: filters.rating,
      page,
      limit: 9
    };

    const res = await publicService.getTutors(params);
    if (res.data?.success) {
      setTutors(res.data.data.data);
      setMeta(res.data.data.meta);
    }
    setLoading(false);
  }, [searchQuery, filters, page]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchTutors();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchTutors]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setPage(1);
  };

  return (
    <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-primary/20 selection:text-primary">
      {/* Premium Hero Section */}
      <section className="relative bg-white pt-24 pb-32 overflow-hidden border-b border-muted/30">
        {/* Abstract Design Elements */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-primary/5 -skew-x-[15deg] translate-x-1/2 rounded-l-[10rem] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-10">
              <div className="flex flex-col gap-6 max-w-2xl">
                <div className="inline-flex items-center gap-3 bg-primary/5 text-primary px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest self-start border border-primary/10 shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  Explore Top Tier Educators
                </div>
                <h1 className="text-6xl md:text-7xl font-black text-[#173e72] tracking-tighter leading-[0.95]">
                  Scale Your <br />
                  <span className="text-primary inline-flex items-center gap-4">
                    Skillset
                    <div className="h-3 w-32 bg-primary/20 rounded-full hidden md:block" />
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-xl">
                  Unlock your full potential with personalized mentorship from industry experts and certified academic professionals.
                </p>
              </div>

              {/* Search Bar Container */}
              <div className="relative max-w-2xl group">
                <div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-blue-600/20 rounded-[3rem] blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
                <div className="relative flex items-center bg-white rounded-[2.5rem] shadow-2xl shadow-[#173e72]/5 border border-muted p-3 transition-all group-focus-within:border-primary/50 group-hover:border-primary/30">
                  <div className="p-4 bg-muted/30 rounded-2xl group-focus-within:bg-primary group-focus-within:text-white transition-all">
                    <Search className="h-6 w-6" />
                  </div>
                  <Input
                    placeholder="Search by name, expertise, or bio..."
                    className="flex-1 border-none shadow-none text-lg h-16 bg-transparent focus-visible:ring-0 font-bold px-6 text-[#173e72] placeholder:text-muted-foreground/50"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <Button className="hidden md:flex h-16 px-10 rounded-[1.5rem] font-black text-lg gap-3 transition-all bg-[#173e72] hover:bg-primary shadow-xl">
                    Fine Tune
                    <SlidersHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Panel */}
            <div className="hidden lg:block w-96 space-y-6">
              <div className="bg-[#173e72] rounded-[3rem] p-10 text-white shadow-2xl shadow-[#173e72]/30 relative overflow-hidden group">
                <Zap className="absolute -top-10 -right-10 h-40 w-40 text-white/5 rotate-12 transition-transform group-hover:scale-110 duration-700" />
                <div className="relative z-10 space-y-8">
                  <div>
                    <h4 className="text-6xl font-black tracking-tighter">{meta.total}</h4>
                    <p className="text-white/60 font-bold uppercase tracking-widest text-xs mt-1">Found Professionals</p>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-primary">99%</div>
                      <span className="font-bold text-sm tracking-tight">Satisfaction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-24">
        <div className="flex flex-col lg:flex-row gap-20">
          <TutorFilters
            categories={categories}
            onFilterChange={handleFilterChange}
            currentFilters={filters}
          />

          <div className="flex-1 space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-muted/30">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-black uppercase tracking-[0.2em] text-[10px]">
                  <div className="w-8 h-px bg-primary" /> Discovery Feed
                </div>
                <h2 className="text-4xl font-black text-[#173e72] tracking-tight">
                  {searchQuery ? "Search Results" : "Top Tier Instructors"}
                </h2>
                <p className="text-muted-foreground font-medium text-lg">
                  Available mentors identified: <span className="text-[#173e72] font-black">{meta.total}</span>
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {filters.categoryId && (
                  <div className="bg-primary/5 text-primary border border-primary/10 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2">
                    Category Selected
                    <ArrowRight className="h-3 w-3" />
                  </div>
                )}
                {(filters.priceRange[0] > 0 ||
                  filters.priceRange[1] < 200) && (
                    <div className="bg-blue-500/5 text-blue-600 border border-blue-500/10 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2">
                      Refined Pricing
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  )}
                {loading && (
                  <div className="flex items-center gap-2 text-primary font-bold animate-pulse">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Fetching...
                  </div>
                )}
              </div>
            </div>

            <div className={cn("transition-all duration-300", loading ? "opacity-50 pointer-events-none" : "opacity-100")}>
              <TutorList tutors={tutors} />
            </div>

            {/* Pagination */}
            {meta.totalPage > 1 && (
              <div className="flex items-center justify-center gap-4 pt-12 border-t border-muted/30">
                <Button
                  variant="outline"
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  disabled={page === 1 || loading}
                  className="rounded-xl h-12 px-6 font-bold"
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {[...Array(meta.totalPage)].map((_, i) => (
                    <Button
                      key={i}
                      variant={page === i + 1 ? "default" : "outline"}
                      onClick={() => setPage(i + 1)}
                      disabled={loading}
                      className={cn("w-12 h-12 rounded-xl font-bold", page === i + 1 && "bg-[#173e72]")}
                    >
                      {i + 1}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setPage(prev => Math.min(meta.totalPage, prev + 1))}
                  disabled={page === meta.totalPage || loading}
                  className="rounded-xl h-12 px-6 font-bold"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
