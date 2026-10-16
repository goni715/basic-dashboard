import { z } from "zod";

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;


export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(60, "Password must not exceed 60 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one letter and one number",
    ),
  isRememberMe: z.boolean().optional(),
});

export type TLoginValues = z.infer<typeof loginSchema>;
