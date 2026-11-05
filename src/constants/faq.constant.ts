export const FAQ_CATEGORIES = {
  GENERAL: "general",
  SECURITY_PRIVACY: "security_privacy",
  EMERGENCY_SUPPORT: "emergency_support",
  ACCOUNT_PROFILE: "account_profile",
  PAYMENTS_BILLING: "payments_billing",
  AGENTS_PARTNERS: "agents_partners",
  MEMBERSHIP_REDEMPTION: "membership_redemption",
  CAFE_MANAGEMENT: "cafe_management",
  BILLING_SUBSCRIPTION: "billing_subscription",
  TECHNICAL_SUPPORT: "technical_support",
} as const;

export type TFaqCategory = (typeof FAQ_CATEGORIES)[keyof typeof FAQ_CATEGORIES];

export const FAQ_CATEGORY_OPTIONS: { label: string; value: string }[] = [
  { label: "General Questions", value: FAQ_CATEGORIES.GENERAL },
  { label: "Security & Privacy", value: FAQ_CATEGORIES.SECURITY_PRIVACY },
  { label: "Emergency & Support", value: FAQ_CATEGORIES.EMERGENCY_SUPPORT },
  { label: "Account & Profile", value: FAQ_CATEGORIES.ACCOUNT_PROFILE },
  { label: "Payments & Billing", value: FAQ_CATEGORIES.PAYMENTS_BILLING },
  { label: "Agents & Partners", value: FAQ_CATEGORIES.AGENTS_PARTNERS },
];

export const FAQ_CATEGORY_LABELS: Record<string, string> = {
  [FAQ_CATEGORIES.GENERAL]: "General",
  [FAQ_CATEGORIES.SECURITY_PRIVACY]: "Security & Privacy",
  [FAQ_CATEGORIES.EMERGENCY_SUPPORT]: "Emergency & Support",
  [FAQ_CATEGORIES.ACCOUNT_PROFILE]: "Account & Profile",
  [FAQ_CATEGORIES.PAYMENTS_BILLING]: "Payments & Billing",
  [FAQ_CATEGORIES.AGENTS_PARTNERS]: "Agents & Partners",
  [FAQ_CATEGORIES.MEMBERSHIP_REDEMPTION]: "Membership & Redemption",
  [FAQ_CATEGORIES.CAFE_MANAGEMENT]: "Cafe Management",
  [FAQ_CATEGORIES.BILLING_SUBSCRIPTION]: "Billing & Subscription",
  [FAQ_CATEGORIES.TECHNICAL_SUPPORT]: "Technical & Support",
};
