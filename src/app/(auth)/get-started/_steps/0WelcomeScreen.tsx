import Logo from "@/components/composits/Logo";
import Image from "next/image";
import React from "react";

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-start gap-24 px-[120px] py-[90px]">
      {/* Left Image Section */}
      <div className="flex lg:justify-around items-center flex-wrap">
        <Image
          height={400}
          width={400}
          src="https://medicinexp-staging.com/web/subooom_a_light_themed_image_of_a_doctor_wearing_a_stethoscope__b5c2bff0-8744-40c3-b590-94b3812622fc.png"
          alt="bannerImage"
          className="w-[400px] rounded-tl-[122px] rounded-br-[122px]"
        />
      </div>

      {/* Right Text Section */}
      <div className="max-w-2xl">
        <h2 className="mb-5 text-primary font-bold flex flex-col items-start gap-0 text-[1.1rem]">
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
    </div>
  );
};

export default WelcomeScreen;
