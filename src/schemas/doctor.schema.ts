import { z } from "zod";
import { DOCTOR_TITLES } from "@/constants/doctor.constant";
import { requiredStringSchema } from "./required.schema";

export const phoneRegex = /^\+?\d{1,14}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;


export const createDoctorSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .refine(
      (val) => (DOCTOR_TITLES as readonly string[]).includes(val),
      "Please select a valid doctor title"
    ),
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name must not exceed 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(phoneRegex, "Please enter a valid phone number (e.g. 01793837034)"),
  password: requiredStringSchema('Password')
    .min(6, "Password must be at least 6 characters long")
    .max(60, "Password must not exceed 60 characters")
    .regex(
      passwordRegex,
      "Password must contain at least one letter and one number"
    ),
  specialization: z
    .string()
    .min(1, "Please select a valid specialization from the list"),
  bmdcNumber: requiredStringSchema("BMDC Number"),
  designation: requiredStringSchema("Designation"),
  education: requiredStringSchema("Education"),
  consultationFee: z
    .string()
    .min(1, "Consultation fee is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) >= 0,
      "Fee must be a non-negative number"
    ),
  address: requiredStringSchema("Address"),
  experience: requiredStringSchema("Experience"),
  about: requiredStringSchema("About"),
  qualifications: requiredStringSchema("Qualifications"),
  status: z.enum(["draft", "published"]).optional(),
});

export type TCreateDoctorFormValues = z.infer<typeof createDoctorSchema>;
