import { IAdminMedicineStat, IAdminMedicine } from "@/types/admin-medicine.type";

export const DUMMY_ADMIN_MEDICINE_STATS: IAdminMedicineStat[] = [
  { title: "Total Medicines", value: "4", description: "All medicine records" },
  { title: "Published Medicines", value: "3", description: "Visible in patient app" },
  { title: "Available Medicines", value: "3", description: "In stock" },
  { title: "Out of Stock", value: "1", description: "Needs update" },
];

export const DUMMY_ADMIN_MEDICINES: IAdminMedicine[] = [
  {
    id: "1",
    name: "Atorvastatin 20mg",
    purpose: "Cholesterol Management",
    genericName: "Atorvastatin Calcium",
    usage: "Cholesterol Management",
    country: "Thailand",
    alternatives: ["Lipitor", "Sortis"],
    price: "$",
    stock: "Available",
    status: "Published",
  },
  {
    id: "2",
    name: "Metformin 500mg",
    purpose: "Diabetes Control",
    genericName: "Metformin Hydrochloride",
    usage: "Diabetes Control",
    country: "India",
    alternatives: ["Glucophage", "Siofor"],
    price: "$",
    stock: "Available",
    status: "Published",
  },
  {
    id: "3",
    name: "Amlodipine 5mg",
    purpose: "Blood Pressure",
    genericName: "Amlodipine Besylate",
    usage: "Blood Pressure",
    country: "Thailand",
    alternatives: ["Norvasc", "Amlosafe"],
    price: "$",
    stock: "Out of Stock",
    status: "Draft",
  },
  {
    id: "4",
    name: "Omeprazole 20mg",
    purpose: "Gastric Problems",
    genericName: "Omeprazole",
    usage: "Gastric Problems",
    country: "Singapore",
    alternatives: ["Prilosec", "Losec"],
    price: "$$",
    stock: "Available",
    status: "Published",
  },
];
