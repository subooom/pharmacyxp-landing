"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Database,
  Globe,
  Lock,
  Mail,
  Loader2,
  CheckCircle,
  Users,
  Building,
  FileText,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

// TrustAndSecuritySection
// A responsive, dark-mode friendly React component using shadcn/ui + Tailwind.
// - Includes a primary-color accent line
// - Shows enterprise-friendly messaging about DB-per-tenant + subdomain isolation
// - Responsive layout with icons and CTA

export default function TrustAndSecuritySection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    // Log the data (in production, send to your backend/CRM)
    console.log("Security Brief Request Data:", data);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Auto-close after success
    setTimeout(() => {
      setSubmitSuccess(false);
      setIsModalOpen(false);
      // Reset form if needed
      event.currentTarget.reset();
    }, 3000);
  };
  return (
    <>
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
                Every organization gets a secure subdomain and a private,
                isolated database — all powered by a single, scalable codebase.
                This hybrid architecture delivers the SaaS economics you want
                with the data isolation and auditability large healthcare
                providers demand.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {/* <Button className="shadow-sm" variant="default">
                Request a Security Brief
              </Button>
              <Button
                asChild
                className="!bg-transparent !text-slate-700 dark:!text-slate-200"
                variant="outline"
              >
                <a href="/contact">Talk to Sales</a>
              </Button> */}

                <Button
                  className="shadow-sm"
                  variant="default"
                  onClick={() => setIsModalOpen(true)}
                >
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
                      Designed with healthcare compliance in mind — audit
                      trails, role-based access, and strong encryption.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-6 pt-0">
                    <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
                      <li className="flex items-start gap-3">
                        <ShieldCheck className="h-4 w-4 flex-shrink-0 text-primary-600 dark:text-primary-300 mt-1" />
                        <span>
                          TLS everywhere, encrypted at rest, and KMS-managed
                          keys.
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
                      Single codebase, isolated data — the best of both worlds
                      for scale and trust.
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

      {/* Security Brief Request Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[580px] max-h-[90vh] overflow-y-auto p-0 border-0 shadow-2xl">
          {/* Header with gradient background */}
          <div className="bg-gradient-to-r from-primary/90 to-primary-600 px-6 py-4 rounded-t-lg">
            <DialogHeader className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-2xl font-bold text-white">
                    Request Security & Compliance Brief
                  </DialogTitle>
                  <DialogDescription className="text-white/90">
                    Complete this form to receive our comprehensive healthcare
                    security package
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
          </div>

          {/* Content area */}
          <div className="px-6 py-5">
            {/* Success State */}
            {submitSuccess ? (
              <div className="py-8 text-center space-y-5">
                <div className="relative mx-auto w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Request Submitted Successfully!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                    Your security brief is being prepared and will arrive in
                    your inbox within the hour. Our compliance specialist will
                    contact you within 24 hours.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold">Next Steps:</span> Check
                    your email (including spam folder) for the security package
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Progress indicator */}
                <div className="flex items-center justify-center space-x-4 pb-2">
                  {["Organization", "Contact", "Requirements"].map(
                    (step, index) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                  ${index === 0 ? "bg-primary text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"}`}
                        >
                          {index + 1}
                        </div>
                        <span
                          className={`ml-2 text-sm ${index === 0 ? "font-semibold text-primary" : "text-slate-500"}`}
                        >
                          {step}
                        </span>
                        {index < 2 && (
                          <div className="w-8 h-px mx-2 bg-slate-200 dark:bg-slate-700"></div>
                        )}
                      </div>
                    ),
                  )}
                </div>

                {/* Organization Details Card */}
                <div className="space-y-6 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/30 dark:to-slate-900/10">
                  <div className="flex items-center gap-3">
                    <Building className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Organization Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2.5">
                      <Label
                        htmlFor="organization"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        Organization Name{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <Input
                          id="organization"
                          name="organization"
                          placeholder="e.g., City General Hospital"
                          required
                          className="pl-10 border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20"
                        />
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      </div>
                    </div>

                    <div className="space-y-2.5">
                      <Label
                        htmlFor="organizationType"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        Organization Type{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Select name="organizationType" required>
                        <SelectTrigger className="border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="clinic"
                            className="flex items-center gap-2"
                          >
                            <span>🏥</span> Clinic
                          </SelectItem>
                          <SelectItem
                            value="pharmacy"
                            className="flex items-center gap-2"
                          >
                            <span>💊</span> Pharmacy
                          </SelectItem>
                          <SelectItem
                            value="hospital"
                            className="flex items-center gap-2"
                          >
                            <span>🏨</span> Hospital
                          </SelectItem>
                          <SelectItem
                            value="chain"
                            className="flex items-center gap-2"
                          >
                            <span>🏢</span> Multi-location Chain
                          </SelectItem>
                          <SelectItem
                            value="other"
                            className="flex items-center gap-2"
                          >
                            <span>⚕️</span> Other Healthcare
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2.5">
                      <Label
                        htmlFor="locations"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        Number of Locations{" "}
                        <span className="text-red-500">*</span>
                      </Label>
                      <Select name="locations" required>
                        <SelectTrigger className="border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20">
                          <SelectValue placeholder="Select locations" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1"> 1 Location</SelectItem>
                          <SelectItem value="2-5">2-5 Locations</SelectItem>
                          <SelectItem value="6-20">6-20 Locations</SelectItem>
                          <SelectItem value="20+">
                            20+ Locations (Enterprise)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2.5">
                      <Label
                        htmlFor="country"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        Country/Region <span className="text-red-500">*</span>
                      </Label>
                      <Select name="country" required>
                        <SelectTrigger className="border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem
                            value="nepal"
                            className="flex items-center gap-2"
                          >
                            <span className="text-lg">🇳🇵</span> Nepal
                          </SelectItem>
                          <SelectItem
                            value="india"
                            className="flex items-center gap-2"
                          >
                            <span className="text-lg">🇮🇳</span> India
                          </SelectItem>
                          <SelectItem
                            value="us"
                            className="flex items-center gap-2"
                          >
                            <span className="text-lg">🇺🇸</span> United States
                          </SelectItem>
                          <SelectItem
                            value="other"
                            className="flex items-center gap-2"
                          >
                            <span className="text-lg">🌍</span> Other Region
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Contact Details Card */}
                <div className="space-y-6 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/30 dark:to-slate-900/10">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Contact Information
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-2.5">
                      <Label
                        htmlFor="firstName"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        First Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                        className="border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20"
                      />
                    </div>

                    <div className="space-y-2.5">
                      <Label
                        htmlFor="lastName"
                        className="flex items-center gap-2 text-sm font-medium"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Smith"
                        required
                        className="border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Label
                      htmlFor="jobTitle"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      Job Title <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="jobTitle"
                        name="jobTitle"
                        placeholder="e.g., Pharmacy Manager, IT Director, Compliance Officer"
                        required
                        className="pl-10 border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20"
                      />
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Label
                      htmlFor="email"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      Work Email Address <span className="text-red-500">*</span>
                    </Label>
                    <div className="relative">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="name@hospital.org"
                        required
                        className="pl-10 border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20"
                      />
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Please use your organization email for verification
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number (Optional)
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Requirements Card */}
                <div className="space-y-6 p-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-gradient-to-b from-white to-slate-50/50 dark:from-slate-900/30 dark:to-slate-900/10">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                      Security Requirements
                    </h3>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-sm font-medium">
                      Primary Use Cases (Select all that apply){" "}
                      <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {[
                        {
                          id: "use-inventory",
                          label: "Inventory Management",
                          icon: "📦",
                        },
                        {
                          id: "use-billing",
                          label: "Billing & Invoicing",
                          icon: "💰",
                        },
                        {
                          id: "use-patients",
                          label: "Patient Records",
                          icon: "📋",
                        },
                        {
                          id: "use-reporting",
                          label: "Compliance Reporting",
                          icon: "📊",
                        },
                      ].map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-primary/50 hover:bg-primary/5 transition-colors"
                        >
                          <Checkbox
                            id={item.id}
                            name="useCases"
                            value={item.id.replace("use-", "")}
                            className="mr-3"
                          />
                          <label
                            htmlFor={item.id}
                            className="flex items-center gap-2 cursor-pointer text-sm"
                          >
                            <span className="text-lg">{item.icon}</span>
                            <span className="font-medium">{item.label}</span>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    <Label htmlFor="concerns" className="text-sm font-medium">
                      Specific Security/Compliance Questions
                    </Label>
                    <Textarea
                      id="concerns"
                      name="concerns"
                      placeholder="Tell us about your specific concerns: HIPAA compliance requirements, audit trail needs, data sovereignty, integration security, etc."
                      rows={3}
                      className="border-slate-300 dark:border-slate-700 focus:border-primary focus:ring-primary/20"
                    />
                  </div>

                  <div className="p-4 rounded-lg border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="privacy"
                        name="privacy"
                        required
                        className="mt-1"
                      />
                      <div className="space-y-1">
                        <label
                          htmlFor="privacy"
                          className="text-sm font-medium leading-tight cursor-pointer"
                        >
                          Consent & Privacy Agreement{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          I agree to receive the security brief and related
                          communications from MedicineXP. We respect your
                          privacy and will handle your information according to
                          our Privacy Policy. You can unsubscribe at any time.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      <p className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-green-500" />
                        <span>
                          Your information is secured with end-to-end encryption
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setIsModalOpen(false)}
                        disabled={isSubmitting}
                        className="min-w-[100px]"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="min-w-[180px] bg-gradient-to-r from-primary to-primary-600 hover:from-primary-600 hover:to-primary-700"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing Request...
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="mr-2 h-4 w-4" />
                            Request Security Brief
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
