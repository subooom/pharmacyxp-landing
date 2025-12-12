import { IPGeolocation } from "@/hooks/useUserCity";
import { useSignUpStore } from "@/store/sing-up.store";
import { UploadedFile } from "./useSignUpValidation";

export interface OrganizationAddress {
  line_1_number_building: string;
  line_2_number_street: string;
  line_3_area_locality: string;
  city: string;
  zip_postcode: string;
  vdc_municipality: string;
  ward_number: string;
  state_province_county: string;
  country: string;
  data?: IPGeolocation | string;
}

export interface SignUpState {
  admin_name: string;
  admin_email: string;
  admin_contact: string;
  organization_name: string;
  organization_contact: string;
  organization_logo: File | undefined;
  organization_pan_number: string;
  organization_description: string;
  organization_address: OrganizationAddress;
  plan_id?: number;
  service_ids: number[];
  password: string;
  confirm_password: string;
  coupon_code: string;
}

export type UpdateStateType = (
  key: keyof SignUpState,
  value: string | number | number[],
) => void;

export const useSignUpState = () => {
  const {
    formData,
    updateFormData,
    updateOrganizationAddress: storeUpdateOrganizationAddress,
  } = useSignUpStore();

  const updateState: UpdateStateType = (key, value) => {
    updateFormData({ [key]: value });
  };

  const updateOrganizationAddress = (
    key: keyof OrganizationAddress,
    value: string,
  ) => {
    storeUpdateOrganizationAddress({ [key]: value });
  };

  return {
    state: formData,
    updateState,
    updateOrganizationAddress,
  };
};
