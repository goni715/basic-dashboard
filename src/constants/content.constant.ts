export const CONTENT_TYPE = {
  PRIVACY_POLICY: "privacy-policy",
  TERMS_CONDITION: "terms-condition",
  ABOUT_US: "about-us",
} as const;

export type TContentType =
  | (typeof CONTENT_TYPE)[keyof typeof CONTENT_TYPE]
  | "privacy-policy"
  | "terms-condition"
  | "about-us";
