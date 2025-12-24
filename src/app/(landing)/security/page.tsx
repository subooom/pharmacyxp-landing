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
  Lock,
  Download,
  Mail,
  Calendar,
  CheckCircle,
  Shield,
  RefreshCw,
  FileText,
  Server,
  Key,
  EyeOff,
  Clock,
  MapPin,
  Cpu,
  FileBarChart,
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

  // UPDATED: Enhanced with critical healthcare security details
  const securityArchitecture = [
    {
      id: 1,
      title: "HIPAA-Compliant Data Isolation",
      icon: Database,
      color: "from-blue-500 to-cyan-500",
      items: [
        "Private, isolated database for each healthcare organization",
        "Business Associate Agreements (BAA) available for all customers",
        "Daily encrypted backups with 7-year retention for audit compliance",
        "Clear data ownership - your data remains exclusively yours",
      ],
      highlight: "Enterprise-grade isolation meeting HIPAA requirements",
    },
    {
      id: 2,
      title: "Military-Grade Encryption",
      icon: Lock,
      color: "from-purple-500 to-pink-500",
      items: [
        "AES-256 encryption for all data at rest including PHI",
        "TLS 1.3 encryption for all data in transit",
        "Encryption keys managed via AWS KMS (Key Management Service)",
        "End-to-end encryption for sensitive prescription data",
      ],
      highlight: "Your healthcare data is protected with bank-level security",
    },
    {
      id: 3,
      title: "Healthcare Access & Audit Controls",
      icon: Users,
      color: "from-green-500 to-emerald-500",
      items: [
        "Role-Based Access Control (RBAC) with least privilege principle",
        "Mandatory Two-Factor Authentication (2FA) for all staff accounts",
        "Comprehensive audit logs tracking all PHI access and modifications",
        "Session timeout after 15 minutes of inactivity",
      ],
      highlight: "Granular controls meeting healthcare compliance standards",
    },
    {
      id: 4,
      title: "Infrastructure & Physical Security",
      icon: Server,
      color: "from-orange-500 to-red-500",
      items: [
        "Hosted on AWS HIPAA-eligible services in ISO 27001 certified data centers",
        "24/7 security monitoring with SOC 2 Type II compliance",
        "Multi-zone redundancy and disaster recovery with <4 hour RTO",
        "Regular third-party penetration testing and vulnerability scans",
      ],
      highlight: "Enterprise infrastructure trusted by healthcare providers",
    },
  ];

  // UPDATED: Enhanced compliance section with verifiable claims
  const complianceCertifications = [
    {
      name: "HIPAA Compliance",
      status: "Fully Compliant",
      icon: ShieldCheck,
      description: "Designed for HIPAA Security & Privacy Rules",
      details: "BAAs, audit trails, breach notification procedures",
      verified: true,
      badgeColor: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
    },
    {
      name: "Data Encryption",
      status: "AES-256 + TLS 1.3",
      icon: Lock,
      description: "Bank-level encryption standards",
      details: "Data encrypted at rest and in transit",
      verified: true,
      badgeColor: "bg-purple-500/20 text-purple-700 dark:text-purple-400",
    },
    {
      name: "Infrastructure",
      status: "AWS HIPAA Eligible",
      icon: Cpu,
      description: "Enterprise-grade cloud infrastructure",
      details: "SOC 2, ISO 27001 certified data centers",
      verified: true,
      badgeColor: "bg-orange-500/20 text-orange-700 dark:text-orange-400",
    },
    {
      name: "Audit & Reporting",
      status: "Comprehensive Logs",
      icon: FileBarChart,
      description: "7-year audit trail retention",
      details: "Real-time monitoring and alerting",
      verified: true,
      badgeColor: "bg-green-500/20 text-green-700 dark:text-green-400",
    },
  ];

  // NEW: Critical Security Features Section
  const criticalSecurityFeatures = [
    {
      category: "Compliance & Legal",
      features: [
        {
          icon: FileText,
          title: "Business Associate Agreement (BAA)",
          description: "Signed BAAs available for all healthcare customers",
        },
        {
          icon: Clock,
          title: "60-Day Breach Notification",
          description: "HIPAA-compliant breach notification commitment",
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
          title: "Encryption Key Management",
          description: "AWS KMS managed keys with regular rotation",
        },
        {
          icon: RefreshCw,
          title: "Vulnerability Management",
          description: "Quarterly penetration testing and security audits",
        },
        {
          icon: MapPin,
          title: "Data Sovereignty",
          description: "Data stored in region-specific HIPAA-compliant zones",
        },
      ],
    },
    {
      category: "Operational Security",
      features: [
        {
          icon: Users,
          title: "Staff Security Training",
          description: "Annual HIPAA and security training for all employees",
        },
        {
          icon: Shield,
          title: "Vendor Risk Management",
          description: "All subprocessors vetted and under BAA",
        },
        {
          icon: Activity,
          title: "Incident Response Plan",
          description: "Tested IR plan with defined roles and procedures",
        },
      ],
    },
  ];

  // UPDATED: Security metrics with healthcare focus
  const securityMetrics = [
    {
      value: "HIPAA",
      label: "Compliant",
      sublabel: "Security & Privacy Rules",
      icon: "🛡️",
      color: "from-blue-500/10 to-blue-600/10",
      accent: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      value: "99.95%",
      label: "Uptime SLA",
      sublabel: "Business Hours Support",
      icon: "⚡",
      color: "from-green-500/10 to-emerald-600/10",
      accent: "bg-gradient-to-r from-green-500 to-emerald-600",
    },
    {
      value: "<1 Hour",
      label: "Backup Recovery",
      sublabel: "RTO Guarantee",
      icon: "💾",
      color: "from-purple-500/10 to-pink-600/10",
      accent: "bg-gradient-to-r from-purple-500 to-pink-600",
    },
    {
      value: "24/7",
      label: "Security Monitoring",
      sublabel: "SOC Team",
      icon: "👁️",
      color: "from-orange-500/10 to-red-600/10",
      accent: "bg-gradient-to-r from-orange-500 to-red-600",
    },
  ];

  return (
    <DarkPanel>
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Hero Section - UPDATED with stronger healthcare focus */}
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
            Healthcare-Grade Security
          </h1>
          <p className="text-xl text-primary max-w-3xl mx-auto mb-8">
            HIPAA-compliant platform protecting patient data, medication
            inventory, and healthcare operations with enterprise-grade security.
          </p>

          {/* UPDATED: Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
              HIPAA Compliant
            </span>
            <span className="px-4 py-2 bg-green-500/10 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
              AES-256 Encryption
            </span>
            <span className="px-4 py-2 bg-purple-500/10 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
              Business Associate Agreements
            </span>
            <span className="px-4 py-2 bg-orange-500/10 text-orange-700 dark:text-orange-400 rounded-full text-sm font-medium">
              SOC 2 Type II
            </span>
          </div>

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
                  Request Security & Compliance Brief
                </>
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-primary text-primary hover:bg-primary/10"
            >
              <Download className="h-5 w-5" />
              Download Security Whitepaper
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="gap-2 text-primary hover:bg-primary/5"
            >
              <FileText className="h-5 w-5" />
              View BAA Template
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
                  Security & compliance brief requested successfully!
                </p>
                <p className="text-sm text-green-600 dark:text-green-500">
                  Our compliance team will contact you within 24 hours with BAA
                  and security documentation.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* UPDATED: Security Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {securityMetrics.map((metric, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-black p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-r ${metric.color} transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000`}
              ></div>

              <div className="relative">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 rounded-xl mb-5 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-2xl font-bold">{metric.icon}</div>
                </div>
                <div className="text-3xl font-bold text-primary dark:text-white mb-2 group-hover:text-primary dark:group-hover:text-primary/80 transition-colors">
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
              ></div>
            </div>
          ))}
        </div>

        {/* Core Security Architecture - UPDATED with healthcare compliance */}
        <div className="mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-10 flex flex-col items-center justify-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
                Healthcare-Specific Security Architecture
              </h2>
              <p className="text-primary text-center max-w-3xl">
                Built from the ground up to meet HIPAA requirements and protect
                sensitive healthcare data, inventory, and patient information.
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
                            className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
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

        {/* NEW: Critical Security Features Section */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10">
            Essential Healthcare Security Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {criticalSecurityFeatures.map((category, categoryIndex) => (
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

        {/* UPDATED: Compliance Section */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-10">
            Compliance & Certifications
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
                  <Card className="h-full border border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-colors hover:shadow-lg">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                        {cert.verified && (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <CardTitle className="text-lg font-bold text-primary ">
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

          {/* UPDATED: Compliance notice */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl p-6 border border-primary/20">
            <div className="flex items-start gap-4">
              <ShieldCheck className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-primary mb-2">
                  Healthcare Compliance Commitment
                </h3>
                <p className="text-primary-700 dark:text-white mb-4">
                  MedicineXP is designed to help healthcare organizations meet
                  HIPAA requirements. We provide Business Associate Agreements
                  (BAA) for all customers, maintain comprehensive audit trails,
                  and follow strict breach notification procedures as required
                  by law.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default" size="sm" className="gap-2">
                    <FileText className="h-4 w-4" />
                    Request BAA
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-primary dark:text-white"
                  >
                    <Download className="h-4 w-4" />
                    Compliance Checklist
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2 text-primary dark:text-white"
                  >
                    <Mail className="h-4 w-4" />
                    Contact Compliance Team
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - UPDATED with compliance focus */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
        >
          <ShieldCheck className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
            Ready to Secure Your Healthcare Data?
          </h2>
          <p className="text-primary-700 dark:text-white max-w-2xl mx-auto mb-6">
            Schedule a security review with our compliance team, request a
            Business Associate Agreement, or download our comprehensive
            healthcare security documentation.
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
                  Request Security Assessment
                </>
              )}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="gap-2 text-primary dark:text-white"
            >
              <Calendar className="h-5 w-5" />
              Schedule Compliance Review
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="gap-2 text-primary dark:text-white"
            >
              <Download className="h-5 w-5 " />
              Healthcare Security Guide
            </Button>
          </div>

          <p className="text-sm text-primary-600 dark:text-white mt-6">
            HIPAA compliance experts • Business Associate Agreements •
            Enterprise security documentation
          </p>
        </motion.div>
      </div>
    </DarkPanel>
  );
}
