"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { authService } from "@/services/auth.service";

export default function VerifyEmailClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [message, setMessage] = useState<string>("Verifying your email...");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("Verification token is missing.");
            return;
        }

        const verifyEmailToken = async () => {
            const { data, error } = await authService.verifyEmail(token);

            if (error) {
                setStatus("error");
                setMessage(error.message);
            } else {
                setStatus("success");
                setMessage(data.message || "Your email has been successfully verified!");
            }
        };

        verifyEmailToken();
    }, [token]);

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center p-4">
            <div className="mx-auto flex w-full max-w-[400px] flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    {status === "loading" && (
                        <>
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                            </div>
                            <h1 className="text-2xl font-semibold tracking-tight">Verifying Email</h1>
                            <p className="text-sm text-muted-foreground">{message}</p>
                        </>
                    )}

                    {status === "success" && (
                        <>
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle2 className="h-8 w-8 text-green-600" />
                            </div>
                            <h1 className="text-2xl font-semibold tracking-tight text-green-600">Verification Successful</h1>
                            <p className="text-sm text-muted-foreground">{message}</p>
                            <Button className="mt-6" onClick={() => router.push("/login")}>
                                Go to Login
                            </Button>
                        </>
                    )}

                    {status === "error" && (
                        <>
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <XCircle className="h-8 w-8 text-red-600" />
                            </div>
                            <h1 className="text-2xl font-semibold tracking-tight text-red-600">Verification Failed</h1>
                            <p className="text-sm text-muted-foreground">{message}</p>
                            <Button variant="outline" className="mt-6" onClick={() => router.push("/login")}>
                                Back to Login
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
