// app/not-found.tsx
import "./globals.css";

import Link from "next/link";
import { Josefin_Sans } from "next/font/google";
import { Home, FileText, CreditCard, Phone } from "lucide-react";
import RootLayout from "./(landing)/layout";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export default function NotFound() {
  const navLinks = [
    { name: "Features", href: "/features", icon: FileText },
    { name: "Pricing", href: "/pricing", icon: CreditCard },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Home", href: "/", icon: Home },
  ];

  return (
    <RootLayout renderFooter={false} renderHeader={false}>
      <div
        className={`${josefinSans.variable} antialiased min-h-screen bg-primary-50`}
      >
        {/* Main Content - Keeping your original structure */}
        <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col items-center justify-center px-6 py-8 text-center lg:px-12">
            <div className="mb-12">
              <Link href="/" className="flex items-center ">
                <img
                  src="logo.png"
                  alt="logo-image"
                  width={400}
                  className="flex dark:hidden items-center justify-center mb-6 "
                />{" "}
                <img
                  src="logo-light.png"
                  alt="logo-image"
                  width={400}
                  className="hidden dark:flex items-center justify-center mb-6 "
                />
              </Link>

              <h1 className="mb-4 text-6xl font-bold tracking-tight text-primary-950 ">
                404
              </h1>

              <h2 className="mb-3 text-3xl font-semibold text-primary-900 ">
                Page not found
              </h2>

              <p className="text-primary-800 mb-8 max-w-sm leading-relaxed">
                Sorry, we couldn&apos;t find the page you&apos;re looking for.
                Perhaps you&apos;ve mistyped the URL or the page has moved.
              </p>

              <div className="mb-10">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-sm font-medium text-white transition-all hover:bg-primary-700 hover:shadow-md active:scale-[0.98]"
                >
                  Return to Homepage
                </Link>
              </div>

              {/* Alternative Links */}
              <div className="mb-12">
                <p className="text-sm text-primary-600 dark:text-primary-500 mb-4">
                  Or try one of these pages:
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                    >
                      <link.icon className="mr-2 h-3.5 w-3.5" />
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-8 border-t border-gray-100">
                <p className="text-sm text-primary-600 ">
                  MedicineXP • Software for Pharmacies, Clinics & Hospitals
                </p>
                <p className="mt-4 text-sm text-primary-500 ">
                  Need help?{" "}
                  <Link
                    href="/contact"
                    className="text-primary hover:underline"
                  >
                    Contact our support
                  </Link>
                  !
                </p>
              </div>
            </div>
          </div>

          {/* Right Section: Illustration - Keeping your original image */}
          <div className="relative max-h-screen w-full p-2 max-lg:hidden">
            <div className="h-full w-full rounded-2xl bg-gradient-to-br from-primary-800 to-primary-900 overflow-hidden">
              {/* Subtle pattern overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:40px_40px]"></div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center p-12">
                <div className="relative">
                  <div className="absolute -inset-8 bg-primary rounded-3xl blur-xl"></div>
                  <img
                    src="https://cdn.shadcnstudio.com/ss-assets/blocks/marketing/error/image-1.png"
                    alt="404 illustration"
                    className="relative h-auto max-h-[70vh] w-auto object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white p-4 md:hidden">
          <div className="grid grid-cols-4 gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex flex-col items-center p-2 text-xs text-gray-600 transition-colors hover:text-primary"
              >
                <link.icon className="mb-1 h-5 w-5" />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
