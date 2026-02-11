"use client";

import Link from "next/link";

export default function HeroSection({
  heroInit,
  heroMiddle,
  heroLast,
  description,
  primaryCtaLabel,
  secondaryCtaLabel,
}) {
  return (
    <section className="relative flex items-center justify-center min-h-[75vh] md:min-h-[85vh] overflow-hidden z-0">
      {/* Festive gradient background with subtle motion */}
      <div
        className="absolute inset-0 hero-gradient-bg"
        style={{
          background:
            "linear-gradient(135deg, #fef8f5 0%, #fdf2ed 25%, #fce8e0 50%, #fadcd4 75%, #f5e6e1 100%)",
        }}
      />
      {/* Soft glow orbs (festive warmth) */}
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

      {/* Decorative floating elements (festive accents) */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <span className="absolute top-[18%] left-[12%] w-2 h-2 rounded-full bg-[#82181a]/40 hero-float" />
        <span className="absolute top-[22%] right-[15%] w-3 h-3 rounded-full bg-amber-300/50 hero-float-slow" style={{ animationDelay: "1s" }} />
        <span className="absolute bottom-[30%] left-[8%] w-2 h-2 rounded-full bg-[#82181a]/30 hero-float-slow" style={{ animationDelay: "2s" }} />
        <span className="absolute bottom-[25%] right-[10%] w-2 h-2 rounded-full bg-amber-400/40 hero-float" style={{ animationDelay: "0.5s" }} />
        <span className="absolute top-[45%] left-[6%] w-1.5 h-1.5 rounded-full bg-[#82181a]/25 hero-float-slow" style={{ animationDelay: "2.5s" }} />
        <span className="absolute top-[55%] right-[8%] w-1.5 h-1.5 rounded-full bg-amber-500/30 hero-float" style={{ animationDelay: "1.5s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 py-16 md:py-20 max-w-5xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#1a1a1a] leading-tight">
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
        <p className="mt-6 md:mt-8 text-base sm:text-lg md:text-xl max-w-2xl mx-auto text-[#3d3d3d] leading-relaxed hero-desc-in">
          {description}
        </p>
        <div className="hero-desc-in mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4">
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

      {/* Bottom edge fade for smooth transition into next section */}
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
