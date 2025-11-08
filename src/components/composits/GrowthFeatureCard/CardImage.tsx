import { cn } from "@/lib/utils";
import React from "react";

function CardImage({
  image,
  alt,
  overlay = true,
  opacity = 0.5,
  height = 320,
  width = "auto",
  objectPosition = "left",
  className,
}: {
  image: string;
  alt: string;
  overlay?: boolean;
  opacity?: number;
  height?: number | string;
  width?: number | string;
  objectPosition?: string;
  className?: string;
}) {
  return (
    <div className="feature-card-image">
      <div className="mx-6 relative">
        {/* <img
          className={cn(
            "rounded-md mx-auto overflow-hidden z-0 object-cover",
            className,
          )}
          style={{ opacity, height, width, objectPosition }}
          src={image}
          alt={alt}
        /> */}

        <img
          className={cn(
            "rounded-md mx-auto overflow-hidden z-0 object-cover",
            className,
          )}
          style={{ opacity, width, objectPosition }}
          src={image}
          alt={alt}
        />
      </div>
    </div>
  );
}

export default CardImage;
