import { Routes } from "@/constants/routes";

import Link from "next/link";
import React from "react";
import Links from "./Links";

function Footer() {
  return (
    <footer className="overflow-hidden relative lg:px-62 bg-card min-h-96 pt-12 py-6 text-card-foreground w-full flex flex-col items-center justify-between">
      <div className="absolute bg-footer-radial inset-0 h-96 z-0">
        <h1 className="text-primary-600/10 mt-22 lg:text-[220px] text-center">
          medicinexp
        </h1>
      </div>
      <div className=" z-10 flex flex-col gap-8 justify-center items-center">
        <Links />
        <p>
          Empowering pharmacies with smart financial tools, secure, reliable,
          and built with growth.
        </p>
        <div className="social-media-icons flex space-around"></div>
      </div>
      <div className="z-10 grid w-full grid-cols-2">
        <p>@2025 Copyright medicinexp. All rights reserved.</p>
        <div className="flex justify-between">
          <Link href={Routes.privacy}>Privacy Policy</Link>
          <Link href={Routes.terms}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
