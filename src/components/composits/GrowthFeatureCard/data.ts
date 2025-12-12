export interface Feature {
  id: number;
  title: string;
  subtitle: string;
  type:
    | "dashboard"
    | "roles"
    | "3d-rack"
    | "updates"
    | "early-alerts"
    | "call-support"
    | "income-expenditure"
    | "rack-intelligence"
    | "print-support"
    | "salary-management"
    | string;
}
export const data: Feature[] = [
  {
    id: 1,
    type: "dashboard",
    title: "Unified Dashboard",
    subtitle: "Control and monitor your entire business from one smart hub.",
  },
  {
    id: 2,
    type: "roles",
    title: "Advanced Role Management",
    subtitle: "Easily assign permissions and manage user access.",
  },
  {
    id: 4,
    type: "updates",
    title: "Regular Updates",
    subtitle: "Stay ahead with regular feature enhancements and fixes.",
  },
  {
    id: 6,
    type: "call-support",
    title: "Dedicated Call Support (12/7)",
    subtitle: "Talk to real humans when you need help—no robots involved.",
  },
  {
    id: 9,
    type: "salary-management",
    title: "Team Salary Tracker",
    subtitle: "Manually track team salaries with role-based access.",
  },
  {
    id: 3,
    type: "3d-rack",
    title: "Smart 3D Rack System",
    subtitle: "Visualize and organize your shop inventory with virtual racks.",
  },
  {
    id: 8,
    type: "income-expenditure",
    title: "Track Income & Expenses",
    subtitle: "Stay on top of your earnings and outflows with clear records.",
  },
  {
    id: 7,
    type: "print-support",
    title: "Smart Print Support",
    subtitle: "Generate clean, printable invoices in just a click.",
  },
  {
    id: 5,
    type: "early-alerts",
    title: "Smart Alerts",
    subtitle: "Get real-time notifications for low stock or expiring items.",
  },
  {
    id: 9,
    type: "rack-intelligence",
    title: "Automatic Rack Labelling",
    subtitle:
      "Optimize stock placement with color-coated, intelligent rack labels.",
  },
];

export const users = [
  {
    id: 1,
    avatar: "/assets/images/users/1.png",
    name: "Prakash Magar",
    role: "Admin",
  },
  {
    id: 2,
    avatar: "/assets/images/users/2.png",
    name: "Sunita Paudel",
    role: "Pharmacist",
  },
  {
    id: 3,
    avatar: "/assets/images/users/3.png",
    name: "Rajesh Khadka",
    role: "Lab Technician",
  },
];
