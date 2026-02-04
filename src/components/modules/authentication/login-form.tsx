"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    password: z.string().min(8, "Minimum length is 8"),
    email: z.string().email("Invalid email address"),
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Logging in...");
            // try {
            //     const { data, error } = await authClient.signIn.email(value);

            //     if (error) {
            //         toast.error(error.message || "Login failed", { id: toastId });
            //         return;
            //     }

            //     toast.success("Logged in successfully", { id: toastId });


            //     const userRole = data?.user.role;
            //     if (userRole === "ADMIN") {
            //         router.push("/admin");
            //     } else if (userRole === "TUTOR") {
            //         router.push("/tutor/dashboard");
            //     } else {
            //         router.push("/dashboard");
            //     }
            // } catch (err) {
            //     toast.error("Something went wrong, please try again.", { id: toastId });
            // }
        },
    });

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>
                    Enter your email and password to sign in
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="login-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field name="email">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                        <Input
                                            type="email"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                        <form.Field name="password">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field data-invalid={isInvalid}>
                                        <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                        <Input
                                            type="password"
                                            id={field.name}
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && (
                                            <FieldError errors={field.state.meta.errors} />
                                        )}
                                    </Field>
                                );
                            }}
                        </form.Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button form="login-form" type="submit" className="w-full">
                    Login
                </Button>
            </CardFooter>
        </Card>
    );
}
