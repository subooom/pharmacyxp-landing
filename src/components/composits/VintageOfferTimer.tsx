"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import constants from "@/config/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isActive: boolean;
  isUpcoming: boolean;
}

interface LaunchPulseTimerProps {
  className?: string;
  variant?: "large" | "mini";
  offerName?: string;
  discount?: number;
}

const LaunchPulseTimer: React.FC<LaunchPulseTimerProps> = ({
  className,
  variant = "large",
  offerName = "Founder's Special",
  discount = constants.discountPercentage,
}) => {
  const calculateTimeLeft = useCallback(() => {
    const now = new Date().getTime();
    const start = new Date(constants.discountStartDate).getTime();
    const end = new Date(constants.discountEndDate).getTime();

    let target = end;
    const isActive = now >= start && now <= end;
    const isUpcoming = now < start;

    if (isUpcoming) {
      target = start;
    }

    const difference = target - now;

    if (difference <= 0 && !isUpcoming) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isActive: false,
        isUpcoming: false,
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isActive,
      isUpcoming,
    };
  }, []);

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    // Throttle: runs exactly every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  const Digit = ({
    value,
    label,
    color,
  }: {
    value: number;
    label: string;
    color: string;
  }) => (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-xl bg-slate-950/90 shadow-xl border border-white/10 overflow-hidden",
          variant === "large"
            ? "w-11 h-14 md:w-14 md:h-16"
            : "w-6 h-8 rounded-lg",
        )}
      >
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={cn(
              "font-black text-white font-[family-name:var(--font-josefin-sans)]",
              variant === "large" ? "text-xl md:text-2xl" : "text-[10px]",
              color,
            )}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </div>
      <span
        className={cn(
          "font-bold uppercase tracking-[0.2em] text-primary-950/80",
          variant === "large" ? "text-[9px]" : "text-[5px]",
        )}
      >
        {label}
      </span>
    </div>
  );

  if (!timeLeft.isActive && !timeLeft.isUpcoming) return null;

  return (
    <div
      className={cn(
        "flex flex-col items-start",
        variant === "large" ? "gap-4" : "gap-1 w-[100px]",
        className,
      )}
    >
      <div className="flex flex-col items-start gap-1">
        <span
          className={cn(
            "font-black tracking-[0.3em] text-primary-300 dark:text-white/80 uppercase",
            variant === "large" ? "text-[10px]" : "text-[5px]",
          )}
        >
          {timeLeft.isUpcoming ? "Starts In" : offerName}
        </span>
        <div
          className={cn(
            "flex items-start gap-2 bg-primary dark:bg-white/10 rounded-lg border border-primary-200 dark:border-white/20",
            variant === "large" ? "px-4 py-2" : "px-2 py-0.5 rounded-md",
          )}
        >
          <h2
            className={cn(
              "font-black tracking-tight text-white dark:text-primary-950",
              variant === "large" ? "text-xl md:text-2xl" : "text-[8px]",
            )}
          >
            {discount}% <span className="italic">OFF</span>
          </h2>
        </div>
      </div>

      <div
        className={cn(
          "flex items-center rounded-2xl bg-primary-100/50 dark:bg-white/5 border border-primary-200 dark:border-white/10 backdrop-blur-md",
          variant === "large"
            ? "gap-2 px-4 py-3"
            : "gap-1 px-1.5 py-1 rounded-xl",
        )}
      >
        <Digit value={timeLeft.days} label="Days" color="text-blue-400" />
        <span
          className={cn(
            "font-bold text-primary-950",
            variant === "large" ? "mb-5 text-2xl" : "mb-2 text-xs",
          )}
        >
          :
        </span>
        <Digit value={timeLeft.hours} label="Hrs" color="text-purple-400" />
        <span
          className={cn(
            "font-bold text-primary-950",
            variant === "large" ? "mb-5 text-2xl" : "mb-2 text-xs",
          )}
        >
          :
        </span>
        <Digit value={timeLeft.minutes} label="Min" color="text-emerald-400" />
        <span
          className={cn(
            "font-bold text-primary-950",
            variant === "large" ? "mb-5 text-2xl" : "mb-2 text-xs",
          )}
        >
          :
        </span>
        <Digit value={timeLeft.seconds} label="Sec" color="text-rose-400" />
      </div>

      {variant === "large" && (
        <p className="text-[11px] font-medium text-primary-400 dark:text-white/80 italic">
          *Applied automatically at checkout
        </p>
      )}
    </div>
  );
};

export default LaunchPulseTimer;
