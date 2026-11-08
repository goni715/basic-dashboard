import { z } from "zod";
import { requiredStringSchema } from "./required.schema";
import { HOSPITAL_COUNTRIES } from "@/constants/hospital.constant";

export const phoneRegex = /^\+?\d{1,14}$/;

export const createHospitalSchema = z.object({
  name: requiredStringSchema("Hospital name")
    .max(150, "Hospital name must not exceed 150 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .refine(
      (val) => (HOSPITAL_COUNTRIES as readonly string[]).includes(val),
      "Please select a valid country"
    ),
  address: requiredStringSchema("Address")
    .max(250, "Address must not exceed 250 characters"),
  contactNumber: requiredStringSchema("Contact number")
    .regex(
      phoneRegex,
      "Please enter a valid contact number (e.g., +1234567890 or 1234567890)"
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  website: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() === "" || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(val.trim()),
      {
        message: "Please enter a valid website URL (e.g. https://www.hospital.com)",
      }
    ),
  status: z.enum(["draft", "published", "archive"]).optional(),
});

export type TCreateHospitalFormValues = z.infer<typeof createHospitalSchema>;

export const updateHospitalSchema = z.object({
  name: requiredStringSchema("Hospital name")
    .max(150, "Hospital name must not exceed 150 characters"),
  country: z
    .string()
    .min(1, "Country is required")
    .refine(
      (val) => (HOSPITAL_COUNTRIES as readonly string[]).includes(val),
      "Please select a valid country"
    ),
  address: requiredStringSchema("Address")
    .max(250, "Address must not exceed 250 characters"),
  contactNumber: requiredStringSchema("Contact number")
    .regex(
      phoneRegex,
      "Please enter a valid contact number (e.g., +1234567890 or 1234567890)"
    ),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  website: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.trim() === "" || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(val.trim()),
      {
        message: "Please enter a valid website URL (e.g. https://www.hospital.com)",
      }
    ),
  status: z.enum(["draft", "published", "archive"]).optional(),
});

export type TUpdateHospitalFormValues = z.infer<typeof updateHospitalSchema>;
