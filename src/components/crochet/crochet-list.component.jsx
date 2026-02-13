"use client";
import { Button, Empty } from '@/components/ui';
import React, { useEffect, useState } from "react";
import CrochetCard from "./crochet-card.component";
import { cn } from "@/lib/utils";

const CrochetList = ({ crochets }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      {crochets && crochets.length > 0 ? (
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            "gap-4 sm:gap-6 lg:gap-8",
            "transition-opacity duration-300 ease-out",
            mounted ? "opacity-100" : "opacity-0"
          )}
          data-aos="fade-up"
          data-aos-delay="100"
          id="crochet-list"
        >
          {crochets?.map((crochet, i) => (
            <div
              key={crochet.id}
              className="crochet-card-in"
              style={{ animationDelay: `${Math.min(i * 50, 400)}ms` }}
            >
              <CrochetCard crochet={crochet} />
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16">
          <div className="empty-wrap">
            <Empty description="No crochets found at the moment!">
              <Button
                type="primary"
                href="https://wa.me/237681077051"
                size="large"
                className="rounded-full mt-4"
              >
                Contact MellyCrochets
              </Button>
            </Empty>
          </div>
        </div>
      )}
    </>
  );
};

export default CrochetList;
