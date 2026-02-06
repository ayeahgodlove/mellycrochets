"use client";

import PageBreadCrumbs from "../../../../../components/page-breadcrumb/page-breadcrumb.component";
import {
  DateField,
  ImageField,
  MarkdownField,
  Show,
  TextField,
} from '@/components/refine';
import { useShow } from "@refinedev/core";
import { Typography } from '@/components/ui';

const { Title } = Typography;

export default function PaymentShow() {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;

  const record = data?.data;

  return (
    <>
      <PageBreadCrumbs items={["Payments", "Lists", "Details"]} />
      <Show isLoading={isLoading}>
        <Title level={5}>{"ID"}</Title>
        <TextField value={record?.id ?? ""} />
        <Title level={5}>{"Order ID"}</Title>
        <TextField value={record?.orderId} />
        <Title level={5}>{"Transaction ID"}</Title>
        <TextField value={record?.transactionId} />
        <Title level={5}>{"Description"}</Title>
        <MarkdownField value={record?.description} />
        <Title level={5}>{"Telephone"}</Title>
        <TextField value={record?.telephone} />
        <Title level={5}>{"Email"}</Title>
        <TextField value={record?.email} />
        <Title level={5}>{"Username"}</Title>
        <TextField value={record?.username} />
        <Title level={5}>{"Price"}</Title>
        <TextField value={record?.price} />
        <Title level={5}>{"Currency"}</Title>
        <TextField value={record?.currency} />
        <Title level={5}>{"Country Code"}</Title>
        <TextField value={record?.countryCode} />
        <Title level={5}>{"Payment Method"}</Title>
        <TextField value={record?.paymentMethod} />
        <Title level={5}>{"Transaction Time"}</Title>
        <DateField value={record?.transactionTime} />
        <Title level={5}>{"Mch Transaction Ref"}</Title>
        <TextField value={record?.mchTransactionRef} />
        <Title level={5}>{"Request ID"}</Title>
        <TextField value={record?.requestId} />
        <Title level={5}>{"Status"}</Title>
        <TextField value={record?.status} />
        <Title level={5}>{"CreatedAt"}</Title>
        <DateField value={record?.createdAt} />
      </Show>
    </>
  );
}
