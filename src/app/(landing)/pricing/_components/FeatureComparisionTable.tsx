import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Routes } from "@/constants/routes";
import { setLocalPlan } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
const pricingFeatures = {
  caption: "Plan Feature Comparison",
  columns: ["Features", "Basic", "Premium", "Executive", "Elite"],
  rows: [
    {
      feature: "Medical Departments",
      values: [
        "—",
        "3 Medical Departments",
        "9 Medical Departments",
        "99 Medical Departments",
      ],
      category: 1,
    },
    {
      feature: "Smart stock management",
      values: ["✔", "✔", "✔", "✔"],
      category: 1,
    },
    {
      feature: "Role-based staff access",
      values: ["✔", "✔", "✔", "✔"],
      category: 1,
    },
    {
      feature: "Automated inventory tracking",
      values: ["✔", "✔", "✔", "✔"],
      category: 1,
    },
    {
      feature: "Custom dashboards & insights",
      values: ["—", "—", "✔", "✔"],
      category: 1,
    },
    {
      feature: "Patient records management",
      values: ["✔", "✔", "✔", "✔"],
      category: 1,
    },
    {
      feature: "Secure private database",
      values: ["—", "✔", "✔", "✔"],
      category: 1,
    },
    {
      feature: "Multi-branch support",
      values: ["1 Branch", "1 Branch", "3 Branches", "9 Branches"],
      category: 1,
    },
    {
      feature: "3D rack visualization",
      values: ["—", "Up to 5 Racks", "Up to 9 Racks", "Unlimited"],
      category: 1,
    },
    {
      feature: "Custom branded access URL",
      values: ["—", "—", "—", "✔"],
      category: 1,
    },
    {
      feature: "Barcode-enabled drug labeling",
      values: ["—", "✔", "✔", "✔"],
      category: 1,
    },
    {
      feature: "Rack label printing",
      values: ["—", "✔", "✔", "✔"],
      category: 1,
    },
    {
      feature: "Patient loyalty card printing",
      values: ["—", "—", "✔", "✔"],
      category: 1,
    },
    {
      feature: "Standard support (12/7)",
      values: ["✔", "✔", "✔", "✔"],
      category: 1,
    },
    {
      feature: "Priority support (24/7)",
      values: ["—", "—", "—", "✔"],
      category: 1,
    },
    {
      feature: "Exportable reports",
      values: ["✔", "✔", "✔", "✔"],
      category: 2,
    },
    {
      feature: "Automated scheduled reports",
      values: ["—", "—", "—", "✔"],
      category: 2,
    },
    {
      feature: "Developer API access",
      values: ["—", "—", "—", "✔"],
      category: 2,
    },
    {
      feature: "Advanced analytics & reporting",
      values: ["—", "—", "✔", "✔"],
      category: 2,
    },
    {
      feature: "Saved report library",
      values: ["—", "—", "—", "✔"],
      category: 2,
    },
    {
      feature: "Full patient history",
      values: ["—", "—", "✔", "✔"],
      category: 2,
    },
    {
      feature: "Custom patient fields",
      values: ["—", "—", "✔", "✔"],
      category: 2,
    },
    {
      feature: "Enterprise-grade secure login (SSO/SAML)",
      values: ["—", "—", "—", "✔"],
      category: 3,
    },
    {
      feature: "Advanced role permissions",
      values: ["—", "—", "✔", "✔"],
      category: 3,
    },
    {
      feature: "Activity audit logs",
      values: ["—", "—", "✔", "✔"],
      category: 3,
    },
    {
      feature: "Complete data history",
      values: ["—", "—", "✔", "✔"],
      category: 3,
    },
  ],
};

export default function FeatureComparisonTable({
  category = 1,
}: {
  category?: number;
}) {
  const router = useRouter();
  return (
    <Table className="font-medium">
      {category === 3 ? (
        <TableCaption className="mb-3">{pricingFeatures.caption}</TableCaption>
      ) : null}
      <TableHeader>
        <TableRow className="border-b-primary/20 hover:bg-transparent">
          <TableHead className="text-left font-medium">
            {pricingFeatures.columns[category - 1]}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className=" bg-card-radial-reversed">
        {pricingFeatures.rows
          .filter((ro) => ro.category === category)
          .map((row, idx) => (
            <TableRow
              className="border-b-primary/20 hover:bg-primary/4 group"
              key={idx}
            >
              <TableCell className="text-left w-[20%] text-foreground ">
                {row.feature}
              </TableCell>
              {row.values.map((val, i) => (
                <TableCell
                  key={i}
                  className="text-left w-[20%] px-6 py-4 text-foreground"
                >
                  {val === "✔" ? (
                    <CheckCircle2 className="w-5 h-5 text-primary inline-block" />
                  ) : (
                    val
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
      {category === 3 ? (
        <TableFooter className="bg-transparent ">
          <TableRow className="border-b-primary/20  hover:bg-transparent">
            <TableCell></TableCell>
            <TableCell className="py-8">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-foreground  "
                onClick={() => {
                  setLocalPlan(2);
                  router.push(Routes.sign_up);
                }}
              >
                Choose Basic
              </Button>
            </TableCell>
            <TableCell>
              <Button
                size="lg"
                variant="outline"
                className="w-full  text-foreground "
                onClick={() => {
                  setLocalPlan(3);
                  router.push(Routes.sign_up);
                }}
              >
                Choose Premium
              </Button>
            </TableCell>
            <TableCell>
              <Button
                size="lg"
                variant="outline"
                className="w-full  text-foreground "
                onClick={() => {
                  setLocalPlan(4);
                  router.push(Routes.sign_up);
                }}
              >
                Choose Executive
              </Button>
            </TableCell>
            <TableCell>
              <Button
                size="lg"
                variant="outline"
                className="w-full text-foreground "
              >
                Choose Elite
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      ) : null}
    </Table>
  );
}
