export const FAQ_CATEGORIES = {
  GENERAL: "general", // General Questions
  ACCOUNT_PROFILE: "account_profile", // Account & Profile
  MEMBERSHIP_REDEMPTION: "membership_redemption", // Membership & Drink Redemption
  CAFE_MANAGEMENT: "cafe_management", // Cafe & Shop Management
  BILLING_SUBSCRIPTION: "billing_subscription", // Billing & Subscriptions
  SECURITY_PRIVACY: "security_privacy", // Security & Privacy
  TECHNICAL_SUPPORT: "technical_support", // Technical & Support
} as const;

export type TFaqCategory = (typeof FAQ_CATEGORIES)[keyof typeof FAQ_CATEGORIES];

export const FAQ_CATEGORY_OPTIONS: { label: string; value: TFaqCategory }[] = [
  { label: "General Questions", value: FAQ_CATEGORIES.GENERAL },
  { label: "Account & Profile", value: FAQ_CATEGORIES.ACCOUNT_PROFILE },
  {
    label: "Membership & Drink Redemption",
    value: FAQ_CATEGORIES.MEMBERSHIP_REDEMPTION,
  },
  { label: "Cafe & Shop Management", value: FAQ_CATEGORIES.CAFE_MANAGEMENT },
  {
    label: "Billing & Subscriptions",
    value: FAQ_CATEGORIES.BILLING_SUBSCRIPTION,
  },
  { label: "Security & Privacy", value: FAQ_CATEGORIES.SECURITY_PRIVACY },
  { label: "Technical & Support", value: FAQ_CATEGORIES.TECHNICAL_SUPPORT },
];

export const FAQ_CATEGORY_LABELS: Record<string, string> = {
  [FAQ_CATEGORIES.GENERAL]: "General Questions",
  [FAQ_CATEGORIES.ACCOUNT_PROFILE]: "Account & Profile",
  [FAQ_CATEGORIES.MEMBERSHIP_REDEMPTION]: "Membership & Redemption",
  [FAQ_CATEGORIES.CAFE_MANAGEMENT]: "Cafe Management",
  [FAQ_CATEGORIES.BILLING_SUBSCRIPTION]: "Billing & Subscription",
  [FAQ_CATEGORIES.SECURITY_PRIVACY]: "Security & Privacy",
  [FAQ_CATEGORIES.TECHNICAL_SUPPORT]: "Technical & Support",
};
