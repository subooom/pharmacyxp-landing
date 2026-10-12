import Logo from "@/components/composits/Logo";
import Image from "next/image";
import React from "react";
import VisitedByRepCard from "../_components/VisitedByRepCard";

const WelcomeScreen = () => {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 py-2 sm:py-6 lg:flex-row lg:items-center lg:gap-20 lg:py-12">
      {/* Left Image Section */}
      <div className="flex shrink-0 justify-center">
        <Image
          height={400}
          width={400}
          src="https://medicinexp-staging.com/web/subooom_a_light_themed_image_of_a_doctor_wearing_a_stethoscope__b5c2bff0-8744-40c3-b590-94b3812622fc.png"
          alt="bannerImage"
          priority
          className="h-auto w-44 rounded-br-[64px] rounded-tl-[64px] sm:w-64 lg:w-[400px] lg:rounded-br-[122px] lg:rounded-tl-[122px]"
        />
      </div>

      {/* Right Text Section */}
      <div className="flex w-full max-w-2xl flex-col gap-6">
        <div>
          <h2 className="mb-4 flex flex-col items-start gap-0 text-[1.1rem] font-bold text-primary">
            <span className="mt-1">thanks for choosing</span>
            <span className="flex items-center text-[2rem]">
              <Logo />!
            </span>
          </h2>
          <p className="text-foreground">
            A platform for resource management and bill generation intended for
            medicinal stock keepers.
            <br />
            <br />
            Make your application using our thorough, step-by-step instructions.
          </p>
        </div>

        <VisitedByRepCard />
      </div>
    </div>
  );
};

export default WelcomeScreen;
