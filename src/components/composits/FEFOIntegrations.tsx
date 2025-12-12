"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingDown, CalendarClock, Scan } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { SavingsCalculatorDrawer } from "./SavingsCalculatorDrawer";
import { useState } from "react";

// Define a custom color for Expiry/Loss Prevention
const ALERT_COLOR = "text-red-500";
const ALERT_COLOR_DARK = "dark:text-red-400";
const ALERT_ACCENT = "bg-red-500/10";
const ALERT_ACCENT_DARK = "dark:bg-red-400/10";
const ALERT_ACTION = "bg-red-500";
const ALERT_ACTION_DARK = "dark:bg-red-400";

export default function FEFOIntegration() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <section className={`w-full py-12 md:py-16 lg:py-20 bg-primary-100`}>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            {/* Content Section - Order 1 (Left) */}
            <div className="space-y-8 order-1 lg:order-1">
              <div className="space-y-4">
                <div
                  className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${ALERT_ACCENT} ${ALERT_ACCENT_DARK} ${ALERT_COLOR} ${ALERT_COLOR_DARK} text-sm font-medium`}
                >
                  <TrendingDown className="h-4 w-4" />
                  Loss Prevention Strategy
                </div>

                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-5xl">
                  Minimize Losses with{" "}
                  <span className={cn(ALERT_COLOR, ALERT_COLOR_DARK)}>
                    Location-Based FEFO
                  </span>
                </h2>

                <p className="text-lg text-muted-foreground md:text-xl">
                  Stop throwing away expired stock. Our system uses rack-slot
                  location data to enforce a strict First Expired, First Out
                  (FEFO) strategy.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-full ${ALERT_ACCENT} ${ALERT_ACCENT_DARK} shrink-0`}
                  >
                    <CalendarClock
                      className={`h-5 w-5 ${ALERT_COLOR} ${ALERT_COLOR_DARK}`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Priority Engine</h4>
                    <p className="text-sm text-muted-foreground">
                      The billing search auto-prioritizes critical stock
                      (expiry/low qty) — and we can locate their rack slots in
                      seconds via reports.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-full ${ALERT_ACCENT} ${ALERT_ACCENT_DARK} shrink-0`}
                  >
                    <CalendarClock
                      className={`h-5 w-5 ${ALERT_COLOR} ${ALERT_COLOR_DARK}`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Proactive Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Generate reports identifying the exact rack slots with
                      soon-to-expire or low-stock items.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-full ${ALERT_ACCENT} ${ALERT_ACCENT_DARK} shrink-0`}
                  >
                    <Scan
                      className={`h-5 w-5 ${ALERT_COLOR} ${ALERT_COLOR_DARK}`}
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Guided Stocking</h4>
                    <p className="text-sm text-muted-foreground">
                      Staff are guided to place incoming batches behind older,
                      existing stock based on the rack ID.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  onClick={() => setIsDrawerOpen(true)}
                  size="lg"
                  className={`${ALERT_ACTION} ${ALERT_ACTION_DARK} hover:${ALERT_ACCENT}/90 transition-colors`}
                >
                  Calculate Your Savings
                </Button>
              </div>
            </div>

            {/* Image Section - Order 2 (Right) */}
            <div className="relative order-2 lg:order-2">
              <Card className={`border-2 ${ALERT_ACCENT}/30 shadow-2xl p-0`}>
                <CardContent className="p-0">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src="/Gemini_Generated_Image_opoxnlopoxnlopox.png" // Placeholder for an image showing a system alert with location and expiry date
                      alt="Digital system showing FEFO alert with rack ID location"
                      fill
                      className="object-cover rounded-xl"
                      priority
                    />
                    {/* Floating badge */}
                    <div
                      className={`absolute -top-3 -right-3 ${ALERT_ACCENT} text-primary-foreground px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg z-10`}
                    >
                      Reduce Expiry Loss
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <SavingsCalculatorDrawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      />
    </>
  );
}
