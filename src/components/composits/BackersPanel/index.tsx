"use client";
import DarkPanel from "../DarkPanel";
import { useEffect, useState } from "react";
import Api from "@/lib/api";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type PartnersInfoType = {
  count: number;
  orgs: { name: string; logo: string }[];
};
function BackersPanel() {
  const [partners, setPartners] = useState<PartnersInfoType>({
    count: 0,
    orgs: [],
  });

  useEffect(() => {
    Api.get("/partners/info").then((response) => {
      // Handle the response if needed
      setPartners(response.data);
    });
  }, []);

  return (
    <DarkPanel className="py-4 md:py-8 lg:py-16 bg-transparent mt-8 lg:mt-4 md:-mt-5 mb-0 lg:-mb-32 flex min-h-fit flex-col gap-6 items-center justify-center  ">
      <p className="text-3xl text-primary-800 font-medium max-sm:text-xl text-center  ">
        Trusted by{" "}
        {partners.count === 0 ? (
          <>
            God!
            <br /> <br /> <span className="text-[72px]">ॐ</span>
          </>
        ) : (
          partners.count + "+ Healthcare Orgs"
        )}
      </p>
      <div
        className="flex gap-8 flex-wrap justify-center"
        style={{ height: partners.orgs.length == 0 ? 88 : "fit-content" }}
      >
        {partners.orgs.map((org, i) => (
          <Tooltip key={i}>
            <TooltipTrigger asChild>
              <div className="flex bg-primary rounded-full  p-2 lg:p-4 flex-col gap-2 items-center text-primary-100">
                <Avatar className="h-12 lg:h-14 w-12 lg:w-14  ">
                  <AvatarImage
                    src={org.logo}
                    alt="Organization Logo"
                    className="saturate-150 mix-blend-color-dodge"
                  />
                  <AvatarFallback>
                    {org.name?.substring(0, 2).toUpperCase() || "ORG"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{org.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </DarkPanel>
  );
}

export default BackersPanel;
