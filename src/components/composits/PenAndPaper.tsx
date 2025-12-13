"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Routes } from "@/constants/routes";

const PenAndPaper: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePosition = useRef({ x: 400, y: 250 });
  const targetPosition = useRef({ x: 400, y: 250 });
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const image1 = new Image();
    const image2 = new Image();
    const logoImage = new Image();

    image2.src = "/assets/images/banner-1.png";
    image1.src = "/assets/images/banner-8.png";
    logoImage.src = "/logo.png";

    let imagesLoaded = 0;
    const onImageLoad = () => {
      if (++imagesLoaded === 3) startAnimation();
    };

    image1.onload = onImageLoad;
    image2.onload = onImageLoad;
    logoImage.onload = onImageLoad;

    function drawLogo(
      ctx: CanvasRenderingContext2D,
      rectX: number,
      yPos: number,
      offset: number,
    ) {
      const logoHeight = 50;
      const logoWidth = logoImage.width * (logoHeight / logoImage.height);

      let imageX;
      if (+offset + logoWidth > mousePosition.current.x * 1.57) {
        imageX = rectX + offset;
      } else {
        imageX = rectX - offset - logoWidth;
      }

      const imageY = yPos - logoHeight / 2;
      ctx.drawImage(logoImage, imageX, imageY, logoWidth, logoHeight);
    }

    const drawImages = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const rectWidth = 30;
      let rectX = mousePosition.current.x * 1.57;
      const textY = mousePosition.current.y * 1.7;

      // Image 1
      const imgAspect1 = image1.width / image1.height;
      const drawHeight1 = canvas.height;
      const drawWidth1 = drawHeight1 * imgAspect1;
      const cropRatio1 = rectX / drawWidth1;
      const cropWidth1 = image1.width * cropRatio1;
      ctx.drawImage(
        image1,
        0,
        0,
        cropWidth1,
        image1.height,
        0,
        0,
        rectX,
        drawHeight1,
      );

      // Image 2
      const imgAspect2 = image2.width / image2.height;
      const drawHeight2 = canvas.height;
      const drawWidth2 = drawHeight2 * imgAspect2;
      const availableWidth = canvas.width - rectX - rectWidth;

      if (drawWidth2 > availableWidth) {
        const cropRatio2 = availableWidth / drawWidth2;
        const cropWidth2 = image2.width * cropRatio2;
        const cropX = image2.width - cropWidth2;
        ctx.drawImage(
          image2,
          cropX,
          0,
          cropWidth2,
          image2.height,
          rectX + rectWidth,
          0,
          availableWidth,
          drawHeight2,
        );
      } else {
        const offsetX = rectX + rectWidth + (availableWidth - drawWidth2) / 2;
        ctx.drawImage(
          image2,
          0,
          0,
          image2.width,
          image2.height,
          offsetX,
          0,
          drawWidth2,
          drawHeight2,
        );
      }

      // Divider
      ctx.fillStyle = "oklch(0.3909 0.1381 280.49)";
      ctx.fillRect(rectX, 0, rectWidth, canvas.height);

      // Divider icon
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      const iconX = rectX + rectWidth / 2;
      const iconY = canvas.height / 2;
      const barWidth = 3;
      const barHeight = 24;
      const barSpacing = 5;
      const radius = 1.5;

      ctx.beginPath();
      ctx.roundRect(
        iconX - barSpacing,
        iconY - barHeight / 2,
        barWidth,
        barHeight,
        radius,
      );
      ctx.roundRect(
        iconX + barSpacing - barWidth,
        iconY - barHeight / 2,
        barWidth,
        barHeight,
        radius,
      );
      ctx.fill();

      drawLogo(ctx, rectX, textY, 40);
    };

    const animate = () => {
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
      mousePosition.current.x = lerp(
        mousePosition.current.x,
        targetPosition.current.x,
        0.08,
      );
      mousePosition.current.y = lerp(
        mousePosition.current.y,
        targetPosition.current.y,
        0.08,
      );

      drawImages();
      rafRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      rafRef.current = requestAnimationFrame(animate);
    };

    return () => cancelAnimationFrame(rafRef.current!);
  }, []);

  return (
    <section className="flex gap-14 layout-container flex-col lg:flex-row items-center justify-between max-w-screen-xl mx-auto px-4 my-12 lg:my-24">
      {/* Canvas Section */}
      <div className="w-full lg:w-5/12 lg:mt-24 overflow-hidden flex">
        <canvas
          ref={canvasRef}
          id="banner-canvas"
          width="888"
          height="507"
          onMouseMove={(e) => {
            const x = e.nativeEvent.offsetX;
            const y = e.nativeEvent.offsetY;
            targetPosition.current = { x, y };
          }}
          onMouseOut={() => {
            targetPosition.current = { x: 444, y: 253 }; // center
          }}
          onTouchMove={(e) => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const touch = e.nativeEvent.touches[0];
            if (!touch) return;
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;
            targetPosition.current = { x: x * scaleX, y: y * scaleY };
          }}
          onTouchEnd={() => {
            targetPosition.current = { x: 444, y: 253 }; // center
          }}
          className="w-full h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-7/12 lg:mt-24">
        <h2 className="text-orange-500 font-medium text-xl mb-2">
          All in One Access
        </h2>
        <h1 className="text-primary font-bold text-4xl md:text-5xl leading-snug">
          No more pen, paper, or rigid systems.
        </h1>
        <p className="mt-4 text-primary-700 mb-10 text-lg  ">
          <b className="text-xl">medicinexp</b> adapts its dashboards, menus,
          widgets, and workflows based on roles & permissions.
        </p>
        <Link href={Routes.sign_up} className="inline-block">
          <button
            type="button"
            className="bg-gradient-to-br from-[#ff8a00] to-[#ff5e00] text-white font-semibold text-base px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center group"
          >
            Start Free Trial
            <ArrowRight
              className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              size={20}
            />
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PenAndPaper;
