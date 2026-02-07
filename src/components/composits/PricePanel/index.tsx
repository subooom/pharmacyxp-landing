"use client";
import React, { Fragment, useEffect, useState } from "react";
import PriceCard from "./Card";
import Api from "@/lib/api";
import APIFetchHandler from "@/components/utils/ApiFetchHandler";
import DarkPanel from "../DarkPanel";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants/routes";
import SectionTitle from "../SectionTitle";
import { Button } from "@/components/ui/button";
import { AxiosError, AxiosResponse } from "axios";
import { backupPlans, Plan } from "./data";
import { setLocalPlan } from "@/lib/utils";
import constants from "@/config/constants";

function PricePanel() {
  const [plans, setPlans] = useState<Plan[]>(backupPlans);
  const [plansError, setPlansError] = useState("");
  const [plansLoading, setPlansLoading] = useState(false);
  const [plansSuccess, setPlansSuccess] = useState(true);
  const router = useRouter();

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
  }, [plans]);

  return (
    <DarkPanel className="flex flex-col items-center gap-4 relative bg-transparent py-0 mt-4 lg:-mt-44">
      <SectionTitle
        title="Our"
        titleContinued="Plans"
        description="We don't ask for credit cards, it's free for the first 3 months. You can decide if you wanna pay or not later on."
      />
      <APIFetchHandler
        height="auto"
        name="Our Plans"
        error={plansError}
        className="layout-container flex flex-col gap-4 mt-6"
        isLoading={plansLoading}
        hasSuccess={plansSuccess}
        reloadHandler={getPlans}
        ChildContainer={Fragment}
      >
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4 lg:gap-5 md:gap-4 w-full justify-items-center md:justify-items-stretch">
          {plans &&
            plans.map((plan) => {
              const {
                id,
                name,
                image,
                number_of_services,
                price_per_year,
                price_for_first_year,
                features,
              } = plan;
              return (
                <PriceCard
                  key={id}
                  onClick={() => {
                    setLocalPlan(id);
                    router.push(Routes.sign_up);
                  }}
                  id={id}
                  name={name}
                  image={image}
                  price_per_year={price_per_year}
                  price_for_first_year={price_for_first_year}
                  number_of_services={number_of_services}
                  features={`${features}`}
                  discount={constants.discountPercentage}
                />
              );
            })}
        </div>

        <p className="mt-3 lg:max-w-2xl lg:mx-auto text-[#948ebe] text-lg mb-6 text-left lg:text-center">
          <small className="text-sm">
            Accounts with overdue payments will be paused until the outstanding
            balance is settled
          </small>
        </p>

        <Link href={Routes.sign_up} className="flex justify-center lg:mx-auto">
          <Button className="lg:mx-auto ">Get Started</Button>
        </Link>
      </APIFetchHandler>
    </DarkPanel>
  );
}

export default PricePanel;
