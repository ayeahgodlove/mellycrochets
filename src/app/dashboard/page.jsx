"use client";

import PageBreadCrumbs from "../../components/page-breadcrumb/page-breadcrumb.component";
import TransactionCharts from "../../components/charts/transaction.component";
import { useList } from "@refinedev/core";
import { Spin } from "@/components/ui";
import TransactionSummary from "../../components/charts/transaction-summary.component";
import { OrderList } from "../../components/charts/order-summary.component";

export default function IndexPage() {
  const {
    data: transactions,
    isLoading: paymentLoading,
    isFetching: paymentFetching,
  } = useList({
    resource: "payments",
    pagination: {
      pageSize: 100,
    },
  });

  if (paymentLoading || paymentFetching) {
    return (
      <div
        style={{
          minHeight: "65vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" tip="loading..." className="text-lg text-center" />
      </div>
    );
  }
  const transactionData = transactions?.data ?? [];

  return (
    <>
      <PageBreadCrumbs items={["Dashboard"]} />
      <TransactionSummary data={transactionData} />
      <TransactionCharts data={transactionData} />
      <OrderList />
    </>
  );
}
