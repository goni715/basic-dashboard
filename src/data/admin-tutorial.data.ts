import { IAdminTutorialStat, IAdminTutorial } from "@/types/admin-tutorial.type";

export const DUMMY_ADMIN_TUTORIAL_STATS: IAdminTutorialStat[] = [
  { title: "Total Tutorials", value: "4", description: "All tutorials" },
  { title: "Published Tutorials", value: "3", description: "Visible in patient app" },
  { title: "Featured Tutorials", value: "1", description: "Highlighted" },
  { title: "Draft Tutorials", value: "1", description: "Need review" },
];

export const DUMMY_ADMIN_TUTORIALS: IAdminTutorial[] = [
  {
    id: "1",
    title: "Complete Medical Travel Guide 2026",
    category: "Travel Tips",
    duration: "12:30 mins",
    views: "2.5k",
    featured: true,
    status: "Published",
    lastUpdated: "May 12, 2026",
  },
  {
    id: "2",
    title: "How to Book International Hospital Appointment",
    category: "Booking Guide",
    duration: "5:30 mins",
    views: "2.5k",
    featured: false,
    status: "Published",
    lastUpdated: "May 10, 2026",
  },
  {
    id: "3",
    title: "Understanding Your Medical Report",
    category: "Consultation Tips",
    duration: "8:15 mins",
    views: "1.8k",
    featured: false,
    status: "Published",
    lastUpdated: "May 8, 2026",
  },
  {
    id: "4",
    title: "Medicine Purchasing and Delivery Process",
    category: "Medicine Guide",
    duration: "6:45 mins",
    views: "1.2k",
    featured: false,
    status: "Draft",
    lastUpdated: "—",
  },
];
