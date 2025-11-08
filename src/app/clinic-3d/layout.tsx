import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "../globals.css";
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
      <body className={`${josefinSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
