"use client";

import {
  Ruler,
  Printer,
  FileSpreadsheet,
  Handshake,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { X } from "lucide-react";
import { RackQuoteCalculator } from "./RackQuoteCalculator";

const STEPS = [
  {
    number: 1,
    title: "Survey Your Racks",
    description:
      "We visit or video-call to measure your racks, rows, columns, and label sizes.",
    icon: Ruler,
    cta: "Survey Your Rack",
    action: "drawer",
  },
  {
    number: 2,
    title: "We Print Your Coordinates",
    description:
      "Custom color-coded flex labels with barcodes, printed and cut to exact size.",
    icon: Printer,
    cta: null,
    action: null,
  },
  {
    number: 3,
    title: "We Stock Your Inventory",
    description:
      "Optionally, our team bulk-enters your stock into the system so you're live on Day 1.",
    icon: FileSpreadsheet,
    cta: "Add Data Entry",
    action: "drawer",
  },
  {
    number: 4,
    title: "Handover & Go Live",
    description:
      "Your pharmacy is now fully systemized. Scan, stock, and sell smarter.",
    icon: Handshake,
    cta: null,
    action: null,
  },
];

export function OnboardingWizard() {
  return (
    <div className="layout-container mb-12 space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-primary to-purple-600 p-8 text-primary-foreground shadow-2xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3">
          We Survey Your Racks
        </h2>
        <p className="text-base sm:text-lg opacity-90 max-w-2xl">
          A 4-step onboarding that transforms your pharmacy into a fully
          systemized, barcode-driven operation.
        </p>
      </div>

      {/* 4-Step Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <Card
              key={step.number}
              className="border-none shadow-lg bg-white dark:bg-slate-900 hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 text-6xl font-black text-primary/10 select-none">
                {step.number}
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    Step {step.number}
                  </span>
                </div>
                <CardTitle className="text-lg">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              {step.cta && step.action === "drawer" && (
                <CardContent>
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button className="w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                        {step.cta} <ArrowRight className="h-4 w-4" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent
                      side="bottom"
                      className="h-[92vh] sm:h-[88vh] p-0 overflow-y-auto bg-slate-50 dark:bg-slate-950"
                    >
                      <div className="max-w-5xl mx-auto p-4 sm:p-8">
                        <SheetHeader className="mb-6">
                          <div className="flex items-center justify-between">
                            <SheetTitle className="text-2xl font-bold text-primary">
                              {step.title}
                            </SheetTitle>
                            <SheetClose asChild>
                              <Button variant="ghost" size="icon">
                                <X className="h-5 w-5" />
                              </Button>
                            </SheetClose>
                          </div>
                        </SheetHeader>
                        <RackQuoteCalculator />
                      </div>
                    </SheetContent>
                  </Sheet>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
