"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import {
  GraduationCap,
  User,
  ArrowRight,
  ArrowLeft,
  MailCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(4, "Name must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [role, setRole] = useState<"STUDENT" | "TUTOR">("STUDENT");
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const ToastId = toast.loading("Creating your account...");
      try {
        const payload = {
          email: value.email,
          password: value.password,
          name: value.name,
          role: role,
        };

        const { data, error } = await authClient.signUp.email(payload);

        if (error) {
          toast.error(error.message, { id: ToastId });
          return;
        }

        toast.success("Account created successfully!", { id: ToastId });
        setIsSuccess(true);
      } catch (error) {
        toast.error("Something went wrong, please try again.", {
          id: ToastId,
        });
      }
    },
  });

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md border-none shadow-2xl bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/20 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <CardContent className="flex flex-col items-center text-center space-y-6 pt-6">
          <div className="h-24 w-24 bg-green-100/80 backdrop-blur-sm rounded-full flex items-center justify-center mb-2 animate-bounce shadow-lg shadow-green-100">
            <MailCheck className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-[#173e72] tracking-tight">Check your email</h2>
          <p className="text-muted-foreground font-medium text-sm">
            {`We've sent a verification link to your email address. Please verify your email to activate your ${role.toLowerCase()} account.`}
          </p>
          <Button
            className="w-full h-12 rounded-xl font-bold bg-[#173e72] hover:bg-[#1a4b8a] mt-4 shadow-xl shadow-[#173e72]/20"
            onClick={() => router.push("/login")}
          >
            Go to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-none shadow-2xl bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <CardHeader className="text-center space-y-4 pb-6 pt-2">
        <div className="flex justify-center mb-2">
          <Image
            src="/logo.png"
            alt="SkillBridge Logo"
            width={160}
            height={50}
            className="object-contain"
          />
        </div>
        <div className="space-y-1">
          <CardTitle className="text-2xl font-black text-[#173e72] tracking-tight">
            {step === 1 && "Start Your Journey"}
            {step === 2 && "Account Details"}
          </CardTitle>
          <CardDescription className="text-muted-foreground font-medium text-xs">
            {step === 1 && "Choose how you want to use SkillBridge"}
            {step === 2 && "Enter your details to create an account"}
          </CardDescription>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                step >= i ? "w-8 bg-[#173e72]" : "w-3 bg-[#173e72]/20"
              )}
            />
          ))}
        </div>
      </CardHeader>

      <form
        id="register-form"
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (step === 2) {
            form.handleSubmit();
          }
        }}
      >
        <CardContent className="p-0 space-y-6">
          {step === 1 && (
            <div className="grid grid-cols-2 gap-4">
              <div
                onClick={() => setRole("STUDENT")}
                className={cn(
                  "p-4 border-2 rounded-2xl cursor-pointer transition-all flex flex-col items-center text-center group bg-white/50",
                  role === "STUDENT"
                    ? "border-[#173e72] shadow-md bg-white/80 scale-[1.02]"
                    : "border-white/40 hover:border-[#173e72]/50 hover:bg-white"
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-2xl mb-3 transition-colors",
                    role === "STUDENT"
                      ? "bg-[#173e72] text-white shadow-lg shadow-[#173e72]/20"
                      : "bg-[#173e72]/10 text-[#173e72] group-hover:bg-[#173e72]/20"
                  )}
                >
                  <User className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-[#173e72] text-sm">Student</h3>
              </div>

              <div
                onClick={() => setRole("TUTOR")}
                className={cn(
                  "p-4 border-2 rounded-2xl cursor-pointer transition-all flex flex-col items-center text-center group bg-white/50",
                  role === "TUTOR"
                    ? "border-[#173e72] shadow-md bg-white/80 scale-[1.02]"
                    : "border-white/40 hover:border-[#173e72]/50 hover:bg-white"
                )}
              >
                <div
                  className={cn(
                    "p-3 rounded-2xl mb-3 transition-colors",
                    role === "TUTOR"
                      ? "bg-[#173e72] text-white shadow-lg shadow-[#173e72]/20"
                      : "bg-[#173e72]/10 text-[#173e72] group-hover:bg-[#173e72]/20"
                  )}
                >
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-[#173e72] text-sm">Tutor</h3>
              </div>
            </div>
          )}

          {step === 2 && (
            <FieldGroup className="space-y-5 animate-in fade-in slide-in-from-right-4 duration-300">
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="space-y-2">
                      <FieldLabel htmlFor={field.name} className="text-sm font-bold text-[#173e72] ml-1">
                        Full Name
                      </FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        className="h-12 rounded-xl bg-white/50 border-white/40 focus:bg-white transition-all shadow-sm"
                        placeholder="John Doe"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="space-y-2">
                      <FieldLabel htmlFor={field.name} className="text-sm font-bold text-[#173e72] ml-1">
                        Email Address
                      </FieldLabel>
                      <Input
                        type="email"
                        id={field.name}
                        name={field.name}
                        className="h-12 rounded-xl bg-white/50 border-white/40 focus:bg-white transition-all shadow-sm"
                        placeholder="you@example.com"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field className="space-y-2">
                      <FieldLabel htmlFor={field.name} className="text-sm font-bold text-[#173e72] ml-1">
                        Password
                      </FieldLabel>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        className="h-12 rounded-xl bg-white/50 border-white/40 focus:bg-white transition-all shadow-sm"
                        placeholder="Min. 8 characters"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          )}
        </CardContent>

        <CardFooter className="flex flex-col gap-6 mt-4 p-0">
          <div className="flex w-full gap-3">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                className="h-12 px-5 rounded-xl font-bold border-white/40 bg-white/50 text-[#173e72] hover:bg-white hover:text-[#1a4b8a] transition-all"
                onClick={() => setStep(step - 1)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}

            {step < 2 ? (
              <Button
                type="button"
                className="flex-1 h-12 rounded-xl font-black text-white bg-[#173e72] hover:bg-[#1a4b8a] shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                onClick={() => setStep(step + 1)}
              >
                Continue <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <form.Subscribe
                selector={(state) => [state.canSubmit, state.isSubmitting]}
                children={([canSubmit, isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={!canSubmit || isSubmitting as boolean}
                    className="flex-1 h-12 rounded-xl font-black text-white bg-[#173e72] hover:bg-[#1a4b8a] shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
                  >
                    {(isSubmitting as boolean) ? "Creating Account..." : "Create Account"}
                  </Button>
                )}
              />
            )}
          </div>

          <div className="text-sm font-medium text-muted-foreground w-full text-center">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#173e72] font-black hover:underline hover:underline-offset-4 transition-all"
            >
              Sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
