import React from "react";
import { Card, Col, Row, Skeleton, Space } from "@/components/ui";

const CrochetDetailSkeleton = () => {
  return (
    <Row
      gutter={24}
      className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg my-8"
    >
      {/* Left Side - Large Image Skeleton */}
      <Col xs={24} md={10}>
        <Card variant="borderless" style={{ width: "100%", marginBottom: 20 }}>
          <Skeleton className="h-[300px] w-full rounded-lg" />
          <Space wrap style={{ marginTop: 10 }}>
            {[1, 2, 3].map((_, index) => (
              <Skeleton key={index} className="h-16 w-16 rounded-md" />
            ))}
          </Space>
        </Card>
      </Col>

      {/* Right Side - Product Details */}
      <Col xs={24} md={14}>
        <Card variant="borderless" style={{ width: "100%", padding: 20 }}>
          <Skeleton className="h-6 w-3/5" />
          <Skeleton className="h-5 w-2/5 mt-2" />

          {/* Available Sizes */}
          <Space size="small" style={{ marginTop: 20 }}>
            {[1, 2, 3].map((_, index) => (
              <Skeleton key={index} className="h-8 w-10 rounded-full" />
            ))}
          </Space>

          {/* Choose Your Size */}
          <Space size="small" style={{ marginTop: 20 }}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <Skeleton key={index} className="h-8 w-12 rounded-full" />
            ))}
          </Space>

          {/* Choose Your Colors */}
          <Space wrap style={{ marginTop: 20 }}>
            {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
              <Skeleton key={index} className="h-8 w-16 rounded-full" />
            ))}
          </Space>

          {/* Order Buttons */}
          <Row style={{ marginTop: 30 }} gutter={16}>
            <Col>
              <Skeleton className="h-10 w-36 rounded-full" />
            </Col>
            <Col>
              <Skeleton className="h-10 w-36 rounded-full border border-red-300" />
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};

export default CrochetDetailSkeleton;
