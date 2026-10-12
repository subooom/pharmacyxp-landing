//@ts-ignore
import countryRegionData from "country-region-data/dist/data-umd";
import { CountryRegion } from "@/components/ui/region-select";

// What reps type for Nepal's provinces, mapped to the region list's short codes
const NEPAL_ALIASES: Record<string, string> = {
  koshi: "1",
  "province 1": "1",
  "province no 1": "1",
  madhesh: "2",
  madhes: "2",
  bagmati: "3",
  gandaki: "4",
  lumbini: "5",
  karnali: "6",
  sudurpashchim: "7",
  sudurpaschim: "7",
  "far west": "7",
  "far western": "7",
};

/**
 * The region select's exact name for a province typed as free text ("Bagmati",
 * "bagmati pradesh", "3"), or "" when nothing matches so the pharmacy picks it.
 */
export function matchRegion(countryCode: string, typed?: string | null): string {
  if (!typed) return "";

  const country = (countryRegionData as CountryRegion[]).find(
    (c) => c.countryShortCode === countryCode,
  );
  if (!country) return "";

  const cleaned = typed
    .toLowerCase()
    .replace(/[.\-]/g, " ")
    .replace(/\b(province|pradesh)\b/g, "")
    .replace(/\s+/g, " ")
    .trim();
  if (!cleaned) return "";

  const shortCode = (countryCode === "NP" && NEPAL_ALIASES[cleaned]) || cleaned;
  const region =
    country.regions.find((r) => r.shortCode.toLowerCase() === shortCode) ||
    country.regions.find((r) => r.name.toLowerCase().includes(cleaned));

  return region ? region.name : "";
}
