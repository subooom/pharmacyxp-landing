import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { Button } from "../ui/button";

function Banner() {
  return (
    <div className="flex mt-0 md:mt-20 lg:mt-20 xl:mt-[120px] 2xl:mt-[200px] flex-col lg:flex-row justify-center items-center max-w-screen-xl mx-auto layout-container xl:align-top">
      {/* Mobile Image - Shows on small screens (hidden above 1023px) */}
      <Fade direction="down">
        <div className="flex mb-8 sm:mb-10 w-full lg:w-full mt-35 lg:mt-0 justify-center lg:hidden">
          <Image
            height={507}
            width={888}
            src="/assets/images/banner.png"
            alt="ultraxp"
            className="w-full h-auto max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-full"
          />
        </div>
      </Fade>

      <Fade direction="left">
        <div className="w-full lg:w-full flex flex-col items-center justify-center text-center lg:items-start lg:text-left mt-10 lg:mt-20">
          <h1 className="font-bold max-w-xl text-4xl md:text-5xl xl:text-7xl text-primary leading-tight text-center lg:text-left">
            The OS for Clinics, Pharmacies & Hospitals
          </h1>
          <p className="my-4 max-w-lg text-primary text-lg md:text-2xl lg:text-2xl  text-center lg:text-left">
            One platform that unifies billing, racks, users, and access control.
          </p>
          <Link
            href="/get-started"
            className="flex justify-center lg:justify-start mt-2 lg:mt-0"
          >
            <Button className="rounded-none px-24 my-4 p4-6">
              Start Free Trail
            </Button>
          </Link>
        </div>
      </Fade>

      {/* Desktop Image - Hidden on screens 1023px and below */}
      <Fade direction="right">
        <div className="hidden lg:flex w-full lg:w-full justify-center">
          <Image
            height={507}
            width={888}
            src="/assets/images/banner.png"
            alt="ultraxp"
            className="w-full h-auto max-w-[500px] xl:max-w-[600px] 2xl:max-w-full"
          />
        </div>
      </Fade>
    </div>
  );
}

export default Banner;
