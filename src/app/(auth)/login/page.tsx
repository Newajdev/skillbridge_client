"use client"

import Link from "next/link"

import {
  Card,

  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useForm } from "@tanstack/react-form"



export default function LoginPage() {

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  }) 

  return (
    <Card className="border-none shadow-xl bg-background/80 backdrop-blur-md">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight">Welcome back</CardTitle>
        <CardDescription>
          Enter your email and password to sign in to your account
        </CardDescription>
      </CardHeader>
      <form >
        
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
