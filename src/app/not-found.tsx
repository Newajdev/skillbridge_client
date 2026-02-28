import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 selection:bg-[#173e72]/20">
            {/* Abstract Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#173e72]/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
            <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
            <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-purple-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />

            <div className="relative z-10 w-full max-w-3xl px-6">
                <div className="bg-white/40 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
                    {/* Subtle overlay reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

                    <div className="absolute -top-12 -right-12 text-[#173e72]/5">
                        <Sparkles className="w-64 h-64" />
                    </div>

                    <div className="relative z-10 space-y-8 flex flex-col items-center">
                        {/* Logo */}
                        <Link href="/" className="inline-block transition-transform hover:scale-105 active:scale-95 duration-300">
                            <div className="p-4 bg-white/50 rounded-3xl shadow-sm border border-white/60">
                                <Image
                                    src="/logo.png"
                                    alt="SkillBridge Logo"
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>
                        </Link>

                        {/* 404 Text */}
                        <div className="space-y-2">
                            <h1 className="text-[8rem] leading-none font-black text-transparent bg-clip-text bg-gradient-to-br from-[#173e72] to-[#3a7ad5] drop-shadow-sm select-none">
                                404
                            </h1>
                            <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                                Page Not Found
                            </h2>
                        </div>

                        <p className="text-lg text-slate-500 max-w-lg mx-auto font-medium leading-relaxed">
                            Oops! The page you are looking for seems to have gone missing or never existed. Let's get you back on track.
                        </p>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full sm:w-auto">
                            <Button
                                asChild
                                size="lg"
                                className="w-full sm:w-auto h-14 px-8 rounded-2xl font-bold bg-[#173e72] hover:bg-[#1a4b8a] text-white shadow-xl shadow-[#173e72]/20 transition-all hover:-translate-y-1"
                            >
                                <Link href="/">
                                    <Home className="mr-2 h-5 w-5" />
                                    Return Home
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="w-full sm:w-auto h-14 px-8 rounded-2xl font-bold border-2 border-[#173e72]/10 text-[#173e72] hover:bg-[#173e72]/5 hover:border-[#173e72]/30 transition-all"
                            >
                                <Link href="/dashboard">
                                    <ArrowLeft className="mr-2 h-5 w-5" />
                                    To Dashboard
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
