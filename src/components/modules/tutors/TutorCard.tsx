"use client"
import { Star, ShieldCheck, BookOpen, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { tutor } from "@/types/tutor.type";

export default function TutorCard({ tutor }: { tutor: tutor }) {
    return (
        <Card className="group relative overflow-hidden border border-white/20 shadow-2xl bg-white/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-primary/10 rounded-[2rem]">
            <CardContent className="p-0">
                <div className="relative h-64 w-full overflow-hidden">
                    <Image
                        src={tutor.user?.image || "/placeholder-avatar.png"}
                        alt={tutor.user?.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 rounded-t-2xl"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Badges */}
                    <div className="absolute top-5 left-5 flex flex-col gap-2 z-20">
                        <div className="bg-white/95 backdrop-blur-md text-primary border-none font-bold px-4 py-2 rounded-2xl text-[10px] uppercase tracking-widest shadow-xl flex items-center gap-1.5">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            {tutor.category?.name}
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="absolute bottom-5 right-5 z-20 bg-white/95 backdrop-blur-md text-[#173e72] px-5 py-2.5 rounded-2xl shadow-2xl flex flex-col items-end border border-white/40">
                        <span className="text-[10px] font-black uppercase opacity-60 leading-none mb-1">Hourly Rate</span>
                        <span className="text-xl font-black">${Number(tutor.hourlyRate)}</span>
                    </div>

                    {/* Meta Info */}
                    <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2">
                        <div className="flex items-center bg-yellow-400 px-3 py-1.5 rounded-xl shadow-lg border border-yellow-500/20">
                            <Star className="h-3.5 w-3.5 fill-black mr-1" />
                            <span className="text-sm font-black text-black">{Number(tutor.averageRate).toFixed(1)}</span>
                        </div>
                    </div>
                </div>

                <div className="p-8 space-y-6">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-black text-[#173e72] tracking-tight group-hover:text-primary transition-colors">
                            {tutor.user?.name}
                        </h3>
                        <div className="flex items-center gap-2 text-primary/60 font-bold text-xs uppercase tracking-wider">
                            <ShieldCheck className="h-4 w-4" />
                            <span>{tutor.experience}+ Years Exp.</span>
                        </div>
                    </div>

                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed font-medium min-h-[40px]">
                        {tutor.bio || "Helping students achieve their goals through personalized mentoring and support."}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-muted/30">
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground opacity-50 tracking-widest">Sessions</span>
                            <div className="flex items-center gap-2 text-[#173e72] font-black">
                                <BookOpen className="h-4 w-4 text-primary" />
                                <span>{tutor.totalSessions} Total</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1 items-end">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground opacity-50 tracking-widest">Reviews</span>
                            <div className="flex items-center gap-2 text-[#173e72] font-black font-medium">
                                <span>{tutor.reviews?.length || 0} Count</span>
                                <GraduationCap className="h-4 w-4 text-primary" />
                            </div>
                        </div>
                    </div>

                    <Button
                        className="w-full h-14 rounded-2xl font-black transition-all group-hover:gap-4 flex items-center justify-center gap-2 shadow-xl bg-[#173e72] hover:bg-primary text-white border-none active:scale-95"
                        asChild
                    >
                        <Link href={`/tutor/${tutor.id}`}>
                            View Profile
                            <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
