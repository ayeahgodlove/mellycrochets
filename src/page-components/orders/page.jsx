"use client";

import { Table, Card, Tag, Button, Row, Col, Typography, Empty } from "@/components/ui";
import { Eye, Download, Package, Calendar, Phone, DollarSign, Hash } from "lucide-react";
import { format } from "../../lib/format";
import { useGetIdentity, useList } from "@refinedev/core";
import { orderAPI } from "../../store/api/order_api";
import { skipToken } from "@reduxjs/toolkit/query";
import TableSkeleton from "../../components/order/order.skeleton";
import CrochetTypeHero from "../../components/shared/crochet-type-hero.component";
import { orderItemAPI } from "../../store/api/order_item_api";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

const InvoiceDownloader = dynamic(() => import("../../lib/invoice"), {
  ssr: false,
});

const statusColors = {
  Delivered: "green",
  Processing: "blue",
  Cancelled: "red",
};

const OrdersPage = () => {
  const { data: user } = useGetIdentity({});
  const searchParams = useSearchParams();

  const telephone = searchParams.get("telephone");

  const {
    data: crochetList,
    isLoading: crochetLoading,
    isFetching: crochetFetching,
  } = useList({ resource: "crochets" });

  const {
    data: orders,
    isLoading: ordersLoading,
    isFetching,
  } = orderAPI.useFetchAllOrdersByUserQuery(
    user || telephone ? { userId: user ? user.id : telephone } : skipToken
  );

  const {
    data: orderItems,
    isLoading: orderItemsLoading,
    isFetching: orderItemsFetching,
  } = orderItemAPI.useFetchAllOrderItemsQuery(1);

  if (
    ordersLoading ||
    orderItemsLoading ||
    orderItemsFetching ||
    isFetching ||
    crochetLoading ||
    crochetFetching
  ) {
    return <TableSkeleton />;
  }

  const handleRowClick = () => {
    return {
      onClick: (e) => {
        if (e.target.closest("button, a")) {
          e.stopPropagation();
        }
      },
    };
  };

  const columns = [
    {
      title: (
        <div className="flex items-center gap-2">
          <Hash size={16} className="text-gray-500" />
          <span>SN</span>
        </div>
      ),
      key: "sNo",
      render: (_, __, index) => (
        <span className="text-gray-600 font-medium">{format.number(index + 1)}</span>
      ),
      align: "right",
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <Package size={16} className="text-gray-500" />
          <span>Order No</span>
        </div>
      ),
      dataIndex: "orderNo",
      key: "orderNo",
      align: "right",
      render: (orderNo) => (
        <span className="font-semibold text-gray-900">{orderNo}</span>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <Phone size={16} className="text-gray-500" />
          <span>Telephone</span>
        </div>
      ),
      dataIndex: "telephone",
      key: "telephone",
      render: (tel) => <span className="text-gray-700">{tel || "-"}</span>,
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <Calendar size={16} className="text-gray-500" />
          <span>Date</span>
        </div>
      ),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => (
        <span className="text-gray-700">{format.date(date)}</span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag 
          color={statusColors[status]}
          className="font-semibold px-3 py-1 rounded-full"
        >
          {status}
        </Tag>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <Package size={16} className="text-gray-500" />
          <span>Quantity</span>
        </div>
      ),
      dataIndex: "totalQtty",
      key: "totalQtty",
      align: "right",
      render: (quantity) => (
        <span className="text-gray-700 font-medium">{format.number(quantity)}</span>
      ),
    },
    {
      title: (
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-gray-500" />
          <span>Total</span>
        </div>
      ),
      dataIndex: "totalAmount",
      key: "totalAmount",
      align: "right",
      render: (amount) => (
        <span className="font-semibold text-gray-900">{format.number(amount)} XAF</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record, index) => {
        const getCrochetName = (crochetId) =>
          crochetList?.data?.find((c) => c.id === crochetId);

        const items =
          orderItems && orderItems.length > 0
            ? orderItems
                .map((item) => {
                  const crochet = getCrochetName(item.crochetId);
                  return {
                    ...item,
                    crochetName: crochet?.name || "Unknown",
                  };
                })
                .filter((item) => item.orderId === record.id)
            : [];
        return (
          <div
            className="flex gap-2 items-center"
            key={record.id + index}
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              icon={<Eye size={16} />}
              href={`/orders/${record.id}?telephone=${record.telephone}`}
              type="default"
              size="small"
              className="flex items-center gap-1.5 text-red-800 hover:text-red-900 hover:bg-red-50 border-red-200"
              onClick={(e) => e.stopPropagation()}
            >
              View
            </Button>

            <InvoiceDownloader
              order={record}
              items={items}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        );
      },
    },
  ];

  const ordersData = orders || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <CrochetTypeHero
        title={"My Orders"}
        description={"View and manage your orders here."}
        breadcrumbs={[{ title: "Orders", href: "#" }]}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="shadow-xl border-0 overflow-hidden p-0 bg-white">
          <div className="bg-gradient-to-r from-red-900 to-red-800 px-6 py-5 w-full">
            <div className="flex items-center justify-between">
              <Typography.Title level={4} className="!text-white !mb-0 flex items-center gap-2.5 font-bold">
                <Package size={24} className="text-white" />
                Order History
              </Typography.Title>
              {ordersData.length > 0 && (
                <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                  <span className="text-white text-sm font-semibold">
                    {ordersData.length} {ordersData.length === 1 ? "order" : "orders"}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="p-6 bg-white">
            {ordersData.length === 0 ? (
              <Empty
                description="No orders found"
                className="py-12"
              >
                <Button
                  type="primary"
                  href="/shop"
                  className="mt-4 bg-red-800 hover:bg-red-900"
                >
                  Start Shopping
                </Button>
              </Empty>
            ) : (
              <Table
                columns={columns}
                dataSource={ordersData}
                pagination={{ 
                  pageSize: 10,
                  showSizeChanger: false,
                  showTotal: (total) => `Total ${total} orders`,
                }}
                className="mt-2"
                rowKey="id"
                scroll={{ x: 1000 }}
                onRow={handleRowClick}
              />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrdersPage;
