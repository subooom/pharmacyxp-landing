import { Routes } from "@/constants/routes";

import Link from "next/link";
import React from "react";
import Links from "./Links";
import WaveDivider from "../WaveDivider";

function Footer() {
  return (
    <>
      <footer className="overflow-hidden relative lg:px-62 bg-card min-h-96 pt-12 py-6 text-card-foreground w-full flex flex-col items-center justify-between">
        {/* <div className="absolute bg-footer-radial inset-0 h-96 z-0"> */}
        <WaveDivider invert className="-mt-12 lg:-mt-22 z-10 mb-12 w-screen" />
        <div className="absolute inset-0 h-96 bg-footer-radial z-0 flex justify-center items-center">
          <h1 className="text-primary-600/10 text-center text-[92px] sm:text-[108px] md:text-[123px] lg:text-[220px] leading-none -mt-52 lg:mt-0">
            {/* <h1 className="text-primary-600/10 mt-22 lg:text-[220px] text-center"> */}
            medicinexp
          </h1>
        </div>
        {/* <div className=" z-10 flex flex-col gap-8 justify-center items-center">
          <Links />
          <p>
            Empowering pharmacies with smart financial tools, secure, reliable,
            and built with growth.
          </p>
          <div className="social-media-icons flex space-around"></div>
        </div> */}

        <div className="z-10 flex flex-col gap-6 items-center text-center max-w-3xl">
          <Links />
          <p className="text-sm sm:text-base px-2 sm:px-4">
            Empowering pharmacies with smart financial tools. Secure, reliable,
            and built for growth.
          </p>
          <div className="social-media-icons flex gap-4">
            {/* icons here */}
          </div>
        </div>

        <div className="z-10 lg:mt-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs lg:text-sm">
          <p className="text-center lg:text-left">
            © 2025 medicinexp. All rights reserved.
          </p>
          <div className="flex justify-center lg:justify-end gap-6">
            <Link href={Routes.privacy}>Privacy Policy</Link>
            <Link href={Routes.terms}>Terms of Service</Link>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
