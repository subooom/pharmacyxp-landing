"use client";
import { usePlans } from "./_hooks/usePlans";
import { useSignUpValidation } from "./_hooks/useSignUpValidation";
import Steps from "./_components/Steps";
import { useCallback } from "react";
import { mapJoiErrorToFieldMessages } from "@/lib/utils";
import renderStep from "./_utils/renderStep";
import { initFirebaseApp } from "@/auth/firebase.app";
import { useSignUpStore } from "@/store/sing-up.store";

initFirebaseApp();

export default function SignUp() {
  // Get all state and actions from Zustand store
  const {
    page,
    maxSteps,
    nextPage,
    goToPage,
    isFirstPage,
    isLastPage,
    setErrors,
    formData: state,
  } = useSignUpStore();

  // Use the custom hooks that now interact with Zustand
  const { plans } = usePlans();

  const { validateCurrentStep } = useSignUpValidation(page, state, plans);

  const handleNext = useCallback(() => {
    const { error } = validateCurrentStep();
    console.log(error);
    if (error) {
      setErrors(mapJoiErrorToFieldMessages(error));
      return;
    }
    setErrors({});
    nextPage();
  }, [nextPage, validateCurrentStep, setErrors]);

  // const handleCreateApplicationClicked = useCallback(() => {
  //   setShowEmailVerificationLoading(true);
  //   const { error, value } = validateCurrentStep();
  //   const { admin_email, password } = value;

  //   setErrors({});
  //   if (error) {
  //     setShowEmailVerificationLoading(false);
  //     setErrors(mapJoiErrorToFieldMessages(error));
  //   } else {
  //     const auth = getAuth();
  //     if (!isEmailVerified) {
  //       createUserWithEmailAndPassword(auth, admin_email, password)
  //         .then((userCredential) => {
  //           Api.post("/verify-email", userCredential.user).then(() => {
  //             sendEmailVerification(userCredential.user, {
  //               url: `${process.env.REACT_APP_API_URL}/email-verification/${userCredential.user.email}/${userCredential.user.uid}`,
  //             })
  //               .then(() => {
  //                 setUid(userCredential.user.uid);
  //                 setShowEmailVerificationLoading(false);
  //                 nextPage();
  //               })
  //               .catch(() => {
  //                 setShowEmailVerificationLoading(false);
  //                 setErrors({
  //                   admin_email:
  //                     "An error occurred while trying to send email verification.",
  //                 });
  //               });
  //           });
  //         })
  //         .catch(() => {
  //           setShowEmailVerificationLoading(false);
  //           setErrors({
  //             admin_email: "Something bad happened.",
  //           });
  //         });
  //     } else {
  //       nextPage();
  //     }
  //   }
  // }, [
  //   isEmailVerified,
  //   nextPage,
  //   validateCurrentStep,
  //   setErrors,
  //   setShowEmailVerificationLoading,
  //   setUid,
  // ]);

  // const onEmailVerified = useCallback(() => {
  //   Api.post("/create-an-account", {
  //     ...state,
  //     uid,
  //   });
  // }, [state, uid]);

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
