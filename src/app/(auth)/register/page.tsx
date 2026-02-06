"use client"

import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client"

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

export default function RegisterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleRegister = async () => {
        const { name, email, password, confirmPassword } = formData

        if (!name || !email || !password || !confirmPassword) {
            toast.error("Please fill in all fields")
            return
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        setIsLoading(true)
        const loadToast = toast.loading("Creating your account...")

        try {
            const { data, error } = await authClient.signUp.email({
                email,
                password,
                name,
            })

            if (error) {
                toast.error(error.message || "Registration failed", { id: loadToast })
            } else {
                toast.success("Registration successful! Please check your email for verification.", { id: loadToast })
                router.push("/login")
            }
        } catch (err: any) {
            console.error("Registration error:", err)
            toast.error("An unexpected error occurred", { id: loadToast })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="border-none shadow-xl bg-background/80 backdrop-blur-md">
            <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold tracking-tight">Create an account</CardTitle>
                <CardDescription>
                    Enter your details below to create your SkillBridge account
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        className="bg-muted/50"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        className="bg-muted/50"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        className="bg-muted/50"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        disabled={isLoading}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        className="bg-muted/50"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        disabled={isLoading}
                    />
                </div>
                <Button
                    className="w-full font-semibold"
                    onClick={handleRegister}
                    disabled={isLoading}
                >
                    {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
            </CardContent>
            <CardFooter className="flex flex-wrap items-center justify-center gap-2">
                <div className="text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-primary font-semibold hover:underline hover:underline-offset-4"
                    >
                        Sign in
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
