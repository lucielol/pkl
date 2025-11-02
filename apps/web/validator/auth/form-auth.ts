import * as z from "zod";

export const signInSchema = z.object({
  email: z.string().email("Email tidak valid, coba lagi!"),
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
    username: z
      .string()
      .min(1, { message: "Username tidak boleh kosong" })
      .transform((val) => val.toLowerCase())
      .refine((val) => !/\s/.test(val), {
        message: "Username tidak boleh mengandung spasi",
      }),
    email: z.string().email({ message: "Email tidak valid" }),
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
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Konfirmasi password tidak cocok",
  });

export type formSignInSchema = z.infer<typeof signInSchema>;
export type formSignUpSchema = z.infer<typeof signUpSchema>;
