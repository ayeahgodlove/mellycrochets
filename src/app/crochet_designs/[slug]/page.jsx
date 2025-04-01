"use client";

import { crochetTypeAPI } from "../../../store/api/crochet_type_api";
import CrochetList from "../../../components/crochet/crochet-list.component";
import FilterCrochets from "../../../components/filter-crochet.component";
import { motion } from "framer-motion";
import SpinnerList from "../../../components/crochet-card.skeleton";
import { Row } from "antd";

export default function IndexPage({ params }) {
  const { slug } = params;

  const {
    data: crochetType,
    isLoading,
    isFetching,
  } = crochetTypeAPI.useGetSingleCrochetTypeBySlugQuery(slug);

  if (isLoading || isFetching) {
    return (
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
    );
  }

  return (
    <>
      <div className="py-20">
        {/* filter content */}
        <FilterCrochets />
        <div className="w-full px-10 pb-10" data-aos="fade-up">
          {/* listings */}
          <CrochetList crochets={crochetType?.crochets} />
        </div>
      </div>
    </>
  );
}
