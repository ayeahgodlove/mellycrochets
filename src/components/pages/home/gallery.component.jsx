"use client";

import Image from "next/image";
import { Button } from "@/components/ui";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GallerySection({
  title,
  summary,
  subSummary,
  buttonText,
}) {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Gallery Grid */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  priority={true}
                  src="/photos/image8.jpg"
                  alt="Crochet Collection 1"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={300}
                  height={280}
                />
              </div>
              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  priority={true}
                  src="/photos/image7.jpg"
                  alt="Crochet Collection 2"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={300}
                  height={280}
                />
              </div>
              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  priority={true}
                  src="/mellycrochets/dd/crochet-bags-main.jpg"
                  alt="Crochet Bags"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={300}
                  height={280}
                />
              </div>
              <div className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <Image
                  priority={true}
                  src="/photos/image9.jpg"
                  alt="Crochet Collection 4"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={300}
                  height={280}
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="order-1 lg:order-2 space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {title}
              </h2>
            </div>
            
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              {summary}
            </p>
            
            <p className="text-sm md:text-base text-gray-600 font-medium">
              {subSummary}
            </p>

            <div className="pt-4">
              <Button
                type="primary"
                href="https://www.instagram.com/mellycrochets_?igsh=cTkwZTc1eDcyaThw&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                size="lg"
                className={cn(
                  "group inline-flex items-center gap-2",
                  "px-8 py-4",
                  "text-base font-semibold",
                  "rounded-full",
                  "transition-all duration-300",
                  "hover:gap-3 hover:shadow-xl hover:scale-105",
                  "bg-red-800 hover:bg-red-900 text-white"
                )}
                icon={<ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />}
                iconPosition="end"
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
