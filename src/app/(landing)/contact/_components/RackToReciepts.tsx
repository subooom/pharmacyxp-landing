// components/FromRacksToReceipts.tsx

import Logo from "@/components/composits/Logo";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function FromRacksToReceipts() {
  return (
    <Card className="w-full x-w-3xl mx-auto mt-12 shadow-xl rounded-2xl relative overflow-hidden border border-primary-900/10 bg-primary-50 ">
      <CardContent className="p-10 flex justify-between items-center ">
        <div className="">
          <h2 className="text-3xl mb-2 text-primary font-bold tracking-tight">
            From Racks to Receipts
          </h2>
          <p className="text-primary-900 text-lg">
            We handle everything — from the shelves of your pharmacy to the
            final invoice.
          </p>
          <p className="text-primary-900/70 text-sm">
            Whether it&apos;s inventory, billing, or just saying hi — we&apos;re
            here. Let’s connect and get things rolling.
          </p>
        </div>
        <div className="mr-28 mt-12 mb-6 z-30 bg-primary-50/90 p-4 rounded-full">
          <Logo />
        </div>
        {/* <div className="absolute -bottom-4 -right-0 p-4 bg-primary-50/80 w-[400px] h-[200px] z-10 blur-xl  rounded-full"></div> */}
        <Image
          src="/assets/images/banner.jpg"
          alt="From Racks to Receipts"
          width={1472 * 0.4}
          height={832 * 0.4}
          className="rounded-lg  absolute z-0 -right-4 top-0"
        />
      </CardContent>
    </Card>
  );
}
