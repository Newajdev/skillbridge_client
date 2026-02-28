"use client"
import { useState, useMemo, useEffect, useCallback } from "react";
import TutorFilters from "@/components/modules/tutors/TutorFilters";
import TutorList from "@/components/modules/tutors/TutorList";
import { tutor } from "@/types/tutor.type";
import { Input } from "@/components/ui/input";
import { Search, Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { publicService } from "@/services/public.service";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface StudentBrowseClientProps {
    initialTutors: tutor[];
    categories: any[];
    initialMeta?: {
        total: number;
        totalPage: number;
    };
}

export default function StudentBrowseClient({ initialTutors, categories, initialMeta }: StudentBrowseClientProps) {
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
            limit: 6 // Dashboard might want fewer items per page
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

    const handleSearchChange = (val: string) => {
        setSearchQuery(val);
        setPage(1);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                {/* Search Bar */}
                <div className="relative max-w-md group flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                        placeholder="Search by name or subject..."
                        className="pl-12 h-12 rounded-2xl border-muted bg-white/50 focus:bg-white transition-all shadow-sm focus:shadow-md font-medium"
                        value={searchQuery}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-4">
                    {loading && (
                        <div className="flex items-center gap-2 text-primary font-bold animate-pulse text-sm">
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Updating...
                        </div>
                    )}
                    <span className="text-sm font-bold text-muted-foreground px-4 py-2 bg-muted/30 rounded-xl">
                        Found: <span className="text-primary">{meta.total}</span>
                    </span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                <TutorFilters
                    categories={categories}
                    onFilterChange={handleFilterChange}
                    currentFilters={filters}
                />
                <div className={cn("flex-1 transition-all duration-300", loading ? "opacity-50 pointer-events-none" : "opacity-100")}>
                    <TutorList tutors={tutors} />

                    {/* Pagination */}
                    {meta.totalPage > 1 && (
                        <div className="flex items-center justify-center gap-3 pt-12">
                            <Button
                                variant="outline"
                                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                disabled={page === 1 || loading}
                                className="rounded-xl h-10 w-10 p-0"
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </Button>
                            <div className="flex items-center gap-2">
                                {[...Array(meta.totalPage)].map((_, i) => (
                                    <Button
                                        key={i}
                                        variant={page === i + 1 ? "default" : "outline"}
                                        onClick={() => setPage(i + 1)}
                                        disabled={loading}
                                        className={cn("w-10 h-10 rounded-xl font-bold", page === i + 1 && "bg-[#173e72]")}
                                    >
                                        {i + 1}
                                    </Button>
                                ))}
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setPage(prev => Math.min(meta.totalPage, prev + 1))}
                                disabled={page === meta.totalPage || loading}
                                className="rounded-xl h-10 w-10 p-0"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
