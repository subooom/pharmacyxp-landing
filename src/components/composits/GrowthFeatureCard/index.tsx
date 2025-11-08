import React from "react";
import { data, Feature, users } from "./data";
import GrowthFeatureCard from "./Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import CardImage from "./CardImage";
import SectionTitle from "../SectionTitle";
import DarkPanel from "../DarkPanel";

function GrowthAndImpact() {
  return (
    <DarkPanel id="features" className="pt-[60px_!important]">
      <SectionTitle
        title="The Tools That Power"
        titleContinued="Your Pharmacy"
        description="From inventory to insights, each feature is built to save time, cut
        costs, and scale your pharmacy faster."
      />
      <div className="features layout-container">
        {/* Section 1: Two-column dashboard + roles */}
        <div className="first-row mx-6 lg:mx-24 grid grid-cols-1 lg:grid-cols-[2fr_1.3fr] mt-6 gap-4">
          {data
            .filter(
              (item) => item.type === "dashboard" || item.type === "roles",
            )
            .map(renderFeature)}
        </div>

        {/* Section 2: Left column updates + support */}
        <div className="bigger-section mt-4 mx-4 grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
          {data.filter((item) => item.type === "3d-rack").map(renderFeature)}
          <div className="grid grid-cols-1 gap-4">
            {data
              .filter((item) => item.type === "income-expenditure")
              .map(renderFeature)}
            <div className="small-cards grid grid-cols-1 max-h-min gap-4">
              {data
                .filter(
                  (item) =>
                    item.type === "updates" || item.type === "call-support",
                )
                .map(renderFeature)}
            </div>
          </div>
          {data
            .filter(
              (item) =>
                item.type === "salary-management" ||
                item.type === "print-support" ||
                item.type === "early-alerts",
            )
            .map(renderFeature)}
          <div className="grid grid-cols-1 gap-4">
            <GrowthFeatureCard
              bottomPanel={
                <div className="h-12">
                  <Button size="lg" className="h-12 w-full rounded-4xl">
                    Get Started
                  </Button>
                </div>
              }
              feature={{
                id: 20,
                title: "...and many more",
                subtitle:
                  "Discover advanced capabilities designed to scale and streamline every aspect of your pharmacy operations.",
                type: "explore-more",
              }}
            />
          </div>
        </div>
      </div>
    </DarkPanel>
  );
}

export default GrowthAndImpact;

const renderMap: Record<
  Feature["type"],
  (item: Feature) => React.ReactElement | React.JSX.Element
> = {
  dashboard: (item: Feature) => (
    <CardImage
      opacity={1}
      alt={item.title}
      image="/assets/images/banner-7.png"
    />
  ),
  roles: () => (
    <div className="mx-6 space-y-4">
      {users.map(({ id, avatar, name, role }) => (
        <div
          className="flex flex-row gap-4 items-center justify-between bg-primary-200/80 dark:bg-primary-600/80 text-primary-900 dark:text-primary-950 rounded-4xl p-4"
          key={id}
        >
          <Avatar className=" h-8 w-8 lg:h-16 lg:w-16 md:h-12 md:w-12">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-primary">
              {name
                .split(" ")
                .map((item) => item.charAt(0).toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <p className="">{name}</p>
            <p className="font-light">{role}</p>
          </div>
          <Button
            size="icon"
            className="bg-foreground rounded-full h-8 w-8 lg:h-16 lg:w-16 md:h-12 md:w-12 hover:bg-foreground/60"
          >
            <Settings />
          </Button>
        </div>
      ))}
    </div>
  ),
  updates: (item: Feature) => (
    <div className="w-full -mb-16">
      <CardImage
        // height={100}
        image="/assets/images/caduceus-symbol.png"
        className="float-right h-12 md:h-24 lg:h-28 xl:h-32"
        alt={item.title}
        opacity={1}
        overlay={false}
      />
    </div>
  ),
  "call-support": (item: Feature) => (
    <div className="w-full -mb-16">
      <CardImage
        // height={100}
        image="/assets/images/customer-service.png"
        alt={item.title}
        className="float-right h-12 md:h-24 lg:h-28 xl:h-32"
        opacity={1}
        overlay={false}
      />
    </div>
  ),
  "early-alerts": (item: Feature) => (
    <CardImage
      // height={400}
      objectPosition="center"
      image="/assets/images/early-alerts.jpg"
      className="h-60 md:h-80 lg:h-100 "
      alt={item.title}
      opacity={1}
    />
  ),
  "3d-rack": (item: Feature) => (
    <CardImage
      image="/assets/images/3d-rack.png"
      width={"100%"}
      height="auto"
      alt={item.title}
      opacity={1}
      overlay={false}
    />
  ),
  "income-expenditure": (item: Feature) => (
    <CardImage
      height={200}
      width="auto"
      image="/assets/images/banner1.png"
      className="h-30 md:h-40 lg:h-50 "
      alt={item.title}
      opacity={1}
    />
  ),
  "print-support": (item: Feature) => (
    <CardImage
      height={400}
      objectPosition="center"
      image="/assets/images/print.png"
      className="h-60 md:h-80 lg:h-100 "
      alt={item.title}
      opacity={1}
    />
  ),
  "salary-management": (item: Feature) => (
    <CardImage
      height={400}
      image="/assets/images/salary-management.jpg"
      className="h-60 md:h-80 lg:h-100 "
      alt={item.title}
      opacity={1}
    />
  ),
};
// const containerClassNamesMap: Record<Feature["type"], string> = {
//   dashboard: "",
//   roles: "",
//   updates: "max-h-min",
//   "call-support": "max-h-min",
//   "early-alerts": "",
//   "3d-rack": "",
//   "income-expenditure": "",
//   "print-support": "",
//   "salary-management": "",
// };
const classNamesMap: Record<Feature["type"], string> = {
  dashboard: "",
  roles: "",
  updates: "justify-start max-h-min",
  "call-support": "justify-start max-h-min",
  "early-alerts": "",
  "3d-rack": "",
  "income-expenditure": "",
  "print-support": "",
  "salary-management": "",
};
const renderFeature = (item: Feature) => {
  const topPanel = renderMap[item.type];
  const classNames = classNamesMap[item.type];
  const containerClassNames = classNamesMap[item.type];
  if (!topPanel) return null;
  return (
    <GrowthFeatureCard
      key={item.id}
      feature={item}
      topPanel={topPanel(item)}
      containerClassNames={containerClassNames}
      className={classNames}
    />
  );
};
