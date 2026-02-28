"use client";

import { Star, Clock, GraduationCap, ShieldCheck, Calendar } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { TutorProfile as tutor } from "@/types";
import { authClient } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { publicService } from "@/services/public.service";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Slot as AvailabilitySlot } from "@/types";

interface TutorDetailsProps {
    tutor: tutor;
}

export default function TutorDetails({ tutor }: TutorDetailsProps) {
    const { data: session } = authClient.useSession();
    const router = useRouter();
    const pathname = usePathname();
    const [isBookingOpen, setIsBookingOpen] = useState(false);
    const [availableSlots, setAvailableSlots] = useState<AvailabilitySlot[]>([]);
    const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleBookSession = async () => {
        if (!session?.user) {
            router.push(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
        }

        console.log("user ase");
        setIsBookingOpen(true);
        setIsLoadingSlots(true);

        const { data, error } = await publicService.getTutorSlots(tutor.id);
        if (error) {
            toast.error("Failed to load available slots");
        } else if (data?.success) {
            setAvailableSlots(data.data || []);
        }
        setIsLoadingSlots(false);
    };

    const handleConfirmBooking = async () => {
        if (!selectedSlotId) {
            toast.error("Please select a slot first");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Confirming your booking...");

        const { data, error } = await publicService.createBooking(selectedSlotId);

        if (error) {
            toast.error("Failed to create booking", { id: toastId });
        } else if (data?.success) {
            toast.success("Booking confirmed successfully!", { id: toastId });
            setIsBookingOpen(false);
            setSelectedSlotId(null);
            // Optional: refresh page or data
            router.refresh();
        } else {
            toast.error(data?.message || "Booking failed", { id: toastId });
        }
        setIsSubmitting(false);
    };

    return (
        <div className="min-h-screen bg-linear-to-b from-muted/30 via-background to-background py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left Column: Profile Card */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-24 border-none shadow-2xl bg-white/40 backdrop-blur-xl rounded-3xl overflow-hidden">
                            <div className="relative h-96 w-full">
                                <Image
                                    src={tutor.user?.image || "/placeholder-avatar.png"}
                                    alt={tutor.user?.name || "Tutor Name"}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h1 className="text-3xl font-black">{tutor.user?.name}</h1>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Badge className="bg-primary/20 backdrop-blur-md text-white border-white/20">
                                            {tutor.category?.name}
                                        </Badge>
                                        <div className="flex items-center bg-yellow-400 px-2 py-0.5 rounded-lg text-black font-bold text-sm">
                                            <Star className="h-3.5 w-3.5 fill-black mr-1" />
                                            {tutor.stats?.averageRating || tutor.averageRate}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <CardContent className="p-8 space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Hourly Rate</p>
                                        <p className="text-2xl font-black text-[#173e72] mt-1">${tutor.hourlyRate}</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Experience</p>
                                        <p className="text-2xl font-black text-[#173e72] mt-1">{tutor.experience}+ yrs</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                                            <ShieldCheck className="h-5 w-5 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#173e72]">Verified Expert</p>
                                            <p className="text-xs">Background checked & vetted</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-muted-foreground">
                                        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center">
                                            <GraduationCap className="h-5 w-5 text-[#173e72]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-[#173e72]">Top Institution</p>
                                            <p className="text-xs">Certified Professional</p>
                                        </div>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleBookSession}
                                    className="w-full h-14 rounded-2xl font-black text-lg bg-[#173e72] hover:bg-[#1a4b8a] shadow-xl shadow-primary/20 transition-all active:scale-95"
                                >
                                    Book a Session
                                </Button>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-2 space-y-12 pb-24 min-w-0">
                        <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-3xl font-black text-[#173e72] flex items-center gap-3">
                                <span className="w-2 h-8 bg-primary rounded-full" />
                                About Me
                            </h2>
                            <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                {tutor.bio || "No detailed bio provided yet. This tutor is an expert in their field with years of practical experience and a passion for teaching others."}
                            </p>
                        </section>

                        {/* Availability Slots Section */}
                        {tutor.availabilitySlots && tutor.availabilitySlots.length > 0 && (
                            <section className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-600">
                                <h2 className="text-3xl font-black text-[#173e72] flex items-center gap-3">
                                    <span className="w-2 h-8 bg-primary rounded-full" />
                                    Available Slots
                                </h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {tutor.availabilitySlots.map((slot: AvailabilitySlot) => {
                                        const isBooked = slot.bookings?.some((booking: any) => {
                                            if (booking.status !== "CONFIRMED") return false;
                                            const bookingDate = new Date(booking.updatedAt);
                                            const now = new Date();
                                            // Slot is disabled ONLY if confirmed booking is in the future
                                            return bookingDate > now;
                                        });

                                        return (
                                            <Card
                                                key={slot.id}
                                                className={`border-none shadow-lg bg-white/60 backdrop-blur-md rounded-2xl p-4 border border-white/40 transition-all ${isBooked ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:shadow-primary/5 hover:-translate-y-1 cursor-pointer'
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isBooked ? 'bg-muted' : 'bg-primary/10'}`}>
                                                            <Clock className={`h-5 w-5 ${isBooked ? 'text-muted-foreground' : 'text-primary'}`} />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-bold text-[#173e72] uppercase tracking-wide">{slot.day}</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {new Date(slot.startTime as string).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                                                {new Date(slot.endTime as string).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    {isBooked && (
                                                        <Badge variant="secondary" className="text-[10px] font-bold">Booked</Badge>
                                                    )}
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>
                            </section>
                        )}
                        {/* Student Reviews Section */}
                        {tutor.reviews && tutor.reviews.length > 0 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <h2 className="text-3xl font-black text-[#173e72] flex items-center gap-3">
                                    <span className="w-2 h-8 bg-primary rounded-full" />
                                    Student Reviews
                                </h2>
                                <div className="overflow-x-auto pb-6 -mx-4 px-4 md:-mx-8 md:px-8">
                                    <div className="flex flex-nowrap gap-6 snap-x snap-mandatory">
                                        {tutor.reviews.map((review: any) => {
                                            const studentName = review.student?.user?.name?.trim() || "Skillbridge Student";
                                            const studentImage = review.student?.user?.image;

                                            return (
                                                <Card key={review.id} className="flex-none w-[280px] sm:w-[350px] md:w-[450px] snap-center border-none shadow-lg bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-white/40">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20 bg-primary/10 flex items-center justify-center text-primary font-bold">
                                                                {studentImage ? (
                                                                    <Image
                                                                        src={studentImage}
                                                                        alt={studentName}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                ) : (
                                                                    studentName[0] || "S"
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-bold text-[#173e72]">
                                                                    {studentName}
                                                                </p>
                                                                <p className="text-xs text-muted-foreground">{new Date(review.createdAt as string).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center bg-yellow-400/10 text-yellow-700 px-2 py-1 rounded-lg text-sm font-bold">
                                                            <Star className="h-4 w-4 fill-yellow-400 mr-1" />
                                                            {review.rating}
                                                        </div>
                                                    </div>
                                                    <div className="flex-1">
                                                        <p className="text-muted-foreground italic leading-relaxed line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                                                            &ldquo;{review.comment}&rdquo;
                                                        </p>
                                                    </div>
                                                </Card>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        )}

                        <section className="space-y-6">
                            <h2 className="text-3xl font-black text-[#173e72] flex items-center gap-3">
                                <span className="w-2 h-8 bg-primary rounded-full" />
                                Professional Stats
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                                {[
                                    { label: "Total Bookings", value: tutor.stats?.totalBookings || 0 },
                                    { label: "Completed", value: tutor.stats?.completedBookings || 0 },
                                    { label: "Success Rate", value: `${tutor.stats?.bookingCompletionRate || 0}%` },
                                    { label: "Avg Rating", value: tutor.stats?.averageRating || 0 },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center p-6 rounded-3xl bg-white/40 shadow-lg border border-white/20 transition-all hover:bg-white/60 hover:scale-[1.02]">
                                        <p className="text-3xl font-black text-primary">{stat.value}</p>
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Booking Dialog */}
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden bg-white/95 backdrop-blur-xl border-none shadow-2xl rounded-[2rem]">
                    <DialogHeader className="p-8 pb-4 text-center">
                        <DialogTitle className="text-2xl font-black text-[#173e72]">Select a Session Slot</DialogTitle>
                        <DialogDescription className="text-muted-foreground font-medium">
                            Choose a time that works for you with {tutor.user?.name}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="px-8 py-4 max-h-[400px] overflow-y-auto custom-scrollbar">
                        {isLoadingSlots ? (
                            <div className="flex flex-col items-center justify-center py-12 space-y-4">
                                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                                <p className="text-sm font-bold text-[#173e72] animate-pulse">Fetching available slots...</p>
                            </div>
                        ) : availableSlots.length > 0 ? (
                            <div className="grid grid-cols-1 gap-3">
                                {availableSlots.map((slot) => {
                                    const isSelected = selectedSlotId === slot.id;
                                    const isBooked = slot.bookings && slot.bookings.length > 0;

                                    return (
                                        <button
                                            key={slot.id}
                                            disabled={isBooked}
                                            onClick={() => setSelectedSlotId(slot.id)}
                                            className={cn(
                                                "w-full p-4 rounded-2xl flex items-center justify-between transition-all duration-300 border-2 text-left group",
                                                isSelected
                                                    ? "bg-[#173e72] border-[#173e72] text-white shadow-lg scale-[1.02]"
                                                    : isBooked
                                                        ? "bg-muted/50 border-transparent opacity-60 cursor-not-allowed"
                                                        : "bg-white border-primary/10 hover:border-[#173e72]/40 hover:bg-primary/5 shadow-sm"
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                                                    isSelected ? "bg-white/20" : "bg-primary/10 text-primary group-hover:bg-[#173e72] group-hover:text-white"
                                                )}>
                                                    <Clock className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <div className="flex flex-col gap-0.5 mb-1">
                                                        <span className={cn("text-[10px] uppercase tracking-widest font-black opacity-60", isSelected ? "text-white" : "text-primary")}>
                                                            {slot.day}
                                                        </span>
                                                        <p className={cn("font-bold text-base", isSelected ? "text-white" : "text-[#173e72]")}>
                                                            {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                    <p className={cn("text-xs font-medium opacity-70", isSelected ? "text-white/80" : "text-muted-foreground")}>
                                                        {isBooked ? "Currently unavailable" : "Available for booking"}
                                                    </p>
                                                </div>
                                            </div>
                                            {isSelected && (
                                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#173e72]" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-muted/30 rounded-3xl border-2 border-dashed border-primary/10">
                                <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-20" />
                                <p className="text-sm font-bold text-[#173e72]">No available slots found</p>
                                <p className="text-xs text-muted-foreground">Please check back later</p>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="p-8 pt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsBookingOpen(false);
                                setSelectedSlotId(null);
                            }}
                            className="w-full sm:flex-1 h-12 rounded-xl font-bold border-2 hover:bg-accent transition-all"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleConfirmBooking}
                            disabled={!selectedSlotId || isSubmitting}
                            className="w-full sm:flex-1 h-12 rounded-xl font-black bg-[#173e72] hover:bg-[#1a4b8a] text-white shadow-xl shadow-primary/20 transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {isSubmitting ? "Processing..." : "Confirm Booking"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
