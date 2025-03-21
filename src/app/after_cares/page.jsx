"use client";
import React from "react";
import { Button, Card, Empty, Row } from "antd";
import { afterCareAPI } from "../../store/api/after_care_api";
import SpinnerList from "../../components/spinner-list";
import { motion } from "framer-motion";
import YoutubeVideo from "../../components/youtube-video/youtube-video.component";
import { FiArrowRight } from "react-icons/fi";
import SearchBar from "../../components/shared/search.component";
import CrochetList from "../../components/crochet/crochet-list.component";

export default function MellyCrochetsLanding() {
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
  return (
    <div className="bg-gradient-to-br from-pink-100 to-yellow-100 text-gray-800">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center px-6 py-12 max-w-3xl mx-auto">
        <div className="text-2xl md:text-3xl lg:text-6xl font-extrabold tracking-wide text-red-900 mb-4">
          MellyCrochets Aftercare
        </div>
        <p className="text-lg md:text-xl mb-6">
          Discover the warmth of handmade crochet designs, from cozy wearables
          to delightful home decor, crafted to bring comfort and charm to your
          everyday life.
        </p>
        <Button
          type="primary"
          size="large"
          style={{
            borderRadius: 50,
            padding: "20px 15px",
            background: "#82181a",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          Join Our Community <FiArrowRight />
        </Button>
      </div>

      {/* search bar */}
      <SearchBar />

      {/* Features Section */}
      {(isLoading || isFetching) && (
        <Row gutter={[24, 24]} data-aos="fade-up" data-aos-delay="300">
          <motion.div
            className="box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <SpinnerList />
          </motion.div>
        </Row>
      )}
      {afterCares && afterCares.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6 px-6 py-12 max-w-5xl mx-auto">
          {afterCares?.map((crochet) => (
            <Card hoverable key={crochet.id} className="rounded-2xl shadow-md">
              <YoutubeVideo title={crochet.title} videoUrl={crochet.videoUrl} />
              <h3 className="text-xl font-semibold mb-2">{crochet.title}</h3>
              <p className="mb-4">{crochet.description}</p>
              <Button
                href={`/aftercare/${crochet.id}`}
                style={{
                  borderRadius: 50,
                  padding: "20px 15px",
                  fontWeight: 500,
                }}
              >
                Learn more
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6 px-6 py-12 max-w-5xl mx-auto">
          <Empty />
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-yellow-200 to-pink-100 py-12 px-6 text-center">
        <h2 className="text-2xl font-semibold mb-4">
          Bring warmth home with MellyCrochets,{" "}
          <span className="italic">today</span>
        </h2>
        <Button
          type="primary"
          size="large"
          style={{
            borderRadius: 50,
            padding: "20px 15px",
            background: "#82181a",
            color: "#fff",
            fontWeight: 500,
          }}
        >
          Shop Our Collection
        </Button>
        <div className="w-full px-10 pb-10" data-aos="fade-up">
          {/* listings */}
          <CrochetList />
        </div>
      </div>
    </div>
  );
}
