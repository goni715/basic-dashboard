import { IDoctor } from "@/types/doctor.type";

export const DUMMY_DOCTORS: IDoctor[] = [
    {
        id: "1",
        name: "Dr. Arjun Mehta",
        email: "arjun.mehta@gmail.com",
        specialty: "Cardiology",
        hospital: "Bangkok Heart Hospital",
        location: "Bangkok, Thailand",
        experience: "15 years",
        fee: "$120",
        languages: ["English", "Bengali"],
        moreLangs: "+1",
        status: "Published",
        avatar: "A",
        rating: 4.9,
        reviews: 312,
        about: "Dr. Arjun Mehta is a senior cardiologist with 15 years of experience in interventional cardiology and cardiac surgery.",
        education: [
            "MBBS - All India Institute of Medical Sciences",
            "MD Cardiology - Bangkok Medical University",
            "Fellowship in Interventional Cardiology"
        ],
        expertise: ["Heart Surgery", "Angioplasty", "Cardiac Care", "Bypass Surgery", "Valve Replacement"]
    },
    {
        id: "2",
        name: "Dr. Priya Sharma",
        email: "priya.sharma@gmail.com",
        specialty: "IVF & Fertility",
        hospital: "Apollo Fertility Center",
        location: "Chennai, India",
        experience: "12 years",
        fee: "$95",
        languages: ["English", "Bengali"],
        moreLangs: "+1",
        status: "Published",
        avatar: "P",
        rating: 4.8,
        reviews: 245,
        about: "Dr. Priya Sharma specializes in IVF treatments with a high success rate.",
        education: [
            "MBBS - Madras Medical College",
            "MS Obstetrics & Gynecology - AIIMS"
        ],
        expertise: ["IVF", "IUI", "High-risk Pregnancy"]
    },
    {
        id: "3",
        name: "Dr. Sophia Rahman",
        email: "sophia.rahman@gmail.com",
        specialty: "Orthopedics",
        hospital: "United Hospital Dhaka",
        location: "Dhaka, Bangladesh",
        experience: "10 years",
        fee: "$65",
        languages: ["Bengali", "English"],
        moreLangs: "",
        status: "Draft",
        avatar: "S",
        rating: 4.7,
        reviews: 180,
        about: "Expert in joint replacement surgeries and sports injuries.",
        education: [
            "MBBS - Dhaka Medical College",
            "FCPS - Orthopedic Surgery"
        ],
        expertise: ["Joint Replacement", "Sports Injuries", "Arthroscopy"]
    }
];