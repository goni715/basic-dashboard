export const HOSPITAL_COUNTRIES = [
  "Bangladesh",
  "India",
  "Thailand",
  "Singapore",
  "Malaysia",
  "Turkey",
] as const;

export type THospitalCountry = (typeof HOSPITAL_COUNTRIES)[number];

export const HOSPITAL_COUNTRY_OPTIONS = HOSPITAL_COUNTRIES.map((c) => ({
  label: c,
  value: c,
}));

export const HOSPITAL_STATUS_OPTIONS = [
  { label: "Published", value: "published" },
  { label: "Draft", value: "draft" },
  { label: "Archive", value: "archive" },
] as const;

