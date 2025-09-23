import { useCallback, useState } from "react";
export interface IPGeolocation {
  ip: string;
  network: string;
  version: "IPv4" | "IPv6";
  city: string;
  region: string;
  region_code: string;
  country: string;
  country_name: string;
  country_code: string;
  country_code_iso3: string;
  country_capital: string;
  country_tld: string;
  continent_code: string;
  in_eu: boolean;
  postal: string | null;
  latitude: number;
  longitude: number;
  timezone: string;
  utc_offset: string;
  country_calling_code: string;
  currency: string;
  currency_name: string;
  languages: string;
  country_area: number;
  country_population: number;
  asn: string;
  org: string;
}

export const useUserAddress = () => {
  const [address, setAddress] = useState<IPGeolocation | null>(null);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const fetchAddress = useCallback(async () => {
    setLoading(true);
    try {
      let data = JSON.parse(localStorage.getItem("geo-location") || "{}");

      if (!data.country) {
        const res = await fetch("https://ipapi.co/json/");
        data = await res.json();
        localStorage.setItem(
          "geo-location",
          JSON.stringify(data as IPGeolocation),
        );
      }

      setAddress(data as IPGeolocation);
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      console.error("Failed to fetch IP location", err);
      setLoading(false);
      setSuccess(false);
      setError(err as string);
    }
  }, []);

  return { address, fetchAddress, setLoading, loading, success, error };
};
