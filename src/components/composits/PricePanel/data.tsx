export interface Plan {
  id: number;
  name: string;
  image: string;
  price_for_first_year: number;
  price_per_year: number;
  features: string;
  created_at: string;
  updated_at: string;
  number_of_services: number;
}
export const backupPlans: Plan[] = [
  {
    id: 1,
    name: "Basic",
    image:
      "https://medicinexp-staging.com/plans/February2021/as8d3fdIoPII3opxzSqqw3.png",
    price_for_first_year: 10000,
    price_per_year: 10656,
    features:
      "\r\n                <p>3-Month Free Trial included</p>\r\n                <p>Secure private database</p>\r\n                <pResource Management Tools</p>\r\n                <p>Simple bill generation</p>\r\n                <p>No medical departments</p>\r\n            ",
    created_at: "2025-05-04T12:32:21.000000Z",
    updated_at: "2025-05-04T12:32:21.000000Z",
    number_of_services: 0,
  },
  {
    id: 2,
    name: "Premium",
    image:
      "https://medicinexp-staging.com/plans/February2021/Egzbh3FSbqxlokjw9pUz.png",
    price_for_first_year: 30000,
    price_per_year: 11988,
    features:
      "\r\n                <p>3-Month Free Trial included</p>\r\n                <p>Secure private database</p>\r\n                <p>Resource Management Tools</p>\r\n                <p>Simple bill generation</p>\r\n                <p>3 medical departments</p>\r\n            ",
    created_at: "2025-05-04T02:46:08.000000Z",
    updated_at: "2025-05-04T02:46:08.000000Z",
    number_of_services: 3,
  },
  {
    id: 3,
    name: "Executive",
    image:
      "https://medicinexp-staging.com/plans/February2021/fyDM5YPV5FGaj4zLoAiK.png",
    price_for_first_year: 50000,
    price_per_year: 24000,
    features:
      "\r\n                <p>3-Month Free Trial included</p>\r\n                <p>Secure private database</p>\r\n                <p>Resource Management Tools</p>\r\n                <p>Simple bill generation</p>\r\n                <p>9 medical departments</p>\r\n            ",
    created_at: "2025-05-04T02:46:08.000000Z",
    updated_at: "2025-05-04T02:46:08.000000Z",
    number_of_services: 9,
  },
  {
    id: 4,
    name: "Elite",
    image:
      "https://medicinexp-staging.com/plans/February2021/ktYkhkrZZjDvG99t8l6C.png",
    price_for_first_year: 60000,
    price_per_year: 48000,
    features:
      "\r\n                <p>3-Month Free Trial included</p>\r\n                <p>Secure private database</p>\r\n                <p>Resource Management Tools</p>\r\n                <p>Simple bill generation</p>\r\n                <p>99 medical departments</p>\r\n            ",
    created_at: "2025-05-04T02:46:08.000000Z",
    updated_at: "2025-05-04T02:46:08.000000Z",
    number_of_services: 99,
  },
];
