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
    <section className="w-full py-12 md:py-16 lg:py-20 bg-transparent">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Palette className="h-4 w-4" />
                Rack Intelligence
              </div>

              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                <span className="text-primary">Faster</span> racks. Zero expired
                stock.
              </h2>

              <p className="text-lg text-primary-700 md:text-xl">
                Build color-coded racks and print smart labels up to{" "}
                <span className="font-semibold text-foreground">
                  5&quot;×16&quot;
                </span>
                .
              </p>
            </div>

            {/* Features */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-primary/10">
                  <Ruler className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Rack Builder</h4>
                  <p className="text-sm text-primary-700">
                    Set rows × columns with color mapping.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 p-1.5 rounded-lg bg-primary/10">
                  <Printer className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Label Print</h4>
                  <p className="text-sm text-primary-700">
                    Print any rack size instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3">
              {[
                "Visual stock at a glance",
                "Fast retrieval system",
                "Print-ready layouts",
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{text}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={() => router.push(Routes.sign_up)}
                size="lg"
                className="bg-primary hover:bg-primary/90"
              >
                Build Now
              </Button>
              <Button
                onClick={() => router.push(Routes.sign_up)}
                size="lg"
                variant="outline"
              >
                Live Demo
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Card className="overflow-hidden border-2 border-primary/20 shadow-xl p-0">
              <CardContent className="p-0">
                <div className="aspect-[4/3] relative">
                  <Image
                    src="/Gemini_Generated_Image_exvo2yexvo2yexvo.png"
                    alt="Rack system visualization"
                    fill
                    className="object-cover"
                    priority
                  />
                  <Image
                    src="/logo.png"
                    alt="medicinexp Logo"
                    width={169}
                    height={120}
                    className="absolute bottom-4 right-4 bg-primary-100 dark:bg-primary-950 p-3 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium shadow-lg z-10">
              Smart 3D Rack
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
