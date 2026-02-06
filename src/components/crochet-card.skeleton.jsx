import React from "react";
import { Card, Col, Row, Skeleton, Space } from '@/components/ui';
import PageSkeleton from "./page-skeleton/page-skeleton";

const SpinnerList = () => {
  return (
    <>
      <PageSkeleton />
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ width: "100%" }}
        justify={"center"}
      >
        {[1, 2, 3, 4, 5].map((value) => (
          <Col className="gutter-row" xs={24} md={8} key={value}>
            <Card style={{ width: "100%", marginBottom: 20 }}>
              <Space direction="vertical" align="center" size="large">
                <Skeleton.Image active />
              </Space>
              <Skeleton active />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SpinnerList;
