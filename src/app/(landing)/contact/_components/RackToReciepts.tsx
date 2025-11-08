// // components/FromRacksToReceipts.tsx

// import Logo from "@/components/composits/Logo";
// import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";

// export default function FromRacksToReceipts() {
//   return (
//     <Card className="w-full max-w-8xl mx-auto mt-12 shadow-xl rounded-2xl relative overflow-hidden border border-primary-900/10 bg-primary-50">
//       <CardContent className="p-10 flex flex-col md:flex-row justify-between items-start md:items-center">
//         <div className="w-full flex flex-col items-center md:hidden mb-6 relative">
//           <Image
//             src="/assets/images/banner.jpg"
//             alt="From Racks to Receipts"
//             width={1472 * 0.35}
//             height={832 * 0.35}
//             className="rounded-lg"
//           />
//           <div className="absolute top-16 sm:top-16 bg-primary-50/90 p-2 sm:p-3 md:p-4 rounded-full shadow-md scale-75 sm:scale-90">
//             <Logo />
//           </div>
//         </div>

//         <div className="flex-1 text-left">
//           <h2 className="text-3xl mb-2 text-primary font-bold tracking-tight">
//             From Racks to Receipts
//           </h2>
//           <p className="text-primary-900 text-lg">
//             We handle everything — from the shelves of your pharmacy to the
//             final invoice.
//           </p>
//           <p className="text-primary-900/70 text-sm">
//             Whether it&apos;s inventory, billing, or just saying hi — we&apos;re
//             here. Let’s connect and get things rolling.
//           </p>
//         </div>

//         {/* Logo for large screens  */}
//         <div className="hidden md:block mr-28 mt-12 mb-6 z-30 bg-primary-50/90 p-4 rounded-full">
//           <Logo />
//         </div>

//         {/* Image for large screens  */}
//         <Image
//           src="/assets/images/banner.jpg"
//           alt="From Racks to Receipts"
//           width={1472 * 0.4}
//           height={832 * 0.4}
//           className="hidden md:block rounded-lg absolute z-0 -right-4 top-0"
//         />
//       </CardContent>
//     </Card>
//   );
// }

// components/FromRacksToReceipts.tsx

// components/FromRacksToReceipts.tsx

import Logo from "@/components/composits/Logo";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function FromRacksToReceipts() {
  return (
    <Card className="w-full max-w-8xl mx-auto mt-12 shadow-xl rounded-2xl relative overflow-hidden border border-primary-900/10 bg-primary-50">
      <CardContent className="p-6 md:p-8 lg:p-10 flex flex-col xl:flex-row justify-between items-start xl:items-center">
        {/* Mobile & Tablet: Image with overlay logo (hidden on desktop) */}
        <div className="w-full flex flex-col items-center xl:hidden mb-6 relative">
          <Image
            src="/assets/images/banner.jpg"
            alt="From Racks to Receipts"
            width={1472}
            height={832}
            className="rounded-lg w-full max-w-md mx-auto"
            style={{ height: "auto", maxHeight: "200px" }}
          />
          <div className="absolute top-8 sm:top-12 md:top-16 bg-primary-50/90 p-3 md:p-4 rounded-full shadow-md">
            <Logo />
          </div>
        </div>

        {/* Text Content - Centered on mobile/tablet, left-aligned on desktop */}
        <div className="flex-1 text-center xl:text-left xl:pr-8 w-full">
          <h2 className="text-2xl md:text-3xl lg:text-3xl mb-2 text-primary font-bold tracking-tight">
            From Racks to Receipts
          </h2>
          <p className="text-primary-900 text-base md:text-lg lg:text-lg">
            We handle everything — from the shelves of your pharmacy to the
            final invoice.
          </p>
          <p className="text-primary-900/70 text-sm md:text-sm lg:text-sm">
            Whether it&apos;s inventory, billing, or just saying hi — we&apos;re
            here. Let&apos;s connect and get things rolling.
          </p>
        </div>

        {/* Logo for desktop only (hidden on tablets) */}
        <div className="hidden xl:block mr-28 mt-10 mb-6 z-30 bg-primary-50/90 p-4 rounded-full">
          <Logo />
        </div>

        {/* Image for desktop only (hidden on tablets) */}
        <Image
          src="/assets/images/banner.jpg"
          alt="From Racks to Receipts"
          width={1472 * 0.4}
          height={832 * 0.4}
          className="hidden xl:block rounded-lg absolute z-0 -right-4 top-0"
        />
      </CardContent>
    </Card>
  );
}
