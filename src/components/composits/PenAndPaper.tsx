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

    image1.src = "/assets/images/banner-7.png";
    image2.src = "/assets/images/banner-8.png";

    let imagesLoaded = 0;
    const onImageLoad = () => {
      if (++imagesLoaded === 2) startAnimation();
    };

    image1.onload = onImageLoad;
    image2.onload = onImageLoad;

    function drawLogo(
      ctx: CanvasRenderingContext2D,
      text: string,
      rectX: number,
      textY: number,
      offset: number,
    ) {
      ctx.font = "800 40px 'Josefin Sans'";
      ctx.fillStyle = "#3b368c";

      const spacing = 2;
      const letters = text.split("");
      const textWidth = letters.reduce(
        (w, l) => w + ctx.measureText(l).width + spacing,
        -spacing,
      );

      let textX;
      if (+offset + textWidth > mousePosition.current.x * 1.57) {
        textX = rectX + offset;
      } else {
        textX = rectX - offset - textWidth;
      }

      let x = textX;
      for (const letter of letters) {
        ctx.fillText(letter, x, textY);
        x += ctx.measureText(letter).width + spacing;
      }
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

      drawLogo(ctx, "medicinexp", rectX, textY, 40);
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
    <section className="flex gap-14 layout-container flex-col lg:flex-row items-center justify-between max-w-screen-xl mx-auto px-4 my-24">
      {/* Canvas Section */}
      <div className="w-full lg:w-5/12 mt-24 overflow-hidden">
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
          className="w-full h-auto"
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-7/12 mt-24">
        <h2 className="text-orange-500 font-medium text-xl mb-2">
          All in One Access
        </h2>
        <h1 className="text-primary font-bold text-4xl md:text-5xl leading-snug">
          Never use pen and paper again!
        </h1>
        <p className="mt-4 text-primary-700 text-lg mb-10">
          Alongside resource management and printable bills, our powerful widget
          system lets you add tools like to-do lists and notepads on the fly.
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
