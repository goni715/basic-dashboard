import { z } from "zod";
import { requiredStringSchema } from "./required.schema";

export const phoneRegex = /^\+?\d{1,14}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

export const createAgentSchema = z.object({
  fullName: requiredStringSchema("Full name")
    .max(100, "Full name must not exceed 100 characters"),
  agencyName: requiredStringSchema("Agency name")
    .max(120, "Agency name must not exceed 120 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid phone number (e.g. 01755555555)"),
  password: requiredStringSchema("Password")
    .min(6, "Password must be at least 6 characters long")
    .max(60, "Password must not exceed 60 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one letter and one number (e.g. 123456a)"
    ),
});

export type TCreateAgentFormValues = z.infer<typeof createAgentSchema>;
