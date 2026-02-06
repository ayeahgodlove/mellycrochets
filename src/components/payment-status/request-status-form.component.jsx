"use client";

import {
  Form,
  Input,
  Button,
  Descriptions,
  Typography,
  message,
  Card,
  Spin,
  Badge,
} from '@/components/ui';
import { useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

const { Title } = Typography;

const PaymentStatusDownloader = dynamic(
  () => import("../../lib/payment-status"),
  {
    ssr: false,
  }
);

export default function RequestStatusForm() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const onFinish = async ({ requestId }) => {
    setLoading(true);
    setData(null);
    try {
      const response = await axios.get(`/api/momo/status/${requestId}`);
      setData(response.data.data); // assuming your backend returns data in this format
    } catch (error) {
      console.error("Error fetching status", error);
      message.error("Failed to fetch payment status.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-6 rounded">
      <Card
        title={
          <Title level={3} className="text-left" style={{ marginBottom: 0 }}>
            Check Payment Status
          </Title>
        }
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Request ID"
            name="requestId"
            rules={[{ required: true, message: "Please enter a request ID" }]}
          >
            <Input placeholder="Enter your request ID" size="large" />
          </Form.Item>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            block
          >
            Request Status
          </Button>
        </Form>
      </Card>
      {loading && (
        <div className="flex justify-center align-middle py-20">
          <Spin tip="Loading..." size="large" spinning />
        </div>
      )}
      {data && (
        <Card
          title="Transaction Details"
          style={{ marginTop: 20 }}
          styles={{
            body: {
              paddingTop: 0,
            },
          }}
          extra={
            <PaymentStatusDownloader
              data={data}
              onClick={(e) => e.stopPropagation()} // And this if needed
            />
          }
        >
          <Descriptions
            // title="Transaction Details"
            bordered
            // column={2}
            // className="mt-6"
            style={{ marginTop: 20 }}
            column={{ xs: 1, md: 2 }}
          >
            <Descriptions.Item label="Request ID">
              {data.requestId}
            </Descriptions.Item>
            <Descriptions.Item label="Amount">
              {data.amount} {data.currencyCode}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {data.description}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Badge status="processing" text={data.status} />
            </Descriptions.Item>
            <Descriptions.Item label="Transaction Status">
              {data.transactionStatus}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {data.createdAt}
            </Descriptions.Item>
            <Descriptions.Item label="Transaction Ref">
              {data.mchTransactionRef}
            </Descriptions.Item>
            <Descriptions.Item label="App ID">{data.appId}</Descriptions.Item>
            <Descriptions.Item label="Payer Note">
              {data.payerNote || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Auth URL">
              <a
                href={data.links?.paymentAuthUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Payment Auth
              </a>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      )}
    </div>
  );
}
