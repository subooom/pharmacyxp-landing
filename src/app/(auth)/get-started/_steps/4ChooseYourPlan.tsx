import React, { useState, Fragment, useRef, useEffect } from "react";
import { cn, getLocalPlan, setLocalPlan } from "@/lib/utils";
import Card from "@/components/composits/PricePanel/Card";
import StepPageLayout from "@/layouts/StepPageLayout";
import APIFetchHandler from "@/components/utils/ApiFetchHandler";
import { useSignUpStore } from "@/store/sing-up.store";
import { usePlans } from "../_hooks/usePlans";

export const ANIMATION_DURATION = 1500;
const ChooseYourPlan = () => {
  const {
    plans,
    status: { plansError, plansLoading, plansSuccess },
    errors,
    formData: { plan_id: currentPlanId },
    setPage,
    updateFormData,
  } = useSignUpStore();
  const { fetchPlans } = usePlans();
  const [chooseClassName, setChooseClassName] = useState("");
  const [currentHoveredPlan, setCurrentHoveredPlan] = useState<
    number | undefined
  >();
  const hoverElemRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (plans?.length === 0) {
      fetchPlans();
    }
  }, [fetchPlans, plans, plansLoading]);

  const [localPlan] = useState<number>();
  useEffect(() => {
    const locPlan = getLocalPlan();
    if (locPlan) {
      setLocalPlan(locPlan);
      updateFormData({ plan_id: locPlan });
    }
  }, []);

  return (
    <StepPageLayout
      title="Choose Your Plan"
      subtitle="Start using PharmacyXP on an industry scale by choosing one of the following options."
    >
      <APIFetchHandler
        name="Plans"
        height="100%"
        error={plansError || ""}
        isLoading={plansLoading}
        hasSuccess={plansSuccess}
        reloadHandler={fetchPlans}
        ChildContainer={Fragment}
      >
        <div className="w-full  mb-16">
          {Object.keys(errors).length > 0 && (
            <div className="mb-4 destructive font-medium">
              Please Choose a Plan to Proceed.
              <p className="text-sm">{errors.plan_id}</p>
            </div>
          )}
          <div className="relative mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {plans?.map((plan, i) => (
              <div key={plan.id} className="relative">
                <div
                  className={cn(
                    "absolute bg-primary-200 p-4 shadow-md transition-opacity duration-300 z-30",
                    currentHoveredPlan === i ? "opacity-100" : "opacity-0",
                  )}
                  style={{ top: "-260px" }}
                  onMouseEnter={() => setCurrentHoveredPlan(55555)}
                >
                  <h6 className="mb-2 font-semibold text-shadow-primary-950">
                    Features
                  </h6>
                  <div
                    dangerouslySetInnerHTML={{ __html: plan.features }}
                    className="text-[15px] text-800 leading-tight"
                  />
                </div>

                <Card
                  name={plan.name}
                  minimized
                  isSelected={
                    currentPlanId === plan.id || localPlan === plan.id
                  }
                  price_per_year={plan.price_per_year}
                  price_for_first_year={plan.price_for_first_year}
                  number_of_services={plan.number_of_services}
                  onClick={() => {
                    setLocalPlan(plan.id);
                    updateFormData({ plan_id: plan.id });
                    setTimeout(() => {
                      if (plan.id === 1) {
                        setPage(6);
                      } else {
                        setPage(5);
                      }
                    }, ANIMATION_DURATION);
                  }}
                  onMouseEnter={() => setCurrentHoveredPlan(i)}
                />
              </div>
            ))}

            <div
              className="relative"
              onMouseEnter={() => setCurrentHoveredPlan(999)}
            >
              <div
                className={cn(
                  "absolute bg-primary-200 p-4 shadow-md transition-opacity duration-300 z-30",
                  currentHoveredPlan === 999 ? "opacity-100" : "opacity-0",
                )}
                style={{ top: "-260px" }}
                onMouseEnter={() => setCurrentHoveredPlan(55555)}
              >
                <h6 className="mb-2 font-semibold text-primary-950">
                  Features
                </h6>
                <p className="text-[15px] text-primary-800 leading-tight">
                  You can choose medical departments and the system will
                  automatically choose the best plan for you.
                </p>
              </div>

              <div
                className={cn(
                  "relative h-full overflow-hidden p-6 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-primary/50 bg-background transition-all duration-100 cursor-pointer",
                  chooseClassName,
                  currentPlanId === 0 && "border-2 border-primary",
                )}
                style={{ width: "18rem" }}
                onClick={() => {
                  setChooseClassName("ripple-animation");
                  setTimeout(() => setChooseClassName(""), 400);
                  updateFormData({ plan_id: 0 });
                  setLocalPlan(0);
                  setTimeout(() => {
                    setPage(5);
                  }, ANIMATION_DURATION);
                }}
                onMouseMove={(e) => {
                  if (hoverElemRef.current) {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const offsetX = e.clientX - rect.left;
                    const offsetY = e.clientY - rect.top;

                    hoverElemRef.current.style.top = `${offsetY - 25}px`;
                    hoverElemRef.current.style.left = `${offsetX - 25}px`;
                  }
                }}
              >
                <span
                  className="absolute rounded-full bg-[#91a7ee33] w-[50px] h-[50px] animate-ripple"
                  ref={hoverElemRef}
                ></span>
                <h3 className="text-primary uppercase text-lg font-extrabold">
                  Choose as you go..
                </h3>
                <p className="text-sm tracking-wider text-center mt-2 text-primary-800">
                  Choose the departments you need and let our automated system
                  decide the right plan for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </APIFetchHandler>
    </StepPageLayout>
  );
};

export default ChooseYourPlan;
