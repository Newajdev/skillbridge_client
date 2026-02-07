import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="w-screen h-screen flex justify-center items-center">
        <div className="text-center flex flex-col items-center space-y-3">
          <Image src={"/logo.png"} alt="Logo" width={400} height={400} className="mx-auto mb-4" />
          <h1 className="text-6xl font-bold text-gray-800">404</h1>
          <p className="text-xl text-gray-600 mt-4">The page you are looking for does not exist.</p>
        </div>
          <Link href={'/'} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Go Home</Link   >
      </body>
    </html>
  );
}
