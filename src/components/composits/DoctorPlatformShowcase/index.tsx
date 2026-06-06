// import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BriefcaseMedical,
  CalendarDays,
  DollarSign,
  Users,
  Settings,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Intelligent Scheduling",
    description: "Manage all doctor types with smart conflict-free scheduling.",
    stats: "92% fewer scheduling errors",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: DollarSign,
    title: "Commission Management",
    description: "Track commissions across services and automate payments.",
    stats: "Eliminate commission disputes",
    color: "text-green-600 bg-green-50",
  },
  {
    icon: Users,
    title: "Complete Doctor Profiles",
    description: "Manage certifications, specializations, and availability.",
    stats: "10+ doctor types supported",
    color: "text-purple-600 bg-purple-50",
  },
  {
    icon: Settings,
    title: "Service Configuration",
    description: "Define services per doctor with room assignments.",
    stats: "Customize per pharmacy",
    color: "text-amber-600 bg-amber-50",
  },
];

const doctorTypes = [
  { name: "Regular Staff", tag: "Full-time" },
  { name: "Visiting Consultants", tag: "Flexible" },
  { name: "On-Call Doctors", tag: "Emergency" },
  { name: "Part-Time", tag: "Shared" },
  { name: "External Partners", tag: "Referral" },
  { name: "Telemedicine", tag: "Remote" },
  { name: "Retirees", tag: "Consulting" },
  { name: "Trainees", tag: "Learning" },
  { name: "Locums", tag: "Temporary" },
  { name: "Specialists", tag: "Expert" },
];

// const doctors = [
//   { id: "1", name: "Dr. Aasha Sharma", specialization: "Cardiologist" },
//   { id: "2", name: "Dr. Bikram Thapa", specialization: "Neurologist" },
//   { id: "3", name: "Dr. Sunita Koirala", specialization: "Pediatrician" },
//   { id: "4", name: "Dr. Rajan Mahat", specialization: "Orthopedic Surgeon" },
//   { id: "5", name: "Dr. Manisha Gurung", specialization: "Dermatologist" },
//   {
//     id: "6",
//     name: "Dr. Shubham Kharel",
//     specialization: "Computer Specialist",
//   },
// ];

const benefits = [
  "31-day free trial",
  "No credit card required",
  "Full onboarding support",
  "Cancel anytime",
  "Data migration assistance",
  "24/7 Nepali support",
];
const colors = [
  "bg-orange-500 hover:bg-orange-500/90 text-primary-50",
  "bg-blue-500 hover:bg-blue-500/90",
  "bg-green-500 hover:bg-green-500/90",
  "bg-purple-500 hover:bg-purple-500/90 text-primary-50",
  "bg-red-500 hover:bg-red-500/90 text-primary-50",
  "bg-yellow-500 hover:bg-yellow-500/90 text-primary-50",
  "bg-pink-500 hover:bg-pink-500/90 text-white",
  "bg-primary hover:bg-primary/90 text-white",
];

export function DoctorPlatformShowcase() {
  return (
    <section className="py-24 sm:py-32 -mt-[100px] lg:-mt-[240px] bg-background overflow-x-clip">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="text-center">
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 text-sm font-medium"
          >
            Complete Doctor Management
          </Badge>
          <div className="relative w-full max-w-3xl mx-auto mb-6 sm:mb-8">
            <img
              src="/doctor creation.png"
              alt="Dashboard preview"
              className="w-full h-auto select-none pointer-events-none"
            />
          </div>
          <h1 className="text-4xl mt-18 md:text-5xl lg:text-6xl max-w-4xl mx-auto font-bold tracking-tight mb-6">
            The Ultimate Doctor Platform for{" "}
            <span className="text-primary">Modern Medical Teams</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-700 max-w-3xl mx-auto mb-12">
            Manage scheduling, commissions, services, and patient care for all
            your medical professionals. Purpose-built for dynamic medical
            organizations.
          </p>
          <img
            src="/logo-light.png"
            alt="Medicinexp Logo"
            className="mx-auto hidden dark:inline-block h-16 mr-2"
          />{" "}
          <img
            src="/logo.png"
            alt="Medicinexp Logo"
            className="inline-block mx-auto dark:hidden h-16 mr-2"
          />{" "}
        </div>
        {/* Meet Our Doctors */}
        {/* <div className="py-12 text-center relative">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Meet Our Doctors
          </h2>

          <p className="text-lg text-primary-700 max-w-2xl mx-auto mb-14">
            Our platform supports a diverse team of specialists, ready to
            provide top-tier care.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="group bg-background border border-white/5 rounded-2xl p-6 flex flex-col items-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-white/10"
              >
                <div className="relative w-28 h-28 rounded-full overflow-hidden mb-5 shadow-lg">
                  <Image
                    src={`https://picsum.photos/seed/${doctor.id}/200`}
                    alt={doctor.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <h4 className="text-base font-semibold">{doctor.name}</h4>
                <p className="text-sm text-primary-700 mt-1">
                  {doctor.specialization}
                </p>

                <span className="mt-4 text-xs px-3 py-1 rounded-full border border-white/10 flex gap-2">
                  <div className="size-3 inline-block bg-emerald-500 border border-white rounded-full"></div>
                  Available
                </span>
              </div>
            ))}
          </div>
        </div> */}
        {/* Doctor Types */}
        <div className="py-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            All Doctor Types, One Platform
          </h2>

          <p className="text-lg text-primary-700 max-w-2xl mx-auto mb-12">
            From full-time staff to visiting specialists, medicinexp
            accommodates every role in your medical team.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {doctorTypes.map((type, index) => (
              <Card
                key={index}
                className="text-center flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader className="items-center">
                  <BriefcaseMedical className="h-8 w-8 text-primary mb-2 mx-auto" />
                  <CardTitle className="text-lg font-semibold">
                    {type.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge
                    variant="secondary"
                    className={colors[index % colors.length]}
                  >
                    {type.tag}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* Features */}
        <div className="py-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Powerful Features, Seamlessly Integrated
            </h2>
            <p className="text-lg text-primary-700">
              Everything you need to run your medical operations smoothly, all
              in one place.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <CardHeader>
                  <div
                    className={`inline-flex p-3 rounded-lg ${feature.color} mb-4 w-fit`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-primary-700/80">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <CardContent>
                  <p className="text-sm font-medium text-primary-700">
                    {feature.stats}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        {/* CTA */}
        <Card className="bg-primary/10 text-primary rounded-[80px] border-none">
          <CardContent className="p-12 text-center">
            <img
              src="/logo-light.png"
              alt="Medicinexp Logo"
              className=" hidden dark:inline-block h-12 mr-2 mb-6"
            />
            <img
              src="/logo.png"
              alt="Medicinexp Logo"
              className="inline-block dark:hidden h-12 mr-2 mb-6"
            />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Doctor Management?
            </h3>
            <p className="text-lg text-primary-700/80 mb-8 max-w-2xl mx-auto">
              Join pharmacies across Nepal who trust to manage their most
              valuable asset.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                variant="default"
                className="bg-orange-500 hover:bg-orange-500/90 font-bold"
              >
                Start Free 31-Day Trial
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="font-bold border-2 border-primary hover:bg-orange-600/10"
              >
                Book a Demo
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-primary-700">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
