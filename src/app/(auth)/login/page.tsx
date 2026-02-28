import React, { Suspense } from 'react';
import LoginForm from '@/components/modules/authentication/login-form'

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
