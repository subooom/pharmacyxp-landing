import React, { useCallback, useEffect, useMemo } from "react";
import StepPageLayout from "@/layouts/StepPageLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserAddress } from "@/hooks/useUserCity";
import { Button } from "@/components/ui/button";
import { BotIcon } from "lucide-react";
import Spinner from "@/components/ui/spinner";
import CountrySelect from "@/components/ui/country-select";
import RegionSelect from "@/components/ui/region-select";
import { OrganizationAddress as OrganizationAddressInterface } from "../_hooks/useSignUpState";
import { useSignUpStore } from "@/store/sing-up.store";

const OrganizationAddress = () => {
  const {
    updateOrganizationAddress,
    formData: {
      organization_address: {
        line_1_number_building,
        line_2_number_street,
        line_3_area_locality,
        city,
        ward_number,
        zip_postcode,
        state_province_county,
        country,
        vdc_municipality,
      },
    },
    errors,
  } = useSignUpStore();

  const { address, fetchAddress, loading, success } = useUserAddress();

  // Memoize field values to prevent unnecessary re-renders
  const fieldValues: OrganizationAddressInterface = useMemo(
    () => ({
      line_1_number_building,
      line_2_number_street,
      line_3_area_locality,
      city,
      ward_number,
      zip_postcode,
      state_province_county,
      country,
      vdc_municipality,
    }),
    [
      line_1_number_building,
      line_2_number_street,
      line_3_area_locality,
      city,
      ward_number,
      zip_postcode,
      state_province_county,
      country,
      vdc_municipality,
    ],
  );

  // Memoize the update function
  const handleUpdate = useCallback(
    (id: keyof OrganizationAddressInterface, value: string) => {
      updateOrganizationAddress({ [id]: value });
    },
    [updateOrganizationAddress],
  );

  // Optimized renderField with memoization
  const renderField = useCallback(
    (
      id: keyof OrganizationAddressInterface,
      label: string,
      type: string = "text",
    ) => {
      const value = fieldValues[id];
      const error = errors?.[id];

      return (
        <div className="space-y-2">
          <Label htmlFor={id}>{label}</Label>
          <Input
            id={id}
            value={value?.toString()}
            onChange={({ target }) => handleUpdate(id, target.value)}
            type={type}
            className={error ? "border-destructive dark:destructive/70" : ""}
          />
          {error && (
            <p
              className="text-sm text-destructive dark:destructive"
              id={`${id}-error-message`}
            >
              {error}
            </p>
          )}
        </div>
      );
    },
    [fieldValues, errors, handleUpdate],
  );

  // Memoize auto-fill logic
  const autoFillAddress = useCallback(() => {
    if (!address) return;

    const updates: Partial<OrganizationAddressInterface> = {};

    if (address.city && !city) updates.city = address.city;
    if (address.postal && !zip_postcode) updates.zip_postcode = address.postal;
    if (address.region && !state_province_county)
      updates.state_province_county = address.region;
    if (address.country_code && !country)
      updates.country = address.country_code;
    updates.data = JSON.stringify(address);

    if (Object.keys(updates).length > 0) {
      updateOrganizationAddress(updates);
    }
  }, [
    address,
    city,
    zip_postcode,
    state_province_county,
    country,
    updateOrganizationAddress,
  ]);

  // Optimized useEffect for initial load
  useEffect(() => {
    const shouldFetchAddress = !address?.city && !loading;
    if (shouldFetchAddress) {
      fetchAddress();
    }
  }, [address?.city, loading, fetchAddress]);

  // Optimized useEffect for auto-fill
  useEffect(() => {
    if (address?.city) {
      autoFillAddress();
    }
  }, [address, autoFillAddress]);
  return (
    <StepPageLayout title="Organization Address" subtitle="">
      <Button
        variant="outline"
        onClick={() => (success ? autoFillAddress() : fetchAddress())}
        className="max-w-xs mb-4"
      >
        {loading ? <Spinner /> : <BotIcon />}
        {loading ? "Auto Filling" : success ? "Auto Filled" : "Auto Fill"}
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="space-y-2">
          <Label htmlFor={"countrySelect"}>
            Country *{loading && <Spinner />}
          </Label>
          <CountrySelect
            priorityOptions={["np", "in", "us"]}
            id={"countrySelect"}
            onChange={(val) => updateOrganizationAddress({ country: val })}
            defaultValue={country}
          />
          {errors?.country && (
            <p
              className="text-sm text-destructive dark:destructive"
              id={`country-error-message`}
            >
              {errors.country}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={"regionSelect"}>
            Region *{loading && <Spinner />}
          </Label>
          <RegionSelect
            countryCode={country}
            defaultValue={state_province_county}
            onChange={(val) =>
              updateOrganizationAddress({ state_province_county: val })
            }
          />
          {errors?.state_province_county && (
            <p
              className="text-sm text-destructive dark:destructive"
              id={`country-error-message`}
            >
              {errors.state_province_county}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor={"city"}>City *{loading && <Spinner />}</Label>
          <Input
            id={"city"}
            value={city}
            onChange={({ target }) =>
              updateOrganizationAddress({ city: target.value })
            }
            type={"text"}
            className={
              errors?.["city"] ? "border-destructive dark:destructive/70" : ""
            }
          />
          {errors?.["city"] && (
            <p
              className="text-sm text-destructive dark:destructive"
              id={`city-error-message`}
            >
              {errors["city"]}
            </p>
          )}
        </div>
        {renderField("vdc_municipality", "Municipality *", "text")}
        {renderField("line_3_area_locality", "Line 3 Area Locality *", "text")}
        {renderField("ward_number", "Ward Number *", "number")}
        {renderField(
          "line_1_number_building",
          "Line 1 Building Number",
          "text",
        )}
        {renderField("line_2_number_street", "Line 2 Street Name", "text")}
        {renderField("zip_postcode", "Zip/Postcode", "number")}
      </div>
    </StepPageLayout>
  );
};

export default OrganizationAddress;
