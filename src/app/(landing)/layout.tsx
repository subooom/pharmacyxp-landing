import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "../globals.css";
import PageHeader from "@/components/composits/PageHeader";
import Footer from "@/components/composits/Footer";
import "leaflet/dist/leaflet.css";
import { ThemeProvider } from "@/components/theme-provider";

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
        <script
          src="https://cdn.commoninja.com/sdk/latest/commonninja.js"
          defer
        ></script>
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
          <div className="commonninja_component pid-83e5a255-cd3f-49b2-b03d-c5925dd19c57"></div>
        </ThemeProvider>
        <Footer />
      </body>
    </html>
  );
}
