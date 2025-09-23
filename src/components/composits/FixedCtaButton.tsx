"use client";
import { Routes } from "@/constants/routes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";

export function FixedCTAButton() {
  const messages = [
    "Start Free Trial →",
    "Ditch the Ledger 📒",
    "Explore Pricing 💸",
    "Pen & paper? Really? 😅",
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current || currentY < 100) {
        setVisible(true);
      }
      lastScrollY.current = currentY;
    };

    const rotateInterval = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 5000);

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearInterval(rotateInterval);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Link href={Routes.sign_up}>
      <Button
        onClick={handleClick}
        className={`fixed  bottom-6 right-6 z-50 bg-gradient-to-br from-[#ff8a00] to-[#ff5e00] text-white font-semibold text-base px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {messages[index]}
      </Button>
    </Link>
  );
}
