"use client"
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { BookOpen, DollarSign, Filter, SlidersHorizontal, Star, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Category {
    id: string;
    name: string;
}

interface FilterProps {
    categories: Category[];
    onFilterChange: (filters: {
        categoryId: string | null;
        priceRange: [number, number];
        rating: number | null;
    }) => void;
    currentFilters: {
        categoryId: string | null;
        priceRange: [number, number];
        rating: number | null;
    };
}

export default function TutorFilters({ categories, onFilterChange, currentFilters }: FilterProps) {
    const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(currentFilters.priceRange);

    useEffect(() => {
        setLocalPriceRange(currentFilters.priceRange);
    }, [currentFilters.priceRange]);

    const handleCategorySelect = (id: string | null) => {
        onFilterChange({ ...currentFilters, categoryId: id });
    };

    const handleRatingSelect = (rating: number | null) => {
        onFilterChange({ ...currentFilters, rating });
    };

    const handlePriceApply = () => {
        onFilterChange({ ...currentFilters, priceRange: localPriceRange });
    };

    const handleReset = () => {
        onFilterChange({
            categoryId: null,
            priceRange: [0, 200],
            rating: null,
        });
        setLocalPriceRange([0, 200]);
    };

    return (
      <>
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-80 space-y-4 shrink-0">
          <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/40 space-y-8 sticky top-4">
            <div className="flex items-center justify-between border-b border-muted/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-xl">
                  <SlidersHorizontal className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-[#173e72] tracking-tight">
                  Filters
                </h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="text-muted-foreground hover:text-destructive h-8 px-3 font-bold text-xs uppercase tracking-widest hover:bg-destructive/5 rounded-lg transition-colors"
              >
                Reset
              </Button>
            </div>

            {/* Category */}
            <div className="space-y-4">
              <h4 className="font-black text-[#173e72] text-sm uppercase tracking-widest flex items-center gap-2 opacity-70">
                <BookOpen className="h-4 w-4 text-primary" /> Category
              </h4>
              <div className="flex flex-col gap-2 max-h-55 overflow-y-auto p-2 -m-2 custom-scrollbar">
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={cn(
                    "flex items-center gap-3 w-full text-left px-4 py-3 rounded-2xl transition-all font-bold text-sm shrink-0",
                    currentFilters.categoryId === null
                      ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]"
                      : "text-muted-foreground hover:bg-muted/50",
                  )}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategorySelect(cat.id)}
                    className={cn(
                      "flex items-center gap-3 w-full text-left px-4 py-3 rounded-2xl transition-all font-bold text-sm shrink-0",
                      currentFilters.categoryId === cat.id
                        ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]"
                        : "text-muted-foreground hover:bg-muted/50",
                    )}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="space-y-8">
              <h4 className="font-black text-[#173e72] text-sm uppercase tracking-widest flex items-center gap-2 opacity-70">
                <DollarSign className="h-4 w-4 text-primary" /> Price Range
              </h4>
              <div className="px-2">
                <Slider
                  value={localPriceRange}
                  onValueChange={(val) =>
                    setLocalPriceRange(val as [number, number])
                  }
                  max={200}
                  step={5}
                  className="py-2"
                />
              </div>
              <div className="flex justify-between items-center bg-muted/20 p-5 rounded-3xl border border-muted/30">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-black text-muted-foreground opacity-50 tracking-tighter">
                    Min
                  </span>
                  <span className="text-lg font-black text-[#173e72] tracking-tighter">
                    ${localPriceRange[0]}
                    <span className="text-xs font-bold opacity-40 ml-0.5">
                      /hr
                    </span>
                  </span>
                </div>
                <div className="h-6 w-px bg-muted-foreground/10" />
                <div className="flex flex-col text-right">
                  <span className="text-[10px] uppercase font-black text-muted-foreground opacity-50 tracking-tighter">
                    Max
                  </span>
                  <span className="text-lg font-black text-[#173e72] tracking-tighter">
                    ${localPriceRange[1]}
                    <span className="text-xs font-bold opacity-40 ml-0.5">
                      /hr
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="space-y-6">
              <h4 className="font-black text-[#173e72] text-sm uppercase tracking-widest flex items-center gap-2 opacity-70">
                <Star className="h-4 w-4 text-primary" /> Min Rating
              </h4>
              <div className="flex flex-col gap-2">
                {[5, 4, 3].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRatingSelect(rating)}
                    className={cn(
                      "flex items-center gap-3 w-full px-4 py-3 rounded-2xl transition-all font-bold text-sm",
                      currentFilters.rating === rating
                        ? "bg-yellow-400 text-black shadow-lg shadow-yellow-400/20 scale-[1.02]"
                        : "text-muted-foreground hover:bg-muted/50",
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "h-3.5 w-3.5",
                            i < rating
                              ? currentFilters.rating === rating
                                ? "fill-black text-black"
                                : "fill-yellow-400 text-yellow-400"
                              : "text-muted/30",
                          )}
                        />
                      ))}
                      <span className="ml-1 text-xs">{rating} & Up</span>
                    </div>
                  </button>
                ))}
              </div>
              <Button
                onClick={handlePriceApply}
                className="w-full rounded-2xl h-14 font-black shadow-lg shadow-primary/10 transition-all active:scale-95 bg-[#173e72] hover:bg-primary text-white border-none"
              >
                Apply Filter
              </Button>
            </div>
          </div>
        </aside>

        {/* Mobile Sheet */}
        <div className="lg:hidden flex justify-end mb-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="gap-3 rounded-2xl h-12 px-6 font-black border-2 border-muted hover:border-primary transition-all active:scale-95 shadow-sm"
              >
                <Filter className="h-5 w-5" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[400px] rounded-l-[2.5rem] p-0 border-none shadow-2xl"
            >
              <div className="flex flex-col h-full bg-white overflow-hidden">
                <SheetHeader className="p-8 border-b border-muted/30 bg-muted/5">
                  <div className="flex items-center justify-between">
                    <SheetTitle className="text-3xl font-black text-[#173e72] tracking-tight">
                      Filters
                    </SheetTitle>
                    <Button
                      variant="ghost"
                      onClick={handleReset}
                      className="font-black text-xs uppercase tracking-widest text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                    >
                      Reset
                    </Button>
                  </div>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
                  {/* Category */}
                  <div className="space-y-5">
                    <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                      Choose Category
                    </h4>
                    <Select
                      value={currentFilters.categoryId || "all"}
                      onValueChange={(val) =>
                        handleCategorySelect(val === "all" ? null : val)
                      }
                    >
                      <SelectTrigger className="w-full h-16 rounded-2xl border-none bg-muted/30 px-6 focus:ring-0 font-bold text-[#173e72] shadow-inner">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent className="rounded-2xl border-none shadow-2xl p-2 bg-white/95 backdrop-blur-xl">
                        <SelectItem
                          value="all"
                          className="rounded-xl font-bold py-3"
                        >
                          All Categories
                        </SelectItem>
                        {categories.map((cat) => (
                          <SelectItem
                            key={cat.id}
                            value={cat.id}
                            className="rounded-xl font-bold py-3"
                          >
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price */}
                  <div className="space-y-8">
                    <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                      Price Range
                    </h4>
                    <div className="px-2">
                      <Slider
                        value={localPriceRange}
                        onValueChange={(val) =>
                          setLocalPriceRange(val as [number, number])
                        }
                        max={200}
                        step={5}
                      />
                    </div>
                    <div className="flex justify-between items-center bg-muted/30 p-6 rounded-[2rem] border border-muted/30 font-black text-[#173e72] shadow-inner">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase opacity-40">
                          Min
                        </span>
                        <span className="text-xl tracking-tighter">
                          ${localPriceRange[0]}
                        </span>
                      </div>
                      <div className="w-10 h-px bg-muted-foreground/10" />
                      <div className="flex flex-col text-right">
                        <span className="text-[10px] uppercase opacity-40">
                          Max
                        </span>
                        <span className="text-xl tracking-tighter">
                          ${localPriceRange[1]}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="space-y-6">
                    <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-muted-foreground opacity-50">
                      Minimum Rating
                    </h4>
                    <div className="grid grid-cols-3 gap-3">
                      {[5, 4, 3].map((rating) => (
                        <button
                          key={rating}
                          onClick={() => handleRatingSelect(rating)}
                          className={cn(
                            "flex flex-col items-center justify-center p-5 rounded-3xl border-2 transition-all gap-3",
                            currentFilters.rating === rating
                              ? "border-primary bg-primary/5 text-primary shadow-xl shadow-primary/5 scale-[1.05]"
                              : "border-muted/50 bg-muted/10 text-muted-foreground hover:bg-muted/20",
                          )}
                        >
                          <Star
                            className={cn(
                              "h-6 w-6",
                              currentFilters.rating === rating
                                ? "fill-primary"
                                : "fill-none",
                            )}
                          />
                          <span className="font-black text-lg tracking-tighter">
                            {rating}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 border-t border-muted/30 bg-muted/5">
                  <Button
                    onClick={handlePriceApply}
                    className="w-full h-20 rounded-[2rem] text-xl font-black shadow-2xl shadow-primary/20 active:scale-[0.98] bg-[#173e72] hover:bg-primary text-white transition-all transform hover:-translate-y-1"
                  >
                    Apply All Filters
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </>
    );
}
