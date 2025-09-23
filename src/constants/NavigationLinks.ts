import { Routes } from "./routes";

const NavigationLinks: NavigationLink[] = [
  {
    label: "Home",
    href: Routes.home,
  },
  {
    label: "Features",
    href: Routes.features,
  },
  {
    label: "Pricing",
    href: Routes.pricing,
  },
  {
    label: "Contact",
    href: Routes.contact,
  },
];

export default NavigationLinks;

export type NavigationLink = {
  label: string;
  href: string;
  external?: boolean;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  children?: NavigationLink[];
};
