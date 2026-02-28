import Image from "next/image";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative w-full h-150 md:h-180 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/heroBanner.png"
          alt="SkillBridge Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 h-full flex flex-col justify-center">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white drop-shadow-lg">
            SkillBridge
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl font-medium text-white/90 drop-shadow-md">
            Connect with Expert Tutors
          </p>
        </div>
      </div>
    </section>
  );
}
