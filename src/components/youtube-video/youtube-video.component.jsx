import React from "react";
import { Card } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const extractVideoId = (url) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const YoutubeVideo = ({ videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = extractVideoId(videoUrl);

  if (!videoId) {
    return <p className="text-red-500 font-semibold">Invalid YouTube URL</p>;
  }

  return (
    <Card
      hoverable
      className="rounded-2xl overflow-hidden shadow-lg transition-transform transform bg-white border border-gray-200"
      style={{ marginBottom: 20 }}
      styles={{
        body: {
          padding: 0,
        },
      }}
    >
      {/* <div className="mb-4"> */}

      {/* </div> */}
      <div className="relative w-full h-56 bg-black">
        {!isPlaying ? (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gray-800 rounded-lg h-60"
            onClick={() => setIsPlaying(true)}
          >
            <div
              className="absolute inset-0 bg-black/40"
              style={{
                background: "url('./mellycrochets/product-jpeg-1000x1000.jpg')",
                // backgroundPosition: "top",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100%"
              }}
            ></div>
            <PlayCircleOutlined
              style={{ fontSize: "48px", color: "#82181a" }}
              className="relative z-10 text-white text-6xl sm:text-7xl md:text-8xl hover:text-gray-300 transition-colors"
            />
          </div>
        ) : (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </Card>
  );
};

export default YoutubeVideo;
