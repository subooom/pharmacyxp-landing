import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { Button } from "../ui/button";

function Banner() {
  return (
    <div className="flex mt-[200px] flex-col lg:flex-row justify-start items-start max-w-screen-xl mx-auto px-4 pt-24 layout-container">
      <Fade direction="left">
        <div className="w-full lg:w-full">
          <h1 className="font-bold max-w-xl text-5xl md:text-7xl text-primary leading-tight">
            Monitor your business with medicinexp
          </h1>
          <p className="my-4 max-w-md text-primary text-2xl">
            Manage your pharmacy with less chaos and more control.
          </p>
          <Link href="/get-started">
            <Button>Get Started</Button>
          </Link>
        </div>
      </Fade>

      <Fade direction="right">
        <div className="w-full lg:w-full mt-12 lg:mt-0 flex justify-center">
          <Image
            height={507}
            width={888}
            src="/assets/images/banner-7.png"
            alt="ultraxp"
            className="w-full h-auto max-w-[90%] lg:max-w-full"
          />
        </div>
      </Fade>
    </div>
  );
}

export default Banner;
