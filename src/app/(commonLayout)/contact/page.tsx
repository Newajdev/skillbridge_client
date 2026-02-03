"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, Send, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-muted/30 pb-24 pt-24 md:pt-32">
      <div className="container mx-auto px-4 relative z-20 flex justify-center">
        <div className="w-full max-w-4xl">
          {/* Contact Form */}
          <Card className="rounded-[32px] border-none shadow-2xl bg-white p-8 md:p-12">
            <CardContent className="p-0 space-y-10">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold text-[#173e72]">Send us a Message</h3>
                <p className="text-muted-foreground text-lg">
                  Have a specific inquiry? Fill out the form below and we'll get back to you within 24 hours.
                </p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#173e72] ml-1">Full Name</label>
                    <Input placeholder="John Doe" className="h-14 rounded-2xl border-muted bg-muted/20 px-6 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-[#173e72] ml-1">Email Address</label>
                    <Input type="email" placeholder="john@example.com" className="h-14 rounded-2xl border-muted bg-muted/20 px-6 focus:bg-white transition-all" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#173e72] ml-1">Subject</label>
                  <Input placeholder="How can we help?" className="h-14 rounded-2xl border-muted bg-muted/20 px-6 focus:bg-white transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#173e72] ml-1">Message</label>
                  <Textarea
                    placeholder="Write your message here..."
                    className="min-h-[180px] rounded-2xl border-muted bg-muted/20 p-6 focus:bg-white transition-all resize-none"
                  />
                </div>

                <Button className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl flex gap-3 hover:translate-y-[-2px] transition-all">
                  <Send className="h-5 w-5" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
