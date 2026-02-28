"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const ToastId = toast.loading("Logging in user");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: ToastId });
          return;
        }

        toast.success("user Logged in Successfully", { id: ToastId });
        router.push(callbackUrl || "/");
      } catch (error) {
        toast.error("Someting wents wrong, please try again.", { id: ToastId });
      }
    },
  });

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
            Welcome Back
          </CardTitle>
          <CardDescription className="text-muted-foreground font-medium text-xs">
            Enter your credentials to access SkillBridge
          </CardDescription>
        </div>
      </CardHeader>

      <form
        id="register-form"
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="space-y-5">
          <form.Field
            name="email"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field className="space-y-2">
                  <FieldLabel htmlFor={field.name} className="text-sm font-bold text-[#173e72] ml-1">Email Address</FieldLabel>
                  <Input
                    type="email"
                    id={field.name}
                    placeholder="name@example.com"
                    className="h-12 rounded-xl bg-white/50 border-white/40 focus:bg-white transition-all shadow-sm"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
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
                  <FieldLabel htmlFor={field.name} className="text-sm font-bold text-[#173e72] ml-1">Password</FieldLabel>
                  <Input
                    type="password"
                    id={field.name}
                    placeholder="••••••••"
                    className="h-12 rounded-xl bg-white/50 border-white/40 focus:bg-white transition-all shadow-sm"
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
      </form>

      <CardFooter className="flex flex-col items-center justify-center gap-6 mt-8 p-0">
        <Button
          form="register-form"
          type="submit"
          className="w-full h-12 rounded-xl font-black text-white bg-[#173e72] hover:bg-[#1a4b8a] shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
        >
          Sign In
        </Button>

        <div className="text-sm font-medium text-muted-foreground">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-[#173e72] font-black hover:underline hover:underline-offset-4 transition-all"
          >
            Sign Up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
