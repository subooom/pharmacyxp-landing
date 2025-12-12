"use client";

import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingDown, Calculator, X, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Color hierarchy - primary for savings, alert for wastage
const PRIMARY_COLOR = "text-primary";
const PRIMARY_COLOR_DARK = "dark:text-primary";
const PRIMARY_ACCENT = "bg-primary-200/10";
const PRIMARY_ACCENT_DARK = "dark:bg-primary-400/10";
const PRIMARY_ACTION = "bg-primary-600";
const PRIMARY_ACTION_DARK = "dark:bg-primary-500";

const ALERT_COLOR = "text-red-600";
const ALERT_COLOR_DARK = "dark:text-red-400";
const ALERT_ACCENT = "bg-red-500/10";
const ALERT_ACCENT_DARK = "dark:bg-red-400/10";

const SUCCESS_COLOR = "text-green-600";
const SUCCESS_COLOR_DARK = "dark:text-green-400";

interface SavingsCalculatorDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Industry-standard wastage rates based on research
const BASELINE_WASTAGE_RATE = 0.08; // 8% without FEFO
const FEFO_WASTAGE_REDUCTION = 0.6; // 60% reduction in wastage

// Expiry period impact factors
const EXPIRY_IMPACT_FACTORS = {
  1: 1.4,
  2: 1.0,
  3: 0.8,
  4: 0.6,
  5: 0.5,
};

// Slow-moving portion based on expiry
const SLOW_MOVING_PORTION = {
  1: 0.35,
  2: 0.3,
  3: 0.25,
  4: 0.2,
  5: 0.15,
};

// Price tiers
const LOW_PRICE = 20;
const MID_PRICE = 120;
const HIGH_PRICE = 800;

// Organization type price mixes
const PRICE_MIX = {
  A: { low: 0.6, mid: 0.35, high: 0.05 }, // Pharmacy
  B: { low: 0.5, mid: 0.4, high: 0.1 }, // Polyclinic
  C: { low: 0.3, mid: 0.5, high: 0.2 }, // Hospital
};

