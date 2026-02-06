import { useList } from "@refinedev/core";
import { format } from "../../lib/format";
import { orderItemAPI } from "../../store/api/order_item_api";
import { Table } from '@/components/ui';
import React from "react";

const OrderItemTable = ({ record }) => {
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
    return <>Loading...</>;
  }

  const resultOrderItems =
    orderItems && orderItems.length > 0
      ? orderItems.filter((item) => item.orderId === record.id)
      : [];

  const columns = [
    // {
    //   title: "SN",
    //   key: "sNo",
    //   render: (_, __, index) => format.number(index + 1),
    //   align: "right",
    // },
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
      render: (_, record, index) => format.number(record.qtty),
      align: "right",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (_, record, index) => format.number(record.price),
      align: "right",
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={resultOrderItems}
        pagination={false}
        rowKey="id"
        scroll={{ x: 800 }}
        size="small"
      />
    </>
  );
};

export default OrderItemTable;
