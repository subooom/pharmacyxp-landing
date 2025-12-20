"use client";

import { useState } from "react";
import DarkPanel from "@/components/composits/DarkPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Database,
  ShieldCheck,
  Users,
  Globe,
  Lock,
  Download,
  Mail,
  Calendar,
  CheckCircle,
  Shield,
  Zap,
  Pill,
  Package,
  Store,
  AlertTriangle,
  FileBarChart,
  RefreshCw,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityDetailsPage() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [isRequestingBrief, setIsRequestingBrief] = useState(false);
  const [briefRequested, setBriefRequested] = useState(false);

  const handleRequestBrief = () => {
    setIsRequestingBrief(true);
    // Simulate API call
    setTimeout(() => {
      setIsRequestingBrief(false);
      setBriefRequested(true);

      // Reset after 5 seconds
      setTimeout(() => setBriefRequested(false), 5000);
    }, 1500);
  };

  // Updated for PHARMACY inventory management
  const securityArchitecture = [
    {
      id: 1,
      title: "Complete Data Isolation",
      icon: Database,
      color: "from-blue-500 to-cyan-500",
      items: [
        "Separate database for each pharmacy location",
        "Multi-tenant architecture prevents data cross-contamination",
        "Daily encrypted backups of inventory and prescription data",
        "Role-based access to prevent unauthorized stock viewing",
      ],
      highlight: "Each pharmacy sees only their own inventory and data",
    },
    {
      id: 2,
      title: "Inventory Encryption",
      icon: Lock,
      color: "from-purple-500 to-pink-500",
      items: [
        "AES-256 encryption for all inventory and pricing data",
        "Secure transmission of stock levels and orders",
        "Encrypted audit trails for controlled substance tracking",
        "Secure API endpoints for supplier integrations",
      ],
      highlight: "Your inventory data is protected at every level",
    },
    {
      id: 3,
      title: "Healthcare-Specific Access Control",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      items: [
        "Role-based permissions (Pharmacist, Technician, Manager, Admin)",
        "Two-factor authentication for all pharmacy staff",
        "Session management with automatic logout",
        "Granular permissions for sensitive operations",
      ],
      highlight: "Staff access limited to their responsibilities",
    },
    {
      id: 4,
      title: "Inventory Monitoring & Alerts",
      icon: Activity,
      color: "from-orange-500 to-red-500",
      items: [
        "Real-time monitoring of inventory changes",
        "Alert system for suspicious stock movements",
        "Comprehensive audit logs for all inventory transactions",
        "Regular security assessments of pharmacy operations",
      ],
      highlight: "Continuous protection of your pharmacy assets",
    },
  ];

  // Pharmacy-specific compliance
  const complianceCertifications = [
    {
      name: "HIPAA Compliant",
      status: "Fully Compliant",
      icon: Pill,
      description: "Protects patient prescription information",
      details: "BAAs available for all pharmacy partners",
      verified: true,
    },
    {
      name: "DEA Compliance",
      status: "Enabled",
      icon: AlertTriangle,
      description: "Controlled substance tracking capabilities",
      details: "Audit trails for Schedule II-V medications",
      verified: true,
    },
    {
      name: "PCI DSS",
      status: "Certified",
      icon: FileBarChart,
      description: "Secure payment processing",
      details: "Level 1 PCI compliant for transactions",
      verified: true,
    },
    {
      name: "GDPR Ready",
      status: "Implemented",
      icon: Globe,
      description: "Global data protection compliance",
      details: "Data processing agreements available",
      verified: true,
    },
  ];

  // Pharmacy-specific security features
  const securityFeatures = [
    {
      icon: Package,
      title: "Stock Protection",
      description: "Secure tracking of inventory levels and movements",
    },
    {
      icon: Store,
      title: "Multi-Location",
      description: "Secure data sync between pharmacy branches",
    },
    {
      icon: RefreshCw,
      title: "Auto Backup",
      description: "Hourly backups of inventory and prescription data",
    },
    {
      icon: FileText,
      title: "Audit Reports",
      description: "Detailed security and compliance reporting",
    },
    {
      icon: Shield,
      title: "Supplier Security",
      description: "Secure connections to pharmaceutical suppliers",
    },
    {
      icon: Zap,
      title: "Uptime Guarantee",
      description: "99.9% uptime for uninterrupted pharmacy operations",
    },
  ];

  return (
    <DarkPanel>
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Hero Section - Pharmacy Focused */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl xl:text-7xl font-bold text-primary mb-4">
            Healthcare Operations Security
          </h1>
          <p className="text-xl text-primary max-w-3xl mx-auto mb-8">
            Enterprise security for healthcare operations, protecting patient
            data, medication inventory, and ensuring HIPAA compliance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={handleRequestBrief}
              disabled={isRequestingBrief || briefRequested}
            >
              {isRequestingBrief ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Requesting...
                </>
              ) : briefRequested ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Request Sent!
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" />
                  Request Security Brief
                </>
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-primary text-primary hover:bg-primary/10"
            >
              <Download className="h-5 w-5" />
              Download Security Docs
            </Button>
          </div>
        </motion.div>

        {/* Status Banner */}
        {briefRequested && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="font-medium text-green-700 dark:text-green-400">
                  Security brief requested successfully!
                </p>
                <p className="text-sm text-green-600 dark:text-green-500">
                  Our team will contact you within 24 hours.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {/* Uptime Card */}
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-black p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            {/* Animated background accent */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 dark:from-primary/0 dark:via-primary/10 dark:to-primary/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold text-primary dark:text-primary/90">
                  ⚡
                </div>
              </div>
              <div className="text-4xl font-bold text-primary dark:text-white mb-3 group-hover:text-primary dark:group-hover:text-primary/80 transition-colors">
                99.9%
              </div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Uptime SLA
              </div>
              <div className="text-xs text-primary dark:text-gray-400">
                Guaranteed reliability
              </div>
            </div>

            {/* Bottom accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {/* Alerts Card */}
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-black p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/0 via-gray-800/5 to-gray-800/0 dark:from-gray-300/0 dark:via-gray-300/10 dark:to-gray-300/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-300">
                  🔔
                </div>
              </div>
              <div className="text-4xl font-bold text-primary dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-300 transition-colors">
                Real-time
              </div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Stock Alerts
              </div>
              <div className="text-xs text-primary dark:text-gray-400">
                Instant notifications
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-300 dark:to-gray-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {/* Monitoring Card */}
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-black p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-blue-500/0 dark:from-blue-400/0 dark:via-blue-400/10 dark:to-blue-400/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  👁️
                </div>
              </div>
              <div className="text-4xl font-bold text-primary dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                24/7
              </div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Monitoring
              </div>
              <div className="text-xs text-primary dark:text-gray-400">
                Security operations
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>

          {/* Compliance Card */}
          <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-black p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/5 to-green-500/0 dark:from-green-400/0 dark:via-green-400/10 dark:to-green-400/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/20 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                  🛡️
                </div>
              </div>
              <div className="text-4xl font-bold text-primary dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                DEA
              </div>
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Compliant
              </div>
              <div className="text-xs text-primary dark:text-gray-400">
                Controlled substances
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-green-600 dark:from-green-400 dark:to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>

        {/* Core Security Architecture - healthcare Focused */}
        <div className="mb-16 lg:mb-20 mt-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 flex flex-col items-center justify-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary-700 mb-4 ">
                Protecting Your Healthcare Operations
              </h2>
              <p className=" text-primary-700">
                Security measures specifically designed for healthcare inventory
                management and prescription data protection.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {securityArchitecture.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setActiveFeature(feature.id)}
                  onMouseLeave={() => setActiveFeature(null)}
                >
                  <Card
                    className={`
                    h-full transition-all duration-300 border-2 overflow-hidden
                    ${
                      activeFeature === feature.id
                        ? "border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                        : "border-slate-200 dark:border-slate-800"
                    }
                  `}
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} shadow-md`}
                          >
                            <Icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <CardTitle className="text-xl font-bold text-primary">
                              {feature.title}
                            </CardTitle>
                            <p className="text-sm text-primary-700 mt-1">
                              {feature.highlight}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <ul className="space-y-3">
                        {feature.items.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + i * 0.05 }}
                            className="flex items-start gap-3 p-2 rounded-lg text-white hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
                          >
                            <div className="mt-1 p-1 rounded bg-primary/10">
                              <ShieldCheck className="h-3 w-3 text-primary flex-shrink-0" />
                            </div>
                            <span className="text-primary dark:text-white">
                              {item}
                            </span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Pharmacy Compliance Section */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10">
            Pharmacy Compliance Standards
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {complianceCertifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {cert.verified && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <CardTitle className="text-lg font-bold text-primary">
                        {cert.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="px-2 py-1 text-xs font-medium bg-green-500/20 text-green-700 dark:text-green-400 rounded-full">
                          {cert.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-primary-700 dark:text-primary-300 mb-3">
                        {cert.description}
                      </p>
                      <p className="text-xs text-primary-600 dark:text-primary-400">
                        {cert.details}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6 border border-slate-200 dark:border-slate-800">
            <div className="flex items-start gap-4">
              <Pill className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary mb-2">
                  Controlled Substance Tracking
                </h3>
                <p className="text-primary-700 dark:text-primary-300 mb-4">
                  MedicineXP includes DEA-compliant tracking for Schedule II-V
                  medications with detailed audit trails, automated reporting,
                  and compliance alerts.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="h-4 w-4" />
                    View DEA Features
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Compliance Guide
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pharmacy Security Features */}
        <div className="mb-16">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10">
            Pharmacy-Specific Security Features
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-primary mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-primary-700 dark:text-primary-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Section - Pharmacy Focused */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
        >
          <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            Secure Your Pharmacy Inventory Today
          </h2>
          <p className="text-primary-700 dark:text-primary-300 max-w-2xl mx-auto mb-6">
            Get a pharmacy-specific security assessment, schedule a compliance
            review, or download our pharmacy security implementation guide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90"
              onClick={handleRequestBrief}
              disabled={isRequestingBrief || briefRequested}
            >
              {isRequestingBrief ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : briefRequested ? (
                <>
                  <CheckCircle className="h-5 w-5" />
                  Requested!
                </>
              ) : (
                <>
                  <Mail className="h-5 w-5" />
                  Request Pharmacy Security Brief
                </>
              )}
            </Button>

            <Button size="lg" variant="outline" className="gap-2">
              <Calendar className="h-5 w-5" />
              Schedule Compliance Demo
            </Button>

            <Button size="lg" variant="ghost" className="gap-2">
              <Download className="h-5 w-5" />
              Pharmacy Security Guide
            </Button>
          </div>

          <p className="text-sm text-primary-600 dark:text-primary-400 mt-6">
            Pharmacy security experts available • HIPAA compliance guaranteed
          </p>
        </motion.div>
      </div>
    </DarkPanel>
  );
}
