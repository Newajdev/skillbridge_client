"use client"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login logic
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify({
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?u=john",
      email: "john@example.com"
    }));
    // Dispatch custom event to notify Navbar
    window.dispatchEvent(new Event("auth-change"));
    // Redirect to home or dashboard
    router.push("/");
  };

  return (
    <Card className="border-none shadow-xl bg-background/80 backdrop-blur-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to sign in to your account
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSignIn}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" className="bg-muted/50" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-xs text-primary hover:underline hover:underline-offset-4"
              >
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" className="bg-muted/50" required />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" />
            <Label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember me
            </Label>
          </div>
          <Button type="submit" className="w-full font-semibold">Sign In</Button>
        </CardContent>
      </form>
      <CardFooter className="flex flex-wrap items-center justify-center gap-2">
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-primary font-semibold hover:underline hover:underline-offset-4"
          >
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
