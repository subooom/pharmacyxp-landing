import React, { useState, useEffect, useMemo } from "react";
import { getAuth, signInWithPopup, User } from "@firebase/auth";
// import ReactToPrint from "react-to-print";

import { CheckSquare, Frown, Loader2, Mail } from "lucide-react";
import StepPageLayout from "@/layouts/StepPageLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InvoiceModal } from "../_components/InvoiceModal";
import googleAuthProvider from "@/auth/google/provider";
import facebookAuthProvider from "@/auth/facebook/provider";
import Api from "@/lib/api";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Spinner from "@/components/ui/spinner";
import { useSignUpStore } from "@/store/sing-up.store";
import { useCoupon } from "../_hooks/useCoupon";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useSignUpValidation } from "../_hooks/useSignUpValidation";

type AuthType = "google" | "facebook" | "email";
export interface CouponCode {
  coupon: string;
  discount_in_percentage: number;
  medical_representative?: {
    name: string;
    contact: string;
    email: string;
  };
}

const EmailConfirmation = () => {
  const {
    errors,
    formData: {
      plan_id,
      admin_email,
      password: gPassword,
      confirm_password,
      coupon_code,
    },
    plans,
    services,
    status: {
      couponLoading: couponCodeLoading,
      couponSuccess: couponCodeSuccess,
      couponError,
    },
    clearCoupon,
    updateFormData: updateState,
    page,
    couponData,
    setErrors,
    auth: { isEmailVerified },
    setIsEmailVerified,
    showEmailVerificationLoading: loading,
    handlers: { handleCreateApplicationClicked },
    setForeignKey,
    formData: state,
  } = useSignUpStore();

  const { validateCurrentStep } = useSignUpValidation(page, state, plans);

  const { verifyCoupon } = useCoupon();
  const data = useMemo(
    () => ({
      admin_email,
      password: gPassword,
      confirm_password,
      coupon_code,
    }),
    [admin_email, gPassword, confirm_password, coupon_code],
  );
  const [authType, setAuthType] = useState<AuthType>("email");
  const auth = getAuth();
  const plan = plans?.find((p) => p.id === plan_id);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [today] = useState(new Date());

  const [internalLoading, setLoading] = useState(false);

  const handleSignInWithGoogleClicked = () => {
    setAuthType("google");
    setLoading(true);
    onGoogleError("");
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const user = result.user;

        user.getIdToken().then((token) => {
          if (!token) {
            onGoogleError("Token not found!");
            return;
          }
          setForeignKey(email)
          console.log('set foreign key')
          onAuthSuccess({ ...user, token });
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        setLoading(false);
        onGoogleError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSignInWithFacebookClicked = () => {
    setAuthType("facebook");
    setLoading(true);
    onFacebookError("");
    onGoogleError("");
    signInWithPopup(auth, facebookAuthProvider)
      .then((result) => {
        const user = result.user;
        user.getIdToken().then((token) => {
          if (!token) {
            onFacebookError("Token not found!");
            return;
          }
          onAuthSuccess({ ...user, token });
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        onFacebookError(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Handlers
  const onAuthSuccess = ({
    email,
    token,
    message,
  }: User & {
    token: string;
    message?: string;
  }) => {
    if ((!email || !token) && message) {
      return setErrors({
        ...errors,
        google: message,
      });
    }
    if (email) {
      updateState({ admin_email: email });
      Api.post("/verify-email", { email, uid: token })
        .then(() => {
          setLoading(false);
          setIsEmailVerified(true);
        })
        .catch((err) => {
          setLoading(false);
          setErrors({ ...errors, google: err.response.data.message });
          setIsEmailVerified(false);
        });
    } else {
      setErrors({ ...errors, google: "Something bad happened!" });
    }
  };

  const onGoogleError = (msg: string) => {
    setErrors((prev) => ({ ...prev, google: msg }));
  };

  const onFacebookError = (msg: string) => {
    setErrors({ ...errors, facebook: msg });
  };

  const onEmailChange = (email: string) => {
    updateState({ admin_email: email });
  };

  const onPasswordChange = (password: string) => {
    updateState({ password: password });
  };

  const onConfirmPasswordChange = (cp: string) => {
    updateState({ confirm_password: cp });
  };

  const onCouponCodeChange = (couponCode: string) => {
    updateState({ coupon_code: couponCode });
  };

  useEffect(() => {
    setEmail(data.admin_email);
    setPassword(data.password);
    setConfirmPassword(data.confirm_password);
    setCouponCode(data.coupon_code);
  }, [data]);

  useEffect(() => {
    if (couponCode.length === 7) {
      // make api request to verify coupon code
      if (verifyCoupon) {
        verifyCoupon(couponCode);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponCode]);

  const getCurrentServices = () => {
    return services?.map(({ name }) => name).join(", ");
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      const overlayDiv: HTMLDivElement = document.querySelector(
        ".overlay-div",
      ) as HTMLDivElement;
      if (overlayDiv) {
        overlayDiv.style.display = "none";
      }
    }
  }, [errors]);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);

  console.log({ isEmailVerified });
  return (
    <>
      <InvoiceModal
        getCurrentServices={getCurrentServices}
        plan={plan}
        today={today}
        couponCodeData={couponData}
        open={invoiceModalOpen}
        setOpen={setInvoiceModalOpen}
      />
      <StepPageLayout
        title="Email Confirmation"
        subtitle="Please choose a password to create your application."
        image="https://shatayuhospital.com/images/patient-feedback.png"
      >
        {errors.facebook ? (
          <p className="text-destructive">{errors.facebook}</p>
        ) : (
          ""
        )}
        {errors.google ? (
          <p className="text-destructive">{errors.google}</p>
        ) : (
          ""
        )}

        <h4 className="m-0 mt-4 flex gap-0 items-center">
          {loading || internalLoading ? <Spinner /> : null}
          Create your application, either with:
        </h4>
        {!isEmailVerified ? (
          <>
            <div className="flex flex-col mt-5">
              <div className="social-auth flex items-center gap-2 max-w-sm">
                <Button
                  className="flex items-center gap-2 bg-white not-disabled:hover:bg-primary-400/10 disabled:bg-white/80 dark:bg-primary-100 text-primary-950 border border-primary-900/10 dark:disabled:bg-primary-50 dark:not-disabled:hover:bg-primary-200"
                  style={{ fontSize: 12 }}
                  onClick={handleSignInWithGoogleClicked}
                  disabled={loading || internalLoading}
                >
                  <Image
                    src="/icons/icons8-google.svg"
                    height={16}
                    width={16}
                    className="mb-[1px]"
                    alt="Google Icon"
                  />
                  <span>Google Authentication</span>
                </Button>
                <h4 className="m-0">OR</h4>
                <Button
                  className="facebook-auth flex items-center gap-2 bg-white hover:bg-primary-400/10 dark:bg-primary-100 text-primary-950 border border-primary-900/10 dark:hover:bg-primary-200"
                  style={{ fontSize: 12 }}
                  onClick={handleSignInWithFacebookClicked}
                  disabled={loading || internalLoading}
                >
                  <Image
                    src="/icons/icons8-facebook.svg"
                    height={16}
                    width={16}
                    className="mb-[1px]"
                    alt="Google Icon"
                  />
                  <span>Facebook Authentication</span>
                </Button>
              </div>
            </div>
          </>
        ) : null}

        <div className="form flex flex-col max-w-xl mt-2">
          {isEmailVerified ? (
            <div className="or-panel__with-email w-full">
              {/* <div className="my-4">
                  <div className="w-full md:w-1/2">
                    <div className="flex items-center">
                      <h4 className="m-0">OR</h4>
                    </div>
                  </div>
                </div> */}
              <div className="flex flex-col gap-2 mt-4">
                <Label htmlFor="email" className={!isEmailVerified ? "" : ""}>
                  Email Address {!isEmailVerified ? " " : "Verified"}
                </Label>
                <div
                  className={`flex items-center ${
                    errors?.admin_email ? "border-destructive" : ""
                  }`}
                >
                  <div
                    className={cn(
                      "email-prepend flex items-center justify-center bg-primary-100 border border-primary/28 border-r-none rounded-sm rounded-tr-none rounded-br-none h-14 w-14 aspect-square",
                      isEmailVerified ? "bg-secondary/[0.26]" : "",
                    )}
                  >
                    {!isEmailVerified ? (
                      <Mail className="w-5 h-5" />
                    ) : (
                      <CheckSquare className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <Input
                    id="email"
                    type="email"
                    className={`rounded-tl-none border-l-none rounded-bl-none flex-1 h-14 ${
                      isEmailVerified
                        ? "bg-secondary/60 text-primary font-semibold disabled:opacity-[100%]"
                        : ""
                    }`}
                    value={email}
                    disabled={isEmailVerified}
                    onChange={(e) => {
                      onEmailChange(e.target.value);
                    }}
                    placeholder="Your email"
                  />
                </div>
                <div className={`text-sm mt-2 mb-8 text-primary-800`}>
                  {!isEmailVerified
                    ? "We'll send you an email with a link to verify your account."
                    : "If you have a Coupon/MR Code, enter it below."}
                </div>
                {errors?.admin_email ? (
                  <div className="mt-3">
                    <div
                      id={`${errors.admin_email}-error-message`}
                      className="text-destructive"
                    >
                      {errors.admin_email}
                    </div>
                  </div>
                ) : null}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="Password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type="password"
                      className="h-14"
                      value={password}
                      onChange={(e) => {
                        onPasswordChange(e.target.value);
                      }}
                      placeholder="Your password"
                    />
                  </div>
                  <div className="mt-3">
                    {errors?.password ? (
                      <div
                        id={`${errors.password}-error-message`}
                        className="text-destructive"
                      >
                        {errors.password}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirm_password"
                      type="password"
                      className="h-14"
                      value={confirmPassword}
                      onChange={(e) => {
                        onConfirmPasswordChange(e.target.value);
                      }}
                      placeholder="Confirm your password"
                    />
                  </div>
                  <div className="mt-3">
                    {errors?.confirm_password ? (
                      <div
                        id={`${errors.confirm_password}-error-message`}
                        className="text-destructive"
                      >
                        {errors.confirm_password}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <div className="transition-all duration-200 ease-in mt-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="coupon_code">Coupon/MR Code</Label>
                <div className="relative flex gap-4">
                  {couponCodeLoading && !errors.coupon_code ? (
                    <div className="absolute inset-y-0 right-2 flex items-center pl-3">
                      <Loader2 className="animate-spin h-5 w-5" />
                    </div>
                  ) : null}
                  <Input
                    id="coupon_code"
                    type="text"
                    className={cn(
                      "h-14 uppercase min-w-xs",
                      couponError ? "border-2 border-destructive" : "",
                    )}
                    style={{}}
                    value={couponCode}
                    onChange={(e) => {
                      onCouponCodeChange(e.target.value);
                    }}
                    disabled={couponCodeLoading && !couponError}
                    placeholder="TFX356"
                  />
                  {couponError || errors.coupon_code ? (
                    <Button
                      className="h-14 rounded-2xl"
                      variant="secondary"
                      onClick={() => {
                        clearCoupon();
                        setTimeout(() => {
                          toast.info(
                            "Please contact us at +977 9709189068/69 to get 10% off.",
                            {
                              description:
                                "Offer is only available for a limited time.",
                              position: "top-center",

                              action: {
                                label: "Thanks!",
                                onClick: () => console.log("Undo"),
                              },
                            },
                          );
                        }, 1000);
                      }}
                    >
                      <Frown height={24} width={24} /> Okay!
                    </Button>
                  ) : null}
                </div>
                <div className="mt-3">
                  {couponError ? (
                    <div
                      id={`${couponError}-error-message`}
                      className="text-destructive"
                    >
                      {couponError}
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                {couponCodeSuccess && couponData ? (
                  <div className="flex flex-row text-sm text-white p-5 bg-primary items-center justify-between overflow-hidden relative">
                    <div
                      className="absolute h-16 w-16 bg-gray-50/20 left-[-32px] top-[20%] rounded-full"
                      style={{ top: `calc(20% - 32px)` }}
                    ></div>
                    <div
                      className="absolute h-16 w-16 bg-gray-50/20 right-[-32px] top-[20%] rounded-full"
                      style={{ top: `calc(20% - 32px)` }}
                    ></div>
                    <div className="flex flex-col w-1/2 h-full justify-center">
                      <h4>{couponData?.discount_in_percentage} % OFF</h4>
                      <div>{couponData?.coupon}</div>
                      <div>{couponData?.medical_representative?.contact}</div>
                      <div>{couponData?.medical_representative?.email}</div>
                    </div>
                    <div className="w-1/3 flex flex-col h-full justify-center items-center">
                      <Image
                        width={65}
                        height={65}
                        src="https://picsum.photos/500"
                        className="rounded-full"
                        alt={`Medical Representaive, ${couponData?.medical_representative?.name}`}
                      />
                      <div>{couponData?.medical_representative?.name}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center w-full">
            <Button
              className="flex items-center gap-2 bg-primary hover:bg-primary/80 rounded-sm h-[56px] min-w-md mt-3 disabled:opacity-90"
              onClick={() =>
                handleCreateApplicationClicked(validateCurrentStep)
              }
              disabled={loading || internalLoading || !isEmailVerified}
            >
              <Mail className="w-5 h-5" />
              <span>Create Your Application</span>
            </Button>
            {loading || internalLoading ? (
              <Loader2 className="animate-spin h-5 w-5" />
            ) : null}
          </div>
        </div>
        {loading ? (
          <p className="mt-3 text-foreground">
            Creating account and sending Verification Email.
          </p>
        ) : null}
      </StepPageLayout>
    </>
  );
};

export default EmailConfirmation;
