"use client";
import { Button, Empty } from '@/components/ui';
import React from "react";
import CrochetCard from "./crochet-card.component";
import { cn } from "@/lib/utils";

const CrochetList = ({ crochets }) => {
  return (
    <>
      {crochets && crochets.length > 0 ? (
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            "gap-4 sm:gap-6 lg:gap-8",
            "data-aos fade-up"
          )}
          data-aos="fade-up"
          data-aos-delay="300"
          id="crochet-list"
        >
          {crochets?.map((crochet) => (
            <CrochetCard key={crochet.id} crochet={crochet} />
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
