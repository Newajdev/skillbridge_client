import React, { Suspense } from 'react';
import VerifyEmailClient from "@/components/modules/authentication/verify-email-client";

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="flex h-[80vh] w-full items-center justify-center">
                <div className="text-center">Loading verification...</div>
            </div>
        }>
            <VerifyEmailClient />
        </Suspense>
    );
}