export function SavingsCalculatorDrawer({
  open,
  onOpenChange,
}: SavingsCalculatorDrawerProps) {
  const [medicinesCount, setMedicinesCount] = useState<number>(100);
  const [averageQuantity, setAverageQuantity] = useState<number>(50);
  const [averageExpiry, setAverageExpiry] = useState<number>(2);
  const [orgType, setOrgType] = useState<"A" | "B" | "C">("B"); // Default Polyclinic
  const [savings, setSavings] = useState<number>(0);
  const [currentWastage, setCurrentWastage] = useState<number>(0);
  const [fefoWastage, setFefoWastage] = useState<number>(0);
  const [effectiveWastageRate, setEffectiveWastageRate] = useState<number>(
    BASELINE_WASTAGE_RATE,
  );

  useEffect(() => {
    calculateRealisticSavings();
  }, [medicinesCount, averageQuantity, averageExpiry, orgType]);

  const calculateRealisticSavings = () => {
    // Expiry impact factor
    const expiryImpact =
      EXPIRY_IMPACT_FACTORS[
        averageExpiry as keyof typeof EXPIRY_IMPACT_FACTORS
      ] || 1.0;
    const effRate = BASELINE_WASTAGE_RATE * expiryImpact;
    setEffectiveWastageRate(effRate);

    // Determine average unit price based on orgType
    const mix = PRICE_MIX[orgType];
    const avgPrice =
      mix.low * LOW_PRICE + mix.mid * MID_PRICE + mix.high * HIGH_PRICE;

    // Total inventory value
    const totalInventoryValue = medicinesCount * averageQuantity * avgPrice;

    // Apply slow-moving portion
    const slowValue =
      totalInventoryValue * (SLOW_MOVING_PORTION[averageExpiry] ?? 0.25);

    // Wastage calculations
    const annualWastageWithoutFEFO = slowValue * effRate;
    const annualWastageWithFEFO =
      annualWastageWithoutFEFO * (1 - FEFO_WASTAGE_REDUCTION);
    const annualSavings = annualWastageWithoutFEFO - annualWastageWithFEFO;

    setCurrentWastage(Math.round(annualWastageWithoutFEFO));
    setFefoWastage(Math.round(annualWastageWithFEFO));
    setSavings(Math.round(annualSavings));
  };

  const formatNumber = (num: number): string =>
    new Intl.NumberFormat("en-IN").format(num);

  const formatPercentage = (rate: number): string =>
    `${(rate * 100).toFixed(0)}%`;

  const getExpiryDescription = (expiry: number): string => {
    const descriptions = {
      1: "High Turnover (Higher wastage risk)",
      2: "Medium Turnover (Standard risk)",
      3: "Balanced Turnover (Lower risk)",
      4: "Slow Turnover (Much lower risk)",
      5: "Very Slow Turnover (Minimal risk)",
    };
    return descriptions[expiry as keyof typeof descriptions] || "Standard risk";
  };

  const getExpiryImpactText = (expiry: number): string => {
    const impact =
      EXPIRY_IMPACT_FACTORS[expiry as keyof typeof EXPIRY_IMPACT_FACTORS];
    if (impact > 1) return `+${((impact - 1) * 100).toFixed(0)}% wastage risk`;
    if (impact < 1) return `-${((1 - impact) * 100).toFixed(0)}% wastage risk`;
    return "Standard wastage risk";
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={cn("max-h-[90vh] overflow-hidden")}>
        <div className="p-6 mx-auto w-full max-w-4xl overflow-y-auto">
          <DrawerHeader className="px-0 pt-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 w-full">
                <div
                  className={cn(
                    "p-2 rounded-full",
                    PRIMARY_ACCENT,
                    PRIMARY_ACCENT_DARK,
                  )}
                >
                  <Calculator
                    className={cn("h-6 w-6", PRIMARY_COLOR, PRIMARY_COLOR_DARK)}
                  />
                </div>
                <div className="flex-1">
                  <DrawerTitle className="text-2xl font-bold">
                    Calculate Your Savings
                  </DrawerTitle>
                  <DrawerDescription>
                    See how much you can save with our Location-Based FEFO
                    system
                  </DrawerDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onOpenChange(false)}
                  className="h-8 w-8 ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </DrawerHeader>

          <div className="space-y-6 mt-6">
            {/* Organization Type */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="org-type" className="text-base font-semibold">
                  Organization Type
                </Label>
              </div>
              <Select
                value={orgType}
                onValueChange={(value) => setOrgType(value as "A" | "B" | "C")}
              >
                <SelectTrigger id="org-type" className="w-full">
                  <SelectValue placeholder="Select organization type">
                    {orgType === "A"
                      ? "Pharmacy"
                      : orgType === "B"
                        ? "Polyclinic"
                        : "Hospital"}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="A">Pharmacy (Mostly generics)</SelectItem>
                  <SelectItem value="B">Polyclinic (Mixed)</SelectItem>
                  <SelectItem value="C">Hospital (Many departments)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Medicines Count */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="medicines-count"
                  className="text-base font-semibold"
                >
                  Number of Medicines
                </Label>
                <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  {formatNumber(medicinesCount)}
                </span>
              </div>
              <Slider
                id="medicines-count"
                min={10}
                max={1000}
                step={10}
                value={[medicinesCount]}
                onValueChange={(value) => setMedicinesCount(value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>10</span>
                <span>1,000</span>
              </div>
            </div>

            {/* Average Quantity */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="average-quantity"
                  className="text-base font-semibold"
                >
                  Average Quantity per Medicine
                </Label>
                <span className="text-lg font-bold text-gray-700 dark:text-gray-300">
                  {formatNumber(averageQuantity)}
                </span>
              </div>
              <Slider
                id="average-quantity"
                min={10}
                max={500}
                step={10}
                value={[averageQuantity]}
                onValueChange={(value) => setAverageQuantity(value[0])}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>10</span>
                <span>500</span>
              </div>
            </div>
            {/* Total Inventory Value */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="org-type" className="text-base font-semibold">
                  Total Inventory Value
                </Label>
              </div>
              <div className={cn("text-2xl font-bold text-primary")}>
                NPR{" "}
                {formatNumber(
                  medicinesCount *
                    averageQuantity *
                    (PRICE_MIX[orgType].low * LOW_PRICE +
                      PRICE_MIX[orgType].mid * MID_PRICE +
                      PRICE_MIX[orgType].high * HIGH_PRICE),
                )}
              </div>
            </div>
            {/* Average Expiry */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="average-expiry"
                  className="text-base font-semibold"
                >
                  Average Expiry Period
                </Label>
                <span className="text-sm text-muted-foreground">
                  {getExpiryImpactText(averageExpiry)}
                </span>
              </div>
              <Select
                value={averageExpiry.toString()}
                onValueChange={(value) => setAverageExpiry(Number(value))}
              >
                <SelectTrigger id="average-expiry" className="w-full">
                  <SelectValue placeholder="Select expiry period">
                    {getExpiryDescription(averageExpiry)}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">
                    1 Year - High Turnover (Higher wastage risk)
                  </SelectItem>
                  <SelectItem value="2">
                    2 Years - Medium Turnover (Standard risk)
                  </SelectItem>
                  <SelectItem value="3">
                    3 Years - Balanced Turnover (Lower risk)
                  </SelectItem>
                  <SelectItem value="4">
                    4 Years - Slow Turnover (Much lower risk)
                  </SelectItem>
                  <SelectItem value="5">
                    5 Years - Very Slow Turnover (Minimal risk)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Savings Display */}
            <Card
              className={cn(
                "border-2",
                PRIMARY_ACCENT,
                "border-primary-200 dark:border-primary-800",
              )}
            >
              <CardContent className="p-6">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <TrendingDown className="h-4 w-4" />
                    Estimated Yearly Savings
                  </div>
                  <div
                    className={cn(
                      "text-4xl font-bold",
                      PRIMARY_COLOR,
                      PRIMARY_COLOR_DARK,
                    )}
                  >
                    NPR {formatNumber(savings)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Based on your inventory profile and expiry patterns
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Wastage Comparison */}
            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="grid grid-cols-2 gap-12 text-center relative">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      Current Wastage
                    </div>
                    <div
                      className={cn(
                        "text-lg font-bold",
                        ALERT_COLOR,
                        ALERT_COLOR_DARK,
                      )}
                    >
                      NPR {formatNumber(currentWastage)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatPercentage(effectiveWastageRate)} of inventory
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">
                      With FEFO
                    </div>
                    <div
                      className={cn(
                        "text-lg font-bold",
                        SUCCESS_COLOR,
                        SUCCESS_COLOR_DARK,
                      )}
                    >
                      NPR {formatNumber(fefoWastage)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatPercentage(FEFO_WASTAGE_REDUCTION)} reduction
                    </div>
                  </div>
                  <div className="absolute -bottom-8 right-[50%] text-xs translate-x-1/2 flex flex-col items-center">
                    * Assumed Average Unit Price:
                    <div
                      className={cn(
                        "font-bold",
                        PRIMARY_COLOR,
                        PRIMARY_COLOR_DARK,
                      )}
                    >
                      Low NPR {LOW_PRICE}, Mid NPR {MID_PRICE}, High NPR{" "}
                      {HIGH_PRICE}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Industry Benchmarks */}
            <Card className="border-2 border-gray-200 dark:border-gray-700">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 mt-0.5 text-primary-500" />
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      Industry Benchmarks
                    </h4>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p>
                        • Shorter expiry periods (1-2 years) have higher wastage
                        risk
                      </p>
                      <p>
                        • Longer expiry periods (3-5 years) have lower wastage
                        risk
                      </p>
                      <p>
                        • FEFO provides maximum value for medicines with shorter
                        shelf life
                      </p>
                      <p>
                        • Current adjustment:{" "}
                        {getExpiryImpactText(averageExpiry)}
                      </p>
                      <p>• Price mix applied based on organization type</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calculation Details */}
            <div className="text-sm text-muted-foreground space-y-2">
              <p>
                • Total inventory value: NPR{" "}
                {formatNumber(
                  medicinesCount *
                    averageQuantity *
                    (PRICE_MIX[orgType].low * LOW_PRICE +
                      PRICE_MIX[orgType].mid * MID_PRICE +
                      PRICE_MIX[orgType].high * HIGH_PRICE),
                )}
              </p>
              <p>
                • Effective wastage rate:{" "}
                {formatPercentage(effectiveWastageRate)} (adjusted for{" "}
                {averageExpiry} year expiry)
              </p>
              <p>
                • FEFO wastage reduction:{" "}
                {formatPercentage(FEFO_WASTAGE_REDUCTION)}
              </p>
              <div className="flex items-start gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs italic">
                  *Estimate based on industry averages and your expiry profile.
                  Actual savings depend on your specific inventory mix and
                  current wastage rates. Contact us for a detailed assessment of
                  your pharmacy's potential savings.
                </p>
              </div>
            </div>
          </div>

          <DrawerFooter className="px-0 pb-0 pt-6">
            <Button
              size="lg"
              className={cn(
                "w-full",
                PRIMARY_ACTION,
                PRIMARY_ACTION_DARK,
                "hover:bg-primary-700 dark:hover:bg-primary-600 text-white",
              )}
              onClick={() => {
                console.log("Proceed to sign up");
              }}
            >
              Start Saving Now
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
