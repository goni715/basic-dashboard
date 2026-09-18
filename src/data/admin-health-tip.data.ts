import { IAdminHealthTipStat, IAdminHealthTip } from "@/types/admin-health-tip.type";

export const DUMMY_ADMIN_HEALTH_TIP_STATS: IAdminHealthTipStat[] = [
  { title: "Total Health Tips", value: "4", description: "All articles" },
  { title: "Published Tips", value: "3", description: "Visible in patient app" },
  { title: "Featured Tips", value: "1", description: "Highlighted" },
  { title: "Draft Tips", value: "1", description: "Need review" },
];

export const DUMMY_ADMIN_HEALTH_TIPS: IAdminHealthTip[] = [
  {
    id: "1",
    title: "Summer Health: Stay Hydrated and Beat the He...",
    category: "Seasonal",
    language: "Bengali + English",
    readTime: "5 min read",
    featured: true,
    publishDate: "May 10, 2026",
    status: "Published",
  },
  {
    id: "2",
    title: "Healthy Heart Diet Plan for Bangladeshi Cuisine",
    category: "Diet",
    language: "Bengali + English",
    readTime: "7 min read",
    featured: false,
    publishDate: "May 9, 2026",
    status: "Published",
  },
  {
    id: "3",
    title: "Prenatal Care: Essential Guide for Expecting Mo...",
    category: "Women Health",
    language: "English",
    readTime: "10 min read",
    featured: false,
    publishDate: "—",
    status: "Draft",
  },
  {
    id: "4",
    title: "Child Nutrition: Building Healthy Eating Habits",
    category: "Child Health",
    language: "Bengali + English",
    readTime: "6 min read",
    featured: false,
    publishDate: "May 7, 2026",
    status: "Published",
  },
];
