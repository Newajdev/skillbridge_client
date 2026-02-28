"use client"
import React from 'react'
import { GraduationCap, ArrowRight, BookOpen, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TutorProfile as tutor } from "@/types";
import TutorCard from './TutorCard';

interface TutorListProps {
    tutors: tutor[];
}

export default function TutorList({ tutors }: TutorListProps) {
    if (!tutors || tutors.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 bg-white/40 backdrop-blur-xl rounded-[3rem] border-2 border-dashed border-muted-foreground/10 animate-in fade-in zoom-in duration-500 shadow-xl">
                <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mb-8 animate-bounce">
                    <GraduationCap className="h-12 w-12 text-primary/40" />
                </div>
                <h3 className="text-3xl font-black text-[#173e72] tracking-tight">No Tutors Found</h3>
                <p className="text-muted-foreground mt-3 max-w-sm text-center font-medium leading-relaxed">
                    We couldn't find any tutors matching your current filter criteria. Try expanding your search!
                </p>
                <Button
                    variant="link"
                    onClick={() => window.location.reload()}
                    className="mt-6 font-black text-primary hover:text-[#173e72] transition-colors gap-2 group"
                >
                    Clear all filters
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-10 pb-20">
            {tutors.map((t) => (
                <TutorCard key={t.id} tutor={t} />
            ))}
        </div>
    );
}
