import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { Plan, Service } from "@/app/(auth)/get-started/_utils/types";
import { SignUpState } from "@/app/(auth)/get-started/_hooks/useSignUpState";
import { TimelineEvent } from "@/app/(auth)/get-started/_components/EventCard";
import { CouponCode } from "@/app/(auth)/get-started/_steps/6EmailConfirmation";
import Api from "@/lib/api";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
} from "@firebase/auth";
import { mapJoiErrorToFieldMessages } from "@/lib/utils";

import renderStep from "@/app/(auth)/get-started/_utils/renderStep";
import { fileToBase64 } from "@/app/(auth)/get-started/_utils/utils";

// Define the interface for the entire store
interface SignUpStore {
  // --- Form Data Slice ---
  formData: SignUpState & { foreignKey: string };
  updateFormData: (update: Partial<SignUpState>) => void;
  updateOrganizationAddress: (
    update: Partial<SignUpState["organization_address"]>,
  ) => void;
  foreignKey: string;
  setForeignKey: (key: string) => void;

  // --- UI State Slice ---
  page: number;
  maxSteps: number;
  errors: Record<string, string>;
  showEmailVerificationLoading: boolean;
  setPage: (page: number) => void;
  setErrors: (errors: Record<string, string>) => void;
  setShowEmailVerificationLoading: (loading: boolean) => void;
  nextPage: () => void;
  goToPage: (page: number) => void;
  isFirstPage: boolean;
  isLastPage: boolean;

  // --- API Data Slice ---
  plans: Plan[]; // Replace 'any' with your Plan type
  services: Service[]; // Replace 'any' with your Service type
  couponData?: CouponCode | null; // Replace 'any' with your Coupon type
  setPlans: (plans: Plan[]) => void;
  setServices: (services: Service[]) => void;
  setCouponData: (data?: CouponCode) => void;

  clearCoupon: () => void;
  // --- API Status Slice ---
  status: {
    plansLoading: boolean;
    plansError: string | null;
    plansSuccess: boolean;
    servicesLoading: boolean;
    servicesError: string | null;
    servicesSuccess: boolean;
    couponLoading: boolean;
    couponError: string | null;
    couponSuccess: boolean;
  };
  setStatus: (update: Partial<SignUpStore["status"]>) => void;

  // --- Timeline Events Slice ---
  timelineEvents: {
    emailVerifiedEvent?: TimelineEvent;
    tenantEvent?: TimelineEvent;
    domainEvent?: TimelineEvent;
    databaseEvent?: TimelineEvent;
    seedingDatabaseEvent?: TimelineEvent;
  };
  setTimelineEvent: (
    key: keyof SignUpStore["timelineEvents"],
    event: TimelineEvent | undefined,
  ) => void;

  // --- Auth State Slice ---
  auth: {
    uid: string | null;
    isEmailVerified: boolean;
  };
  setUid: (uid: string | null) => void;
  isEmailVerified: boolean;
  setIsEmailVerified: (verified: boolean) => void;
  handlers: {
    // Navigation & Validation
    handleNext: (validateCurrentStep: () => { error: unknown }) => void;
    handleCreateApplicationClicked: (
      validateCurrentStep: () => { error: unknown; value: any },
    ) => Promise<void>;
    onEmailVerified: () => Promise<void>;

    // UI Rendering
    renderButtonText: () => string;
    renderLegend: () => string;

    // Step Management
    renderCurrentStep: (page: number) => React.ReactNode;
  };
}

