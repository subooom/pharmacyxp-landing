import React, { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import APIFetchHandler from "@/components/utils/ApiFetchHandler";
import StepPageLayout from "@/layouts/StepPageLayout";
import Image from "next/image";
import { Plan, Service } from "../_utils/types";
import { useSignUpStore } from "@/store/sing-up.store";
import { useServices } from "../_hooks/userServices";
import ServiceCounter from "../_components/ServiceCounter";

export const modeLabel = {
  chooseAsYouGo: "Choose As You Go",
  fixedPlan: "Fixed Plan",
} as const;

export type Mode = keyof typeof modeLabel;
const priority = new Set([1, 6, 8].reverse()); // Example priority set

const ChooseYourDepartments = () => {
  const {
    formData: { plan_id: currentPlanId, service_ids },
    services,
    status: { servicesError, servicesLoading, servicesSuccess },
    plans,
    errors,
    updateFormData: updateGlobalState,
  } = useSignUpStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentlyActivePlan, setCurrentlyActivePlan] = useState<Plan>();

  const currentPlan = useMemo(() => {
    return plans.find((p) => p.id === currentPlanId);
  }, [currentPlanId, plans]);

  useEffect(() => {
    if (currentPlan) {
      updateGlobalState({
        service_ids: service_ids.slice(0, currentPlan.number_of_services),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPlan]);

  const { fetchServices } = useServices();

  useEffect(() => {
    if (services?.length === 0) {
      fetchServices();
    }
  }, [fetchServices, services]);

  const searchItems = useMemo(() => {
    return [...services]?.sort((a, b) => {
      const aPriority = priority.has(a.id) ? 0 : 1;
      const bPriority = priority.has(b.id) ? 0 : 1;
      return aPriority - bPriority;
    });
  }, [services]);

  const searchFilteredItems = useMemo(
    () =>
      searchItems?.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [searchItems, searchQuery],
  );

  useEffect(() => {
    if (plans) {
      if (currentPlanId) {
        setCurrentlyActivePlan(plans.find((p) => p.id === currentPlanId));
      } else {
        setCurrentlyActivePlan(
          plans.find((pl) => service_ids.length <= pl.number_of_services),
        );
      }
    }
  }, [plans, service_ids, currentPlanId]);

  const onChange = (service_ids: number[], plan_id: number) => {
    updateGlobalState({ plan_id });
    updateGlobalState({ service_ids });
  };

  const updateState = (id: number) => {
    const newServiceIds = service_ids.includes(id)
      ? service_ids.filter((item) => item !== id) // Remove if exists
      : [...service_ids, id]; // Add if doesn't exist

    onChange(newServiceIds, Number(currentPlanId));
  };

  const subtitle = currentPlan
    ? `You have choosen ${currentPlan?.name} which allows you to select upto ${currentPlan?.number_of_services} departments.`
    : "";

  return (
    <APIFetchHandler
      name="Departments"
      height="100%"
      error={servicesError || ""}
      isLoading={servicesLoading}
      hasSuccess={servicesSuccess}
      reloadHandler={() => {
        fetchServices();
      }}
      ChildContainer={React.Fragment}
    >
      <StepPageLayout title="Choose Your Departments" subtitle={subtitle}>
        <div className="mt-3 relative">
          <ServiceCounter
            service_ids={service_ids.map((item) => item.toString())}
            max={currentlyActivePlan?.number_of_services || 0}
          />
          <h1 className="text-lg font-semibold">
            Select the medical departments you need
            {currentPlan ? " and we will decide the right plan for you" : ""}.
          </h1>
          <p className="text-base text-muted-foreground mt-1">
            {service_ids?.length} selected out of maximum which is{" "}
            {currentlyActivePlan?.number_of_services ||
              currentPlan?.number_of_services}
            .
          </p>

          <div className="mt-4 max-w-md">
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {errors?.services && (
              <p className="text-sm text-destructive mt-2">{errors.services}</p>
            )}
          </div>

          <div className="mt-2 max-h-[50dvh] overflow-y-auto">
            {searchItems?.length === 0 ? (
              <div className="text-center text-muted-foreground">
                No departments found
              </div>
            ) : (
              <>
                <div className="most-used mr-2 my-4 border-primary border-2 relative mt-10 pt-2 rounded-tr-sm rounded-br-sm rounded bl-sm">
                  <div className="absolute -top-10 -left-1 bg-primary text-background p-2 rounded-tr-sm rounded-br-sm rounded bl-sm">
                    Most Used
                  </div>
                  <div className="px-2 py-2">
                    {searchFilteredItems
                      ?.filter((item) => priority.has(item.id))
                      .reverse()
                      .map((service) => (
                        <CheckboxMedicalDepartments
                          key={service.id}
                          state={new Set(service_ids)}
                          currentPlan={currentPlan}
                          service={service}
                          updateState={updateState}
                        />
                      ))}
                  </div>
                </div>
                <div className="px-2">
                  {searchFilteredItems

                    ?.filter((item) => !priority.has(item.id))
                    .map((service) => (
                      <CheckboxMedicalDepartments
                        key={service.id}
                        state={new Set(service_ids)}
                        currentPlan={currentPlan}
                        service={service}
                        updateState={updateState}
                      />
                    ))}
                </div>
              </>
            )}
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-4 border-t bg-background p-4 sm:flex-row">
          <div>Current Plan: {currentlyActivePlan?.name}</div>
          {currentlyActivePlan?.image && (
            <Image
              src={currentlyActivePlan.image}
              alt={currentlyActivePlan.name}
              height={50}
              width={50}
              className="h-[50px] object-contain"
            />
          )}
          <div className="flex flex-col w-full sm:w-2/5">
            <p className="m-0 text-sm">
              NRP {currentlyActivePlan?.price_for_first_year}
              <span className="text-emerald-500 ml-1 text-xs">
                registration cost
              </span>
            </p>
            <p className="m-0 text-sm">
              NRP {currentlyActivePlan?.price_per_year || 12 / 12}
              <span className="text-emerald-500 ml-1 text-xs">per month</span>
            </p>
          </div>
        </div>
      </StepPageLayout>
    </APIFetchHandler>
  );
};

export default ChooseYourDepartments;

const CheckboxMedicalDepartments = ({
  state,
  service,
  currentPlan,
  updateState,
}: {
  state: Set<number>;
  service: Service;
  currentPlan?: Plan;
  updateState: (id: number) => void;
}) => {
  const { services } = useSignUpStore();
  const disabled =
    !state.has(service.id) &&
    state.size === (currentPlan?.number_of_services || services?.length);
  return (
    <div
      key={service.id}
      className="pb-3 group"
      onClick={() => !disabled && updateState(service.id)}
    >
      <div
        key={service.id}
        className={cn(
          "flex items-center gap-3 group-hover:bg-primary-100 z-10 border-1 border-primary/20 rounded-md hover:shadow transition cursor-pointer",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        <Checkbox
          id={service.name}
          checked={state.has(service.id)}
          onCheckedChange={() => updateState(service.id)}
          className="ml-4"
          disabled={disabled}
        />
        <Label htmlFor={"#" + service.name} className=" flex-1 p-4">
          <div className="font-medium">{service.name}</div>
          <div className="text-xs text-muted-foreground">
            {service.description}
          </div>
        </Label>
      </div>
    </div>
  );
};
