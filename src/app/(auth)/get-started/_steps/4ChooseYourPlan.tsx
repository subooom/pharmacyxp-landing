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
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const hoverElemRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (plans?.length === 0) fetchPlans();
  }, [plans]);

  useEffect(() => {
    const locPlan = getLocalPlan();
    if (locPlan && !currentPlanId) {
      setLocalPlan(locPlan);
      updateFormData({ plan_id: locPlan });
    }
  }, []);

  const handleSelect = (planId: number) => {
    setLocalPlan(planId);
    updateFormData({ plan_id: planId });
    setTimeout(() => setPage(planId === 1 ? 6 : 5), ANIMATION_DURATION);
  };

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
        <div className="mb-16 w-full">
          {Object.keys(errors).length > 0 && (
            <div className="mb-3 font-medium text-destructive">
              Please choose a plan to proceed.
              <p className="text-sm">{errors.plan_id}</p>
            </div>
          )}

          {/* DITCH THE GRID: Use flex-wrap and flex-1 */}
          <div className="mt-8 flex flex-wrap gap-4">
            {plans?.map((plan) => (
              <div
                key={plan.id}
                // flex-1 makes them share space equally, min-w prevents them from getting too skinny
                className="group relative flex flex-1 min-w-[380px] flex-col"
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {/* Tooltip */}
                <div
                  className={cn(
                    "pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-56 -translate-x-1/2 rounded-lg bg-primary-200 p-3 text-left shadow-lg transition-opacity duration-200",
                    hoveredPlan === plan.id ? "opacity-100" : "opacity-0",
                  )}
                >
                  <h6 className="mb-1 text-xs font-semibold text-primary-950">
                    Features
                  </h6>
                  <div
                    className="text-[12px] leading-snug text-primary-800"
                    dangerouslySetInnerHTML={{ __html: plan.features }}
                  />
                </div>

                <Card
                  name={plan.name}
                  minimized
                  isSelected={currentPlanId === plan.id}
                  price_per_year={plan.price_per_year}
                  price_for_first_year={plan.price_for_first_year}
                  number_of_services={plan.number_of_services}
                  onClick={() => handleSelect(plan.id)}
                  onMouseEnter={() => setHoveredPlan(plan.id)}
                  className="h-full" // Ensure card fills the flex wrapper
                />
              </div>
            ))}

            {/* "Choose as you go" card */}
            <div
              className="group relative flex flex-1 min-w-[180px] flex-col"
              onMouseEnter={() => setHoveredPlan(-1)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Tooltip */}
              <div
                className={cn(
                  "pointer-events-none absolute left-1/2 top-full z-30 mt-2 w-56 -translate-x-1/2 rounded-lg bg-primary-200 p-3 text-left shadow-lg transition-opacity duration-200",
                  hoveredPlan === -1 ? "opacity-100" : "opacity-0",
                )}
              >
                <h6 className="mb-1 text-xs font-semibold text-primary-950">
                  Features
                </h6>
                <p className="text-[12px] leading-snug text-primary-800">
                  Pick departments and we’ll auto-select the best plan for you.
                </p>
              </div>

              <div
                className={cn(
                  "relative flex h-full min-h-[290px] w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-primary/50 bg-background p-4 text-center transition-all duration-100 hover:border-primary",
                  chooseClassName,
                  currentPlanId === 0 && "border-2 border-solid border-primary",
                )}
                onClick={() => {
                  setChooseClassName("ripple-animation");
                  setTimeout(() => setChooseClassName(""), 400);
                  updateFormData({ plan_id: 0 });
                  setLocalPlan(0);
                  setTimeout(() => setPage(5), ANIMATION_DURATION);
                }}
                onMouseMove={(e) => {
                  if (!hoverElemRef.current) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  hoverElemRef.current.style.top = `${e.clientY - rect.top - 25}px`;
                  hoverElemRef.current.style.left = `${e.clientX - rect.left - 25}px`;
                }}
              >
                <span
                  className="pointer-events-none absolute h-[50px] w-[50px] animate-ripple rounded-full bg-[#91a7ee33]"
                  ref={hoverElemRef}
                />
                <h3 className="text-sm font-extrabold uppercase text-primary">
                  Choose as you go…
                </h3>
                <p className="text-xs leading-snug text-primary-800">
                  Select the departments you need and let our system pick the
                  right plan.
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