// Create the store with Immer for mutable-looking immutable updates
export const useSignUpStore = create<SignUpStore>()(
  immer((set, get) => ({
    page: 0,
    isEmailVerified: false,
    // --- Initial State for Form Data ---
    formData: {
      // ... initial state from useSignUpState ...
      admin_name: "",
      admin_email: "",
      admin_contact: "",
      organization_name: "",
      organization_contact: "",
      organization_logo: undefined,
      organization_pan_number: "",
      organization_description: "",
      organization_address: {
        line_1_number_building: "",
        line_2_number_street: "",
        line_3_area_locality: "",
        city: "",
        zip_postcode: "",
        vdc_municipality: "",
        ward_number: "",
        state_province_county: "",
        country: "",
        data: "",
      },
      service_ids: [],
      password: "",
      confirm_password: "",
      coupon_code: "",
      foreignKey: "",
    },
    updateFormData: (update) =>
      set((state) => {
        Object.assign(state.formData, update);
      }),
    updateOrganizationAddress: (update) =>
      set((state) => {
        Object.assign(state.formData.organization_address, update);
      }),
    foreignKey: "",
    setForeignKey: (key) =>
      set((state) => {
        state.formData.foreignKey = key;
      }),

    // --- Initial State for UI ---
    maxSteps: 7, // Set your total number of steps here
    errors: {},
    showEmailVerificationLoading: false,
    setPage: (page) => set({ page }),
    setErrors: (errors) => set({ errors }),
    setShowEmailVerificationLoading: (loading) =>
      set({ showEmailVerificationLoading: loading }),
    nextPage: () =>
      set((state) => ({ page: Math.min(state.page + 1, state.maxSteps) })),
    goToPage: (page) =>
      set((state) => ({ page: Math.max(1, Math.min(page, state.maxSteps)) })),
    get isFirstPage() {
      return get().page === 1;
    },
    get isLastPage() {
      return get().page === get().maxSteps;
    },

    // --- Initial State for API Data ---
    plans: [],
    services: [],
    couponData: null,
    setPlans: (plans) => set({ plans }),
    setServices: (services) => set({ services }),
    setCouponData: (data) => set({ couponData: data }),

    // --- Initial State for API Status ---
    status: {
      plansLoading: false,
      plansError: null,
      plansSuccess: false,
      servicesLoading: false,
      servicesError: null,
      servicesSuccess: false,
      couponLoading: false,
      couponError: null,
      couponSuccess: false,
    },
    clearCoupon: () => {
      set((state) => {
        state.status.couponError = null;
        state.status.couponLoading = false;
        state.status.couponSuccess = false;
        if (state.couponData) {
          state.couponData.coupon = "";
          state.couponData.medical_representative = undefined;
          state.couponData.discount_in_percentage = 0;
        }
        state.formData.coupon_code = "";

        state.errors.coupon_code = "";
      });
    },
    setStatus: (update) =>
      set((state) => {
        Object.assign(state.status, update);
      }),

    // --- Initial State for Timeline ---
    timelineEvents: {},
    setTimelineEvent: (key, event) => {
      console.log(`setting ${key} with ${event}`);
      return set((state) => {
        state.timelineEvents[key] = event;
      });
    },

    // --- Initial State for Auth ---
    auth: {
      uid: null,
      isEmailVerified: false,
    },
    setUid: (uid) =>
      set((state) => {
        state.auth.uid = uid;
      }),
    setIsEmailVerified: (verified) =>
      set((state) => {
        state.auth.isEmailVerified = verified;
      }),
    handlers: {
      handleNext: (validateCurrentStep) => {
        const { error } = validateCurrentStep();
        console.log(error);
        if (error) {
          get().setErrors(mapJoiErrorToFieldMessages(error));
          return;
        }
        get().setErrors({});
        get().nextPage();
      },

      handleCreateApplicationClicked: async (validateCurrentStep) => {
        const {
          setShowEmailVerificationLoading,
          setErrors,
          nextPage,
          setUid,
          auth,
        } = get();

        setShowEmailVerificationLoading(true);
        const { error, value } = validateCurrentStep();
        const { admin_email, password } = value;

        setErrors({});
        if (error) {
          setShowEmailVerificationLoading(false);
          setErrors(mapJoiErrorToFieldMessages(error));
          return;
        }

        try {
          const authInstance = getAuth();
          if (!auth.isEmailVerified) {
            const userCredential = await createUserWithEmailAndPassword(
              authInstance,
              admin_email,
              password,
            );

            await Api.post("/verify-email", userCredential.user);

            await sendEmailVerification(userCredential.user, {
              url: `${process.env.NEXT_PUBLIC_API_URL}/email-verification/${userCredential.user.email}/${userCredential.user.uid}`,
            });

            setUid(userCredential.user.uid);
            setShowEmailVerificationLoading(false);
            nextPage();
          } else {
            nextPage();
          }
        } catch (error) {
          console.error(error);
          setShowEmailVerificationLoading(false);
          setErrors({
            admin_email: "An error occurred during email verification.",
          });
        }
      },

      onEmailVerified: async () => {
        const { formData, auth } = get();

        try {
          // Convert File to base64 for organization_logo only
          const submitData = { ...formData };
          let orgLogo = "";

          if (formData.organization_logo instanceof File) {
            const base64String = await fileToBase64(formData.organization_logo);
            orgLogo = base64String;
          }

          // Send everything as JSON
          await Api.post("/create-an-account", {
            ...submitData,
            organization_logo: orgLogo,
            uid: auth.uid,
          });
        } catch (error: unknown) {
          console.error(error);
          get().setErrors({
            general: "Failed to create account. Please try again.",
          });
        }
      },
      renderButtonText: () => {
        const { isFirstPage, isLastPage } = get();
        return isFirstPage ? "Get Started" : isLastPage ? "Finish" : "Next";
      },

      renderLegend: () => {
        const { isFirstPage, maxSteps, page } = get();
        return isFirstPage
          ? `(Total ${maxSteps} steps)`
          : `${page} / ${maxSteps}`;
      },

      renderCurrentStep: (page: number) => {
        // You'll need to import or define renderStep function
        return renderStep(page);
      },
    },
  })),
);

