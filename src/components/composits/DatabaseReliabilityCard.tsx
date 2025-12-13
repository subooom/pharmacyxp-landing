"use client";

import { Database, Zap, ShieldCheck } from "lucide-react";

export default function DatabaseReliability() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-transparent">
      <div className="container px-4 md:px-6 mx-auto grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
        {/* Text */}
        <div className="space-y-6">
          <div className="h-1 w-12 bg-primary rounded-full" />

          <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">
            Reliable. Fast.
            <span className="text-primary"> Always yours.</span>
          </h2>

          <p className="text-primary-700 text-lg md:text-xl">
            Every client runs on a private database. Isolated, backed up daily,
            and optimized for lightning-fast queries.
          </p>

          <ul className="space-y-2 text-sm md:text-base">
            <li className="flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              Private databases for every tenant
            </li>
            <li className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Daily encrypted backups
            </li>
            <li className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Faster queries, zero bottlenecks
            </li>
          </ul>
        </div>

        {/* Visual / Accent */}
        <div className="relative flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent blur-3xl rounded-full" />
          <div className="relative bg-background/50 border border-primary/10 backdrop-blur-xl p-8 rounded-2xl shadow-lg text-center dark:border-primary/20">
            <Database className="mx-auto mb-4 h-12 w-12 text-primary" />
            <p className="font-semibold text-lg">99.99% Uptime</p>
            <p className="text-sm text-primary-700">
              Synced, secure, and auto-backed-up.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
