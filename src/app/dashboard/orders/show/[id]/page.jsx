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
      <PageBreadCrumbs items={["Orders", "Lists", "Details"]} />
      <Show isLoading={isLoading}>
        <Title level={5}>{"ID"}</Title>
        <TextField value={record?.id ?? ""} />
        <Title level={5}>{"Order NO"}</Title>
        <TextField value={record?.orderNo} />
        <Title level={5}>{"Email"}</Title>
        <TextField value={record?.email} />
        <Title level={5}>{"Username"}</Title>
        <MarkdownField value={record?.username} />
        <Title level={5}>{"Telephone"}</Title>
        <TextField value={record?.telephone} />
        <Title level={5}>{"Email"}</Title>
        <TextField value={record?.email} />
        <Title level={5}>{"Username"}</Title>
        <TextField value={record?.username} />
        <Title level={5}>{"Total Qtty"}</Title>
        <TextField value={record?.totalQtty} />
        <Title level={5}>{"Total Amount"}</Title>
        <TextField value={record?.totalAmount} />
        <Title level={5}>{"Payment Method"}</Title>
        <TextField value={record?.paymentMethod} />
        <Title level={5}>{"Status"}</Title>
        <TextField value={record?.status} />
        <Title level={5}>{"CreatedAt"}</Title>
        <DateField value={record?.createdAt} />
      </Show>
    </>
  );
}