// Optional: Create custom hooks for common selections to avoid repetition
// This is great for colocating logic and optimizing performance further.
export const usePlans = () =>
  useSignUpStore((state) => ({
    plans: state.plans,
    loading: state.status.plansLoading,
    error: state.status.plansError,
    success: state.status.plansSuccess,
    setPlans: state.setPlans,
    setStatus: state.setStatus,
  }));

export const useSignUpForm = () =>
  useSignUpStore((state) => ({
    formData: state.formData,
    updateFormData: state.updateFormData,
    updateOrganizationAddress: state.updateOrganizationAddress,
  }));

// === NEW HANDLER SELECTORS ===
export const useSignUpHandlers = () =>
  useSignUpStore((state) => state.handlers);

export const useSignUpNavigation = () =>
  useSignUpStore((state) => ({
    handleNext: state.handlers.handleNext,
    handleCreateApplicationClicked:
      state.handlers.handleCreateApplicationClicked,
    onEmailVerified: state.handlers.onEmailVerified,
    nextPage: state.nextPage,
    goToPage: state.goToPage,
  }));

export const useSignUpUI = () =>
  useSignUpStore((state) => ({
    renderButtonText: state.handlers.renderButtonText,
    renderLegend: state.handlers.renderLegend,
    renderCurrentStep: state.handlers.renderCurrentStep,
    page: state.page,
    maxSteps: state.maxSteps,
    isFirstPage: state.isFirstPage,
    isLastPage: state.isLastPage,
  }));

// === COMPREHENSIVE SELECTOR ===
export const useSignUpFlow = () =>
  useSignUpStore((state) => ({
    // State
    page: state.page,
    maxSteps: state.maxSteps,
    formData: state.formData,
    errors: state.errors,
    auth: state.auth,

    // Handlers
    handlers: state.handlers,

    // Actions
    setErrors: state.setErrors,
    updateFormData: state.updateFormData,
    setUid: state.setUid,
    setIsEmailVerified: state.setIsEmailVerified,
  }));

export const useTimelineEvents = () =>
  useSignUpStore((state) => state.timelineEvents);
export const usePage = () => useSignUpStore((state) => state.page);
