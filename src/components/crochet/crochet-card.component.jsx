import { format } from "../../lib/format";
import { Card, Col, Image, Tag } from "antd";
import Link from "next/link";
import React from "react";
import { API_URL_UPLOADS_CROCHETS } from "../../constants/api-url";

const { Meta } = Card;
const CrochetCard = ({ crochet }) => {
  return (
    <>
      <Col xs={24} sm={8} md={6} lg={8} key={crochet.id}>
        <Card
          hoverable
          cover={
            <div className="relative custom-image-group">
              <Image.PreviewGroup
                items={crochet.imageUrls?.map((med) => {
                  return `${API_URL_UPLOADS_CROCHETS}/${med || "nodata"}`;
                })}
              >
                <Image
                  className="custom-ant-image bg-[#f2c2c2] object-cover rounded-t-md"
                  src={`${API_URL_UPLOADS_CROCHETS}/${
                    crochet.imageUrls[0] || "nodata"
                  }`}
                  alt={crochet.description}
                  preview={true}
                  style={{ objectFit: "cover" }}
                />
              </Image.PreviewGroup>

              <div className="absolute top-3 left-3 flex rounded-2xl gap-2">
                <Tag color="pink">MellyCrochets</Tag>
              </div>
            </div>
          }
          className="shadow-lg"
        >
          <Meta
            title={
              <div className="flex justify-between align-middle">
                <Link
                  href={`/crochets/${crochet.id}`}
                  className="nav-link text-gray-800 hover:text-red-500"
                >
                  {crochet.name}
                </Link>
                <span
                  style={{ border: "2px solid #e3b1b1" }}
                  className="rounded-3xl px-3 py-1 border-[#e3b1b1] font-normal text-sm hover:bg-[#e3b1b1] hover:font-medium"
                >
                  {format.number(crochet.price) + " XAF"}
                </span>
              </div>
            }
            // description={

            // }
          />
        </Card>
      </Col>
    </>
  );
};

export default CrochetCard;
