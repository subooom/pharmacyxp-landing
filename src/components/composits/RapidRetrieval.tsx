"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LocateFixed, Clock, Zap } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Routes } from "@/constants/routes";

export default function RapidRetrieval() {
  const router = useRouter();
  return (
    <section className="w-full py-16 md:py-20 lg:py-12 bg-primary-100 ">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Image Section - Order 1 (Left) */}
          <div className="relative order-1 lg:order-1">
            <Card className="overflow-hidden border border-muted-foreground/30 shadow-lg p-0">
              <CardContent className="p-0">
                <div className="aspect-[16/9] relative">
                  <Image
                    src="/Gemini_Generated_Image_23v63723v63723v6.png" // Placeholder for an image showing a search result with a rack ID (e.g., "MR.H3")
                    alt="Digital inventory lookup showing the physical rack location"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Floating badge */}
                  <div className="absolute bottom-4 left-4 bg-secondary text-secondary-foreground px-4 py-1.5 rounded-full text-sm font-semibold shadow-md z-10">
                    Location: MR.H3
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Content Section - Order 2 (Right) */}
          <div className="space-y-8 order-2 lg:order-2">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <LocateFixed className="h-4 w-4" />
                Precision Speed
              </div>

              <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-5xl">
                Achieve <span className="text-primary">5-Second Retrieval</span>{" "}
                for Every Item
              </h2>

              <p className="text-lg text-muted-foreground md:text-xl">
                Eliminate time wasted searching. Our system provides the exact
                physical rack slot for immediate access, making new staff
                instantly productive.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Instant Lookup</h4>
                  <p className="text-sm text-muted-foreground">
                    Digital searches return rack coordinates, not just
                    quantities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full bg-primary/10 shrink-0">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg">Boosted Throughput</h4>
                  <p className="text-sm text-muted-foreground">
                    Faster dispensing means happier customers and more daily
                    transactions.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => {
                  router.push(Routes.sign_up);
                }}
                size="lg"
                variant="outline"
              >
                See Retrieval in Action
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
