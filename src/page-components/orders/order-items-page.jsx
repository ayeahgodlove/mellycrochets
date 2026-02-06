"use client";

import { Table, Card, Row, Col } from "@/components/ui";
import { format } from "../../lib/format";
import TableSkeleton from "../../components/order/order.skeleton";
import { orderItemAPI } from "../../store/api/order_item_api";
import { useList } from "@refinedev/core";
import CrochetTypeHero from "@/components/shared/crochet-type-hero.component";
import { useSearchParams } from "next/navigation";

const OrderItemsPage = ({ params }) => {
  const { orderId } = params;
  const searchParams = useSearchParams();

  const telephone = searchParams.get("telephone");

  const { data: crochetList } = useList({ resource: "crochets" });
  const crochetMap = crochetList?.data.reduce((acc, crochet) => {
    acc[crochet.id] = crochet;
    return acc;
  }, {});
  const {
    data: orderItems,
    isLoading: orderItemsLoading,
    isFetching,
  } = orderItemAPI.useFetchAllOrderItemsQuery(1);

  if (orderItemsLoading || isFetching) {
    return <TableSkeleton />;
  }

  const columns = [
    {
      title: "Crochet",
      dataIndex: "crochetId",
      key: "crochetId",
      render: (_, record) => {
        const crochet = crochetMap?.[record.crochetId];
        return crochet ? crochet.name : "Loading...";
      },
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Qtty",
      dataIndex: "qtty",
      key: "qtty",
      render: (_, record) => format.number(record.qtty),
      align: "right",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record) => format.number(record.price),
      align: "right",
    },
  ];

  const filteredOrderItems = orderItems.filter(
    (item) => item.orderId === orderId
  );

  return (
    <>
      <CrochetTypeHero
        title={"Order Items"}
        description={"View and manage your order items here."}
        breadcrumbs={[
          { title: "Orders", href: `/orders?telephone=${telephone}` },
          { title: "Order Items", href: "#" },
        ]}
      />
      <Row justify="center" align="middle">
        <Col xs={24} md={18} className="min-h-screen bg-gray-50 my-20 mx-4">
          <Card className="shadow-md">
            <Table
              columns={columns}
              dataSource={filteredOrderItems}
              pagination={{ pageSize: 5 }}
              rowKey="id"
              scroll={{ x: 800 }}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderItemsPage;
