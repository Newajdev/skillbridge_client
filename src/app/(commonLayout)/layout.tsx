import { Navbar } from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
