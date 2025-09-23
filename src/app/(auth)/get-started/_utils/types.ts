import { Dispatch, SetStateAction } from "react";
import { SignUpState } from "../_hooks/useSignUpState";
import { CouponCode } from "../_steps/6EmailConfirmation";
import { TimelineEvent } from "../_components/EventCard";

export type Service = {
  id: number;
  name: string;
  description: string;
};

export type Plan = {
  id: number;
  name: string;
  image?: string;
  number_of_services: number;
  price_for_first_year: number;
  price_per_year: number;
  features: string;
};

export type ChooseMedicalDepartmentsProps = {
  currentPlanId: number | string;
  services: Service[];
  servicesError?: string;
  servicesLoading: boolean;
  servicesSuccess: boolean;
  plans: Plan[];
  onChange: (selected: number[], planId: number) => void;
  errors?: {
    services?: string;
  };
  fetchServices: () => void;
};

export interface SignUpContextType {
  state: SignUpState;
  setPage: (page: number) => void;
  updateState: (
    key: keyof SignUpState,
    value: string | number | number[],
  ) => void;
  updateOrganizationAddress: (
    key: keyof SignUpState["organization_address"],
    value: string,
  ) => void;

  errors: Record<string, string>;
  setErrors: Dispatch<SetStateAction<Record<string, string>>>;

  isEmailVerified: boolean;
  setIsEmailVerified: (verified: boolean) => void;

  plans?: Plan[];
  plansLoading: boolean;
  plansSuccess: boolean;
  plansError: string;
  fetchPlans: () => void;

  services?: Service[];
  servicesLoading: boolean;
  servicesSuccess: boolean;
  servicesError: string;
  fetchServices: () => void;

  couponData?: CouponCode;
  couponCodeLoading: boolean;
  couponCodeSuccess: boolean;
  couponError: string;
  verifyCoupon: (code: string) => void;

  handleNext: () => void;
  handleCreateApplicationClicked: () => void;

  showEmailVerificationLoading: boolean;
  uid: string | null;
  onEmailVerified: () => void;

  tenantEvent?: TimelineEvent;
  setTenantEvent: Dispatch<SetStateAction<TimelineEvent | undefined>>;
  databaseEvent?: TimelineEvent;
  setDatabaseEvent: Dispatch<SetStateAction<TimelineEvent | undefined>>;
  domainEvent?: TimelineEvent;
  setDomainEvent: Dispatch<SetStateAction<TimelineEvent | undefined>>;
  seedingDatabaseEvent?: TimelineEvent;
  setSeedingDatabaseEvent: Dispatch<SetStateAction<TimelineEvent | undefined>>;
  foreignKey: string;
  emailVerifiedEvent?: TimelineEvent;
  setEmailVerifiedEvent: Dispatch<SetStateAction<TimelineEvent | undefined>>;
  setForeignKey: Dispatch<SetStateAction<string>>;
}
