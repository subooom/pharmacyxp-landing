import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Routes } from "@/constants/routes";
import LaunchPulseTimer from "./VintageOfferTimer";

export const DiscountBanner: React.FC = () => {
  return (
    <div className="layout-container mx-auto my-12 md:my-20">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-primary px-4 py-6 md:px-12 md:py-12 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.3)] group/container">
        {/* Animated background blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/80 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 animate-pulse delay-700" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            <Badge className="bg-white/20 text-white dark:text-primary-50 mb-8 hover:bg-white/30 border-none px-8 py-2.5 text-xs md:text-sm uppercase tracking-[0.2em] font-black backdrop-blur-xl rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400 animate-bounce" />
              Exclusive Launch Offer
            </Badge>

            <p className="text-white/90 dark:text-primary-50 text-lg md:text-2xl max-w-2xl font-medium leading-relaxed">
              Join the future of pharmacy management today.{" "}
              <br className="hidden sm:block" />
              Experience full-scale automation at half the price.
            </p>
          </div>

          <div className="flex-shrink-0 w-full lg:w-auto">
            <div className=" w-full max-w-2xl scale-90 -translate-x-4 mb-4">
              <LaunchPulseTimer className="w-full" variant="large" />
            </div>
            <Link href={Routes.sign_up} className="block w-full">
              <Button className="w-full lg:w-auto bg-white text-primary hover:bg-primary-50 hover:scale-105 active:scale-95 transition-all duration-300 font-black text-xl px-8 py-4 rounded-[2rem] shadow-[0_15px_30px_rgba(255,255,255,0.2)] flex items-center justify-center group">
                CLAIM DISCOUNT
                <ArrowRight className="ml-4 w-7 h-7 transition-transform duration-300 group-hover:translate-x-3" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Decorative Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.1] pointer-events-none group-hover/container:opacity-[0.12] transition-opacity duration-700"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Bottom shine effect */}
        <div className="absolute -bottom-px left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      </div>
    </div>
  );
};

export default DiscountBanner;
