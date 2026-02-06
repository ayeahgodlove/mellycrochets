import { Card, Image, Tag } from "@/components/ui";
import Link from "next/link";
import React from "react";
import { API_URL_UPLOADS_CROCHETS } from "../../constants/api-url";
import { useCurrency } from "../../hooks/currency.hook";

const { Meta } = Card;
const CrochetCard = ({ crochet }) => {
  const { getConvertedPrice } = useCurrency();

  const convertedPrice = getConvertedPrice(
    crochet.priceInCfa,
    crochet.priceInUsd
  );

  return (
    <Card
      hoverable
      className="h-full flex flex-col shadow-sm border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden group p-0"
    >
      <div className="relative overflow-hidden w-full">
        {crochet.imageUrls?.map((item, i) => (
          <img
            key={`preload-${i}`}
            src={`${API_URL_UPLOADS_CROCHETS}/${item}`}
            alt={crochet.description}
            style={{ display: "none" }}
          />
        ))}
        <Image.PreviewGroup
          items={crochet.imageUrls?.map((item) => {
            return `${API_URL_UPLOADS_CROCHETS}/${item || "nodata"}`;
          })}
        >
          <Image
            className="w-full bg-gray-100 object-cover transition-transform duration-300 group-hover:scale-105"
            src={`${API_URL_UPLOADS_CROCHETS}/${
              crochet.imageUrls[0] || "nodata"
            }`}
            alt={crochet.description}
            preview={true}
            style={{ 
              objectFit: "cover", 
              height: "320px",
              width: "100%",
              display: "block"
            }}
          />
        </Image.PreviewGroup>

        <div className="absolute top-3 left-3 z-10">
          <Tag className="bg-white/90 backdrop-blur-sm text-red-800 border-0 font-semibold text-xs px-2 py-1">
            MellyCrochets
          </Tag>
        </div>
      </div>
      
      <div className="p-4 flex items-center justify-between gap-3">
        <Link
          href={`/crochets/${crochet.slug}`}
          className="flex-1 text-base font-semibold text-gray-900 hover:text-red-600 transition-colors line-clamp-1"
        >
          {crochet.name}
        </Link>
        <span className="flex-shrink-0 inline-flex items-center px-3 py-1.5 rounded-full bg-red-50 text-red-800 font-semibold text-sm border border-red-100 whitespace-nowrap">
          {convertedPrice}
        </span>
      </div>
    </Card>
  );
};

export default CrochetCard;
