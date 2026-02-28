"use client"

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { env } from "@/env";

export default function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    const toastId = toast.loading("Sending your message...");

    try {
      const API_URL = env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/public/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.", { id: toastId });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast.error(data.message || "Failed to send message", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.", { id: toastId });
      console.error("Contact form error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSendMessage}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#173e72] ml-1">
            Full Name
          </label>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className="h-14 rounded-2xl border-muted bg-muted/20 px-6 focus:bg-white transition-all font-medium"
            disabled={isLoading}
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-bold text-[#173e72] ml-1">
            Email Address
          </label>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className="h-14 rounded-2xl border-muted bg-muted/20 px-6 focus:bg-white transition-all font-medium"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-[#173e72] ml-1">Subject</label>
        <Input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="How can we help?"
          className="h-14 rounded-2xl border-muted bg-muted/20 px-6 focus:bg-white transition-all font-medium"
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-bold text-[#173e72] ml-1">Message</label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Write your message here..."
          className="min-h-48 rounded-2xl border-muted bg-muted/20 p-6 focus:bg-white transition-all resize-none font-medium"
          disabled={isLoading}
        />
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-16 rounded-2xl text-lg font-bold shadow-xl flex gap-3 hover:-translate-y-0.5 transition-all bg-[#173e72] hover:bg-[#1a4b8a] text-white"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            Send Message
          </>
        )}
      </Button>
    </form>
  );
}
