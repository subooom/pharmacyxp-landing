"use client";

import APIFetchHandler from "@/components/utils/ApiFetchHandler";
import Api from "@/lib/api";
import { AxiosError, AxiosResponse } from "axios";
import React, { Fragment, useEffect, useState } from "react";
import SmallPriceCard from "./SmallPriceCard";
import FeatureComparisonTable from "./FeatureComparisionTable";
import { backupPlans, Plan } from "@/components/composits/PricePanel/data";

function PriceSection() {
  const [plans, setPlans] = useState<Plan[]>(backupPlans);
  const [plansError, setPlansError] = useState("");
  const [plansLoading, setPlansLoading] = useState(false);
  const [plansSuccess, setPlansSuccess] = useState(true);

  const getPlans = () => {
    setPlansLoading(true);
    setPlansError("");
    Api.get("/plans")
      .then((resp: AxiosResponse) => {
        setPlans(resp.data[0]);
        setPlansLoading(false);
        setPlansSuccess(true);
      })
      .catch((err: AxiosError) => {
        setPlansLoading(false);
        setPlansSuccess(false);
        setPlansError(err.message);
      });
  };

  useEffect(() => {
    if (backupPlans.length === 0) {
      getPlans();
    }
  }, []);

  return (
    <APIFetchHandler
      name="Our Plans"
      error={plansError}
      className="grid grid-cols-5 gap-4 mt-20"
      isLoading={plansLoading}
      hasSuccess={plansSuccess}
      reloadHandler={getPlans}
      ChildContainer={Fragment}
    >
      <>
        <div className="first-col-buffer"> </div>
        <div className="col-span-4">
          {/* Responsive cards grid - FIXED SECTION */}
          <div
            className="grid grid-cols-1 gap-6  justify-items-center
              sm:grid-cols-2 sm:gap-4
              md:grid-cols-2 md:gap-6
              lg:grid-cols-3 lg:gap-8
              xl:grid-cols-4 xl:gap-8"
          >
            {plans.map((item) => (
              <div
                key={item.id}
                className="w-full max-w-[280px] 
                  sm:max-w-[250px]
                  md:max-w-[260px]
                  lg:max-w-[280px]"
              >
                <SmallPriceCard plan={item} />
              </div>
            ))}
          </div>
        </div>
        {/* {plans.map((item) => (
          <SmallPriceCard key={item.id} plan={item} />
        ))} */}
        <div className="col-span-5 text-center flex flex-col bg-background gap-4">
          <FeatureComparisonTable category={1} />
          <FeatureComparisonTable category={2} />
          <FeatureComparisonTable category={3} />
        </div>
      </>
    </APIFetchHandler>
  );
}

export default PriceSection;
