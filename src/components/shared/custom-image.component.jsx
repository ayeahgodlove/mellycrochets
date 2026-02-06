import React from "react";
import { Image, Space } from "@/components/ui";
import { API_URL_UPLOADS_CROCHETS } from "../../constants/api-url";

const CustomImage = ({ imageList }) => {
  const items =
    imageList?.map((item) => `${API_URL_UPLOADS_CROCHETS}/${item}`) || [];

  return (
    <>
      {imageList?.map((item, i) => (
        <img
          key={`preload-${i}`}
          src={`${API_URL_UPLOADS_CROCHETS}/${item}`}
          alt="preload"
          style={{ display: "none" }}
        />
      ))}
      <Image.PreviewGroup items={items}>
        <Space size={"large"} wrap>
          {items.map((src) => (
            <Image
              key={src}
              src={src}
              width={96}
              height={96}
              className="rounded-md object-cover border border-gray-100 hover:border-red-400 transition"
              preview
            />
          ))}
        </Space>
      </Image.PreviewGroup>
    </>
  );
};

export default CustomImage;
