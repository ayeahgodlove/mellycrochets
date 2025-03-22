import { Col, Empty, Row } from "antd";
import React from "react";
import CrochetCard from "./crochet-card.component";
import { crochetAPI } from "../../store/api/crochet_api";
import { motion } from "framer-motion";
import SpinnerList from "../../components/spinner-list";
import { useFilter } from "../../hooks/filter.hook";

const CrochetList = () => {
  const {
    data: crochets,
    isLoading,
    isFetching,
  } = crochetAPI.useFetchAllCrochetsQuery(1);
  const { filteredCrochets } = useFilter();

  const displayedCrochets =
    filteredCrochets && filteredCrochets.length > 0
      ? filteredCrochets
      : crochets;

  return (
    <>
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
      {displayedCrochets && displayedCrochets.length > 0 ? (
        <Row
          gutter={[24, 24]}
          data-aos="fade-up"
          className="mt-12"
          data-aos-delay="300"
        >
          {displayedCrochets?.map((crochet) => (
            <CrochetCard key={crochet.id} crochet={crochet} />
          ))}
        </Row>
      ) : (
        <Col span={24}>
          <div className="empty-wrap">
            <Empty />
          </div>
        </Col>
      )}
    </>
  );
};

export default CrochetList;
