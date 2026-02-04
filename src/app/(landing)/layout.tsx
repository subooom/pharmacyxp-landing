import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./../globals.css";
import PageHeader from "@/components/composits/PageHeader";
import Footer from "@/components/composits/Footer";
import "leaflet/dist/leaflet.css";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

const josefinSans = Josefin_Sans({
  variable: "--font-josefin-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "medicinexp - From Racks to Receipts",
  description: "medicinexp - built for pharmacies, polyclinics, and hospitals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <head>
        <Script
          id="tawkio"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
      (function() {
        var s1 = document.createElement("script"),
            s0 = document.getElementsByTagName("script")[0];
        s1.async = true;
        s1.src = "https://embed.tawk.to/6948dbded32ace197baae7b6/1jd29lnr6";
        s1.charset = "UTF-8";
        s1.setAttribute('crossorigin', '*');
        s0.parentNode.insertBefore(s1, s0);
      })();
    `,
          }}
        />
      </head>
      <body
        style={{
          overflowX: "hidden",
        }}
        className={`${josefinSans.variable} antialiased max-w-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageHeader />
          <main>{children}</main>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
