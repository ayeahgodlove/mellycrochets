"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const HERO_SLIDE_DURATION_MS = 4500;
const HERO_TRANSITION_MS = 500;

const LEFT_RIGHT_WIDTH_PCT = 30;  // side slides a bit wider
const CENTER_WIDTH_PCT = 40;     // center (30+40+30=100)
const CENTER_SCALE = 1.14;
const SIDE_SCALE = 0.9;

export default function HeroSection({
  heroInit,
  heroMiddle,
  heroLast,
  description,
  primaryCtaLabel,
  secondaryCtaLabel,
  heroImages = [],
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = Array.isArray(heroImages) && heroImages.length > 0
    ? heroImages.map((img) => (typeof img === "string" ? { url: img, alt: "MellyCrochets product" } : { url: img.url, alt: img.alt || "MellyCrochets product" }))
    : [{ url: "/uploads/crochets/crochet-dress-main.jpg", alt: "MellyCrochets collection" }];

  // Completely circular: [last, first, second, ..., last, first] so we always have 1 left + 1 right
  const n = slides.length;
  const trackSlides =
    n <= 1
      ? slides
      : [slides[n - 1], ...slides, slides[0]];
  const centerTrackIndex = n <= 1 ? 0 : activeIndex + 1; // logical activeIndex -> track index

  const isExternalUrl = (url) => typeof url === "string" && (url.startsWith("http") || url.startsWith("//"));

  const goTo = useCallback((index) => {
    if (n <= 1) return;
    setActiveIndex(((index % n) + n) % n);
  }, [n]);

  const goNext = useCallback(() => {
    if (n <= 1) return;
    setActiveIndex((prev) => (prev + 1) % n);
  }, [n]);

  useEffect(() => {
    if (n <= 1) return;
    const id = setInterval(goNext, HERO_SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [n, goNext]);

  return (
    <section className="relative flex min-h-[75vh] md:min-h-[85vh] overflow-hidden z-0">
      {/* Background */}
      <div
        className="absolute inset-0 hero-gradient-bg"
        style={{
          background:
            "linear-gradient(135deg, #fef8f5 0%, #fdf2ed 25%, #fce8e0 50%, #fadcd4 75%, #f5e6e1 100%)",
        }}
      />
      <div
        className="absolute top-1/4 -left-20 w-72 h-72 rounded-full opacity-40 hero-glow-pulse"
        style={{ background: "radial-gradient(circle, #c9a87c 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute bottom-1/4 -right-16 w-64 h-64 rounded-full opacity-30 hero-glow-pulse"
        style={{ background: "radial-gradient(circle, #82181a 0%, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-20 hero-glow-pulse"
        style={{ background: "radial-gradient(circle, #d4a574 0%, transparent 65%)" }}
        aria-hidden
      />

      {/* Decorative floating elements */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <span className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-[#82181a]/40 hero-float" />
        <span className="absolute top-[22%] right-[15%] w-3 h-3 rounded-full bg-amber-300/50 hero-float-slow" style={{ animationDelay: "1s" }} />
        <span className="absolute bottom-[30%] left-[8%] w-2 h-2 rounded-full bg-[#82181a]/30 hero-float-slow" style={{ animationDelay: "2s" }} />
        <span className="absolute bottom-[25%] right-[10%] w-2 h-2 rounded-full bg-amber-400/40 hero-float" style={{ animationDelay: "0.5s" }} />
        <span className="absolute top-[45%] left-[6%] w-1.5 h-1.5 rounded-full bg-[#82181a]/25 hero-float-slow" style={{ animationDelay: "2.5s" }} />
        <span className="absolute top-[55%] right-[8%] w-1.5 h-1.5 rounded-full bg-amber-500/30 hero-float" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
        {/* Left: Caption + CTAs */}
        <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-[#1a1a1a] leading-tight">
            <span className="inline-block hero-reveal-1">{heroInit}</span>{" "}
            <span
              className="inline-block hero-reveal-2 bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(120deg, #82181a 0%, #a82a2d 40%, #c9a87c 100%)",
                backgroundSize: "200% auto",
              }}
            >
              {heroMiddle}
            </span>{" "}
            <span className="inline-block hero-reveal-3">{heroLast}</span>
          </h1>
          <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 text-[#3d3d3d] leading-relaxed hero-desc-in">
            {description}
          </p>
          <div className="hero-desc-in mt-8 md:mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-base font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#82181a]"
              style={{ backgroundColor: "#82181a" }}
            >
              {primaryCtaLabel ?? "Shop the collection"}
            </Link>
            <Link
              href="/#listing"
              className="inline-flex items-center justify-center px-7 py-3.5 rounded-full text-base font-semibold border-2 border-[#82181a] text-[#82181a] bg-transparent transition-all duration-300 hover:bg-[#82181a]/5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#82181a]"
            >
              {secondaryCtaLabel ?? "Explore styles"}
            </Link>
          </div>
        </div>

        {/* Right: Product image carousel (main + peek left/right, circular) */}
        <div className="flex-1 w-full max-w-[280px] sm:max-w-[300px] lg:max-w-[320px] order-1 lg:order-2 flex justify-center">
          <div className="relative w-full aspect-[4/5] max-h-[380px] rounded-2xl overflow-hidden shadow-2xl hero-carousel-viewport">
            <div
              className="hero-carousel-track"
              style={{
                transform: `translateX(-${(centerTrackIndex - 1) * LEFT_RIGHT_WIDTH_PCT}%)`,
                transition: `transform ${HERO_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
              }}
            >
              {trackSlides.map((slide, trackIndex) => {
                const position = trackIndex - centerTrackIndex; // -1 left, 0 center, 1 right
                const isCenter = position === 0;
                const widthPct = isCenter ? CENTER_WIDTH_PCT : LEFT_RIGHT_WIDTH_PCT;
                const scale = isCenter ? CENTER_SCALE : SIDE_SCALE;
                return (
                <div
                  key={trackIndex}
                  className={`hero-carousel-slide ${isCenter ? "hero-carousel-slide-active" : ""}`}
                  style={{
                    flex: `0 0 ${widthPct}%`,
                    transform: `scale(${scale})`,
                    zIndex: isCenter ? 2 : 1,
                    transition: `transform ${HERO_TRANSITION_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`,
                  }}
                  aria-hidden={!isCenter}
                >
                  <Image
                    src={slide.url}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 768px) 280px, 320px"
                    className="object-cover rounded-xl"
                    priority={trackIndex <= 1}
                    unoptimized={isExternalUrl(slide.url)}
                  />
                </div>
              );
              })}
            </div>
            {/* Dots – refined: larger tap target, clear active vs inactive */}
            {n > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10" role="tablist" aria-label="Slide navigation">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    aria-selected={index === activeIndex}
                    aria-label={`Slide ${index + 1}`}
                    onClick={() => goTo(index)}
                    className={`min-w-[10px] min-h-[10px] rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#82181a]/20 ${
                      index === activeIndex
                        ? "bg-[#82181a] shadow-sm"
                        : "bg-white/70 hover:bg-white/90 border border-white/50"
                    }`}
                    style={{
                      width: index === activeIndex ? 24 : 10,
                      height: 10,
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(254, 248, 245, 0.98), transparent)",
        }}
        aria-hidden
      />
    </section>
  );
}
