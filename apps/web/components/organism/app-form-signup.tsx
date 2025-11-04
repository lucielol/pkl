"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { formSignUpSchema, signUpSchema } from "@/validator";
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
import { Spinner } from "@repo/ui/components/spinner";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useRegister } from "@/hooks/use-register";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";

export function AppFormSignUp() {
  const { register, loading, error, success, message } = useRegister();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const form = useForm<formSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullname: "",
      phone: "",
      email: "",
      password: "",
      address: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: formSignUpSchema) => {
    try {
      await register(data);
      if (!success) {
        toast.error(message);
        return;
      }

      const responseLogin = await login({
        email: data.email,
        password: data.password,
      });

      if (!responseLogin.success) {
        toast.error(responseLogin.message);
        return;
      }

      toast.success(message);
      router.push("/");
    } catch (error) {
      toast.error("Register gagal, periksa kembali data");
    }
  };

  return (
    <Card className="bg-transparent border-0 shadow-none">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl">Sign Up</CardTitle>
        <CardDescription>Buat akun anda.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-signin" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-5">
            <Controller
              name="fullname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-value={fieldState.invalid}>
                  <FieldLabel htmlFor="fullName">Nama Lengkap</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    id="fullName"
                    aria-invalid={fieldState.invalid}
                    placeholder="John Doe"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-value={fieldState.invalid}>
                  <FieldLabel htmlFor="phone">Nomor Telepon</FieldLabel>
                  <Input
                    {...field}
                    type="tel"
                    id="phone"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D+/g, "");
                      field.onChange(digitsOnly);
                    }}
                    onBeforeInput={(e) => {
                      const data = (e as unknown as InputEvent).data;
                      if (data && /\D/.test(data)) {
                        e.preventDefault();
                      }
                    }}
                    aria-invalid={fieldState.invalid}
                    placeholder="081234567890"
                    autoComplete="on"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
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
                  <InputGroupAddon align="block-end" className="p-0">
                    <InputGroupText className="tabular-nums">
                      Min 8 karakter, A-z, angka, simbol
                    </InputGroupText>
                  </InputGroupAddon>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Konfirmasi Password
                  </FieldLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      type={showConfirmPassword ? "text" : "password"}
                      id="confrimPassword"
                      placeholder="*************"
                      className="border-0 focus:h-8"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align={"inline-end"}>
                      <InputGroupButton
                        className="tabular-nums hover:bg-transparent cursor-pointer"
                        type="button"
                        form="form-signin"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
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
              "Sign Up"
            )}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
