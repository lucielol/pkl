"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { formSignInSchema, signInSchema } from "@/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@repo/ui/components/field";
import { Input } from "@repo/ui/components/input";
import { Button } from "@repo/ui/components/button";
import toast from "react-hot-toast";
import { useForm, Controller } from "react-hook-form";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from "@repo/ui/components/input-group";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "@repo/ui/components/spinner";
import Link from "next/link";
import { Checkbox } from "@repo/ui/components/checkbox";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export function AppFormSignIn() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<formSignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const onSubmit = async (credentials: formSignInSchema) => {
    try {
      const response = await login(credentials);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success("Berhasil login");
      router.push("/");
    } catch (error) {
      toast.error("Email atau password salah");
    }
  };

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl">Sign In</CardTitle>
        <CardDescription>
          Sign In dengan akun yang terdaftar anda.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-signin" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@gmail.com"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="*************"
                      className="border-0 focus:h-8"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align={"inline-end"}>
                      <InputGroupButton
                        className="tabular-nums hover:bg-transparent cursor-pointer"
                        type="button"
                        form="form-signin"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? <EyeOff /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="remember"
              control={form.control}
              render={({ field }) => (
                <Field>
                  <InputGroup className="flex items-center justify-between border-0 dark:bg-sidebar shadow-none max-h-[20px]">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="remember"
                        checked={field.value}
                        onCheckedChange={(checked) => field.onChange(checked)}
                      />
                      <FieldLabel
                        htmlFor="remember"
                        className="text-sm select-none cursor-pointer leading-none"
                      >
                        <span>Remember me?</span>
                      </FieldLabel>
                    </div>

                    <InputGroupAddon align={"inline-end"} className="">
                      <InputGroupText className="p-0">
                        <Link
                          href={"/"}
                          className="text-blue-500 hover:underline hover:underline-offset-2"
                        >
                          Lupa Password?
                        </Link>
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field>
          <Button type="submit" form="form-signin" disabled={loading}>
            {loading ? (
              <>
                <Spinner /> Loading...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
