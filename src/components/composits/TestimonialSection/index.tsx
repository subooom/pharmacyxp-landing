"use client";
import React from "react";
import SectionTitle from "../SectionTitle";
import DarkPanel from "../DarkPanel";
import { testimonials } from "./data";
import TestimonialCard from "./Card";
import { useAutoScrollTestimonials } from "./useAutoScrollTestimonials";

function TestimonialSection() {
  const testimonialRef = useAutoScrollTestimonials({ reverse: false });
  const testimonialReverseRef = useAutoScrollTestimonials({ reverse: true });

  return testimonials.length === 0 ? null : (
    <DarkPanel className="testimonial-section">
      <SectionTitle
        title="Hear It From Those"
        titleContinued="Who Matter Most"
        description="From inventory to insights, each feature is built to save time, cut
        costs, and scale your pharmacy faster."
      />
      {testimonials.length > 6 ? (
        <>
          <div
            ref={testimonialRef}
            className="testimonial-card flex gap-6 w-full px-8 overflow-x-auto mx-20 mt-12"
          >
            {testimonials
              .slice(0, parseInt(testimonials.length / 2 + "", 10))
              .map((item, i) => (
                <TestimonialCard key={item.id} index={i} testimonial={item} />
              ))}
          </div>
          <div
            ref={testimonialReverseRef}
            className="testimonial-card flex gap-6 w-full px-8 overflow-x-auto mx-20 mt-4"
          >
            {testimonials
              .slice(
                parseInt(testimonials.length / 2 + "", 10),
                testimonials.length,
              )
              .map((item, i) => (
                <TestimonialCard key={item.id} index={i} testimonial={item} />
              ))}
          </div>
        </>
      ) : (
        <div
          ref={testimonialReverseRef}
          className="testimonial-card flex gap-6 w-full px-8 overflow-x-auto mx-20 mt-4"
        >
          {testimonials.map((item, i) => (
            <TestimonialCard key={item.id} index={i} testimonial={item} />
          ))}
        </div>
      )}
    </DarkPanel>
  );
}

export default TestimonialSection;
