import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { StarIcon } from "lucide-react";
import React from "react";

export interface TestimonialCardProps {
  index: number;
  testimonial: Testimonial;
}

export interface Testimonial {
  id: number;
  createdAgo: string;
  message: string;
  user: {
    avatar: string;
    name: string;
    position: string;
    stars: number;
  };
}

function TestimonialCard({
  index: displayIndex,
  testimonial: {
    message,
    createdAgo,
    user: { avatar, name, position, stars },
  },
}: TestimonialCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 py-4 px-4 rounded-[50px] bg-gradient-to-r shadow-sm from-0% border border-primary-950/7 border-r-2 border-r-red-400 min-w-xl max-w-xl text-foreground",
        displayIndex % 2 === 0
          ? "from-indigo-400/20 to-purple-400/10 "
          : "from-indigo-200/20 to-purple-200/20",
      )}
    >
      <div className="top-panel flex justify-end px-6">
        <p>{createdAgo}</p>
      </div>
      <div className="message">{message}</div>
      <div className="flex justify-between">
        <div className="user-panel flex gap-6 items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={avatar} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {name
                .split(" ")
                .map((item) => item.charAt(0).toUpperCase())
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="name-section flex flex-col gap-1">
            <p>{name}</p>
            <p>{position}</p>
          </div>
        </div>
        <div className="stars flex gap-1 items-center">
          {Array.from({ length: stars }, (_, i) => (
            <div key={i}>
              <StarIcon
                size={16}
                className="fill-[#F4D35E] stroke-[#b49832] dark:fill-[#F4D35E] dark:stroke-[#F4D35E] "
              />
            </div>
          ))}
          {Array.from({ length: 5 - stars }, (_, i) => (
            <div key={i}>
              <StarIcon size={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
