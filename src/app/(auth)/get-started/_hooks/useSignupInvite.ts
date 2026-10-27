import { useCallback, useState } from "react";
import { AxiosError } from "axios";
import Api from "@/lib/api";
import { useSignUpStore } from "@/store/sing-up.store";
import { matchRegion } from "../_utils/region";

// What the server knows about the pharmacy from the rep's visit (any of it may be missing)
export interface SignupPrefill {
  token: string;
  coupon_code: string | null;
  rep_name: string | null;
  admin_name: string | null;
  admin_contact: string | null;
  admin_email: string | null;
  organization_name: string | null;
  organization_contact: string | null;
  organization_pan_number: string | null;
  organization_address: {
    line_3_area_locality: string | null;
    city: string | null;
    district: string | null;
    state_province_county: string | null;
    country: string | null;
  };
  plan_id: number | null;
}

// Only the values the server actually has, so nothing the pharmacy typed is cleared
const present = <T extends Record<string, unknown>>(
  values: T,
): { [K in keyof T]?: NonNullable<T[K]> } =>
  Object.fromEntries(
    Object.entries(values).filter(([, v]) => v !== null && v !== undefined && v !== ""),
  ) as { [K in keyof T]?: NonNullable<T[K]> };

/**
 * Fills the sign-up form from a rep's visit: the rep's personal link (?invite=<token>)
 * or the rep's code plus the pharmacy's PAN.
 */
export function useSignupInvite() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const apply = useCallback((prefill: SignupPrefill) => {
    const { formData, updateFormData, updateOrganizationAddress, setInvite, goToPage, page } =
      useSignUpStore.getState();
    const address = prefill.organization_address || {};
    const country = address.country || "NP";

    // Helper: only use the incoming value if the current value is empty
    const merge = (current: any, incoming: any) => {
      // If current has a value, keep it. Otherwise use incoming.
      if (current !== undefined && current !== null && current !== "") {
        return current;
      }
      return incoming;
    };

    updateFormData(
      present({
        admin_name: merge(formData.admin_name, prefill.admin_name),
        admin_contact: merge(formData.admin_contact, prefill.admin_contact),
        admin_email: merge(formData.admin_email, prefill.admin_email),
        organization_name: merge(formData.organization_name, prefill.organization_name),
        organization_contact: merge(formData.organization_contact, prefill.organization_contact),
        organization_pan_number: merge(formData.organization_pan_number, prefill.organization_pan_number),
        plan_id: merge(formData.plan_id, prefill.plan_id),
        coupon_code: merge(formData.coupon_code, prefill.coupon_code),
        lead_token: prefill.token,
      }),
    );
    updateOrganizationAddress(
      present({
        country: merge(formData.organization_address?.country, country),
        state_province_county: merge(
          formData.organization_address?.state_province_county,
          matchRegion(country, address.state_province_county)
        ),
        city: merge(
          formData.organization_address?.city,
          address.city || address.district
        ),
        line_3_area_locality: merge(
          formData.organization_address?.line_3_area_locality,
          address.line_3_area_locality
        ),
      }),
    );
    setInvite({ repName: prefill.rep_name });
    
    // Only jump to page 1 if user is still on the welcome page
    if (page === 0) {
      goToPage(1);
    }
  }, []);
  
  const handle = useCallback(
    async (request: Promise<{ data: SignupPrefill }>) => {
      setLoading(true);
      setError("");
      try {
        apply((await request).data);
        return true;
      } catch (err) {
        const response = (err as AxiosError<{ message?: string }>).response;
        setError(
          response?.status === 429
            ? "Too many tries. Wait a minute and try again."
            : response?.data?.message || "Something went wrong. Please try again.",
        );
        return false;
      } finally {
        setLoading(false);
      }
    },
    [apply],
  );

  const fromLink = useCallback(
    (token: string) => handle(Api.get(`/signup-invites/${encodeURIComponent(token)}`)),
    [handle],
  );

  const fromCodeAndPan = useCallback(
    (code: string, pan: string) =>
      handle(Api.post("/signup-invites/find", { code: code.trim(), pan: pan.trim() })),
    [handle],
  );

  return { loading, error, fromLink, fromCodeAndPan };
}
