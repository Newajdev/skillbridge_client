import { Star, Clock, GraduationCap, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { tutor } from "@/types/tutor.type";

interface TutorDetailsProps {
    tutor: tutor;
}

export default function TutorDetails({ tutor }: TutorDetailsProps) {
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
                                    alt={tutor.user?.name}
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
                                            {tutor.averageRate}
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

                                <Button className="w-full h-14 rounded-2xl font-black text-lg bg-[#173e72] hover:bg-[#1a4b8a] shadow-xl shadow-primary/20 transition-all active:scale-95">
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
                                    {tutor.availabilitySlots.map((slot) => {
                                        const isBooked = slot.bookings?.some(booking => {
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
                                                                {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} -
                                                                {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                                        {tutor.reviews.map((review) => {
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
                                                                <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center bg-yellow-400/10 text-yellow-700 px-2 py-1 rounded-lg text-sm font-bold">
                                                            <Star className="h-4 w-4 fill-yellow-400 mr-1" />
                                                            {review.rating}
                                                        </div>
                                                    </div>
                                                    <p className="text-muted-foreground italic leading-relaxed">&ldquo;{review.comment}&rdquo;</p>
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
                                    { label: "Students", value: "150+" },
                                    { label: "Sessions", value: tutor.totalSessions || "500+" },
                                    { label: "Rating", value: tutor.averageRate },
                                    { label: "Response", value: "99%" },
                                ].map((stat, i) => (
                                    <div key={i} className="text-center p-6 rounded-3xl bg-white/40 shadow-lg border border-white/20">
                                        <p className="text-3xl font-black text-primary">{stat.value}</p>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</p>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
