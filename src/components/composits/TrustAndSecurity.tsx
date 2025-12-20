import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Database, Globe, Lock } from "lucide-react";

// TrustAndSecuritySection
// A responsive, dark-mode friendly React component using shadcn/ui + Tailwind.
// - Includes a primary-color accent line
// - Shows enterprise-friendly messaging about DB-per-tenant + subdomain isolation
// - Responsive layout with icons and CTA

export default function TrustAndSecuritySection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-24 -mb-22">
      {/* Decorative primary accent line (left) */}
      <div
        className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-primary/90 to-primary-400 dark:from-primary-300 dark:to-primary-600 hidden sm:block"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:items-center">
          {/* Left: Heading + paragraph */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-extrabold leading-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
              Enterprise-grade trust, built-in.
            </h2>
            <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
              Every organization gets a secure subdomain and a private, isolated
              database — all powered by a single, scalable codebase. This hybrid
              architecture delivers the SaaS economics you want with the data
              isolation and auditability large healthcare providers demand.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Button className="shadow-sm" variant="default">
                Request a Security Brief
              </Button>
              <Button
                asChild
                className="!bg-transparent !text-slate-700 dark:!text-slate-200"
                variant="outline"
              >
                <a href="/contact">Talk to Sales</a>
              </Button>
            </div>
          </div>

          {/* Middle & Right: Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card className="relative overflow-visible border-slate-100 dark:border-slate-800">
                <div className="absolute -left-3 -top-3 inline-flex items-center justify-center rounded-md p-2 bg-gradient-to-br from-primary/80 to-primary-400 text-white shadow-md">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <CardHeader className="pl-6">
                  <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    Isolation by design
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    DB-per-tenant with per-organization subdomains reduces
                    blast-radius and simplifies compliance audits.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-6 pt-0">
                  <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-3">
                      <Database className="h-4 w-4 flex-shrink-0 text-primary-600 dark:text-primary-300 mt-1" />
                      <span>
                        Private database per tenant — separate backups, logs,
                        and restore points.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Globe className="h-4 w-4 flex-shrink-0 text-primary-600 dark:text-primary-300 mt-1" />
                      <span>
                        Unique secure subdomain (org.medicinexp.com) for clear
                        network separation and cookie isolation.
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="relative overflow-visible border-slate-100 dark:border-slate-800">
                <div className="absolute -left-3 -top-3 inline-flex items-center justify-center rounded-md p-2 bg-gradient-to-br from-primary/70 to-primary-400 text-white shadow-md">
                  <Lock className="h-5 w-5" />
                </div>
                <CardHeader className="pl-6">
                  <CardTitle className="text-base font-semibold text-slate-900 dark:text-slate-50">
                    Security & Compliance
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Designed with healthcare compliance in mind — audit trails,
                    role-based access, and strong encryption.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-6 pt-0">
                  <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-3">
                      <ShieldCheck className="h-4 w-4 flex-shrink-0 text-primary-600 dark:text-primary-300 mt-1" />
                      <span>
                        TLS everywhere, encrypted at rest, and KMS-managed keys.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Database className="h-4 w-4 flex-shrink-0 text-primary-600 dark:text-primary-300 mt-1" />
                      <span>
                        Audit logs and exportable reports for easy compliance
                        (HIPAA / local regulations).
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Bottom row: full-width note */}
            <div className="mt-6 rounded-lg bg-slate-50/60 dark:bg-slate-900/40 p-4 text-sm text-slate-700 dark:text-slate-200 shadow-inner">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <strong className="block text-slate-900 dark:text-slate-50">
                    SaaS multi-tenant with DB-per-tenant isolation
                  </strong>
                  <span className="block mt-1 text-slate-600 dark:text-slate-300">
                    Single codebase, isolated data — the best of both worlds for
                    scale and trust.
                  </span>
                </div>

                <div className="mt-3 sm:mt-0">
                  <a
                    href="/security"
                    className="inline-flex items-center gap-2 rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-300"
                  >
                    View security details
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
