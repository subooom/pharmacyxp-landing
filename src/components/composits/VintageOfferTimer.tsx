"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import constants from "@/config/constants";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const LaunchPulseTimer = ({ className }: { className?: string }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + constants.discountDays);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

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
      <div className="relative w-11 h-14 md:w-14 md:h-16 flex items-center justify-center rounded-xl bg-slate-950/90 shadow-xl border border-white/10 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value} // Only animates when this specific digit changes
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -15, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={cn("text-xl md:text-2xl font-black text-white", color)}
          >
            {String(value).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
      </div>
      <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-primary-950/80">
        {label}
      </span>
    </div>
  );

  return (
    <div className={cn("flex flex-col  gap-4 items-start", className)}>
      {/* Trendy Discount Header */}
      <div className="flex flex-col items-start gap-1">
        <span className="text-[10px] font-black tracking-[0.3em] text-primary-300 dark:text-white/80 uppercase">
          Founder's Special
        </span>
        <div className="flex items-start gap-2 bg-primary dark:bg-white/10  px-4 py-2 rounded-lg border border-primary-200 dark:border-white/20">
          <h2 className="text-xl md:text-2xl font-black tracking-tight text-white dark:text-primary-950   i">
            {constants.discountPercentage}%{" "}
            <span className="text-white dark:text-primary-950  italic">
              OFF
            </span>
          </h2>
        </div>
      </div>

      {/* Modern Timer Grid */}
      <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-primary-100/50 dark:bg-white/5 border border-primary-200 dark:border-white/10 backdrop-blur-md">
        <Digit value={timeLeft.days} label="Days" color="text-blue-400" />
        <span className="mb-5 font-bold text-primary-950 text-2xl">:</span>
        <Digit value={timeLeft.hours} label="Hrs" color="text-purple-400" />
        <span className="mb-5 font-bold text-primary-950 text-2xl">:</span>
        <Digit value={timeLeft.minutes} label="Min" color="text-emerald-400" />
        <span className="mb-5 font-bold text-primary-950 text-2xl">:</span>
        <Digit value={timeLeft.seconds} label="Sec" color="text-rose-400" />
      </div>

      <p className="text-[11px] font-medium text-primary-400 dark:text-white/80  italic">
        *Applied automatically at checkout
      </p>
    </div>
  );
};

export default LaunchPulseTimer;
