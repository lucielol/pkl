import * as z from "zod";

export const signInSchema = z.object({
  email: z
    .email({ message: "Email tidak valid, coba lagi!" })
    .min(1, { message: "Email tidak boleh kosong" }),
  password: z
    .string()
    .min(8, "Password minimal 8 karakter")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password harus mengandung huruf besar (A-Z)",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password harus mengandung huruf kecil (a-z)",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password harus mengandung angka (0-9)",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: "Password harus mengandung simbol (!@#$%, dll)",
    }),
  remember: z.boolean().optional(),
});

export const signUpSchema = z
  .object({
    fullname: z.string().min(1, { message: "Nama tidak boleh kosong" }),
    email: z
      .email({ message: "Email tidak valid" })
      .min(1, { message: "Email tidak boleh kosong" }),
    phone: z
      .string()
      .min(10, { message: "Nomor telepon minimal 10 digit" })
      .refine((val) => /^\d+$/.test(val), {
        message: "Nomor telepon harus berupa angka",
      }),
    password: z
      .string()
      .min(8, { message: "Password minimal 8 karakter" })
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password harus mengandung huruf besar (A-Z)",
      })
      .refine((val) => /[a-z]/.test(val), {
        message: "Password harus mengandung huruf kecil (a-z)",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password harus mengandung angka (0-9)",
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: "Password harus mengandung simbol (!@#$%, dll)",
      }),
    address: z.string().optional(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Konfirmasi password tidak cocok",
  });

export type formSignInSchema = z.infer<typeof signInSchema>;
export type formSignUpSchema = z.infer<typeof signUpSchema>;
