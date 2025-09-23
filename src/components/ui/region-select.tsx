import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { filterRegions } from "@/lib/helpers";
import { cn } from "@/lib/utils";

//@ts-ignore
import countryRegionData from "country-region-data/dist/data-umd";
import { useEffect, useState } from "react";

export interface Region {
  name: string;
  shortCode: string;
}

export interface CountryRegion {
  countryName: string;
  countryShortCode: string;
  regions: Region[];
}

interface RegionSelectProps {
  countryCode: string;
  priorityOptions?: string[];
  whitelist?: string[];
  blacklist?: string[];
  onChange?: (value: string) => void;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
}

function RegionSelect({
  countryCode,
  defaultValue,
  priorityOptions = [],
  whitelist = [],
  blacklist = [],
  onChange = () => {},
  className,
  placeholder = "Region",
}: RegionSelectProps) {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    const regions = countryRegionData.find(
      (country: CountryRegion) => country.countryShortCode === countryCode,
    );

    if (regions) {
      setRegions(
        filterRegions(regions.regions, priorityOptions, whitelist, blacklist),
      );
    }
  }, [countryCode]);

  return (
    <Select
      onValueChange={(value: string) => {
        onChange(value);
      }}
      value={defaultValue}
    >
      <SelectTrigger className={cn(className, "w-full")}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {regions.map(({ name, shortCode }) => (
          <SelectItem key={shortCode} value={name}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default RegionSelect;
