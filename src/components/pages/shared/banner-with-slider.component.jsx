"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SLIDE_DURATION_MS = 4500;

export default function BannerWithSlider({
  eyebrow,
  title,
  highlight,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  slides = [],
  className,
}) {
  const safeSlides =
    Array.isArray(slides) && slides.length > 0
      ? slides
      : [{ url: "/uploads/crochets/crochet-dress-main.jpg", alt: "MellyCrochets crochet banner" }];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (safeSlides.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeSlides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [safeSlides.length]);

  return (
    <section className={cn("w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-10 pb-8 md:pt-16 md:pb-10", className)}>
      {/* <div className="max-w-7xl mx-auto"> */}
        <div className="rounded-3xl overflow-hidden shadow-2xl bg-[#140406] border border-[#82181a] grid gap-0 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.6fr)]">
          {/* Left: image slider on warm panel */}
          <div className="relative bg-[#82181a] sm:bg-gradient-to-br sm:from-[#82181a] sm:via-[#a82a2d] sm:to-[#c9a87c] px-4 sm:px-6 py-6 sm:py-8 flex items-end justify-center">
            {/* Decorative grid and dots */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-6 -left-8 w-32 h-32 border border-white/40 opacity-30" />
              <div className="absolute top-6 right-6 grid grid-cols-4 gap-1 opacity-30">
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className="w-1 h-1 rounded-full bg-white/80" />
                ))}
              </div>
              <div className="absolute bottom-6 left-6 grid grid-cols-4 gap-1 opacity-40">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} className="w-1 h-1 rounded-full bg-black/40" />
                ))}
              </div>
            </div>

            <div className="relative w-full max-w-xs sm:max-w-sm h-[240px] sm:h-[260px] md:h-[300px] rounded-2xl overflow-hidden shadow-xl shadow-black/30 bg-black/10">
              {safeSlides.map((slide, index) => (
                <div
                  key={`${slide.url}-${index}`}
                  className={cn(
                    "absolute inset-0 transition-opacity duration-700 ease-out",
                    index === activeIndex ? "opacity-100" : "opacity-0"
                  )}
                >
                  <Image
                    src={slide.url}
                    alt={slide.alt || "MellyCrochets crochet piece"}
                    fill
                    sizes="(max-width: 768px) 320px, 420px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: dark content panel */}
          <div className="relative bg-[#1b1112] px-5 sm:px-8 py-7 sm:py-9 md:py-10 text-left text-white flex flex-col justify-center gap-4">
            <div className="absolute top-4 right-5 flex gap-2 opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-[#82181a]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#c9a87c]" />
            </div>

            {eyebrow && (
              <p className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-[#fecaca] mb-1">
                {eyebrow}
              </p>
            )}

            <h1 className="text-2.4xl sm:text-3xl md:text-[2.25rem] font-extrabold leading-snug tracking-tight text-[#fef2f2]">
              {title}{" "}
              {highlight && (
                <span className="block text-[#c9a87c]">
                  {highlight}
                </span>
              )}
            </h1>

            {description && (
              <p className="mt-1 text-xs sm:text-sm md:text-[0.9rem] leading-relaxed text-[#e5e7eb] max-w-md">
                {description}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-3">
              {primaryHref && (
                <Link
                  href={primaryHref}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold bg-[#82181a] text-white shadow-md shadow-rose-200/70 hover:bg-[#6c1315] transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#82181a] focus:ring-offset-[#1b1112]"
                >
                  {primaryLabel}
                </Link>
              )}
              {secondaryHref && (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm sm:text-base font-semibold border border-[#c9a87c] text-[#c9a87c] bg-white/5 hover:bg-[#82181a]/10 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#82181a] focus:ring-offset-[#1b1112]"
                >
                  {secondaryLabel}
                </Link>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-[11px] text-[#e5e7eb]/80">
              <div className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9a87c]" />
                Handcrafted crochet fashion
              </div>
              <div className="inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#fecaca]" />
                Seamless online ordering
              </div>
            </div>
          </div>
        </div>
      {/* </div> */}
    </section>
  );
}

