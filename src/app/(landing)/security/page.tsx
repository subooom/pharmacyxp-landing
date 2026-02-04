"use client";

import { useState } from "react";
import DarkPanel from "@/components/composits/DarkPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Lock,
  Users,
  Server,
  FileText,
  Clock,
  EyeOff,
  Key,
  RefreshCw,
  MapPin,
  Activity,
  Shield,
  CheckCircle,
  Download,
  Mail,
  Calendar,
  Phone,
  Cpu,
  Globe,
  Building,
  Award,
  Zap,
} from "lucide-react";
import { motion } from "framer-motion";

export default function SecurityDetailsPage() {
  const [activeFeature, setActiveFeature] = useState<number | null>(null);
  const [isRequestingBrief, setIsRequestingBrief] = useState(false);
  const [briefRequested, setBriefRequested] = useState(false);

  const handleRequestBrief = () => {
    setIsRequestingBrief(true);
    setTimeout(() => {
      setIsRequestingBrief(false);
      setBriefRequested(true);
      setTimeout(() => setBriefRequested(false), 5000);
    }, 1500);
  };

  // ==================== HERO SECTION ====================
  const heroBadges = [
    "AWS Secure Cloud Hosting",
    "AES-256 Encryption",
    "Architecture Aligned with HIPAA/GDPR",
    "Business Associate Agreement (BAA) Ready",
  ];

  // ==================== SECURITY ARCHITECTURE ====================
  const securityArchitecture = [
    {
      id: 1,
      title: "Region-Optimized Data Governance",
      icon: MapPin,
      color: "from-blue-500 to-cyan-500",
      items: [
        "Hosted in AWS Asia Pacific Region for optimal Nepal performance",
        "Logical isolation per healthcare organization",
        "Daily encrypted backups with configurable retention",
        "Clear data ownership - your data remains exclusively yours",
      ],
      highlight:
        "Enterprise cloud hosting configured for the Nepali healthcare market",
    },
    {
      id: 2,
      title: "Military-Grade Encryption",
      icon: Lock,
      color: "from-purple-500 to-pink-500",
      items: [
        "AES-256 encryption for all data at rest",
        "TLS 1.3 encryption for data in transit",
        "Secure key management practices",
        "End-to-end encryption for sensitive prescription data",
      ],
      highlight: "Bank-level security for healthcare records",
    },
    {
      id: 3,
      title: "Healthcare Access Controls",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      items: [
        "Role-Based Access Control (RBAC) with least privilege",
        "Unique user accounts with activity logging",
        "Configurable session timeouts",
        "Audit trails for all sensitive data access",
      ],
      highlight: "Granular controls meeting healthcare compliance standards",
    },
    {
      id: 4,
      title: "Enterprise Infrastructure",
      icon: Server,
      color: "from-orange-500 to-red-500",
      items: [
        "High-availability architecture with redundancy",
        "24/7 security monitoring and alerting",
        "Regular security patches and updates",
        "Disaster recovery with defined RTO/RPO",
      ],
      highlight: "Built on scalable, secure cloud infrastructure",
    },
  ];

  // ==================== COMPLIANCE ROADMAP ====================
  const complianceRoadmap = [
    {
      name: "Global Technical Foundation",
      status: "Architecture Implemented",
      icon: Cpu,
      description: "Technical safeguards for healthcare data",
      details: "Encryption, access controls, audit logging built-in",
      badgeColor: "bg-green-500/10 text-green-700 dark:text-green-400",
      stage: "current",
    },
    {
      name: "Nepal Market Focus",
      status: "Currently Live",
      icon: MapPin,
      description: "Serving Nepali healthcare providers",
      details: "Local data residency, features for Nepali regulations",
      badgeColor: "bg-green-500/10 text-green-700 dark:text-green-400",
      stage: "current",
    },
    {
      name: "HIPAA & BAA Documentation",
      status: "Planning Phase",
      icon: FileText,
      description: "Developing contract templates for US market",
      details: "BAA templates, security addenda in development",
      badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      stage: "planning", // Changed from "active"
    },
    {
      name: "GDPR Compliance Design",
      status: "Framework Designed",
      icon: Globe,
      description: "Architecture supports EU privacy requirements",
      details: "Data portability, consent management pathways built-in",
      badgeColor: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
      stage: "designed",
    },
    {
      name: "Global Launch Framework",
      status: "Strategic Planning",
      icon: Award,
      description: "Preparing for future market expansion",
      details: "Documentation, partner, and compliance pathway planning",
      badgeColor: "bg-purple-500/10 text-purple-700 dark:text-purple-400",
      stage: "planning",
    },
  ];

  // ==================== SECURITY FEATURES ====================
  const securityFeatures = [
    {
      category: "Compliance & Governance",
      features: [
        {
          icon: FileText,
          title: "Nepal Data Act Alignment",
          description:
            "Data processing practices designed with Nepal's Data Act, 2079 in mind",
        },
        {
          icon: Clock,
          title: "Breach Notification",
          description:
            "Documented incident response and notification procedures",
        },
        {
          icon: EyeOff,
          title: "Minimum Necessary Access",
          description: "Role-based access following privacy principles",
        },
      ],
    },
    {
      category: "Technical Safeguards",
      features: [
        {
          icon: Key,
          title: "Encryption Management",
          description:
            "Industry-standard encryption with secure key management",
        },
        {
          icon: RefreshCw,
          title: "Vulnerability Management",
          description: "Regular security testing and prompt patching",
        },
        {
          icon: MapPin,
          title: "Data Residency Control",
          description: "Configurable data storage based on regulatory needs",
        },
      ],
    },
    {
      category: "Operational Security",
      features: [
        {
          icon: Users,
          title: "Staff Security Training",
          description:
            "Regular security and data protection training for employees",
        },
        {
          icon: Shield,
          title: "Vendor Risk Management",
          description:
            "Subprocessors reviewed for security and data protection",
        },
        {
          icon: Activity,
          title: "Incident Response",
          description: "Tested IR plan with defined roles and procedures",
        },
      ],
    },
  ];

  // ==================== SECURITY METRICS ====================
  const securityMetrics = [
    {
      value: "Nepal-First",
      label: "Data Sovereignty",
      sublabel: "Primary Storage",
      icon: "🇳🇵",
      color: "from-blue-500/10 to-blue-600/10",
      accent: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      value: "AES-256",
      label: "Encryption",
      sublabel: "Bank-Level",
      icon: "🔐",
      color: "from-green-500/10 to-emerald-600/10",
      accent: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    {
      value: "RBAC",
      label: "Access Control",
      sublabel: "Role-Based",
      icon: "👤",
      color: "from-purple-500/10 to-pink-600/10",
      accent: "bg-gradient-to-r from-purple-500 to-pink-600",
    },
    {
      value: "Global-Ready",
      label: "Architecture",
      sublabel: "Future-Proof",
      icon: "🌐",
      color: "from-orange-500/10 to-red-600/10",
      accent: "bg-gradient-to-r from-orange-500 to-red-600",
    },
  ];

  // ==================== GLOBAL READINESS TIMELINE ====================
  const roadmapPhases = [
    {
      title: "Phase 1: Nepal-First Foundation",
      status: "Live",
      icon: Building,
      items: [
        "Hosted on AWS for enterprise reliability, optimized for Nepal access",
        "Alignment with Drugs Act record-keeping requirements",
        "Nepali-language support & local customer care",
        "Features tailored for Nepali pharmacy workflows",
      ],
      color: "bg-green-600",
    },
    {
      title: "Phase 2: Global Standards Enablement",
      status: "Ready",
      icon: Globe,
      items: [
        "HIPAA-aligned security controls & BAA readiness",
        "GDPR data subject rights workflow foundation",
        "Region-specific data hosting configurations",
        "International payment and compliance support",
      ],
      color: "bg-primary-600",
    },
  ];

  return (
    <DarkPanel>
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* ========== HERO SECTION ========== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-primary mb-4">
            Enterprise Security for Healthcare
          </h1>
          <p className="text-xl text-primary max-w-3xl mx-auto mb-8">
            Built in Nepal for the world. We provide Nepali pharmacies and
            clinics with robust, locally-focused data protection, using an
            architecture designed to meet future global healthcare standards.
          </p>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {heroBadges.map((badge, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-medium border border-primary/20"
              >
                {badge}
              </motion.span>
            ))}
          </div>

          {/* CTA Buttons */}
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
                  Request Security Overview
                </>
              )}
            </Button>
            <a href="/whitepaper/MEDICINEXP_Security_Whitepaper.pdf" download>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-primary text-primary hover:bg-primary/10"
              >
                <Download className="h-5 w-5" />
                Download Security Whitepaper
              </Button>
            </a>
            <Button
              size="lg"
              variant="ghost"
              className="gap-2 text-primary hover:bg-primary/5"
            >
              <Calendar className="h-5 w-5" />
              Schedule Demo
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
                  Our team will contact you within 24 hours with detailed
                  security documentation.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========== SECURITY METRICS ========== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
          {securityMetrics.map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-black p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${metric.color} transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}
              />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 rounded-xl mb-5">
                  <div className="text-2xl">{metric.icon}</div>
                </div>
                <div className="text-3xl font-bold text-primary dark:text-white mb-2">
                  {metric.value}
                </div>
                <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-primary dark:text-gray-400">
                  {metric.sublabel}
                </div>
              </div>
              <div
                className={`absolute bottom-0 left-0 right-0 h-1 ${metric.accent} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
              />
            </motion.div>
          ))}
        </div>

        {/* ========== SECURITY ARCHITECTURE ========== */}
        <div className="mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
                Healthcare Security Architecture
              </h2>
              <p className="text-primary max-w-3xl mx-auto">
                Built from the ground up to protect sensitive healthcare data
                while supporting both current Nepali requirements and future
                global standards.
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
                            className="flex items-start gap-3 p-2 rounded-lg text-primary-600 dark:text-white  hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
                          >
                            <div className="mt-1 p-1 rounded bg-primary/10">
                              <ShieldCheck className="h-3 w-3 text-primary flex-shrink-0" />
                            </div>
                            <span className="text-primary-600 dark:text-white ">
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

        <div className="mb-16 lg:mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10 text-center">
            Strategic Compliance Preparation
          </h2>

          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 border border-primary/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  Current State
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-primary-600 dark:text-white ">
                      <strong>Technical architecture</strong> built with global
                      healthcare standards in mind
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-primary-600 dark:text-white ">
                      <strong>Currently focused</strong> on serving the Nepal
                      healthcare market
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-primary-600 dark:text-white ">
                      <strong>Core security features</strong> implemented
                      (encryption, access controls, auditing)
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  Preparation for Global Expansion
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 text-primary-600 dark:text-white flex-shrink-0">
                      •
                    </div>
                    <span className="text-primary-600 dark:text-white ">
                      <strong>Documentation framework</strong> for HIPAA BAAs
                      and GDPR DPAs in planning
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 text-primary-600 dark:text-white  mt-0.5 flex-shrink-0">
                      •
                    </div>
                    <span className="text-primary-600 dark:text-white ">
                      <strong>Technical pathways</strong> for region-specific
                      deployments established
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="h-5 w-5 text-primary-600 dark:text-white mt-0.5 flex-shrink-0">
                      •
                    </div>
                    <span className="text-primary-600 dark:text-white ">
                      <strong>Strategic partnerships</strong> with
                      legal/compliance experts being developed
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-primary/20">
              <p className="text-primary-700 dark:text-white text-center">
                <strong>Our approach:</strong> Build the technical foundation
                first, then develop market-specific compliance documentation
                when entering new regions. This ensures we deliver working
                software today while preparing for tomorrow&apos;s expansion.
              </p>
            </div>
          </div>
        </div>

        {/* ========== COMPLIANCE ROADMAP ========== */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10 text-center">
            Security & Compliance Roadmap
          </h2>

          {/* Visual Timeline */}
          <div className="relative mb-12">
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-500 via-blue-500 to-purple-500" />

            <div className="space-y-12">
              {roadmapPhases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex flex-col lg:flex-row items-center lg:items-start gap-8"
                  >
                    <div
                      className={`lg:w-1/2 ${
                        index % 2 === 0
                          ? "lg:text-right lg:pr-12"
                          : "lg:pl-12 order-last"
                      }`}
                    >
                      <h3 className="text-xl font-bold text-primary">
                        {phase.title}
                      </h3>
                      <p className="text-primary-700 dark:text-white mt-2">
                        {index === 0
                          ? "We are live, serving Nepali healthcare providers with a secure platform that respects local data sovereignty."
                          : "Our architecture is built to enable compliance with international regulations through contracts and specific deployments."}
                      </p>
                    </div>

                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white dark:bg-gray-800 shadow-lg border-4 border-white dark:border-gray-800 z-10">
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${phase.color} text-white font-bold`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>

                    <div
                      className={`lg:w-1/2 ${
                        index % 2 === 0 ? "lg:pl-12" : "lg:pr-12"
                      }`}
                    >
                      <ul className="space-y-3">
                        {phase.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/50"
                          >
                            {index === 0 ? (
                              <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            ) : (
                              <Zap className="h-5 w-5 text-blue-500 flex-shrink-0" />
                            )}
                            <span className="text-primary dark:text-white">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Compliance Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {complianceRoadmap.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors hover:shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {cert.stage === "current" && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <CardTitle className="text-lg font-bold text-primary">
                        {cert.name}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${cert.badgeColor}`}
                        >
                          {cert.status}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-primary-700 dark:text-white mb-3">
                        {cert.description}
                      </p>
                      <p className="text-xs text-primary-600 dark:text-primary">
                        {cert.details}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ========== SECURITY FEATURES ========== */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10">
            Essential Security Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {securityFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h3 className="text-lg font-bold text-primary mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
                  {category.category}
                </h3>
                <div className="space-y-6">
                  {category.features.map((feature, featureIndex) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.2 + featureIndex * 0.1,
                        }}
                      >
                        <div className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-primary/30 hover:shadow-md transition-all">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-bold text-primary mb-1">
                              {feature.title}
                            </h4>
                            <p className="text-sm text-primary-700 dark:text-white">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========== FINAL CTA ========== */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
        >
          <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            Secure Today. Ready for Tomorrow.
          </h2>
          <p className="text-primary-700 dark:text-white max-w-2xl mx-auto mb-6">
            Get the security of a locally-built platform with the future-ready
            architecture to support your growth—whether across Nepal or across
            borders.
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
                  Request Security Documentation
                </>
              )}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 text-primary dark:text-white"
            >
              <Calendar className="h-5 w-5" />
              Schedule Security Review
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="gap-2 text-primary dark:text-white"
            >
              <Phone className="h-5 w-5" />
              Contact Compliance Team
            </Button>
          </div>

          <p className="text-sm text-primary-600 dark:text-white mt-6">
            Nepal-first security • Global-ready architecture • Healthcare-grade
            protection
          </p>
        </motion.div>
      </div>
    </DarkPanel>
  );
}
