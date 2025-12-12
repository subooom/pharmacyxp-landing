// import { cn } from "@/lib/utils";
// import React from "react";

// function SectionTitle({
//   title,
//   titleContinued,
//   description,
//   className,
//   align = "center",
// }: {
//   title: string;
//   titleContinued: string;
//   description: string;
//   className?: string;
//   align?: "left" | "center" | "right";
// }) {
//   return (
//     <>
//       <h2
//         className={cn(
//           "text-[72px] font-black max-w-3xl leading-22 text-primary-800",
//           className,
//         )}
//         style={{ textAlign: align }}
//       >
//         {title + " "}
//         <span className="text-primary">{titleContinued}</span>
//       </h2>
//       <p
//         className="text-xl tracking-tight leading-6  max-w-xl text-primary-800"
//         style={{ textAlign: align }}
//       >
//         {description}
//       </p>
//     </>
//   );
// }

// export default SectionTitle;

import { cn } from "@/lib/utils";
import React from "react";

function SectionTitle({
  title,
  titleContinued,
  description,
  className,
  descriptionClassName,
  align = "center",
}: {
  title: string;
  titleContinued: string;
  description: string;
  className?: string;
  descriptionClassName?: string;
  align?: "left" | "center" | "right";
}) {
  return (
    <>
      <h2
        className={cn(
          "font-black max-w-3xl px-4 md:px-0 leading-22 text-primary-800 ",
          "text-5xl md:text-8xl lg:text-[72px]",
          className,
        )}
        style={{ textAlign: align }}
      >
        {title + " "}
        <span className="text-primary">{titleContinued}</span>
      </h2>
      <p
        className={cn(
          "text-base sm:text-lg md:text-xl tracking-tight leading-6 max-w-xl text-primary-800",
          descriptionClassName,
        )}
        style={{ textAlign: align }}
      >
        {description}
      </p>
    </>
  );
}

export default SectionTitle;
