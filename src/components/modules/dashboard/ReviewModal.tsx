"use client";

import React, { useState } from 'react';
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Star, MoreHorizontal, ArrowUpRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createReviewAction } from "@/actions/review.actions";

interface ReviewModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    selectedTutor: any;
    onSuccess?: () => void;
}

const cn = (...inputs: any[]) => inputs.filter(Boolean).join(" ");

export function ReviewModal({ isOpen, onOpenChange, selectedTutor, onSuccess }: ReviewModalProps) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitReview = async () => {
        if (!comment.trim()) {
            toast.error("Please provide a review comment");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Submitting your review...");

        try {
            const res = await createReviewAction(selectedTutor.id, rating, comment);
            if (res.error) {
                toast.error(res.error.message, { id: toastId });
            } else {
                toast.success("Review submitted successfully!", { id: toastId });
                onOpenChange(false);
                setComment("");
                setRating(5);
                if (onSuccess) onSuccess();
            }
        } catch (error) {
            toast.error("Failed to submit review", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
      <Dialog open={isOpen} onOpenChange={onOpenChange}>
        <DialogContent className="rounded-none  h-200 border-none shadow-[0_0_100px_rgba(0,0,0,0.5)] bg-white flex flex-row transition-all duration-700">
          <button
            onClick={() => onOpenChange(false)}
            className="absolute right-6 top-6 z-50 text-slate-300 hover:text-[#173e72] p-2 hover:bg-slate-50 transition-all"
          >
            <MoreHorizontal className="h-6 w-6 rotate-90" />
          </button>

          {/* Left Aesthetic Panel - Refined Cinematic */}
          <div className="w-[30%] bg-[#0d1b3e] p-12 flex flex-col justify-between text-white relative shrink-0 h-full overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-b from-[#173e72] via-[#0d1b3e] to-[#040a1d]" />

            {/* Abstract Background Design */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute -top-20 -left-20 w-64 h-64 border border-white/10 rounded-full" />
              <div className="absolute bottom-40 right-10 w-32 h-32 bg-blue-500/20 blur-[80px]" />
            </div>

            <div className="relative z-10 space-y-10">
              <div className="w-16 h-1 bg-amber-400" />
              <div className="space-y-6">
                <span className="text-[10px] font-black tracking-[0.4em] opacity-40 uppercase">
                  CORE MODULE // SR-26
                </span>
                <h2 className="text-5xl font-black tracking-tighter uppercase italic">
                  THE
                  <br />
                  REVIEW
                  <br />
                  ENGINE
                </h2>
                <p className="text-xs font-bold text-white/40 leading-relaxed uppercase tracking-widest max-w-50">
                  Architecting the future through data.
                </p>
              </div>
            </div>

            <div className="relative z-10">
              <div className="bg-white/5 backdrop-blur-md p-6 border border-white/5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-black tracking-widest uppercase opacity-60">
                    Verified Node
                  </span>
                </div>
                <Star className="h-10 w-10 text-amber-400 fill-amber-400 opacity-80" />
              </div>
            </div>
          </div>

          {/* Right Interactive Area - High-Contrast Precision */}
          <div className="flex-1 flex flex-col bg-white overflow-hidden h-full">
            <div className="flex-1 p-16 overflow-y-auto custom-scrollbar space-y-12">
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-1.5 w-8 bg-[#173e72]" />
                  <span className="text-[11px] font-black text-[#173e72] opacity-30 uppercase tracking-[0.3em]">
                    Evaluation Node
                  </span>
                </div>
                <h3 className="text-4xl font-black text-[#173e72] tracking-tighter leading-none">
                  {selectedTutor?.user?.name || "EXPERT TUTOR"}
                </h3>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                  {selectedTutor?.category?.name || "Professional Educator"}
                </p>
              </div>

              <div className="space-y-12">
                {/* Service Rating */}
                <div className="space-y-6">
                  <div className="flex items-end justify-between border-b border-slate-100 pb-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#173e72] opacity-50">
                      Metric Quality
                    </Label>
                    <span className="text-3xl font-black text-amber-500 font-mono tracking-tighter tabular-nums decoration-amber-200 decoration-4 underline-offset-8 underline">
                      {rating}.00
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        onClick={() => setRating(num)}
                        className={cn(
                          "h-14 w-14 flex items-center justify-center transition-all duration-500 border-2 active:scale-90 group relative",
                          rating >= num
                            ? "bg-[#173e72] border-[#173e72] text-amber-400 shadow-xl"
                            : "bg-white border-slate-100 text-slate-200 hover:border-[#173e72]/20",
                        )}
                      >
                        <Star
                          className={cn(
                            "h-7 w-7 transition-all duration-300",
                            rating >= num
                              ? "fill-current"
                              : "group-hover:text-amber-400/50",
                          )}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Narrative Feedback */}
                <div className="space-y-6">
                  <div className="flex items-end justify-between border-b border-slate-100 pb-4">
                    <Label className="text-[10px] font-black uppercase tracking-[0.3em] text-[#173e72] opacity-50">
                      Qualitative Narrative
                    </Label>
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                      Formal Input
                    </span>
                  </div>
                  <div className="relative pt-4">
                    <Textarea
                      placeholder="Document your experience with clinical precision..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="min-h-[140px] p-0 rounded-none border-none bg-transparent font-bold text-2xl text-[#173e72] focus:ring-0 placeholder:text-slate-100 transition-all resize-none shadow-none leading-tight tracking-tighter"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submission Block - Fixed at bottom */}
            <div className="p-16 pt-0">
              <Button
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className="bg-[#173e72] hover:bg-black text-white rounded-none h-20 w-full font-black text-2xl tracking-[0.3em] transition-all active:scale-[0.98] group flex items-center justify-center gap-6 border-l-[12px] border-amber-400"
              >
                {isSubmitting ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <>
                    COMMIT TO ARCHIVE
                    <ArrowUpRight className="h-7 w-7 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
}
