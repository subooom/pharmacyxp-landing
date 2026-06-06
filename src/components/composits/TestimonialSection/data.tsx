import { Testimonial } from "./Card";

export const testimonials: Testimonial[] = [
  {
    id: 1,
    user: {
      avatar: "https://picsum.photos/seed/12/100/100",
      name: "MedicineXP",
      position: "User Research",
      stars: 5,
    },
    createdAgo: "1 months ago",
    message: "Much simpler than the heavy hospital software we tried before.",
  },
  {
    id: 2,
    user: {
      avatar: "https://picsum.photos/seed/13/100/100",
      name: "Pharmacy Owner",
      position: "Early User",
      stars: 5,
    },
    createdAgo: "3 months ago",
    message: "Patient loan tracking used to take forever, shuffling through ledgers. Now it's instant. Cut my work time significantly.",
  }
];
