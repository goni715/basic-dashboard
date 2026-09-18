import { IAdminFaq } from "@/types/admin-faq.type";

export const DUMMY_ADMIN_FAQS: IAdminFaq[] = [
  {
    id: "1",
    question: "How do I book an appointment with a doctor?",
    answer: "You can book an appointment by navigating to the 'Doctors' tab in the patient app, selecting your preferred doctor, choosing an available time slot, and confirming your booking.",
    category: "Appointments",
    status: "Published",
  },
  {
    id: "2",
    question: "What should I bring for my first hospital visit?",
    answer: "Please bring a valid ID, your previous medical records (if any), any current prescriptions, and your insurance information.",
    category: "General",
    status: "Published",
  },
  {
    id: "3",
    question: "How can I cancel or reschedule my appointment?",
    answer: "Go to your 'My Appointments' section in the app, select the upcoming appointment, and choose either 'Cancel' or 'Reschedule'. Note that cancellations must be made at least 24 hours in advance.",
    category: "Appointments",
    status: "Draft",
  },
  {
    id: "4",
    question: "Are online consultations available?",
    answer: "Yes, many of our doctors offer online video consultations. Look for the 'Video Consult' badge on a doctor's profile to book a virtual session.",
    category: "Consultations",
    status: "Published",
  },
];
