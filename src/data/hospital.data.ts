import { IHospital } from "@/types/hospital.type";

export const DUMMY_HOSPITALS: IHospital[] = [
  {
    id: "1",
    name: "Bangkok International Hospital",
    location: "Bangkok, Thailand",
    country: "Thailand",
    city: "Bangkok",
    specialties: ["Cardiology", "Neurology"],
    moreSpecialties: "+1",
    rating: 4.8,
    price: "$$",
    bengali: true,
    status: "Published",
  },
  {
    id: "2",
    name: "Apollo Hospitals Chennai",
    location: "Chennai, India",
    country: "India",
    city: "Chennai",
    specialties: ["Oncology", "Cardiology"],
    moreSpecialties: "+1",
    rating: 4.7,
    price: "$",
    bengali: true,
    status: "Published",
  }
];
