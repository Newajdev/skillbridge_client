"use client"

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactForm() {
  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#173e72] ml-1">
            Full Name
          </label>
          <Input
            placeholder="John Doe"
            className="h-14 rounded-2xl border-muted bg-muted/20 px-6 focus:bg-white transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#173e72] ml-1">
            Email Address
          </label>
          <Input
            type="email"
            placeholder="john@example.com"
            className="h-14 rounded-2xl border-muted bg-muted/20 px-6 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-[#173e72] ml-1">Subject</label>
        <Input
          placeholder="How can we help?"
          className="h-14 rounded-2xl border-muted bg-muted/20 px-6 focus:bg-white transition-all"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-[#173e72] ml-1">Message</label>
        <Textarea
          placeholder="Write your message here..."
          className="min-h-45rounded-2xl border-muted bg-muted/20 p-6 focus:bg-white transition-all resize-none"
        />
      </div>

      <Button className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl flex gap-3 hover:-translate-y-0.5 transition-all">
        <Send className="h-5 w-5" />
        Send Message
      </Button>
    </form>
  );
}
