"use client";

import { Breadcrumb } from "@/components/ui";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SLIDE_DURATION_MS = 5000;
const SLIDE_TRANSITION_MS = 900;

export default function CrochetTypeHero({ title, description, breadcrumbs, images = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = Array.isArray(images) && images.length > 0 ? images : [];
  const hasCarousel = slides.length > 0;

  useEffect(() => {
    if (slides.length <= 1) return;
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  const isExternalUrl = (url) => typeof url === "string" && (url.startsWith("http") || url.startsWith("//"));

  return (
    <section
      className={cn(
        "relative w-full overflow-hidden bg-white px-4 sm:px-6 pb-14 md:pb-16",
        hasCarousel ? "min-h-[360px] md:min-h-[440px] py-12 md:py-16 flex flex-col justify-center" : "pt-12 pb-10 md:pt-16 md:pb-14"
      )}
    >
      {!hasCarousel && (
        <>
          <div
            className="absolute inset-0 hero-gradient-bg"
            style={{
              background: "linear-gradient(135deg, #fef8f5 0%, #fdf2ed 40%, #fce8e0 75%, #f5e6e1 100%)",
            }}
            aria-hidden
          />
          <div
            className="absolute -top-8 left-4 w-40 h-40 rounded-full opacity-40 hero-glow-pulse"
            style={{ background: "radial-gradient(circle, #c9a87c 0%, transparent 70%)" }}
            aria-hidden
          />
          <div
            className="absolute -bottom-12 right-4 w-48 h-48 rounded-full opacity-30 hero-glow-pulse"
            style={{ background: "radial-gradient(circle, #82181a 0%, transparent 70%)" }}
            aria-hidden
          />
        </>
      )}

      {hasCarousel && (
        <div className="absolute inset-0 z-0">
          {slides.map((url, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-all ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{
                transitionDuration: `${SLIDE_TRANSITION_MS}ms`,
                opacity: i === activeIndex ? 1 : 0,
                transform: i === activeIndex ? "scale(1)" : "scale(1.04)",
                zIndex: i === activeIndex ? 1 : 0,
              }}
              aria-hidden={i !== activeIndex}
            >
              <Image
                src={url}
                alt=""
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
                unoptimized={isExternalUrl(url)}
              />
              <div
                className="absolute inset-0 bg-black/40"
                aria-hidden
              />
            </div>
          ))}
        </div>
      )}

      <div className={cn("relative z-10 text-center max-w-3xl mx-auto p-6 md:p-10 lg:p-12", hasCarousel && " [&_a]:text-white/95 [&_a:hover]:text-white")}>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-4 drop-shadow-sm">
          {hasCarousel ? <span className="text-white drop-shadow-md">{title}</span> : <span className="text-[#1a1a1a]">{title}</span>}
        </h1>
        <p className={cn("text-lg md:text-xl max-w-2xl mx-auto mb-4", hasCarousel ? "text-white/95 drop-shadow-sm" : "text-[#3d3d3d]")}>
          {description}
        </p>
        <Breadcrumb
          items={[
            { title: "Home", href: "/" },
            ...(breadcrumbs || []).map((item) => ({ title: item.title, href: item.href })),
          ]}
          style={{ display: "flex", justifyContent: "center" }}
        />
      </div>

      {/* Curved bottom edge — smooth wave into content */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-14 md:h-16 w-full pointer-events-none" aria-hidden>
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="absolute bottom-0 left-0 h-full w-full"
        >
          <path
            d="M0 50 C400 0 600 80 1000 50 C1200 30 1320 50 1440 45 L1440 80 L0 80 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
