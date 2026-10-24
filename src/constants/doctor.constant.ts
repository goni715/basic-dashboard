export const DOCTOR_TITLES = [
  "Dr.",
  "Prof. Dr.",
  "Assoc. Prof. Dr.",
  "Asst. Prof. Dr.",
] as const;

export const DOCTOR_TITLE_OPTIONS = DOCTOR_TITLES.map((title) => ({
  label: title,
  value: title,
}));

export const DOCTOR_SPECIALIZATIONS = [
  "Cancer",
  "Cardiovascular Surgery",
  "Cardiology",
  "Colorectal Surgery (Piles)",
  "Dentistry",
  "Dermatology",
  "Diabetes & Hormone",
  "ENT (Ear, Nose & Throat)",
  "Ophthalmology",
  "Gastroenterology",
  "General Physician",
  "General Practitioner",
  "Surgery",
  "Gynecology",
  "Hematology",
  "Medicine",
  "Nephrology",
  "Neurosurgery",
  "Nutrition",
  "Oncology (Cancer)",
  "Orthopedics",
  "Pain Medicine",
  "Pediatrics",
  "Physical Medicine",
  "Physiotherapy",
  "Plastic Surgery",
  "Psychiatry",
  "Asthma & Chest Disease",
  "Skin, VD & Sexual Health",
  "Urology",
  "Vascular Disease",
] as const;

export const DOCTOR_SPECIALIZATION_OPTIONS = DOCTOR_SPECIALIZATIONS.map(
  (spec) => ({
    label: spec,
    value: spec,
  })
);

export const DOCTOR_STATUS_OPTIONS = [
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Archive", value: "archive" },
] as const;
