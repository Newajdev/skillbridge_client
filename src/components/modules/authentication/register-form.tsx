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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Minimum length is 8"),
    confirmPassword: z.string().min(8, "Minimum length is 8"),
    role: z.enum(["STUDENT", "TUTOR"]),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {
    const router = useRouter();

    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "STUDENT" as "STUDENT" | "TUTOR",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Creating account...");
            try {
                const { data, error } = await (authClient.signUp.email as any)({
                    email: value.email,
                    password: value.password,
                    name: value.name,
                    role: value.role,
                });

                if (error) {
                    toast.error(error.message || "Registration failed", { id: toastId });
                    return;
                }

                toast.success("Account created! Please check your email to verify.", { id: toastId });
                router.push("/login");
            } catch (err) {
                toast.error("Something went wrong, please try again.", { id: toastId });
            }
        },
    });

    return (
        <Card {...props}>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Join SkillBridge and start learning or teaching
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    id="register-form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        form.handleSubmit();
                    }}
                >
                    <FieldGroup>
                        <form.Field name="name">
                            {(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                                    <Input
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="John Doe"
                                    />
                                    {field.state.meta.isTouched && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )}
                        </form.Field>
                        <form.Field name="email">
                            {(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                    <Input
                                        type="email"
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                        placeholder="m@example.com"
                                    />
                                    {field.state.meta.isTouched && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )}
                        </form.Field>
                        <form.Field name="role">
                            {(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>I am a...</FieldLabel>
                                    <Select
                                        value={field.state.value}
                                        onValueChange={(val) => field.handleChange(val as any)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="STUDENT">Student</SelectItem>
                                            <SelectItem value="TUTOR">Tutor</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {field.state.meta.isTouched && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )}
                        </form.Field>
                        <form.Field name="password">
                            {(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                    <Input
                                        type="password"
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.isTouched && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )}
                        </form.Field>
                        <form.Field name="confirmPassword">
                            {(field) => (
                                <Field>
                                    <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
                                    <Input
                                        type="password"
                                        id={field.name}
                                        value={field.state.value}
                                        onBlur={field.handleBlur}
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {field.state.meta.isTouched && (
                                        <FieldError errors={field.state.meta.errors} />
                                    )}
                                </Field>
                            )}
                        </form.Field>
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <Button form="register-form" type="submit" className="w-full">
                    Create Account
                </Button>
            </CardFooter>
        </Card>
    );
}
