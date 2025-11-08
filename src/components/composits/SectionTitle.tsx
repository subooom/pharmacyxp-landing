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
  align = "center",
}: {
  title: string;
  titleContinued: string;
  description: string;
  className?: string;
  align?: "left" | "center" | "right";
}) {
  return (
    <>
      <h2
        className={cn(
          "text-[72px] font-black max-w-3xl leading-22 text-primary-800 " +
            "text-3xl sm:text-4xl md:text-5xl lg:text-[72px]",
          className,
        )}
        style={{ textAlign: align }}
      >
        {title + " "}
        <span className="text-primary">{titleContinued}</span>
      </h2>
      <p
        className="text-base sm:text-lg md:text-xl tracking-tight leading-6 max-w-xl text-primary-800"
        style={{ textAlign: align }}
      >
        {description}
      </p>
    </>
  );
}

export default SectionTitle;
