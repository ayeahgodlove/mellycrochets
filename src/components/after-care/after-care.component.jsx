import { afterCareAPI } from "../../store/api/after_care_api";
import { Collapse, Image } from "antd";
import React from "react";
import YoutubeVideo from "../youtube-video/youtube-video.component";

const CrochetCareTips = () => {
  const {
    data: afterCares,
    isLoading,
    isFetching,
  } = afterCareAPI.useFetchAllAfterCaresQuery(1);

  if (isLoading || isFetching) {
    return (
      <div
        style={{
          minHeight: "65vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p className="text-lg text-center">Details loading...</p>
      </div>
    );
  }

  const items =
    afterCares && afterCares.length > 0
      ? afterCares.map((care) => {
          return {
            key: care.id,
            label: (
              <div className="flex align-middle justify-between">
                <div>
                  <Image
                    height={20}
                    width={20}
                    preview={false}
                    src={"/icons/svg-path.png"}
                    style={{ marginTop: 5 }}
                  />
                  <span style={{ fontSize: 16, marginLeft: 30 }}>
                    {care.title}
                  </span>
                </div>

                <div className="hidden md:flex justify-center align-middle">
                  <span className="bg-[#f2c2c2] px-5 rounded-lg">Care</span>
                </div>
              </div>
            ),
            children: (
              <div className="px-2 md:px-10">
                <YoutubeVideo title={care.title} videoUrl={care.videoUrl} />
                <div>{care.description}</div>
              </div>
            ),
          };
        })
      : [];

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-15 md:py-30">
        <Collapse
          size="large"
          accordion
          items={items}
          expandIconPosition={"right"}
          defaultActiveKey={items && items.length > 0 ? items[0].key : null}
        />
      </div>
    </>
  );
};

export default CrochetCareTips;
