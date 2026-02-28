"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UserCheck } from "lucide-react";

interface ProfileCompletePopupProps {
    isComplete: boolean;
    profileUrl: string;
}

export function ProfileCompletePopup({ isComplete, profileUrl }: ProfileCompletePopupProps) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isComplete && pathname !== profileUrl) {
            // Small delay to ensure it shows up after login transition
            const timer = setTimeout(() => {
                setOpen(true);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
            setOpen(false);
        }
    }, [isComplete, pathname, profileUrl]);

    const handleGoToProfile = () => {
        setOpen(false);
        router.push(profileUrl);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px] rounded-[2rem] border-none shadow-2xl bg-white/90 backdrop-blur-xl p-8">
                <DialogHeader className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-blue-50 text-[#173e72] animate-bounce">
                        <UserCheck className="h-8 w-8" />
                    </div>
                    <DialogTitle className="text-2xl font-black text-[#173e72]">Profile Incomplete</DialogTitle>
                    <DialogDescription className="text-muted-foreground font-medium">
                        Please complete your user profile to unlock all features of the platform.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="w-full h-12 rounded-xl font-bold border-gray-200 hover:bg-gray-50 flex-1"
                    >
                        Later
                    </Button>
                    <Button
                        onClick={handleGoToProfile}
                        className="w-full h-12 rounded-xl font-black text-white bg-[#173e72] hover:bg-[#1a4b8a] shadow-lg shadow-primary/20 transition-all active:scale-[0.98] flex-1"
                    >
                        Complete Profile
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
