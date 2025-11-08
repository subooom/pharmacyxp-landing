"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Printer, Ruler } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants/routes";

export default function RackIntelligence() {
  const router = useRouter();
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-transparent to-muted/20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content Section */}
          <div className="space-y-6 order-1 lg:order-1">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Palette className="h-4 w-4" />
                Physical Rack Intelligence
              </div>

              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Turn your physical racks into a{" "}
                <span className="text-primary">color-coded</span>, visual
                inventory system
              </h2>

              <p className="text-lg text-muted-foreground md:text-xl">
                Custom rack builder + printable rack-slot labels up to{" "}
                <span className="font-semibold text-foreground">5"×16"</span>
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-primary/10">
                  <Ruler className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Custom Rack Builder</h4>
                  <p className="text-sm text-muted-foreground">
                    Define rows × columns with color coating
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-primary/10">
                  <Printer className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Smart Label Printing</h4>
                  <p className="text-sm text-muted-foreground">
                    Print labels in any size up to 5"×16"
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits List */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium">
                  Instant visual inventory recognition
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium">
                  Color-coded rack slots for quick identification
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium">
                  Export as JPEG for high-quality printing
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium">
                  Landscape/Portrait printing with stretch-to-fit
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => {
                  router.push(Routes.sign_up);
                }}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Build Your Rack System
              </Button>
              <Button
                onClick={() => {
                  router.push(Routes.sign_up);
                }}
                size="lg"
                variant="outline"
              >
                See Live Demo
              </Button>
            </div>
          </div>
          {/* Image Section */}
          <div className="relative order-2 lg:order-2">
            <Card className="overflow-hidden border-2 border-primary/20 shadow-xl p-0">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/Gemini_Generated_Image_exvo2yexvo2yexvo.png"
                    alt="Color-coded pharmacy rack system with organized medicine slots"
                    fill
                    className="object-cover"
                    priority
                  />
                  <Image
                    src="/logo.png"
                    alt="MedicineXP Logo"
                    width={169}
                    height={120}
                    className="absolute bottom-4 right-4 bg-primary-100 dark:bg-primary-950 p-3 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg z-10">
              Smart 3D Back System
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
