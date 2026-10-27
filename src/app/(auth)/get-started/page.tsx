"use client";
import { usePlans } from "./_hooks/usePlans";
import { useSignUpValidation } from "./_hooks/useSignUpValidation";
import { useCallback, useEffect } from "react";
import { mapJoiErrorToFieldMessages } from "@/lib/utils";
import renderStep from "./_utils/renderStep";
import { initFirebaseApp } from "@/auth/firebase.app";
import { useSignUpStore } from "@/store/sing-up.store";
import Steps from "./_components/_steps";
import { useSignupInvite } from "./_hooks/useSignupInvite";
import { toast } from "sonner";
import { SignUpState } from "./_hooks/useSignUpState";

initFirebaseApp();

export default function SignUp() {
  // Get all state and actions from Zustand store
  const {
    page,
    maxSteps,
    nextPage,
    goToPage,
    setErrors,
    formData: state,
    updateFormData,
  } = useSignUpStore();
  // The store's own isFirstPage/isLastPage never update; the last step before
  // "thank you" is the email step
  const isFirstPage = page === 0;
  const isLastPage = page === maxSteps - 1;

  useEffect(() => {
    if (isLastPage) { // clear storage on last page hit(successfull verification and tenant creation initiated)
      localStorage.removeItem("signup-storage");
    }
  }, [isLastPage]);

  const { fromLink } = useSignupInvite();

  // MR referral QR codes / links open /get-started?coupon=<code>: pre-fill it into
  // "Coupon/MR Code" (the last step verifies it). A rep's personal link
  // (?invite=<token>) fills in the whole form from their visit.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("coupon");
    if (code) {
      updateFormData({ coupon_code: code.trim().toUpperCase() });
    }
    const invite = params.get("invite");
    // Only fire the invite API if there's no in-progress signup saved in local storage
    const hasStoredSignup = localStorage.getItem("signup-storage");
    if (invite && !hasStoredSignup) {
      fromLink(invite).then((filled) => {
        if (!filled) {
          toast.error("This link has expired or was already used. You can still fill the form yourself.");
        }
      });
    }
    if(hasStoredSignup) {
      const parsedStoredSignup = JSON.parse(hasStoredSignup);
      console.log(parsedStoredSignup)
      const page = parsedStoredSignup.state.page;
      updateFormData(parsedStoredSignup.state.formData as  Partial<SignUpState> )
      goToPage(page)
    }
  }, [updateFormData, fromLink]);

  // Use the custom hooks that now interact with Zustand
  const { plans } = usePlans();

  const { validateCurrentStep } = useSignUpValidation(page, state, plans);

  const handleNext = useCallback(() => {
    const { error } = validateCurrentStep();
    if (error) {
      setErrors(mapJoiErrorToFieldMessages(error));
      return;
    }
    setErrors({});
    nextPage();
  }, [nextPage, validateCurrentStep, setErrors]);

  const renderButtonText = useCallback(
    () => (isFirstPage ? "Get Started" : isLastPage ? "Finish" : "Next"),
    [isFirstPage, isLastPage],
  );

  const renderCurrentStep = useCallback(() => renderStep(page), [page]);

  const renderLegend = useCallback(
    () => (isFirstPage ? `(Total ${maxSteps} steps)` : `${page} / ${maxSteps}`),
    [isFirstPage, maxSteps, page],
  );

  return (
    <Steps
      title="Create Your Profile"
      handleNext={handleNext}
      renderButtonText={renderButtonText}
      renderCurrentStep={renderCurrentStep}
      totalPages={maxSteps}
      renderLegend={renderLegend}
      currentPage={page}
      onPageChange={goToPage}
    />
  );
}
